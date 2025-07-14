const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Routes
app.use('/notes', noteRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Markdown Note-taking API running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});