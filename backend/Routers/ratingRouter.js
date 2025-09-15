const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratingController");

router.post("/rating", ratingController.addRating);
router.get("/ratings/:influencerId", ratingController.getRatings);

module.exports = router;
