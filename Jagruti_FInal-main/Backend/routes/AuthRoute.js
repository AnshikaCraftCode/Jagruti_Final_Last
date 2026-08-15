// const express = require("express");
// const router = express.Router();
// const { login, getMe, changePassword } = require("../controllers/AuthController");
// const { protect } = require("../Middleware/authMiddleware");
// const { validateLogin } = require("../Middleware/validatorMiddleware");
// const { body } = require("express-validator");
// const { validateResult } = require("../Middleware/validatorMiddleware");

// const validateChangePassword = [
//   body("currentPassword").notEmpty().withMessage("Current password is required"),
//   body("newPassword")
//     .notEmpty().withMessage("New password is required")
//     .isLength({ min: 8 }).withMessage("New password must be at least 8 characters")
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//     .withMessage("New password must contain at least one uppercase letter, one lowercase letter, and one number"),
//   validateResult,
// ];

// router.post("/login", validateLogin, login);
// router.get("/me", protect, getMe);
// router.put("/change-password", protect, validateChangePassword, changePassword);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  login,
  getMe,
  changePassword,
} = require("../controllers/AuthController");

const {
  protect,
} = require("../Middleware/authMiddleware");

const {
  validateLogin,
  validateResult,
} = require("../Middleware/validatorMiddleware");

const { body } = require("express-validator");

// ======================================================
// CHANGE PASSWORD VALIDATION
// ======================================================

const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage(
      "Current password is required"
    )
    .bail(),

  body("newPassword")
    .notEmpty()
    .withMessage(
      "New password is required"
    )
    .bail()
    .isLength({ min: 12, max: 128 })
    .withMessage(
      "New password must be between 12 and 128 characters"
    )
    .bail()
    .matches(/[a-z]/)
    .withMessage(
      "New password must contain a lowercase letter"
    )
    .bail()
    .matches(/[A-Z]/)
    .withMessage(
      "New password must contain an uppercase letter"
    )
    .bail()
    .matches(/[0-9]/)
    .withMessage(
      "New password must contain a number"
    )
    .bail()
    .matches(/[^A-Za-z0-9]/)
    .withMessage(
      "New password must contain a special character"
    ),

  validateResult,
];

// ======================================================
// ROUTES
// ======================================================

router.post(
  "/login",
  validateLogin,
  login
);

router.get(
  "/me",
  protect,
  getMe
);

router.put(
  "/change-password",
  protect,
  validateChangePassword,
  changePassword
);

module.exports = router;