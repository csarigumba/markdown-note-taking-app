require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  storagePath: process.env.STORAGE_PATH || './storage/notes',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB default
  nodeEnv: process.env.NODE_ENV || 'development'
};