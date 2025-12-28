const Favorite = require('../models/Favorite');

class FavoriteRepository {
    async findAll(filter = {}, options = {}) {
        return await Favorite.find(filter, null, options)
            .populate('videoId', 'title thumbnail duration category rating')
            .sort({ createdAt: -1 });
    }

    async findById(id) {
        return await Favorite.findById(id).populate('videoId');
    }

    async findByUserId(userId, options = {}) {
        return await Favorite.find({ userId }, null, options)
            .populate('videoId', 'title thumbnail duration category rating viewCount')
            .sort({ createdAt: -1 });
    }

    async findByUserAndVideo(userId, videoId) {
        return await Favorite.findOne({ userId, videoId });
    }

    async create(data) {
        const favorite = await Favorite.create(data);
        return await favorite.populate('videoId', 'title thumbnail duration category rating');
    }

    async delete(id) {
        return await Favorite.findByIdAndDelete(id);
    }

    async deleteByUserAndVideo(userId, videoId) {
        return await Favorite.findOneAndDelete({ userId, videoId });
    }

    async deleteByVideoId(videoId) {
        return await Favorite.deleteMany({ videoId });
    }

    async count(filter = {}) {
        return await Favorite.countDocuments(filter);
    }

    async isFavorited(userId, videoId) {
        const favorite = await Favorite.findOne({ userId, videoId });
        return !!favorite;
    }
}

module.exports = new FavoriteRepository();
