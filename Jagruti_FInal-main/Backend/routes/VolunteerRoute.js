const express = require("express");
const router = express.Router();

const {
  protect,
  authorize,
} = require("../Middleware/authMiddleware");
const {
  validateVolunteer,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

const {
  addVolunteer,
  getVolunteer,
  deleteVolunteer,
} = require("../controllers/VolunteerController");

// PUBLIC API (Registration Form)
router.post(
  "/addVolunteer",
  volunteerLimiter,
  validateVolunteer,
  addVolunteer
);

// PROTECTED ADMIN APIs
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