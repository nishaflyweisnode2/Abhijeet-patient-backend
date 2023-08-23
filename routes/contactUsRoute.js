const express = require("express");
const router = express.Router();

const { createContact, getAllContact } = require("../controller/contactUsController");


router.post("/contact", createContact);
router.get("/contact", getAllContact);


module.exports = router;
