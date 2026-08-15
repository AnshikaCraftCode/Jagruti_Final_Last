const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 20,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    interest: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Volunteer", volunteerSchema);