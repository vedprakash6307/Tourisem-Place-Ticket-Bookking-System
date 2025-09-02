const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing= require("../models/listing.js");

//index router
router.get("/", wrapAsync(async (req, res)=>{
   const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings});
   }));

 //New route
router.get("/new",(req, res)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error", "you must logged in create listing");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");

});


//show data Route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} =req.params;
    const listing= await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Your list  does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));


// CREATE route
router.post("/", wrapAsync(async (req, res) => {
    try {
        console.log("Incoming body:", req.body);

        // convert price to number (form sends string)
        if (req.body.listing && req.body.listing.price) {
            req.body.listing.price = Number(req.body.listing.price);
        }

        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        res.status(400).send("Something went wrong: " + err.message);
    }
}));


//edit route
router.get("/:id/edit", wrapAsync(async (req, res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Your list  does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
      req.flash("success", "Page edited");
}));

//Update route
router.put("/:id", wrapAsync(async(req , res) =>{
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
     req.flash("success", "Your data updated");
   res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
      req.flash("success", "Your List are deleted");
    res.redirect("/listings");
}));

module.exports = router;

