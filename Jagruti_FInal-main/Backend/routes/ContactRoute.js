const express = require("express");
const route = express.Router();

const { protect } = require("../Middleware/authMiddleware");
const {
  validateContact,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

const {
  add,
  getData,
  deleteData,
  searchContact,
  markAsRead,
} = require("../controllers/ContactController");

// PUBLIC API (Form Submission)
route.post("/addContact", validateContact, add);

// PROTECTED ADMIN APIs
route.get("/getContact", protect, getData);
route.delete("/deleteContact/:_id", protect, validateMongoId("_id"), deleteData);
route.get("/searchContact", protect, searchContact);
route.put("/markAsRead/:_id", protect, validateMongoId("_id"), markAsRead);

module.exports = route;