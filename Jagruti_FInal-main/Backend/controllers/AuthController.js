// const User = require("../models/UserModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const getJwtSecret = () => {
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     throw new Error(
//       "JWT_SECRET environment variable is not configured"
//     );
//   }

//   return secret;
// };

// // Auto seed default admin if none exists
// const seedAdmin = async () => {
//   try {
//     const count = await User.countDocuments();
//     if (count === 0) {
//       // Use env-configured credentials, fallback to safe defaults
//       const adminEmail = process.env.ADMIN_EMAIL || "jagruti@gmail.com";
//       const adminPassword = process.env.ADMIN_PASSWORD || "Jagruti@2026!";
//       const hashedPassword = await bcrypt.hash(adminPassword, 12);
//       await User.create({
//         name: "Administrator",
//         email: adminEmail,
//         password: hashedPassword,
//         role: "admin",
//       });
//       console.log(`✅ Default Admin Created: ${adminEmail}`);
//       console.log("⚠️  Please change the default password after first login.");
//     }
//   } catch (err) {
//     console.error("Seed admin error:", err.message);
//   }
// };

// // Login Controller
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both email and password.",
//       });
//     }

//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     // const token = jwt.sign(
//     //   { id: user._id, email: user.email, role: user.role },
//     //   getJwtSecret(),
//     //   { expiresIn: "24h" }
//     // );


//     const token = jwt.sign(
//   { id: user._id },
//   getJwtSecret(),
//   {
//     expiresIn: process.env.JWT_EXPIRES_IN || "2h",
//   }
// );

//     res.status(200).json({
//       success: true,
//       message: "Login successful!",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get current user profile (using req.user from protect middleware)
// const getMe = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(404).json({ success: false, message: "User profile not found." });
//     }
//     res.status(200).json({ success: true, user: req.user });
//   } catch (error) {
//     next(error);
//   }
// };

// // Change Password Controller
// const changePassword = async (req, res, next) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both current and new password.",
//       });
//     }

//     if (newPassword.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "New password must be at least 8 characters long.",
//       });
//     }

//     const user = await User.findById(req.user._id);
//     const isMatch = await user.comparePassword(currentPassword);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Current password is incorrect.",
//       });
//     }

//     user.password = await bcrypt.hash(newPassword, 12);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   seedAdmin,
//   login,
//   getMe,
//   changePassword,
// };


const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================================
// JWT CONFIGURATION
// ======================================================

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is not configured"
    );
  }

  return secret;
};

const getJwtExpiration = () => {
  return process.env.JWT_EXPIRES_IN || "2h";
};

// ======================================================
// SEED ADMIN
// ======================================================

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("✅ Admin account already exists.");
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be configured in environment variables."
      );
    }

    if (adminPassword.length < 12) {
      throw new Error(
        "ADMIN_PASSWORD must be at least 12 characters long."
      );
    }

    const normalizedEmail =
      adminEmail.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    await User.create({
      name: "Administrator",
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(
      `✅ Admin account created: ${normalizedEmail}`
    );
  } catch (error) {
    console.error(
      "❌ Admin seed error:",
      error.message
    );
  }
};

// ======================================================
// LOGIN
// ======================================================

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide both email and password.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // Password is select:false, so explicitly request it.
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // Same response for nonexistent user and wrong password.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(
      password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        tokenVersion: user.tokenVersion,
      },
      getJwtSecret(),
      {
        expiresIn: getJwtExpiration(),
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET CURRENT USER
// ======================================================

const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// CHANGE PASSWORD
// ======================================================

const changePassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide both current and new password.",
      });
    }

    if (newPassword.length < 12) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 12 characters long.",
      });
    }

    if (newPassword.length > 128) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot exceed 128 characters.",
      });
    }

    if (
      !/[a-z]/.test(newPassword) ||
      !/[A-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[^A-Za-z0-9]/.test(newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain uppercase, lowercase, number, and special character.",
      });
    }

    // Explicitly select password because it is select:false.
    const user = await User.findById(
      req.user._id
    ).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isCurrentPasswordCorrect =
      await user.comparePassword(currentPassword);

    if (!isCurrentPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Prevent reusing the current password.
    const isSamePassword =
      await user.comparePassword(newPassword);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from the current password.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      12
    );

    // Invalidate all previously issued JWTs.
    user.tokenVersion += 1;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully. Please log in again.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  seedAdmin,
  login,
  getMe,
  changePassword,
};