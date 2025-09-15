const mongoose = require("mongoose")

const AdminScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "admin"
    }
})

module.exports = mongoose.model("admins", AdminScheme)