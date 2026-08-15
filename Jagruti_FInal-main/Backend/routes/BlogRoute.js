const express = require("express");
const route = express.Router();

const upload = require("../Middleware/upload");
const {
  protect,
  authorize,
} = require("../Middleware/authMiddleware");
// const {
//   validateBlog,
//   validateMongoId,
// } = require("../Middleware/validatorMiddleware");

const {
  validateBlogCreate,
  validateBlogUpdate,
  validateMongoId,
} = require("../Middleware/validatorMiddleware");

const {
  createBlog,
  getAllBlogs,
  getLatestBlogs,
  getTopBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  increaseViews,
} = require("../controllers/BlogController");

// ================= PUBLIC ROUTES =================
route.get("/", getAllBlogs);
route.get("/latest", getLatestBlogs);
route.get("/top", getTopBlogs);
route.get("/:id", validateMongoId("id"), getSingleBlog);
route.put("/view/:id", validateMongoId("id"), increaseViews);

// ================= PROTECTED ADMIN ROUTES =================
// route.post(
//   "/create",
//   protect,
//   upload.single("image"),
//   validateBlog,
//   createBlog
// );

route.post(
  "/create",
  protect,
  authorize("admin"),
  upload.single("image"),
  validateBlogCreate,
  createBlog
);
// route.put(
//   "/:id",
//   protect,
//   validateMongoId("id"),
//   upload.single("image"),
//   validateBlog,
//   updateBlog
// );

route.put(
  "/:id",
  protect,
  authorize("admin"),
  validateMongoId("id"),
  upload.single("image"),
  validateBlogUpdate,
  updateBlog
);

route.delete(
  "/:id",
  protect,
  authorize("admin"),
  validateMongoId("id"),
  deleteBlog
);

module.exports = route;