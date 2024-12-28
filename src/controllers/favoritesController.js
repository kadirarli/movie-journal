const User = require('../models/user');

// Favori Ekleme
exports.addFavorite = async (req, res) => {
    try {
        const { id, title, releaseDate, genres, overview, posterPath, voteAverage, voteCount} = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFavorite = user.favorites.some(fav => fav.id === id);
        if (isFavorite) {
            return res.status(400).json({ message: 'Item is already in favorites' });
        }

        user.favorites.push({ id, title, releaseDate, genres, overview, posterPath, voteAverage, voteCount });
        await user.save();

        res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add to favorites', error: error.message });
    }
};

// Favori Silme
exports.removeFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.favorites = user.favorites.filter(fav => fav.id !== id);
        await user.save();

        res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove from favorites', error: error.message });
    }
};

// Favori Listeleme
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve favorites', error: error.message });
    }
};