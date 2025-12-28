const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

commentSchema.index({ videoId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
