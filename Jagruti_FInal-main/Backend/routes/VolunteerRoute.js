const express = require("express");

const router = express.Router();

// Authentication & authorization
const {
  protect,
  authorize,
} = require("../Middleware/authMiddleware");

// Validation
const {
  validateVolunteer,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

// Controllers
const {
  addVolunteer,
  getVolunteer,
  deleteVolunteer,
} = require("../controllers/VolunteerController");

// ======================================================
// PUBLIC API
// Anyone can submit a volunteer application
// ======================================================

router.post(
  "/addVolunteer",
  validateVolunteer,
  addVolunteer
);

// ======================================================
// PROTECTED ADMIN APIs
// Only authenticated admins can access these
// ======================================================

router.get(
  "/getVolunteer",
  protect,
  authorize("admin"),
  getVolunteer
);

router.delete(
  "/deleteVolunteer/:id",
  protect,
  authorize("admin"),
  validateMongoId("id"),
  deleteVolunteer
);

module.exports = router;