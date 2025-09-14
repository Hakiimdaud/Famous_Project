const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratingController");

// Add a rating to an influencer
router.post("/rating", ratingController.addRating);

// Get ratings for an influencer
router.get("/ratings/:influencerId", ratingController.getRatings);

module.exports = router;