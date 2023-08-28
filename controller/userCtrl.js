require('dotenv').config()
const OTP = require("../config/OTP-Token");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");


const { findActiveTreatments, findDoctorsByActiveTreatments, updateUserActiveTreatments, getAllSpecialisations } = require('../middleware/helperFunction')


// image upload function start 
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
// upload image Start
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
  },
});
const upload = multer({ storage: storage }).array('profileImage', 2);
// upload image End



const SignUpUser = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json("mobile is required");
    }

    const findUser = await User.findOne({ mobile });
    if (findUser) {
      return res.status(409).json({ status: 409, message: "Mobile number already in use" });
    }

    const otp = OTP.generateOTP();
    const newUser = await User.create({ mobile, otp });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ status: 404, message: "User are not found" });
    }

    if (user.otp != req.body.otp) {
      return res.status(400).send({ status: 400, message: "Invalid OTP" });
    }
    const token = OTP.generateJwtToken(user._id);
    return res.status(200).json({
      message: "OTP Verify Successfully",
      token: token
    })

  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

const resendOTP = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    const otp = OTP.generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { otp, otpExpiration, },
      { new: true }
    );
    let obj = {
      id: updated._id,
      otp: updated.otp,
      mobile: updated.mobile,
    };
    res.status(200).send({ status: 200, message: "OTP resent", data: obj });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};


const registrationFrom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const findUser = await User.findOne({ mobile: req.body.mobile });
    if (findUser && findUser._id.toString() !== id) {
      return res.status(409).json({ status: 409, message: "Mobile number already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



const updateProfileImage = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: 'Error uploading Profile image', err });
      } else if (err) {
        return res.status(500).json({ error: 'An unknown error occurred', err });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status: 400, message: 'No Profile image uploaded' });
      }

      const imageUrl = req.files[0].path;
      const userId = req.params.id;

      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { profileImage: { $each: [imageUrl], $position: 0 } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      const updatedProfileImages = user.profileImage || [];
      if (updatedProfileImages.length > 2) {
        return res.status(400).json({ status: 400, message: 'Maximum limit of 2 Profile images reached' });
      }

      return res.status(200).json({
        status: 200,
        message: 'Profile image updated successfully',
        user
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update Profile image' });
  }
};


const getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    res.status(200).json({
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const findUser = await User.findOne({ mobile: req.body.mobile });
    if (findUser && findUser._id.toString() !== id) {
      return res.status(409).json({ status: 409, message: "Mobile number already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const setActiveTreatments = async (req, res) => {
  try {
    const { id } = req.params;
    let { activeTreatments } = req.body;

    if (typeof activeTreatments === 'string') {
      activeTreatments = activeTreatments.split(',').map(item => item.trim());
    }
    const allSpecialisations = await getAllSpecialisations();
    const invalidSpecialisations = activeTreatments.filter(specialisation => !allSpecialisations.includes(specialisation));
    if (invalidSpecialisations.length > 0) {
      return res.status(400).json({ message: "Invalid specialisations provided", invalidSpecialisations });
    }

    const updatedUser = await updateUserActiveTreatments(id, activeTreatments);
    res.status(200).json({ message: "Active treatments updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getDoctorsByActiveTreatments = async (req, res) => {
  try {
    const { activeTreatments: specialisation } = req.query;

    const query = {};

    if (specialisation) {
      query.specialisation = { $regex: specialisation, $options: "i" };
    }

    const doctors = await Doctor.find(query);

    res.status(200).json({ status: 200, message: "Doctors with matching active treatments", data: doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









module.exports = {
  SignUpUser,
  verifyOTP,
  resendOTP,
  registrationFrom,
  updateProfileImage,
  getUserProfileById,
  editProfile,
  setActiveTreatments,
  getDoctorsByActiveTreatments,
};
