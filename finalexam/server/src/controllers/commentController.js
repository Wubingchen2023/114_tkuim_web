const CommentService = require('../services/CommentService');
const { formatSuccess } = require('../utils/responseFormatter');

// Get comments by video ID
exports.getCommentsByVideoId = async (req, res, next) => {
    try {
        const comments = await CommentService.getCommentsByVideoId(req.params.videoId);
        res.json(formatSuccess(comments));
    } catch (error) {
        next(error);
    }
};

// Create comment
exports.createComment = async (req, res, next) => {
    try {
        const comment = await CommentService.createComment(req.body, req.user.id);
        res.status(201).json(formatSuccess(comment, 'Comment created successfully'));
    } catch (error) {
        next(error);
    }
};

// Update comment
exports.updateComment = async (req, res, next) => {
    try {
        const comment = await CommentService.updateComment(
            req.params.id,
            req.body.content,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(comment, 'Comment updated successfully'));
    } catch (error) {
        next(error);
    }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
    try {
        await CommentService.deleteComment(req.params.id, req.user.id, req.user.role);
        res.json(formatSuccess(null, 'Comment deleted successfully'));
    } catch (error) {
        next(error);
    }
};
