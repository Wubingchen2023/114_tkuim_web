const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { commentValidation } = require('../middlewares/validator');

// Public routes
router.get('/video/:videoId', commentController.getCommentsByVideoId);

// Protected routes
router.post('/', authMiddleware, commentValidation, commentController.createComment);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
