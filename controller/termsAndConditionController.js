const Terms = require("../models/termsAndConditionModel");

const createTerms = async (req, res) => {
    try {
        const { description } = req.body;

        const newTerms = await Terms.create({ description });
        res.status(201).json({
            message: "Terms and conditions created successfully",
            data: newTerms,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getAllTerms = async (req, res) => {
    try {
        const termsList = await Terms.find();
        res.status(200).json({
            message: "Terms and conditions retrieved successfully",
            data: termsList,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    createTerms,
    getAllTerms,
};
