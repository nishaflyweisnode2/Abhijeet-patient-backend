const Read = require('../models/readModel');



const createRead = async (req, res) => {
    try {
        const { title, description } = req.body;

        let image;
        console.log("image", image);
        if (req.file) {
            image = req.file ? req.file.path : "";
        }
        console.log("req.file", req.file);
        const newRead = await Read.create({
            image,
            title,
            description
        });
        console.log("newRead", newRead);

        res.status(201).json({
            message: 'Read created successfully',
            data: newRead,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getAllReads = async (req, res) => {
    try {
        const reads = await Read.find();
        res.status(200).json({
            message: 'Reads retrieved successfully',
            data: reads,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getReadById = async (req, res) => {
  try {
    const readId = req.params.id;

    const read = await Read.findById(readId);
    if (!read) {
      return res.status(404).json({ message: "Read not found" });
    }

    res.status(200).json({
      message: "Read retrieved successfully",
      data: read,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



module.exports = {
    createRead,
    getAllReads,
    getReadById,
};
