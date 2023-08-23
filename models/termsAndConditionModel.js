const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model("Terms", termsSchema);
