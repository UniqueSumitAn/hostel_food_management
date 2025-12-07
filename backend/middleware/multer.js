
const multer = require("multer");

// Store files in memory to send to Cloudinary directly
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
