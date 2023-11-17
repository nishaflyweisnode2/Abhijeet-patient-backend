const express = require("express");
const router = express.Router();

router.use("/auth", require("./userRoute"));
router.use("/contactUs", require("./contactUsRoute"));
router.use("/termsAndCondition", require("./termsAndConditionRoutes"));
router.use("/privacy", require("./privacyPolicyRoutes"));
router.use("/hospital", require("./hospitalRoutes"));
router.use("/doctor", require("./doctorRoutes"));
router.use("/booking", require("./bookingRoute"));
router.use("/chat", require("./chatRoutes"));
router.use("/doctorChat", require("./doctorChatRoute"));
router.use("/read", require("./readRoutes"));
router.use("/faqs", require("./faqsRoute"));
router.use("/banner", require("./bannerRoute"));


module.exports = router;