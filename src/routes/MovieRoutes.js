const express = require('express');
const moviesController = require('../controllers/moviesController');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.createMovie);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

router.get('/tmdb/:title', usersController.authenticate, moviesController.getMovieByTitle);

module.exports = router;