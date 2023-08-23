const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model("PrivacyPolicy", privacySchema);
