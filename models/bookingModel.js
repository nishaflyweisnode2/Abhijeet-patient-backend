const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
    required: true,
  },
  selectedTime: {
    type: String,
  },


}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
