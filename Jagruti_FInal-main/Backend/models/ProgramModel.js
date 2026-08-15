const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    points: [
      {
        type: String,
      },
    ],

    iconType: {
      type: String,
      required: true,
      enum: [
        "education",
        "women",
        "health",
        "environment",
        "animal",
        "food",
        "disaster",
        "skill",
        "elderly"
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", ProgramSchema);