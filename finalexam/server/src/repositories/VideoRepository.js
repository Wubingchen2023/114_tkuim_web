const Video = require('../models/Video');

class VideoRepository {
    async findAll(filter = {}, options = {}) {
        return await Video.find(filter, null, options).populate('uploadedBy', 'username avatar');
    }

    async findById(id) {
        return await Video.findById(id).populate('uploadedBy', 'username avatar');
    }

    async findByCategory(category, options = {}) {
        return await Video.find({ category }, null, options).populate('uploadedBy', 'username avatar');
    }

    async create(data) {
        const video = await Video.create(data);
        return await video.populate('uploadedBy', 'username avatar');
    }

    async update(id, data) {
        return await Video.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .populate('uploadedBy', 'username avatar');
    }

    async delete(id) {
        return await Video.findByIdAndDelete(id);
    }

    async incrementViewCount(id) {
        return await Video.findByIdAndUpdate(
            id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
    }

    async updateRating(id, rating) {
        return await Video.findByIdAndUpdate(
            id,
            { rating },
            { new: true }
        );
    }

    async count(filter = {}) {
        return await Video.countDocuments(filter);
    }

    async search(query, options = {}) {
        const searchFilter = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { director: { $regex: query, $options: 'i' } },
            ]
        };
        return await Video.find(searchFilter, null, options).populate('uploadedBy', 'username avatar');
    }
}

module.exports = new VideoRepository();
