const Playlist = require('../models/Playlist');

class PlaylistRepository {
    async findAll(filter = {}, options = {}) {
        return await Playlist.find(filter, null, options)
            .populate('videos', 'title thumbnail duration')
            .sort({ createdAt: -1 });
    }

    async findById(id) {
        return await Playlist.findById(id)
            .populate('videos', 'title thumbnail duration category rating');
    }

    async findByUserId(userId, options = {}) {
        return await Playlist.find({ userId }, null, options)
            .populate('videos', 'title thumbnail duration')
            .sort({ createdAt: -1 });
    }

    async create(data) {
        const playlist = await Playlist.create(data);
        return await playlist.populate('videos', 'title thumbnail duration');
    }

    async update(id, data) {
        return await Playlist.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .populate('videos', 'title thumbnail duration category rating');
    }

    async delete(id) {
        return await Playlist.findByIdAndDelete(id);
    }

    async addVideo(id, videoId) {
        return await Playlist.findByIdAndUpdate(
            id,
            { $addToSet: { videos: videoId } },
            { new: true }
        ).populate('videos', 'title thumbnail duration category rating');
    }

    async removeVideo(id, videoId) {
        return await Playlist.findByIdAndUpdate(
            id,
            { $pull: { videos: videoId } },
            { new: true }
        ).populate('videos', 'title thumbnail duration category rating');
    }

    async count(filter = {}) {
        return await Playlist.countDocuments(filter);
    }
}

module.exports = new PlaylistRepository();
