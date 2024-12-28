const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

let token;

const mongoose = require('mongoose');

beforeAll(async () => {
    jest.setTimeout(20000);
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        favorites: []
    });
    token = `Bearer ${user.generateAuthToken()}`;
});

afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
});

describe('Favorites API', () => {
    it('should add a favorite', async () => {
        const res = await request(app)
            .post('/api/favorites/add')
            .set('Authorization', token)
            .send({ id: '123', title: 'Inception', type: 'movie' });

        expect(res.status).toBe(200);
        expect(res.body.favorites).toHaveLength(1);
    });

    it('should list favorites', async () => {
        const res = await request(app)
            .get('/api/favorites')
            .set('Authorization', token);

        expect(res.status).toBe(200);
        expect(res.body.favorites).toHaveLength(1);
    });

    it('should remove a favorite', async () => {
        const res = await request(app)
            .post('/api/favorites/remove')
            .set('Authorization', token)
            .send({ id: '123' });

        expect(res.status).toBe(200);
        expect(res.body.favorites).toHaveLength(0);
    });
});