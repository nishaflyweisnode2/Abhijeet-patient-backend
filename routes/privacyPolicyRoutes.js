const express = require("express");
const router = express.Router();

const { createPrivacyPolicy, getAllPrivacyPolicy } = require("../controller/privacyPolicyController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');


router.post("/privacy-policy", createPrivacyPolicy);
router.get("/privacy-policy", authenticateUser, getAllPrivacyPolicy);

module.exports = router;
