const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

afterAll(async () => {
    // disconnect MongoDB
    await mongoose.connection.close();
  });

describe('GET /', () => {
    it('should return API status', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Movie Journal API is running!');
    });
});

