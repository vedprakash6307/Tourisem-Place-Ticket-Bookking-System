const Listing = require("../models/listing");
const fetch = require("node-fetch"); // For Node < 18. For Node 18+, fetch is global.
const { cloudinary, storage } = require("../cloudconfig");

// Function to get coordinates from location + country
async function getCoordinates(location, country) {
  const query = encodeURIComponent(`${location}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MyListingApp/1.0 (your-email@example.com)', // REQUIRED by Nominatim
        'Accept-Language': 'en'
      }
    });

    if (!response.ok) {
      console.error(`Nominatim request failed: ${response.status}`);
      return [77.2090, 28.6139]; // fallback to Delhi
    }

    const data = await response.json();

    if (!data.length) {
      return [77.2090, 28.6139]; // fallback coordinates
    }

    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return [77.2090, 28.6139]; // fallback
  }
}

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show one listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Create new listing
module.exports.createListing = async (req, res) => {
  try {
    const { listing } = req.body;

    // Convert price to number
    if (listing.price) listing.price = Number(listing.price);

    // Get coordinates from location + country
    const coords = await getCoordinates(listing.location, listing.country);

    // Assign geometry object
    listing.geometry = {
      type: "Point",
      coordinates: coords, // [lng, lat]
    };

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;

    // Set image if uploaded
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings/new");
  }
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

// Update listing
module.exports.UpdateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { listing } = req.body;

    // Convert price to number
    if (listing.price) listing.price = Number(listing.price);

    // Update coordinates if location or country changed
    if (listing.location || listing.country) {
      listing.geometry = {
        type: "Point",
        coordinates: await getCoordinates(listing.location, listing.country),
      };
    }

    // Update the listing and get the updated document
    const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true });

    // If new image uploaded
    if (req.file) {
      updatedListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await updatedListing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while updating!");
    res.redirect(`/listings/${id}/edit`);
  }
};

// Delete listing
module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (listing.image && listing.image.filename) {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    // Delete listing from DB
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while deleting!");
    res.redirect("/listings");
  }
};
