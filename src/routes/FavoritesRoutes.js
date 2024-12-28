const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/usersController');
const {
    addFavorite,
    removeFavorite,
    getFavorites
} = require('../controllers/favoritesController');

// Favori ekleme
router.post('/', authenticate, addFavorite);

// Favori silme
router.delete('/:id', authenticate, removeFavorite);

// Favori listeleme
router.get('/', authenticate, getFavorites);

module.exports = router;