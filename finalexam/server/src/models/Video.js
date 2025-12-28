const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail URL is required'],
    },
    videoUrl: {
        type: String,
        required: [true, 'Video URL is required'],
    },
    duration: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['action', 'drama', 'comedy', 'sci-fi', 'horror', 'documentary'],
        default: 'drama',
    },
    releaseYear: {
        type: Number,
    },
    director: {
        type: String,
    },
    cast: [{
        type: String,
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// Index for faster queries
videoSchema.index({ category: 1, createdAt: -1 });
videoSchema.index({ rating: -1 });
videoSchema.index({ viewCount: -1 });

module.exports = mongoose.model('Video', videoSchema);
