const axios = require('axios');

// Get genre list from TMDb API
const getGenres = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: process.env.TMDB_API_KEY,
            }
        });
        return response.data.genres; // [{id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}, ...]
    } catch (error) {
        console.error('Error fetching genres from TMDb:', error);
        throw new Error('Unable to fetch genres');
    }
};

const getMovieDetails = async (movieTitle) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: movieTitle,
            }
        });

        const movies = response.data.results; // get all movies
        if (!movies || movies.length === 0) {
            throw new Error('Movie not found');
        }

        const genres = await getGenres();

        console.log(movies);

        const processedMovies = movies.map((movie) => {
            let movieGenres = '';
            if (movie.genre_ids && movie.genre_ids.length > 0) {
                movieGenres = movie.genre_ids
                    .map((genreId) => {
                        const genre = genres.find((g) => g.id === genreId);
                        return genre ? genre.name : 'Unknown';
                    })
                    .join(', ');
            }

            return {
                id: movie.id,
                title: movie.title,
                releaseDate: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
                genres: movieGenres,
                overview: movie.overview,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                posterPath: movie.poster_path, //https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count
            };
        });

        return processedMovies;

    } catch (error) {
        throw new Error('Unable to fetch movie details');
    }
};

module.exports = { getMovieDetails };