const express = require("express");
const router = express.Router();

const { createBooking } = require("../controller/bookingController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');



router.post("/bookings", authenticateUser, createBooking);



module.exports = router;
