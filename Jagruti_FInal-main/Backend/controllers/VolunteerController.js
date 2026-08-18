const Volunteer = require("../models/VolunteerModel");

// Add Volunteer - Public
const addVolunteer = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      interest,
      message,
    } = req.body;

    // Required field validation
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and phone are required",
      });
    }

    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      city,
      interest,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Volunteer Registered Successfully",
      data: volunteer,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Volunteers - Admin Only
const getVolunteer = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Volunteer - Admin Only
const deleteVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Volunteer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Volunteer application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Volunteer Application Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addVolunteer,
  getVolunteer,
  deleteVolunteer,
};