const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { playlistValidation } = require('../middlewares/validator');

// All playlist routes require authentication
router.use(authMiddleware);

router.get('/', playlistController.getUserPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.post('/', playlistValidation, playlistController.createPlaylist);
router.put('/:id', playlistValidation, playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);
router.post('/:id/videos', playlistController.addVideoToPlaylist);
router.delete('/:id/videos/:videoId', playlistController.removeVideoFromPlaylist);

module.exports = router;
