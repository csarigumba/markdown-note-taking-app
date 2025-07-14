const multer = require('multer');
const path = require('path');
const config = require('../config/config');

// Configure storage
const storage = multer.memoryStorage();

// File filter for markdown and text files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.md', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .md and .txt files are allowed'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
});

module.exports = upload;