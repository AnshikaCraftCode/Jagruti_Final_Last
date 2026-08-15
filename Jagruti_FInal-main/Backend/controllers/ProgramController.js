const Program = require("../models/ProgramModel");

// ================= CREATE PROGRAM =================
const createProgram = async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const iconType = req.body.iconType?.trim();
    const points = req.body.points;

    // Validate required fields
    if (!title || !description || !iconType || !points) {
      return res.status(400).json({
        success: false,
        message: "Title, description, icon type, and points are required",
      });
    }

    let parsedPoints;
    try {
      parsedPoints = typeof points === "string" ? JSON.parse(points) : points;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Points must be a valid JSON array",
      });
    }

    const image = req.file ? `/uploads/programs/${req.file.filename}` : "";

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Program image is required",
      });
    }

    const program = new Program({
      title,
      description,
      points: parsedPoints,
      iconType,
      image,
    });

    await program.save();

    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET ALL PROGRAMS =================
const getAllPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET SINGLE PROGRAM =================
const getProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE PROGRAM =================
const updateProgram = async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const iconType = req.body.iconType?.trim();
    const points = req.body.points;

    let parsedPoints;
    if (points) {
      try {
        parsedPoints = typeof points === "string" ? JSON.parse(points) : points;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Points must be a valid JSON array",
        });
      }
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (iconType) updateData.iconType = iconType;
    if (parsedPoints) updateData.points = parsedPoints;

    if (req.file) {
      updateData.image = `/uploads/programs/${req.file.filename}`;
    }

    const program = await Program.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE PROGRAM =================
const deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
};