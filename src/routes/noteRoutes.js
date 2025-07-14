const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { validateNote } = require('../middleware/validation');
const upload = require('../middleware/upload');

// Create a new note (JSON or file upload)
router.post('/', (req, res, next) => {
  // Use multer for multipart/form-data, otherwise continue
  const contentType = req.get('content-type');
  if (contentType && contentType.includes('multipart/form-data')) {
    upload.single('file')(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  } else {
    validateNote(req, res, next);
  }
}, noteController.createNote);

// Get all notes
router.get('/', noteController.getAllNotes);

// Get a specific note
router.get('/:id', noteController.getNote);

// Render note as HTML
router.get('/:id/render', noteController.renderNote);

// Check grammar
router.post('/:id/grammar-check', noteController.checkGrammar);

module.exports = router;