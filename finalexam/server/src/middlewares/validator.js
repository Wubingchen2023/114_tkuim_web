const { body, param, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                details: errors.array().map(e => e.msg),
            },
        });
    }
    next();
};

const registerValidation = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate,
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
];

const videoValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('thumbnail').isURL().withMessage('Thumbnail must be a valid URL'),
    body('videoUrl').isURL().withMessage('Video URL must be valid'),
    validate,
];

const commentValidation = [
    body('videoId').isMongoId().withMessage('Invalid video ID'),
    body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be 1-500 characters'),
    validate,
];

const ratingValidation = [
    body('videoId').isMongoId().withMessage('Invalid video ID'),
    body('score').isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
    validate,
];

const playlistValidation = [
    body('name').trim().notEmpty().withMessage('Playlist name is required'),
    validate,
];

module.exports = {
    validate,
    registerValidation,
    loginValidation,
    videoValidation,
    commentValidation,
    ratingValidation,
    playlistValidation,
};
