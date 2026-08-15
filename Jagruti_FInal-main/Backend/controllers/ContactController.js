const contact = require("../models/ContactModel");

// POST API - Public Contact Form
const add = async (req, res, next) => {
  const { Name, Email, Phone, Subject, Message, City, type } = req.body;
  try {
    const data = new contact({
      Name,
      Email: Email.toLowerCase().trim(),
      Phone,
      Subject,
      Message,
      City,
      type: type || "Contact",
    });

    await data.save();
    return res.status(201).json({
      success: true,
      message: "Contact information added successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// GET API - Admin View Enquiries
const getData = async (req, res, next) => {
  try {
    const data = await contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE API - Admin Delete Enquiry
const deleteData = async (req, res, next) => {
  try {
    const data = await contact.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// Search API - Admin Search
const searchContact = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search || typeof search !== "string") {
      const data = await contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data });
    }

    // Escape regex special characters to prevent regex injection attacks
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const data = await contact.find({
      $or: [
        { Name: { $regex: escapedSearch, $options: "i" } },
        { Email: { $regex: escapedSearch, $options: "i" } },
        { Subject: { $regex: escapedSearch, $options: "i" } },
        { Message: { $regex: escapedSearch, $options: "i" } },
        { City: { $regex: escapedSearch, $options: "i" } },
        { type: { $regex: escapedSearch, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Mark As Read API - Admin Action
const markAsRead = async (req, res, next) => {
  try {
    const updated = await contact.findByIdAndUpdate(
      req.params._id,
      { status: "Read" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Contact inquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Status updated to Read",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { add, getData, deleteData, searchContact, markAsRead };