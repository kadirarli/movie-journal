const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genres: {
        type: String
    },
    releasedYear: {
        type: Number
    },
    wacthed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Movie', MovieSchema);