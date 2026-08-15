const express = require("express");
const route = express.Router();

const upload = require("../Middleware/upload");
const { protect } = require("../Middleware/authMiddleware");
const {
  validateProgram,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

const {
  createProgram,
  getAllPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/ProgramController");

// PUBLIC ROUTES
route.get("/", getAllPrograms);
route.get("/:id", validateMongoId("id"), getProgram);

// PROTECTED ADMIN ROUTES
route.post(
  "/create",
  protect,
  upload.single("image"),
  validateProgram,
  createProgram
);

route.put(
  "/:id",
  protect,
  validateMongoId("id"),
  upload.single("image"),
  validateProgram,
  updateProgram
);

route.delete(
  "/:id",
  protect,
  validateMongoId("id"),
  deleteProgram
);

module.exports = route;