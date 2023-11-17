const express = require("express");
const router = express.Router();

const { AddBanner, updateBanner, getBanner, getBannerById, DeleteBanner } = require("../controller/bannerController");

const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');

const { bannerUpload, upload } = require('../middleware/cloudinary')



router.post("/AddBanner", authenticateUser, bannerUpload.single('image'), AddBanner);
router.put("/updateBanners/:id", authenticateUser, bannerUpload.single('image'), updateBanner);
router.get("/Banner/allBanner", getBanner);
router.get("/Banner/getBannerById/:id", getBannerById);
router.delete("/Banner/deleteBanner/:id", DeleteBanner);



module.exports = router;
