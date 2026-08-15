require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { seedAdmin } = require("./controllers/AuthController");
const { errorHandler, notFoundHandler } = require("./Middleware/errorMiddleware");

const app = express();

// Ensure upload directories exist
const uploadDirs = ["uploads", "uploads/blogs", "uploads/programs", "uploads/gallery"];
uploadDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// ================= Security & Body Middleware =================

// 1. Helmet Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// 2. CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3001",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS origin policy blocked request from ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Body Parsers with limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 4. Custom NoSQL Query & Body Sanitizer (Express 5 Compatible)
const sanitizeObject = (obj) => {
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (/^\$/.test(key) || key.includes(".")) {
          delete obj[key];
        } else {
          sanitizeObject(obj[key]);
        }
      }
    }
  }
};

app.use((req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  if (req.query) sanitizeObject(req.query);
  next();
});

// 5. Rate Limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
  },
});

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many form submissions from this IP. Please try again later.",
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(apiLimiter);

// Serve uploaded images publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= MongoDB Connection =================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Jagruti_NGO";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    seedAdmin();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

// ================= Routes =================

// Auth Routes
const AuthRoute = require("./routes/AuthRoute");
app.use("/login", authLimiter);
app.use("/", AuthRoute);

// Contact Routes
const ContactRoute = require("./routes/ContactRoute");
app.use("/addContact", formLimiter);
app.use("/", ContactRoute);

// Volunteer Routes
const VolunteerRoute = require("./routes/VolunteerRoute");
app.use("/addVolunteer", formLimiter);
app.use("/", VolunteerRoute);

// Blog Routes
const BlogRoute = require("./routes/BlogRoute");
app.use("/blogs", BlogRoute);
app.use("/blog", BlogRoute);

// Program Routes
const ProgramRoute = require("./routes/ProgramRoute");
app.use("/programs", ProgramRoute);
app.use("/program", ProgramRoute);

// Gallery Routes
const GalleryRoute = require("./routes/GalleryRoute");
app.use("/gallery", GalleryRoute);
app.use("/api/gallery", GalleryRoute);

// ================= Health Route =================
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Jagruti NGO Backend Running Securely",
    environment: process.env.NODE_ENV || "development",
  });
});

// ================= Error Handlers =================
app.use(notFoundHandler);
app.use(errorHandler);

// ================= Server =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Secure server running on port ${PORT}`);
});