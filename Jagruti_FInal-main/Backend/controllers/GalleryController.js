const Gallery = require("../models/GalleryModel");

// ================= ADD IMAGE =================
const addImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const gallery = new Gallery({
      image: req.file.filename,
      category: req.body.category || "General",
      date: req.body.date || new Date().toISOString(),
      place: req.body.place || "Nashik",
    });

    await gallery.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: gallery,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET IMAGES =================
const getImages = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE IMAGE =================
const deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addImage,
  getImages,
  deleteImage,
};