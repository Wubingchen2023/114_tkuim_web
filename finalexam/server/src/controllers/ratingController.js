const RatingService = require('../services/RatingService');
const { formatSuccess } = require('../utils/responseFormatter');

// Get average rating for video
exports.getAverageRating = async (req, res, next) => {
    try {
        const rating = await RatingService.getAverageRating(req.params.videoId);
        res.json(formatSuccess(rating));
    } catch (error) {
        next(error);
    }
};

// Get user's rating for video
exports.getUserRating = async (req, res, next) => {
    try {
        const rating = await RatingService.getUserRating(req.params.videoId, req.user.id);
        res.json(formatSuccess(rating));
    } catch (error) {
        next(error);
    }
};

// Create or update rating
exports.upsertRating = async (req, res, next) => {
    try {
        const rating = await RatingService.upsertRating(
            req.body.videoId,
            req.user.id,
            req.body.score
        );
        res.json(formatSuccess(rating, 'Rating saved successfully'));
    } catch (error) {
        next(error);
    }
};
