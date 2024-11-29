const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.createMovie);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;