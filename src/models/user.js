const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            releaseDate: { type: Number },
            genres: { type: String },
            overview: { type: String },
            posterPath: { type: String },
            voteAverage: { type: Number },
            voteCount: { type: Number },
        }
    ]
}, { timestamps: true });

// hash middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); // hash by bcryptjs
    next();
});

// Password verification
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// JWT oluşturma
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = mongoose.model('User', userSchema);