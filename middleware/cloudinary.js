
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

const storage1 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Abhijeet/images/banner", allowed_formats: ["webp", "avif", "jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const bannerUpload = multer({ storage: storage1 });


module.exports = { upload, bannerUpload }
// upload image End