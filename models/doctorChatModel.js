const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DoctorChat", messageSchema);
