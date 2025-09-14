const Famous = require("../Models/famousModel");

// Add a rating to an influencer
const addRating = async (req, res) => {
    try {
        const { influencerId, rating, comment, userName } = req.body;
        
        // Create a unique guest ID
        const userId = "guest_" + Date.now();

        // Validate input
        if (!influencerId || !rating) {
            return res.status(400).json({ message: "Influencer ID and rating are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Find the influencer
        const influencer = await Famous.findById(influencerId);
        if (!influencer) {
            return res.status(404).json({ message: "Influencer not found" });
        }

        // Add new rating
        influencer.ratings.push({
            userId: userId,
            userName: userName || "Anonymous",
            rating,
            comment: comment || ""
        });

        // Calculate new average rating
        influencer.calculateAverageRating();

        // Save the influencer
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

// Get ratings for an influencer
const getRatings = async (req, res) => {
    try {
        const { influencerId } = req.params;

        const influencer = await Famous.findById(influencerId).select('ratings averageRating totalRatings');
        if (!influencer) {
            return res.status(404).json({ message: "Influencer not found" });
        }

        res.status(200).json({
            ratings: influencer.ratings,
            averageRating: influencer.averageRating,
            totalRatings: influencer.totalRatings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRating, getRatings };