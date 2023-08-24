const express = require("express");
const router = express.Router();

const { createTerms, getAllTerms } = require("../controller/termsAndConditionController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');


router.post("/privacy-policy", authenticateUser, createTerms);
router.get("/privacy-policy", getAllTerms); 

module.exports = router;
