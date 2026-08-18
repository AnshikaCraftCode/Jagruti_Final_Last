const express = require("express");

const route = express.Router();

// Authentication & authorization
const {
  protect,
  authorize,
} = require("../Middleware/authMiddleware");

// Validation
const {
  validateContact,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

// Controllers
const {
  add,
  getData,
  deleteData,
  searchContact,
  markAsRead,
} = require("../controllers/ContactController");

// ======================================================
// PUBLIC API
// Anyone can submit the contact form
// ======================================================

route.post(
  "/addContact",
  validateContact,
  add
);

// ======================================================
// PROTECTED ADMIN APIs
// Only authenticated admins can access these
// ======================================================

route.get(
  "/getContact",
  protect,
  authorize("admin"),
  getData
);

route.delete(
  "/deleteContact/:_id",
  protect,
  authorize("admin"),
  validateMongoId("_id"),
  deleteData
);

route.get(
  "/searchContact",
  protect,
  authorize("admin"),
  searchContact
);

route.put(
  "/markAsRead/:_id",
  protect,
  authorize("admin"),
  validateMongoId("_id"),
  markAsRead
);

module.exports = route;