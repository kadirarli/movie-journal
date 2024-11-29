const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Movie API', () => {
    let testMovie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
        // testMovie = await Movie.create({ title: 'Test Movie', genre:'Test Genre', year: 2023 });
    });

    afterAll(async () => {
        // Clean up database and close connection
        // await Movie.deleteMany();
        await mongoose.connection.close();
    });

    it('should create a new movie', async () => {
        const newMovie = {
            title: 'Inception',
            genre: 'Sci-fi',
            year: 2010,
            watched: true,
        };
        const res = await request(app).post('/api/movies').send(newMovie);
        testMovie = res.body;
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Inception');
    });

    it('should update a movie', async () => {
        const updatedData = { title: 'Updated Test Movie', year: 2024 };
        const res = await request(app)
        .put(`/api/movies/${testMovie._id}`)
        .send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Test Movie');
    });

    it('should delete a movie', async () => {
        const res = await request(app).delete(`/api/movies/${testMovie._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Movie deleted successfully');
    });
});