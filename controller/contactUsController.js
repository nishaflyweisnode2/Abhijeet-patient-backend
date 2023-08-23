const Terms = require("../models/contactUsModel");


const createContact = async (req, res) => {
    try {
        const { phoneCall, email, whatsappChat } = req.body;

        const newTerms = await Terms.create({ phoneCall, email, whatsappChat });
        res.status(201).json({
            message: "Contact Us created successfully",
            data: newTerms,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getAllContact = async (req, res) => {
    try {
        const termsList = await Terms.find();
        res.status(200).json({
            message: "Contact Us data retrieved successfully",
            data: termsList,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    createContact,
    getAllContact,
};
