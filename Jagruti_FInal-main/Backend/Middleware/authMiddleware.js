

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// ======================================================
// JWT SECRET
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

// ======================================================
// PROTECT
// ======================================================

const protect = async (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Access denied. No authentication token provided.",
      });
    }

    const token = authorization
      .slice(7)
      .trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access denied. No authentication token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      getJwtSecret()
    );

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid token. User no longer exists.",
      });
    }

    // Invalidate tokens issued before a password/security
    // change.
    if (
      decoded.tokenVersion !== user.tokenVersion
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is no longer valid. Please log in again.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired authentication token.",
    });
  }
};

// ======================================================
// AUTHORIZE
// ======================================================

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};