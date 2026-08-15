const { body, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");

/**
 * Helper middleware to check validation results
 */
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: formattedErrors[0]?.message || "Validation failed",
      errors: formattedErrors,
    });
  }
  next();
};

/**
 * Validation rule for MongoDB ObjectId params
 */
const validateMongoId = (paramName = "id") => [
  param(paramName)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(`Invalid ID format`),
  validateResult,
];

/**
 * Validation rules for Login
 */
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validateResult,
];

/**
 * Validation rules for Contact Form Submission
 */
const validateContact = [
  body("Name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .escape(),
  body("Email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("Phone")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .withMessage("Must be a valid phone number"),
  body("Subject")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 200 })
    .withMessage("Subject cannot exceed 200 characters")
    .escape(),
  body("Message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5, max: 2000 })
    .withMessage("Message must be between 5 and 2000 characters")
    .escape(),
  body("City")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("City name cannot exceed 100 characters")
    .escape(),
  validateResult,
];

/**
 * Validation rules for Volunteer Registration
 */
const validateVolunteer = [
  body(["fullName", "Name", "name"])
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .escape(),
  body(["email", "Email"])
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body(["phone", "Phone"])
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .withMessage("Must be a valid phone number"),
  body(["city", "City"])
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters")
    .escape(),
  body(["message", "Message"])
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters")
    .escape(),
  validateResult,
];

/**
 * Validation rules for Creating/Updating Blogs
 */
// const validateBlog = [
//   body("title")
//     .trim()
//     .notEmpty()
//     .withMessage("Blog title is required")
//     .isLength({ min: 3, max: 200 })
//     .withMessage("Title must be between 3 and 200 characters"),
//   body("shortDescription")
//     .trim()
//     .notEmpty()
//     .withMessage("Short description is required")
//     .isLength({ min: 10, max: 500 })
//     .withMessage("Short description must be between 10 and 500 characters"),
//   body("content").notEmpty().withMessage("Blog content is required"),
//   body("category")
//     .optional({ checkFalsy: true })
//     .trim()
//     .isIn([
//       "Education",
//       "Women Empowerment",
//       "Health",
//       "Environment",
//       "Community",
//       "Success Stories",
//     ])
//     .withMessage("Invalid category"),
//   body("status")
//     .optional({ checkFalsy: true })
//     .trim()
//     .isIn(["Published", "Draft"])
//     .withMessage("Status must be Published or Draft"),
//   validateResult,
// ];



/**
 * Validation rules for Creating Blogs
 */
const validateBlogCreate = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Blog title is required")
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Short description must be between 10 and 500 characters"
    ),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Blog content is required")
    .bail()
    .isLength({ min: 10, max: 50000 })
    .withMessage(
      "Blog content must be between 10 and 50,000 characters"
    ),

  body("category")
    .optional({ checkFalsy: true })
    .trim()
    .isIn([
      "Education",
      "Women Empowerment",
      "Health",
      "Environment",
      "Community",
      "Success Stories",
      "General",
    ])
    .withMessage("Invalid category"),

  body("status")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(["Published", "Draft"])
    .withMessage(
      "Status must be Published or Draft"
    ),

  validateResult,
];


/**
 * Validation rules for Updating Blogs
 *
 * All fields are optional because the controller
 * supports partial updates.
 */
const validateBlogUpdate = [
  body("title")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must be between 3 and 200 characters"
    ),

  body("shortDescription")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Short description must be between 10 and 500 characters"
    ),

  body("content")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 50000 })
    .withMessage(
      "Blog content must be between 10 and 50,000 characters"
    ),

  body("category")
    .optional({ checkFalsy: true })
    .trim()
    .isIn([
      "Education",
      "Women Empowerment",
      "Health",
      "Environment",
      "Community",
      "Success Stories",
      "General",
    ])
    .withMessage("Invalid category"),

  body("status")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(["Published", "Draft"])
    .withMessage(
      "Status must be Published or Draft"
    ),

  validateResult,
];
/**
 * Validation rules for Programs
 */
const validateProgram = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Program title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  body("iconType").trim().notEmpty().withMessage("Icon type is required"),
  body("points")
    .notEmpty()
    .withMessage("Points are required")
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(parsed)) {
          throw new Error("Points must be an array");
        }
      } catch (err) {
        throw new Error("Points must be a valid JSON array");
      }
      return true;
    }),
  validateResult,
];

/**
 * Validation rules for Gallery Uploads
 */
const validateGallery = [
  body("category")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Category name too long"),
  body("place")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Place name too long"),
  validateResult,
];

// module.exports = {
//   validateResult,
//   validateMongoId,
//   validateLogin,
//   validateContact,
//   validateVolunteer,
//   validateBlog,
//   validateProgram,
//   validateGallery,
// };


module.exports = {
  validateResult,
  validateMongoId,
  validateLogin,
  validateContact,
  validateVolunteer,
  validateBlogCreate,
  validateBlogUpdate,
  validateProgram,
  validateGallery,
};