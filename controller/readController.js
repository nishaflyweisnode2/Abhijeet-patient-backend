const Read = require('../models/readModel');
const moment = require("moment");



const createRead = async (req, res) => {
    try {
        const { title, description } = req.body;

        let image;
        if (req.file) {
            image = req.file ? req.file.path : "";
        }
        const newRead = await Read.create({
            image,
            title,
            description
        });

        res.status(201).json({
            status: 201,
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
            status: 200,
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
            status: 200,
            message: "Read retrieved successfully",
            data: read,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};



const getLatestRead = async (req, res) => {
    try {
        const numReads = req.query.num || 20;
        const currentDate = new Date();
        const yesterdayDate = new Date();

        yesterdayDate.setDate(yesterdayDate.getDate() - 3);

        const latestReads = await Read.find({
            createdAt: {
                $gte: yesterdayDate,
                $lt: currentDate,
            },
        })
            .sort({ createdAt: -1 })
            .limit(parseInt(numReads));

        if (!latestReads || latestReads.length === 0) {
            return res.status(404).json({ message: "No reads found" });
        }

        res.status(200).json({
            status: 200,
            message: "Latest reads retrieved successfully",
            data: latestReads,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


const getDailyReads1 = async (req, res) => {
    try {
        const { date } = req.params;

        const reads = await Read.find({
            createdAt: {
                $gte: new Date(date),
                $lt: new Date(date).setDate(new Date(date).getDate() + 1),
            },
        }).sort({ createdAt: -1 });

        if (!reads || reads.length === 0) {
            return res.status(404).json({ message: "No reads found for the specified date" });
        }

        res.status(200).json({
            status: 200,
            message: "Daily reads retrieved successfully",
            data: reads,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getDailyReads = async (req, res) => {
    try {
        const { date } = req.params;

        const reads = await Read.find({
            createdAt: {
                $gte: new Date(date),
                $lt: new Date(date).setDate(new Date(date).getDate() + 1),
            },
        }).sort({ createdAt: -1 });

        if (!reads || reads.length === 0) {
            return res.status(404).json({ message: "No reads found for the specified date" });
        }

        const summary = calculateSummary(reads);

        res.status(200).json({
            status: 200,
            message: "Daily reads summary retrieved successfully",
            data: summary, reads
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Function to calculate summary based on reads
const calculateSummary = (reads) => {
    const summary = {
        totalReads: reads.length,
        uniqueDescriptions: Array.from(new Set(reads.map(read => read.description))),
    };

    return summary;
};



const getWeeklyReads = async (req, res) => {
    try {
        const currentDate = new Date();
        console.log("currentDate", currentDate);
        const weekStartDate = new Date(currentDate);
        console.log("weekStartDate", weekStartDate);
        weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());//Set to the start of the current week (Sunday)
        console.log("weekStartDate1", weekStartDate);
        const weekEndDate = new Date(weekStartDate);
        console.log("weekEndDate", weekEndDate);
        weekEndDate.setDate(weekStartDate.getDate() - 6); // Set to the end of the current week (Saturday)
        console.log("weekEndDate1", weekEndDate);


        const reads = await Read.find({
            createdAt: { $gte: weekEndDate, $lte: weekStartDate }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            status: 200,
            message: "Weekly reads retrieved successfully",
            data: reads,
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
    getLatestRead,
    getDailyReads,
    getWeeklyReads
};
