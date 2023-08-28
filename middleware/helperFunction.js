const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");




const findActiveTreatments = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const doctorsWithMatchingSpecialisations = await Doctor.find({
        specialisation: { $in: user.activeTreatments },
    });
    if (!doctorsWithMatchingSpecialisations || doctorsWithMatchingSpecialisations.length === 0) {
        return res.status(404).json({ status: 404, data: "doctor not found for this Specialisations" });
    }

    return doctorsWithMatchingSpecialisations;
};


const findDoctorsByActiveTreatments = async (activeTreatments) => {
    try {
        if (typeof activeTreatments === 'string') {
            activeTreatments = activeTreatments.split(',').map(item => item.trim());
        }

        const doctors = await Doctor.find({ specialisation: { $in: activeTreatments } }).exec();
        return doctors;
    } catch (error) {
        throw new Error(error.message);
    }
};




const updateUserActiveTreatments = async (userId, treatments) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { activeTreatments: treatments },
        { new: true }
    );
    return user;
};



const getAllSpecialisations = async () => {
    try {
        const specialisations = await Doctor.distinct("specialisation");
        return specialisations;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    findActiveTreatments,
    findDoctorsByActiveTreatments,
    updateUserActiveTreatments,
    getAllSpecialisations,

};
