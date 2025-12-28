const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { ratingValidation } = require('../middlewares/validator');

// Public routes
router.get('/video/:videoId', ratingController.getAverageRating);

// Protected routes
router.get('/video/:videoId/user', authMiddleware, ratingController.getUserRating);
router.post('/', authMiddleware, ratingValidation, ratingController.upsertRating);

module.exports = router;
