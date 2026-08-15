const express = require("express");
const route = express.Router();

const upload = require("../Middleware/upload");
const { protect } = require("../Middleware/authMiddleware");
const {
  validateGallery,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

const {
  addImage,
  getImages,
  deleteImage,
} = require("../controllers/GalleryController");

// PUBLIC API
route.get("/get", getImages);

// PROTECTED ADMIN APIs
route.post("/add", protect, upload.single("image"), validateGallery, addImage);
route.delete("/delete/:id", protect, validateMongoId("id"), deleteImage);

module.exports = route;