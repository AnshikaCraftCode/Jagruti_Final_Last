const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    Email: {
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

    Phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },

    Subject: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    Message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },

    City: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    type: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "Contact",
    },

    status: {
      type: String,
      enum: ["New", "Read"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);