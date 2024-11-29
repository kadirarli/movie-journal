const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

describe('User API', () => {
    let jwtToken;
    let testUser;
    let shouldDeleteAfterTest = false;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterEach(async () => {
        if (shouldDeleteAfterTest) {
            await User.deleteOne(testUser);
        }
    });

    afterAll(async () => {
        // await Movie.deleteMany();
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        shouldDeleteAfterTest = true;
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        testUser = res.body.user;

        expect(res.status).toBe(201); // Başarı durumu
        expect(res.body).toHaveProperty('message', 'User registered successfully');
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('_id');
        expect(res.body.user.email).toBe('johndoe@example.com');
    });

    it('should login a user and return a JWT token', async () => {
        shouldDeleteAfterTest = true;
        let res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        testUser = res.body.user;

        res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('_id');
        jwtToken = res.body.token;
    });

    // Kullanıcı silme testi (JWT ile)
    it('should delete a user with a valid token', async () => {
        // İlk olarak kullanıcıyı kaydedip giriş yapalım
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        const loginRes = await request(app)
            .post('/api/users/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
            });
    
        const res = await request(app)
            .delete('/api/users')
            .set('Authorization', `Bearer ${loginRes.body.token}`); // Token burada header'a ekleniyor

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });

    // Kullanıcı silme testi (Geçersiz JWT ile)
    it('should return an error when trying to delete user with an invalid token', async () => {
        const res = await request(app)
            .delete('/api/users')
            .set('Authorization', 'Bearer invalid_token'); // Geçersiz token ile istek atıyoruz

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid token');
    });

    // Kullanıcı silme testi (Token olmadan)
    it('should return an error when trying to delete user without token', async () => {
        const res = await request(app)
            .delete('/api/users'); // Authorization header olmadan istek atıyoruz

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Access denied, no token provided');
    });
});