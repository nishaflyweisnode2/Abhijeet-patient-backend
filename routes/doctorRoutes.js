const express = require("express");
const router = express.Router();


// image Start
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images/doctor",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});
const upload = multer({ storage: storage });
// image End


const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    searchDoctors,
    getActiveDoctors,
} = require("../controller/doctorController");


const { authenticateUser,
    authorizeUser,
    authorization,
    authenticateAdmin } = require('../middleware/auth');



router.post("/doctors", upload.single("image"), createDoctor);
router.get("/doctors", authenticateUser, getAllDoctors);
router.get("/doctors/:id", authenticateUser, getDoctorById);
router.get("/doctors-search", authenticateUser, searchDoctors);
router.get("/doctors-active", authenticateUser, getActiveDoctors);






module.exports = router;
