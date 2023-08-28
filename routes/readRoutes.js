const express = require('express');
const router = express.Router();



// upload image Start
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images/image",
        allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
    },
});
const upload = multer({ storage: storage });
// upload image End


const {
    createRead,
    getAllReads,
    getReadById,
    getLatestRead,
    getDailyReads,
    getWeeklyReads

} = require('../controller/readController');


router.post('/reads', upload.single("image"), createRead);
router.get('/reads', getAllReads);
router.get("/reads/:id", getReadById);
router.get("/reads-latest", getLatestRead);
router.get("/reads/daily/:date", getDailyReads);
router.get("/reads-weekly", getWeeklyReads);



module.exports = router;
