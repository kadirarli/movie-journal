const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    year: {
        type: Number,
        required: true
    },
    wacthed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Movie', MovieSchema);