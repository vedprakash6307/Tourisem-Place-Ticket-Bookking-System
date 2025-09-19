const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controller/listings");
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudconfig");
const upload = multer({ storage });

// INDEX & CREATE
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );

// NEW
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE, DELETE
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        wrapAsync(listingController.UpdateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;








