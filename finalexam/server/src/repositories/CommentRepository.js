const Comment = require('../models/Comment');

class CommentRepository {
    async findAll(filter = {}, options = {}) {
        return await Comment.find(filter, null, options)
            .populate('userId', 'username avatar')
            .sort({ createdAt: -1 });
    }

    async findById(id) {
        return await Comment.findById(id).populate('userId', 'username avatar');
    }

    async findByVideoId(videoId, options = {}) {
        return await Comment.find({ videoId }, null, options)
            .populate('userId', 'username avatar')
            .sort({ createdAt: -1 });
    }

    async create(data) {
        const comment = await Comment.create(data);
        return await comment.populate('userId', 'username avatar');
    }

    async update(id, data) {
        return await Comment.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .populate('userId', 'username avatar');
    }

    async delete(id) {
        return await Comment.findByIdAndDelete(id);
    }

    async deleteByVideoId(videoId) {
        return await Comment.deleteMany({ videoId });
    }

    async count(filter = {}) {
        return await Comment.countDocuments(filter);
    }
}

module.exports = new CommentRepository();
