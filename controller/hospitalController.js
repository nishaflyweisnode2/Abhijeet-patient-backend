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
        return res.status(404).json({ message: "Hospital not found" });
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

module.exports = {
    createHospital,
    getHospitalById,
    getAllHospitals,
};
