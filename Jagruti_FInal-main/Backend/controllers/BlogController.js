// const Blog = require("../models/BlogModel");

// // ================= CREATE BLOG =================
// const createBlog = async (req, res, next) => {
//   try {
//     const { title, shortDescription, content, category, status } = req.body;

//     const image = req.file ? `/uploads/blogs/${req.file.filename}` : "";

//     const blog = new Blog({
//       title,
//       shortDescription,
//       content,
//       category: category || "General",
//       status: status || "Published",
//       image,
//     });

//     await blog.save();

//     res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       data: blog,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= GET ALL BLOGS =================
// const getAllBlogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: blogs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= GET LATEST BLOGS =================
// const getLatestBlogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find({ status: "Published" })
//       .sort({ createdAt: -1 })
//       .limit(6);

//     res.json({
//       success: true,
//       data: blogs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= GET TOP BLOGS =================
// const getTopBlogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find({ status: "Published" })
//       .sort({ views: -1 })
//       .limit(3);

//     res.json({
//       success: true,
//       data: blogs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= GET SINGLE BLOG =================
// const getSingleBlog = async (req, res, next) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: blog,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= UPDATE BLOG =================
// const updateBlog = async (req, res, next) => {
//   try {
//     const { title, shortDescription, content, category, status } = req.body;

//     const updateData = {
//       title,
//       shortDescription,
//       content,
//       category,
//       status,
//     };

//     if (req.file) {
//       updateData.image = `/uploads/blogs/${req.file.filename}`;
//     }

//     const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Blog updated successfully",
//       data: blog,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= DELETE BLOG =================
// const deleteBlog = async (req, res, next) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ================= INCREASE VIEW =================
// const increaseViews = async (req, res, next) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { views: 1 } },
//       { new: true }
//     );

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: blog,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createBlog,
//   getAllBlogs,
//   getLatestBlogs,
//   getTopBlogs,
//   getSingleBlog,
//   updateBlog,
//   deleteBlog,
//   increaseViews,
// };



const fs = require("fs").promises;
const path = require("path");
const Blog = require("../models/BlogModel");

// ======================================================
// HELPER — DELETE BLOG IMAGE SAFELY
// ======================================================

const deleteBlogImage = async (imagePath) => {
  if (!imagePath) {
    return;
  }

  // Only delete files that belong to our blog upload directory.
  // This prevents accidentally deleting arbitrary server files.
  const normalizedImagePath = imagePath.replace(/^[/\\]+/, "");

  if (!normalizedImagePath.startsWith("uploads/blogs/")) {
    return;
  }

  const backendRoot = path.resolve(__dirname, "..");

  const absolutePath = path.resolve(
    backendRoot,
    normalizedImagePath
  );

  const uploadsRoot = path.resolve(
    backendRoot,
    "uploads/blogs"
  );

  // Make sure the resolved file is actually inside uploads/blogs.
  if (
    absolutePath !== uploadsRoot &&
    !absolutePath.startsWith(`${uploadsRoot}${path.sep}`)
  ) {
    return;
  }

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    // File may already have been deleted.
    if (error.code !== "ENOENT") {
      console.error(
        "Failed to delete blog image:",
        error.message
      );
    }
  }
};

// ======================================================
// CREATE BLOG
// ======================================================

const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      shortDescription,
      content,
      category,
      status,
    } = req.body;

    // An image is mandatory for a blog.
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required",
      });
    }

    const image = `/uploads/blogs/${req.file.filename}`;

    const blog = new Blog({
      title,
      shortDescription,
      content,
      category: category || "General",
      status: status || "Published",
      image,
    });

    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    // If MongoDB validation/save fails after the image has
    // already been uploaded, remove the orphaned image.
    if (req.file) {
      await deleteBlogImage(
        `/uploads/blogs/${req.file.filename}`
      );
    }

    next(error);
  }
};

// ======================================================
// GET ALL PUBLISHED BLOGS
// ======================================================
//
// PUBLIC endpoint.
// Draft blogs must NEVER be returned here.
// ======================================================

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({
      status: "Published",
    })
      .sort({ createdAt: -1 })
      .select(
        "title shortDescription content category image views status createdAt updatedAt"
      );

    return res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET LATEST BLOGS
// ======================================================

const getLatestBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({
      status: "Published",
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .select(
        "title shortDescription content category image views status createdAt updatedAt"
      );

    return res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET TOP BLOGS
// ======================================================

const getTopBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({
      status: "Published",
    })
      .sort({ views: -1 })
      .limit(3)
      .select(
        "title shortDescription content category image views status createdAt updatedAt"
      );

    return res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET SINGLE PUBLISHED BLOG
// ======================================================
//
// PUBLIC endpoint.
// Drafts cannot be accessed through this endpoint.
// ======================================================

const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      status: "Published",
    }).select(
      "title shortDescription content category image views status createdAt updatedAt"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// UPDATE BLOG
// ======================================================
//
// ADMIN endpoint.
//
// Only fields supplied by the client are updated.
// ======================================================

const updateBlog = async (req, res, next) => {
  let uploadedImagePath = null;

  try {
    const {
      title,
      shortDescription,
      content,
      category,
      status,
    } = req.body;

    // Build update object only from supplied fields.
    const updateData = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (shortDescription !== undefined) {
      updateData.shortDescription = shortDescription;
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    // Handle new image.
    if (req.file) {
      uploadedImagePath =
        `/uploads/blogs/${req.file.filename}`;

      updateData.image = uploadedImagePath;
    }

    // Don't allow an empty update request.
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    // Get the existing blog first so we know its old image.
    const existingBlog = await Blog.findById(
      req.params.id
    );

    if (!existingBlog) {
      // The upload already happened before the controller.
      // Remove the newly uploaded image if the blog doesn't exist.
      if (uploadedImagePath) {
        await deleteBlogImage(uploadedImagePath);
      }

      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const oldImagePath = existingBlog.image;

    // Perform update.
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!blog) {
      if (uploadedImagePath) {
        await deleteBlogImage(uploadedImagePath);
      }

      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete old image ONLY after database update succeeds.
    if (
      uploadedImagePath &&
      oldImagePath &&
      oldImagePath !== uploadedImagePath
    ) {
      await deleteBlogImage(oldImagePath);
    }

    return res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    // If a new image was uploaded but the database update failed,
    // remove the new image so it doesn't become orphaned.
    if (uploadedImagePath) {
      await deleteBlogImage(uploadedImagePath);
    }

    next(error);
  }
};

// ======================================================
// DELETE BLOG
// ======================================================

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete MongoDB document first.
    await Blog.deleteOne({
      _id: blog._id,
    });

    // Then remove associated image.
    if (blog.image) {
      await deleteBlogImage(blog.image);
    }

    return res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// INCREASE BLOG VIEWS
// ======================================================
//
// PUBLIC endpoint.
//
// Only Published blogs can receive public views.
// ======================================================

const increaseViews = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "Published",
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    ).select(
      "title shortDescription content category image views status createdAt updatedAt"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createBlog,
  getAllBlogs,
  getLatestBlogs,
  getTopBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  increaseViews,
};