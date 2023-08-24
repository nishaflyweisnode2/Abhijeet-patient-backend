const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    aboutDoctor: {
        type: String,
    },
    registrationNo: {
        type: String,
    },
    specialisation: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        default: 0,
    },
    awards: {
        type: [String],
    },
    image: {
        type: String,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
