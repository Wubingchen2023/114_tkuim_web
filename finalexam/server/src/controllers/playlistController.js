const PlaylistService = require('../services/PlaylistService');
const { formatSuccess } = require('../utils/responseFormatter');

// Get user playlists
exports.getUserPlaylists = async (req, res, next) => {
    try {
        const playlists = await PlaylistService.getUserPlaylists(req.user.id);
        res.json(formatSuccess(playlists));
    } catch (error) {
        next(error);
    }
};

// Get playlist by ID
exports.getPlaylistById = async (req, res, next) => {
    try {
        const playlist = await PlaylistService.getPlaylistById(
            req.params.id,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(playlist));
    } catch (error) {
        next(error);
    }
};

// Create playlist
exports.createPlaylist = async (req, res, next) => {
    try {
        const playlist = await PlaylistService.createPlaylist(req.body, req.user.id);
        res.status(201).json(formatSuccess(playlist, 'Playlist created successfully'));
    } catch (error) {
        next(error);
    }
};

// Update playlist
exports.updatePlaylist = async (req, res, next) => {
    try {
        const playlist = await PlaylistService.updatePlaylist(
            req.params.id,
            req.body,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(playlist, 'Playlist updated successfully'));
    } catch (error) {
        next(error);
    }
};

// Delete playlist
exports.deletePlaylist = async (req, res, next) => {
    try {
        await PlaylistService.deletePlaylist(req.params.id, req.user.id, req.user.role);
        res.json(formatSuccess(null, 'Playlist deleted successfully'));
    } catch (error) {
        next(error);
    }
};

// Add video to playlist
exports.addVideoToPlaylist = async (req, res, next) => {
    try {
        const playlist = await PlaylistService.addVideoToPlaylist(
            req.params.id,
            req.body.videoId,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(playlist, 'Video added to playlist'));
    } catch (error) {
        next(error);
    }
};

// Remove video from playlist
exports.removeVideoFromPlaylist = async (req, res, next) => {
    try {
        const playlist = await PlaylistService.removeVideoFromPlaylist(
            req.params.id,
            req.params.videoId,
            req.user.id,
            req.user.role
        );
        res.json(formatSuccess(playlist, 'Video removed from playlist'));
    } catch (error) {
        next(error);
    }
};
