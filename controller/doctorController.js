const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");


const createDoctor = async (req, res) => {
    try {
        const {
            name,
            dob,
            gender,
            phoneNumber,
            email,
            aboutDoctor,
            registrationNo,
            specialisation,
            experience,
            awards,
            hospital,
        } = req.body;

        const checkHospital = await Hospital.findById(hospital)
        if (!checkHospital) {
            return res.status(404).json({ status: 404, message: "Hospital Id not found" });
        }

        const newDoctor = await Doctor.create({
            name,
            dob,
            gender,
            phoneNumber,
            email,
            aboutDoctor,
            registrationNo,
            specialisation,
            experience,
            awards,
            hospital,
            image: req.file ? req.file.path : null,
        });

        res.status(201).json({
            message: "Doctor created successfully",
            data: newDoctor,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate("hospital", "name");
        res.status(200).json({
            message: "Doctors retrieved successfully",
            data: doctors,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate("hospital");
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({
            message: "Doctor retrieved successfully",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const searchDoctors = async (req, res) => {
    try {
        const { name, specialisation } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        if (specialisation) {
            query.specialisation = { $regex: specialisation, $options: "i" };
        }

        const doctors = await Doctor.find(query).populate("hospital");

        if (!doctors || doctors.length === 0) {
            return res.status(400).json({ status: 400, message: "no data found" });
        }

        res.status(200).json({
            message: "Doctors retrieved successfully",
            data: doctors,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getActiveDoctors = async (req, res) => {
    try {
        const activeDoctors = await Doctor.find({ isActive: true }).populate("hospital");

        if (!activeDoctors || activeDoctors.length === 0) {
            return res.status(400).json({ status: 400, message: "No active doctors found" });
        }

        res.status(200).json({
            message: "Active doctors retrieved successfully",
            data: activeDoctors,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    searchDoctors,
    getActiveDoctors,
};
