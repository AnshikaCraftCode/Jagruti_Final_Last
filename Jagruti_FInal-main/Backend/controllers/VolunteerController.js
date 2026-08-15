const Volunteer = require("../models/VolunteerModel");

// Add Volunteer
const addVolunteer = async (req, res, next) => {
  try {
    const {
      fullName, Name, name,
      email, Email,
      phone, Phone,
      city, City,
      interest, Subject, AreaOfInterest,
      message, Message
    } = req.body;

    const volunteerData = {
      fullName: fullName || Name || name || "Volunteer",
      email: (email || Email || "").toLowerCase().trim(),
      phone: phone || Phone || "",
      city: city || City || "",
      interest: interest || Subject || AreaOfInterest || "General",
      message: message || Message || "Registered as Volunteer",
    };

    const volunteer = await Volunteer.create(volunteerData);

    res.status(201).json({
      success: true,
      message: "Volunteer Registered Successfully",
      volunteer,
      data: volunteer,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Volunteers (Admin Only)
const getVolunteer = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: volunteers.length,
      volunteers,
      data: volunteers,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Volunteer (Admin Only)
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