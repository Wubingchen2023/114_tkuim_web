const Rating = require('../models/Rating');

class RatingRepository {
    async findAll(filter = {}, options = {}) {
        return await Rating.find(filter, null, options);
    }

    async findById(id) {
        return await Rating.findById(id);
    }

    async findByVideoId(videoId) {
        return await Rating.find({ videoId });
    }

    async findByUserAndVideo(userId, videoId) {
        return await Rating.findOne({ userId, videoId });
    }

    async create(data) {
        return await Rating.create(data);
    }

    async upsert(userId, videoId, score) {
        return await Rating.findOneAndUpdate(
            { userId, videoId },
            { score },
            { upsert: true, new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Rating.findByIdAndDelete(id);
    }

    async deleteByVideoId(videoId) {
        return await Rating.deleteMany({ videoId });
    }

    async calculateAverage(videoId) {
        const result = await Rating.aggregate([
            { $match: { videoId: videoId } },
            { $group: { _id: null, avgRating: { $avg: '$score' } } }
        ]);
        return result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
    }

    async count(filter = {}) {
        return await Rating.countDocuments(filter);
    }
}

module.exports = new RatingRepository();
