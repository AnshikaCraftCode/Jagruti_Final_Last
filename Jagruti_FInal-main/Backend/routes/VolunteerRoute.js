const express = require("express");
const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");
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
router.post("/addVolunteer", validateVolunteer, addVolunteer);

// PROTECTED ADMIN APIs
router.get("/getVolunteer", protect, getVolunteer);
router.delete("/deleteVolunteer/:id", protect, validateMongoId("id"), deleteVolunteer);

module.exports = router;