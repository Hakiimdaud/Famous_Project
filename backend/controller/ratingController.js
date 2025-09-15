const Famous = require("../Models/famousModel");

// Add Rating
const addRating = async (req, res) => {
    try {
        const { influencerId, rating, comment, userName, userId } = req.body;

        if (!influencerId || !rating || !userId) {
            return res.status(400).json({ message: "Influencer ID, rating, and userId are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const influencer = await Famous.findById(influencerId);
        if (!influencer) {
            return res.status(404).json({ message: "Influencer not found" });
        }

        // Check if user already rated
        const alreadyRated = influencer.ratings.find(r => r.userId === userId);
        if (alreadyRated) {
            return res.status(400).json({ message: "You already submitted a rating for this influencer" });
        }

        // Push new rating
        influencer.ratings.push({
            userId,
            userName: userName || "Anonymous",
            rating,
            comment: comment || ""
        });

        influencer.calculateAverageRating();
        await influencer.save();

        res.status(200).json({
            message: "Rating added successfully",
            averageRating: influencer.averageRating,
            totalRatings: influencer.totalRatings
        });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Ratings
const getRatings = async (req, res) => {
    try {
        const { influencerId } = req.params;
        const influencer = await Famous.findById(influencerId).select("ratings averageRating totalRatings");
        if (!influencer) {
            return res.status(404).json({ message: "Influencer not found" });
        }
        res.status(200).json(influencer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRating, getRatings };
