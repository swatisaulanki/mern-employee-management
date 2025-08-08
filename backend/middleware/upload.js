const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Path to uploads folder (adjust if needed)
const uploadDir = path.join(__dirname, "../uploads");

// Create uploads folder if doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // preserve extension
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
