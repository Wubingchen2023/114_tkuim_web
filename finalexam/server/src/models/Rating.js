const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: [true, 'Rating score is required'],
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating cannot exceed 10'],
    },
}, {
    timestamps: true,
});

// Ensure one rating per user per video
ratingSchema.index({ videoId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
