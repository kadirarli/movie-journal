const Movie = require('../models/movie');
const { getMovieDetails } = require('../services/tmdbService');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error creating movie', error });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie', error });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};

// Movie search and genre fetch
exports.getMovieByTitle = async (req, res) => {
  try {
      const movieTitle = req.params.title;
      const movieDetails = await getMovieDetails(movieTitle);

      if (!movieDetails) {
        throw new Error('Movie not found');
      }

      const newMovie = new Movie(movieDetails);

      await newMovie.save();

      res.status(200).json(newMovie);
  } catch (error) {
      res.status(500).json({ message: 'Unable to fetch movie details' });
  }
};