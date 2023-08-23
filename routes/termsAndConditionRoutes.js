const express = require("express");
const router = express.Router();

const { createTerms, getAllTerms } = require("../controller/termsAndConditionController");


router.post("/privacy-policy", createTerms);
router.get("/privacy-policy", getAllTerms); 

module.exports = router;
