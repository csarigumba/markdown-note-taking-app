const storageService = require('../services/storageService');
const markdownService = require('../services/markdownService');
const grammarService = require('../services/grammarService');

const createNote = async (req, res, next) => {
  try {
    let title, content;

    // Handle file upload
    if (req.file) {
      // Extract title from filename (without extension)
      title = req.body.title || req.file.originalname.replace(/\.(md|txt)$/i, '');
      content = req.file.buffer.toString('utf8');
    } else {
      // Handle JSON payload
      title = req.body.title;
      content = req.body.content;
    }

    const note = await storageService.save({ title, content });
    
    res.status(201).json({
      id: note.id,
      title: note.title,
      created_at: note.createdAt
    });
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await storageService.findById(id);

    if (!note) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    res.json(note.toJSON());
  } catch (error) {
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await storageService.findAll();
    res.json(notes.map(note => note.toJSON()));
  } catch (error) {
    next(error);
  }
};

const renderNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await storageService.findById(id);

    if (!note) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    const html = markdownService.renderToHtml(note.content);

    res.json({
      id: note.id,
      html: html
    });
  } catch (error) {
    next(error);
  }
};

const checkGrammar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await storageService.findById(id);

    if (!note) {
      return res.status(404).json({
        error: 'Note not found'
      });
    }

    const suggestions = grammarService.checkGrammar(note.content);

    res.json({
      id: note.id,
      suggestions: suggestions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNote,
  getAllNotes,
  renderNote,
  checkGrammar
};