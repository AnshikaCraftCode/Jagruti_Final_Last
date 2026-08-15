const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // ================= BLOG TITLE =================
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [3, "Blog title must be at least 3 characters"],
      maxlength: [200, "Blog title cannot exceed 200 characters"],
    },

    // ================= SHORT DESCRIPTION =================
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      minlength: [10, "Short description must be at least 10 characters"],
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },

    // ================= BLOG CONTENT =================
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
      minlength: [10, "Blog content must be at least 10 characters"],
      maxlength: [100000, "Blog content cannot exceed 100,000 characters"],
    },

    // ================= CATEGORY =================
    category: {
      type: String,
      required: [true, "Blog category is required"],
      enum: {
        values: [
          "Education",
          "Women Empowerment",
          "Health",
          "Environment",
          "Community",
          "Success Stories",
          "General",
        ],
        message: "Invalid blog category",
      },
      trim: true,
    },

    // ================= BLOG IMAGE =================
    image: {
      type: String,
      required: [true, "Blog image is required"],
      trim: true,
      maxlength: [500, "Image path is too long"],
    },

    // ================= BLOG VIEWS =================
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },

    // ================= BLOG STATUS =================
    status: {
      type: String,
      required: true,
      enum: {
        values: ["Published", "Draft"],
        message: "Invalid blog status",
      },
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

// ================= DATABASE INDEXES =================

// Latest published blogs
blogSchema.index({ status: 1, createdAt: -1 });

// Most viewed published blogs
blogSchema.index({ status: 1, views: -1 });

module.exports = mongoose.model("Blog", blogSchema);