const FavoriteService = require('../services/FavoriteService');
const { formatSuccess } = require('../utils/responseFormatter');

// Get user favorites
exports.getUserFavorites = async (req, res, next) => {
    try {
        const favorites = await FavoriteService.getUserFavorites(req.user.id);
        res.json(formatSuccess(favorites));
    } catch (error) {
        next(error);
    }
};

// Add favorite
exports.addFavorite = async (req, res, next) => {
    try {
        const favorite = await FavoriteService.addFavorite(req.body.videoId, req.user.id);
        res.status(201).json(formatSuccess(favorite, 'Added to favorites'));
    } catch (error) {
        next(error);
    }
};

// Remove favorite
exports.removeFavorite = async (req, res, next) => {
    try {
        await FavoriteService.removeFavorite(req.params.videoId, req.user.id);
        res.json(formatSuccess(null, 'Removed from favorites'));
    } catch (error) {
        next(error);
    }
};

// Check if favorited
exports.checkFavorite = async (req, res, next) => {
    try {
        const isFavorited = await FavoriteService.isFavorited(req.params.videoId, req.user.id);
        res.json(formatSuccess({ isFavorited }));
    } catch (error) {
        next(error);
    }
};
