const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All favorite routes require authentication
router.use(authMiddleware);

router.get('/', favoriteController.getUserFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:videoId', favoriteController.removeFavorite);
router.get('/:videoId/check', favoriteController.checkFavorite);

module.exports = router;
