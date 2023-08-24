const express = require("express");
const router = express.Router();

const { createContact, getAllContact } = require("../controller/contactUsController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');



router.post("/contact", createContact);
router.get("/contact", authenticateUser, getAllContact);


module.exports = router;
