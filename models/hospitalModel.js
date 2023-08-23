const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    hospitalImage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
