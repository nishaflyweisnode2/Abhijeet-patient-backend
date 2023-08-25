const express = require("express");
const router = express.Router();

const { createBooking, getAllBookings, getBookingById } = require("../controller/bookingController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');



router.post("/bookings", authenticateUser, createBooking);
router.get("/bookings", authenticateUser, getAllBookings);
router.get("/bookings/:id", authenticateUser, getBookingById);



module.exports = router;
