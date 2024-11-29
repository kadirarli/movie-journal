const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Movie = require('../src/models/movie');

describe('Movie API', () => {
    let testMovie;
    let shouldDeleteAfterTest = false;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        // await Movie.deleteMany();
        if (shouldDeleteAfterTest) {
            await Movie.deleteOne(testMovie);
        }
        await mongoose.connection.close();
    });

    it('should create a new movie', async () => {
        const newMovie = {
            title: 'Inception',
            genres: 'Sci-fi',
            releasedYear: 2010,
            watched: true,
        };
        const res = await request(app).post('/api/movies').send(newMovie);
        testMovie = res.body;
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Inception');
    });

    it('should update a movie', async () => {
        const updatedData = { title: 'Updated Test Movie', releasedYear: 2024 };
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
    
    it('should handle a movie', async () => {
        shouldDeleteAfterTest = true;
        const movieTitle = 'Inception';
        const res = await request(app).get(`/api/movies/tmdb/${movieTitle}`);

        testMovie = res.body;

        expect(res.statusCode).toBe(200); 
        expect(res.body.title).toBe('Inception');
    });
    
    it('should handle movie not found', async () => {
        const movieTitle = 'NonExistentMovie';
        const res = await request(app).get(`/api/movies/tmdb/${movieTitle}`);
    
        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe('Unable to fetch movie details');
    });
});