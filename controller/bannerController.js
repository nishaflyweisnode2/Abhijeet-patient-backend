const banner = require('../models/bannerModel');




const AddBanner = async (req, res) => {
    try {
        let image;
        if (req.file) {
            image = req.file.path
        }

        const data = { image: image, desc: req.body.desc, }
        const Data = await banner.create(data);
        return res.status(200).json({ status: 200, message: "Banner is Addded ", data: Data })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
const updateBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const updatedData = {};

        if (req.file) {
            updatedData.image = req.file.path;
        }

        if (req.body.desc) {
            updatedData.desc = req.body.desc;
        }

        const updatedBanner = await banner.findByIdAndUpdate(bannerId, { $set: updatedData }, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ message: "Banner Not Found", status: 404, data: {} });
        }

        return res.status(200).json({ status: 200, message: "Banner updated", data: updatedBanner });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: "Server error.", data: {} });
    }
};
const getBanner = async (req, res) => {
    try {
        const Banner = await banner.find();
        if (Banner.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "All banner Data found successfully.", data: Banner })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
const getBannerById = async (req, res) => {
    try {
        const Banner = await banner.findById({ _id: req.params.id });
        if (!Banner) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Banner })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
const DeleteBanner = async (req, res) => {
    try {
        const Banner = await banner.findById({ _id: req.params.id });
        if (!Banner) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await banner.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Banner delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};


module.exports = {
    AddBanner,
    updateBanner,
    getBanner,
    getBannerById,
    DeleteBanner
}