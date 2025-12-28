const VideoRepository = require('../repositories/VideoRepository');
const RatingRepository = require('../repositories/RatingRepository');
const CommentRepository = require('../repositories/CommentRepository');
const FavoriteRepository = require('../repositories/FavoriteRepository');

class VideoService {
    async getAllVideos(query = {}) {
        const { page = 1, limit = 12, category, sort = '-createdAt', search } = query;

        const filter = {};
        if (category) {
            filter.category = category;
        }

        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            sort,
        };

        let videos;
        if (search) {
            videos = await VideoRepository.search(search, options);
        } else {
            videos = await VideoRepository.findAll(filter, options);
        }

        const total = await VideoRepository.count(filter);

        return {
            videos,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        };
    }

    async getVideoById(id) {
        const video = await VideoRepository.findById(id);
        if (!video) {
            throw new Error('Video not found');
        }

        // Get average rating
        const avgRating = await RatingRepository.calculateAverage(video._id);

        return {
            ...video.toObject(),
            averageRating: avgRating,
        };
    }

    async createVideo(videoData, userId) {
        const data = {
            ...videoData,
            uploadedBy: userId,
        };
        return await VideoRepository.create(data);
    }

    async updateVideo(id, videoData, userId, userRole) {
        const video = await VideoRepository.findById(id);
        if (!video) {
            throw new Error('Video not found');
        }

        // Check permission
        if (video.uploadedBy._id.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to update this video');
        }

        return await VideoRepository.update(id, videoData);
    }

    async deleteVideo(id, userId, userRole) {
        const video = await VideoRepository.findById(id);
        if (!video) {
            throw new Error('Video not found');
        }

        // Check permission
        if (video.uploadedBy._id.toString() !== userId && userRole !== 'admin') {
            throw new Error('Not authorized to delete this video');
        }

        // Delete related data
        await Promise.all([
            CommentRepository.deleteByVideoId(id),
            RatingRepository.deleteByVideoId(id),
            FavoriteRepository.deleteByVideoId(id),
        ]);

        return await VideoRepository.delete(id);
    }

    async incrementViewCount(id) {
        return await VideoRepository.incrementViewCount(id);
    }

    async getVideosByCategory(category, options = {}) {
        return await VideoRepository.findByCategory(category, options);
    }
}

module.exports = new VideoService();
