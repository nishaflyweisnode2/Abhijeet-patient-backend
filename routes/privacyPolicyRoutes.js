const express = require("express");
const router = express.Router();

const { createPrivacyPolicy, getAllPrivacyPolicy } = require("../controller/privacyPolicyController");


router.post("/privacy-policy", createPrivacyPolicy);
router.get("/privacy-policy", getAllPrivacyPolicy);

module.exports = router;
