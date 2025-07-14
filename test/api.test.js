const request = require('supertest');
const express = require('express');

describe('Note API Tests', () => {
  let app;

  beforeEach(() => {
    // Mock the app for testing
    app = express();
    app.use(express.json());
    
    // Simple test endpoint
    app.post('/notes', (req, res) => {
      res.status(201).json({
        id: 'test-id',
        title: req.body.title,
        created_at: new Date().toISOString()
      });
    });
  });

  test('POST /notes should create a note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({
        title: 'Test Note',
        content: 'Test content'
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Note');
  });
});