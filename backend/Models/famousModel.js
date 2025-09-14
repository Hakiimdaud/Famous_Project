const mongoose = require("mongoose")

const famousSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    description: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "online"
    },
    social: [
        {
            platform: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    photo: {
        type: String,
        required: true
    },
    // Add rating system
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'User'
        },
        userName: {
            type: String,
            default: "Anonymous"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Calculate average rating when a new rating is added
famousSchema.methods.calculateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.averageRating = 0;
        this.totalRatings = 0;
        return;
    }
    
    const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
    this.averageRating = parseFloat((sum / this.ratings.length).toFixed(1));
    this.totalRatings = this.ratings.length;
};

module.exports = mongoose.model("Famous", famousSchema);