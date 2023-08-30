const FAQ = require("../models/faqsModel");



const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFAQ = await FAQ.create({ question, answer });
        res.status(201).json({
            stats: 201,
            message: "FAQ created successfully",
            data: newFAQ,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json({
            stats: 200,
            message: "FAQs retrieved successfully",
            data: faqs,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findById(id);

        if (!faq) {
            return res.status(404).json({ message: "FAQ not found" });
        }

        res.status(200).json({ stats: 200, message: "FAQ retrieved successfully", data: faq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    createFAQ,
    getAllFAQs,
    getFaqById
};
