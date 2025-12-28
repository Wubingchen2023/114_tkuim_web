const CommentRepository = require('../repositories/CommentRepository');

class CommentService {
    async getCommentsByVideoId(videoId, options = {}) {
        return await CommentRepository.findByVideoId(videoId, options);
    }

    async createComment(commentData, userId) {
        const data = {
            ...commentData,
            userId,
        };
        return await CommentRepository.create(data);
    }

    async updateComment(id, content, userId, userRole) {
        const comment = await CommentRepository.findById(id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        // Check permission
        if (comment.userId._id.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to update this comment');
        }

        return await CommentRepository.update(id, { content });
    }

    async deleteComment(id, userId, userRole) {
        const comment = await CommentRepository.findById(id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        // Check permission
        if (comment.userId._id.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to delete this comment');
        }

        return await CommentRepository.delete(id);
    }
}

module.exports = new CommentService();
