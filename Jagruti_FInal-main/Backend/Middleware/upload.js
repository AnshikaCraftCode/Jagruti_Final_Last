const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// ======================================================
// CONFIGURATION
// ======================================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_EXTENSIONS = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

// ======================================================
// GET UPLOAD FOLDER
// ======================================================

const getUploadFolder = (req) => {
  if (req.baseUrl.includes("program")) {
    return "programs";
  }

  if (req.baseUrl.includes("gallery")) {
    return "gallery";
  }

  return "blogs";
};

// ======================================================
// MULTER DISK STORAGE
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const folder = getUploadFolder(req);

      const uploadPath = path.join(
        __dirname,
        `../uploads/${folder}`
      );

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, {
          recursive: true,
        });
      }

      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      // Do NOT trust the original extension.
      // The actual extension will be determined after
      // validating the file contents.

      const uniqueName =
        `${Date.now()}-${crypto.randomUUID()}`;

      cb(null, uniqueName);
    } catch (error) {
      cb(error);
    }
  },
});

// ======================================================
// INITIAL FILE FILTER
// ======================================================
//
// We intentionally do NOT trust file.mimetype.
//
// Clients can send:
//
// application/octet-stream
//
// even when the file is actually an image.
//
// We only use the original extension as an initial
// allowlist. The actual binary contents are checked
// afterwards.
// ======================================================

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (!ALLOWED_EXTENSIONS[extension]) {
    const error = new Error(
      "Invalid file type. Only JPG, JPEG, PNG, WEBP, and GIF images are allowed."
    );

    error.statusCode = 400;

    return cb(error, false);
  }

  cb(null, true);
};

// ======================================================
// MULTER CONFIGURATION
// ======================================================

const multerUpload = multer({
  storage,
  fileFilter,

  limits: {
    // Maximum image size: 10 MB
    fileSize: MAX_FILE_SIZE,

    // Only one file allowed per request
    files: 1,
  },
});

// ======================================================
// DETECT ACTUAL IMAGE TYPE
// ======================================================
//
// This checks the actual binary signature ("magic bytes")
// of the uploaded file.
//
// We do NOT trust:
// - original filename
// - client MIME type
//
// ======================================================

const detectImageType = (filePath) => {
  const buffer = Buffer.alloc(32);

  const fd = fs.openSync(filePath, "r");

  try {
    const bytesRead = fs.readSync(
      fd,
      buffer,
      0,
      buffer.length,
      0
    );

    if (bytesRead < 12) {
      return null;
    }

    // ==================================================
    // JPEG
    // FF D8 FF
    // ==================================================

    if (
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    ) {
      return {
        extension: ".jpg",
        mime: "image/jpeg",
      };
    }

    // ==================================================
    // PNG
    // 89 50 4E 47 0D 0A 1A 0A
    // ==================================================

    if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      return {
        extension: ".png",
        mime: "image/png",
      };
    }

    // ==================================================
    // GIF
    // GIF87a / GIF89a
    // ==================================================

    const gifHeader = buffer.toString(
      "ascii",
      0,
      6
    );

    if (
      gifHeader === "GIF87a" ||
      gifHeader === "GIF89a"
    ) {
      return {
        extension: ".gif",
        mime: "image/gif",
      };
    }

    // ==================================================
    // WEBP
    // RIFF....WEBP
    // ==================================================

    const riffHeader = buffer.toString(
      "ascii",
      0,
      4
    );

    const webpHeader = buffer.toString(
      "ascii",
      8,
      12
    );

    if (
      riffHeader === "RIFF" &&
      webpHeader === "WEBP"
    ) {
      return {
        extension: ".webp",
        mime: "image/webp",
      };
    }

    return null;
  } finally {
    fs.closeSync(fd);
  }
};

// ======================================================
// DELETE FILE SAFELY
// ======================================================

const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    // File may already have been removed.
    if (error.code !== "ENOENT") {
      console.error(
        "Failed to delete uploaded file:",
        error.message
      );
    }
  }
};

// ======================================================
// VALIDATE UPLOADED IMAGE
// ======================================================

const validateUploadedImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;

  try {
    // Determine the actual image type from its contents.
    const detectedType = detectImageType(filePath);

    // ==================================================
    // INVALID FILE CONTENT
    // ==================================================

    if (!detectedType) {
      await deleteFile(filePath);

      const error = new Error(
        "Invalid image file. The uploaded file is not a valid JPG, JPEG, PNG, WEBP, or GIF image."
      );

      error.statusCode = 400;

      return next(error);
    }

    // ==================================================
    // USE VERIFIED IMAGE TYPE
    // ==================================================
    //
    // We intentionally use the detected extension
    // instead of trusting the client's filename.
    //
    // Example:
    //
    // test.png containing JPEG
    //
    // becomes:
    //
    // random-id.jpg
    //
    // ==================================================

    const finalFilename =
      `${req.file.filename}${detectedType.extension}`;

    const finalPath = path.join(
      path.dirname(filePath),
      finalFilename
    );

    await fs.promises.rename(
      filePath,
      finalPath
    );

    // Update Multer's file information with
    // verified server-side values.
    req.file.filename = finalFilename;
    req.file.path = finalPath;
    req.file.destination = path.dirname(finalPath);
    req.file.mimetype = detectedType.mime;

    next();
  } catch (error) {
    await deleteFile(filePath);

    error.statusCode = error.statusCode || 400;

    next(error);
  }
};

// ======================================================
// PUBLIC UPLOAD API
// ======================================================
//
// Existing routes continue to work:
//
// upload.single("image")
//
// ======================================================

const upload = {
  single: (fieldName) => {
    const multerMiddleware =
      multerUpload.single(fieldName);

    return (req, res, next) => {
      multerMiddleware(req, res, async (error) => {
        if (error) {
          return next(error);
        }

        await validateUploadedImage(
          req,
          res,
          next
        );
      });
    };
  },
};

module.exports = upload;