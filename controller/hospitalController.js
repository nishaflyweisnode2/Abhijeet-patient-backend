const Hospital = require("../models/hospitalModel");



const createHospital = async (req, res) => {
    try {
        const { name, address, contactNumber, description } = req.body;

        let hospitalImage;

        if (req.file) {
            hospitalImage = req.file ? req.file.path : "";
        }
        const newHospital = await Hospital.create({
            name,
            address,
            contactNumber,
            description,
            hospitalImage,
        });

        res.status(201).json({
            message: "Hospital created successfully",
            data: newHospital,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getHospitalById = async (req, res) => {
    try {
        const { id } = req.params;

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({ status: 404, message: "Hospital not found" });
        }

        res.status(200).json({
            message: "Hospital retrieved successfully",
            data: hospital,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({
            message: "Hospitals retrieved successfully",
            data: hospitals,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getRecentHospitals = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const hospitals = await Hospital.find()
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json({
            message: "Recent hospitals retrieved successfully",
            data: hospitals,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const searchHospitalsByName = async (req, res) => {
    try {
        const searchTerm = req.query.name;
        if (!searchTerm) {
            return res.status(400).json({ status: 400, message: "Name search term is required" });
        }

        const hospitals = await Hospital.find({
            name: { $regex: searchTerm, $options: "i" },
        });
        if (!hospitals || hospitals.length === 0) {
            return res.status(400).json({ status: 400, message: "no data found" });
        }

        res.status(200).json({
            message: "Hospitals retrieved successfully",
            data: hospitals,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



module.exports = {
    createHospital,
    getHospitalById,
    getAllHospitals,
    getRecentHospitals,
    searchHospitalsByName,
};
