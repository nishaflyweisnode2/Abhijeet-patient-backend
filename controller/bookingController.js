const Booking = require("../models/bookingModel");
const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");



const createBooking = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const userId = req.user.id;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(400).json({ status: 400, message: "Doctor is not available for appointments" });
    }
    let selectedTime = "";
    if (timeSlot === "Morning") {
      selectedTime = "10:00 AM - 12:00 PM";
    } else if (timeSlot === "Afternoon") {
      selectedTime = "01:00 PM - 03:00 PM";
    } else if (timeSlot === "Evening") {
      selectedTime = "04:00 PM - 08:00 PM";
    }

    const newBooking = await Booking.create({
      doctor: doctorId,
      user: userId,
      date,
      timeSlot,
      selectedTime,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports = {
  createBooking,
};
