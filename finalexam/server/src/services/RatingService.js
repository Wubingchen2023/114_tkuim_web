const RatingRepository = require('../repositories/RatingRepository');
const VideoRepository = require('../repositories/VideoRepository');

class RatingService {
    async getAverageRating(videoId) {
        const avgRating = await RatingRepository.calculateAverage(videoId);
        const count = await RatingRepository.count({ videoId });
        return {
            averageRating: avgRating,
            count,
        };
    }

    async getUserRating(videoId, userId) {
        return await RatingRepository.findByUserAndVideo(userId, videoId);
    }

    async upsertRating(videoId, userId, score) {
        // Upsert rating
        const rating = await RatingRepository.upsert(userId, videoId, score);

        // Update video's average rating
        const avgRating = await RatingRepository.calculateAverage(videoId);
        await VideoRepository.updateRating(videoId, avgRating);

        return rating;
    }
}

module.exports = new RatingService();
