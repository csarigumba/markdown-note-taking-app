const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Title is required and must be a non-empty string'
    });
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({
      error: 'Content is required and must be a non-empty string'
    });
  }

  // Sanitize input
  req.body.title = title.trim();
  req.body.content = content.trim();

  next();
};

module.exports = {
  validateNote
};