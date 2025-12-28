const FavoriteRepository = require('../repositories/FavoriteRepository');

class FavoriteService {
    async getUserFavorites(userId) {
        const favorites = await FavoriteRepository.findByUserId(userId);
        return favorites.map(fav => fav.videoId);
    }

    async addFavorite(videoId, userId) {
        // Check if already favorited
        const existing = await FavoriteRepository.findByUserAndVideo(userId, videoId);
        if (existing) {
            throw new Error('Video already in favorites');
        }

        return await FavoriteRepository.create({ userId, videoId });
    }

    async removeFavorite(videoId, userId) {
        const favorite = await FavoriteRepository.findByUserAndVideo(userId, videoId);
        if (!favorite) {
            throw new Error('Favorite not found');
        }

        return await FavoriteRepository.deleteByUserAndVideo(userId, videoId);
    }

    async isFavorited(videoId, userId) {
        return await FavoriteRepository.isFavorited(userId, videoId);
    }
}

module.exports = new FavoriteService();
