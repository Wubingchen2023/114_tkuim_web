const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { videoValidation } = require('../middlewares/validator');

// Public routes
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.get('/category/:category', videoController.getVideosByCategory);

// Protected routes
router.post('/', authMiddleware, videoValidation, videoController.createVideo);
router.put('/:id', authMiddleware, videoValidation, videoController.updateVideo);
router.delete('/:id', authMiddleware, videoController.deleteVideo);
router.put('/:id/view', videoController.incrementViewCount);

module.exports = router;
