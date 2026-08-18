const Contact = require("../models/ContactModel");

// ======================================================
// ADD CONTACT - PUBLIC
// ======================================================

const add = async (req, res, next) => {
  try {
    const {
      Name,
      Email,
      Phone,
      Subject,
      Message,
      City,
      type,
    } = req.body;

    const data = await Contact.create({
      Name,
      Email,
      Phone,
      Subject,
      Message,
      City,
      type: type || "Contact",
    });

    res.status(201).json({
      success: true,
      message: "Contact information added successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET ALL CONTACTS - ADMIN ONLY
// ======================================================

const getData = async (req, res, next) => {
  try {
    const data = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// DELETE CONTACT - ADMIN ONLY
// ======================================================

const deleteData = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const deleted = await Contact.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// SEARCH CONTACTS - ADMIN ONLY
// ======================================================

const searchContact = async (req, res, next) => {
  try {
    const { search } = req.query;

    // No search term → return all contacts
    if (!search || typeof search !== "string") {
      const data = await Contact.find()
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    }

    // Limit search length
    if (search.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Search query is too long",
      });
    }

    // Escape regex special characters
    const escapedSearch = search.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const data = await Contact.find({
      $or: [
        { Name: { $regex: escapedSearch, $options: "i" } },
        { Email: { $regex: escapedSearch, $options: "i" } },
        { Subject: { $regex: escapedSearch, $options: "i" } },
        { Message: { $regex: escapedSearch, $options: "i" } },
        { City: { $regex: escapedSearch, $options: "i" } },
        { type: { $regex: escapedSearch, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// MARK AS READ - ADMIN ONLY
// ======================================================

const markAsRead = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const updated = await Contact.findByIdAndUpdate(
      _id,
      { status: "Read" },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found",
      });
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

module.exports = {
  add,
  getData,
  deleteData,
  searchContact,
  markAsRead,
};