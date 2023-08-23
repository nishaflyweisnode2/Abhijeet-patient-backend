const express = require("express");
const router = express.Router();

router.use("/auth", require("./userRoute"));
router.use("/contactUs", require("./contactUsRoute"));
router.use("/termsAndCondition", require("./termsAndConditionRoutes"));
router.use("/privacy", require("./privacyPolicyRoutes"));
router.use("/hospital", require("./hospitalRoutes"));

module.exports = router;