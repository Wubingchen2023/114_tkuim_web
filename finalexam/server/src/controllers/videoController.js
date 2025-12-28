const VideoService = require('../services/VideoService');
const { formatSuccess } = require('../utils/responseFormatter');

// Get all videos
exports.getAllVideos = async (req, res, next) => {
    try {
        const result = await VideoService.getAllVideos(req.query);
        res.json(formatSuccess(result));
    } catch (error) {
        next(error);
    }
};

// Get video by ID
exports.getVideoById = async (req, res, next) => {
    try {
        const video = await VideoService.getVideoById(req.params.id);
        res.json(formatSuccess(video));
    } catch (error) {
        next(error);
    }
};

// Create new video
exports.createVideo = async (req, res, next) => {
    try {
        const video = await VideoService.createVideo(req.body, req.user.id);
        res.status(201).json(formatSuccess(video, 'Video created successfully'));
    } catch (error) {
        next(error);
    }
};

// Update video
exports.updateVideo = async (req, res, next) => {
    try {
        const video = await VideoService.updateVideo(
            req.params.id,
            req.body,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(video, 'Video updated successfully'));
    } catch (error) {
        next(error);
    }
};

// Delete video
exports.deleteVideo = async (req, res, next) => {
    try {
        await VideoService.deleteVideo(req.params.id, req.user.id, req.user.role);
        res.json(formatSuccess(null, 'Video deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// Increment view count
exports.incrementViewCount = async (req, res, next) => {
    try {
        const video = await VideoService.incrementViewCount(req.params.id);
        res.json(formatSuccess(video));
    } catch (error) {
        next(error);
    }
};

// Get videos by category
exports.getVideosByCategory = async (req, res, next) => {
    try {
        const videos = await VideoService.getVideosByCategory(req.params.category);
        res.json(formatSuccess(videos));
    } catch (error) {
        next(error);
    }
};
