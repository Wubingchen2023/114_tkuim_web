const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Playlist name is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }],
    isPublic: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

playlistSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Playlist', playlistSchema);
