const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const reviewController = require("../controller/reviews");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

// Create Review
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
