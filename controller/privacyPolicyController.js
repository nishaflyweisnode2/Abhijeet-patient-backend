const Privacy = require("../models/privacyPolicyModel");

const createPrivacyPolicy = async (req, res) => {
    try {
        const { description } = req.body;

        const newPrivacyPolicy = await Privacy.create({ description });
        res.status(201).json({
            message: "Privacy Policy created successfully",
            data: newPrivacyPolicy,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getAllPrivacyPolicy = async (req, res) => {
    try {
        const privacyList = await Privacy.find();
        res.status(200).json({
            message: "Privacy Policy data retrieved successfully",
            data: privacyList,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    createPrivacyPolicy,
    getAllPrivacyPolicy,
};
