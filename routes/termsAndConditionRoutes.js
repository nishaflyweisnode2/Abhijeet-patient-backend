const express = require("express");
const router = express.Router();

const { createTerms, getAllTerms } = require("../controller/termsAndConditionController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');


router.post("/terms", authenticateUser, createTerms);
router.get("/terms", authenticateUser, getAllTerms); 

module.exports = router;
