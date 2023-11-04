const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  otp: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  age: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  gender: {
    type: String,
  },
  profileImage: [{ type: String }],
  userType: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  },
  contactInformation: {
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
  },
  familyDetails: {
    name: {
      type: String,
    },
    relation: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  emergencyDetails: {
    name: {
      type: String,
    },
    contactInformation: {
      type: String,
    },
  },
  activeTreatments: [{
    type: String,
  }],
  verified: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
