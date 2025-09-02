const express = require("express");
const router = express.Router({ mergeParams: true }); // 👈 important
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create Review
router.post("/", wrapAsync(async (req, res) => {
   const listing = await Listing.findById(req.params.id);

   if (!listing) {
      throw new ExpressError(404, "Listing not found");
   }

   const newReview = new Review(req.body.review);
   listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();
     req.flash("success", "Your fedback submit");

   res.redirect(`/listings/${listing._id}`);
}));

// Delete Review
router.delete("/:reviewID", wrapAsync(async (req, res) => {
   const { id, reviewID } = req.params;

   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
   await Review.findByIdAndDelete(reviewID);
     req.flash("success", "Fedback deleted");
   res.redirect(`/listings/${id}`);
}));

module.exports = router;
