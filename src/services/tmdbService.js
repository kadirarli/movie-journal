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

        const movie = response.data.results[0]; // get first movie
        if (!movie) {
            throw new Error('Movie not found');
        }

        const genres = await getGenres();

        let movieGenres = '';
        if (movie.genre_ids && movie.genre_ids.length > 0) {
            movieGenres = movie.genre_ids.map(genreId => {
                const genre = genres.find(g => g.id === genreId);
                return genre ? genre.name : 'Unknown';
            }).join(', ');
        }

        return {
            title: movie.title,
            releasedYear: movie.release_date.split('-')[0],
            genres: movieGenres,
        };

    } catch (error) {
        throw new Error('Unable to fetch movie details');
    }
};

module.exports = { getMovieDetails };