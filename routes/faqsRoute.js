const express = require("express");
const router = express.Router();

const {
    createFAQ,
    getAllFAQs,
    getFaqById
} = require("../controller/faqsController");


const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');



router.post("/faqs", authenticateUser, createFAQ);
router.get("/faqs", authenticateUser, getAllFAQs);
router.get("/faqs/:id", authenticateUser, getFaqById);



module.exports = router;
