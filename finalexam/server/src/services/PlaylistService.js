const PlaylistRepository = require('../repositories/PlaylistRepository');

class PlaylistService {
    async getUserPlaylists(userId) {
        return await PlaylistRepository.findByUserId(userId);
    }

    async getPlaylistById(id, userId, userRole) {
        const playlist = await PlaylistRepository.findById(id);
        if (!playlist) {
            throw new Error('Playlist not found');
        }

        // Check permission for private playlists
        if (!playlist.isPublic && playlist.userId.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to view this playlist');
        }

        return playlist;
    }

    async createPlaylist(playlistData, userId) {
        const data = {
            ...playlistData,
            userId,
        };
        return await PlaylistRepository.create(data);
    }

    async updatePlaylist(id, playlistData, userId, userRole) {
        const playlist = await PlaylistRepository.findById(id);
        if (!playlist) {
            throw new Error('Playlist not found');
        }

        // Check permission
        if (playlist.userId.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to update this playlist');
        }

        return await PlaylistRepository.update(id, playlistData);
    }

    async deletePlaylist(id, userId, userRole) {
        const playlist = await PlaylistRepository.findById(id);
        if (!playlist) {
            throw new Error('Playlist not found');
        }

        // Check permission
        if (playlist.userId.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to delete this playlist');
        }

        return await PlaylistRepository.delete(id);
    }

    async addVideoToPlaylist(playlistId, videoId, userId, userRole) {
        const playlist = await PlaylistRepository.findById(playlistId);
        if (!playlist) {
            throw new Error('Playlist not found');
        }

        // Check permission
        if (playlist.userId.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to modify this playlist');
        }

        return await PlaylistRepository.addVideo(playlistId, videoId);
    }

    async removeVideoFromPlaylist(playlistId, videoId, userId, userRole) {
        const playlist = await PlaylistRepository.findById(playlistId);
        if (!playlist) {
            throw new Error('Playlist not found');
        }

        // Check permission
        if (playlist.userId.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to modify this playlist');
        }

        return await PlaylistRepository.removeVideo(playlistId, videoId);
    }
}

module.exports = new PlaylistService();
