const AuthService = require('../services/AuthService');
const { formatSuccess } = require('../utils/responseFormatter');

// Register new user
exports.register = async (req, res, next) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json(formatSuccess(result, 'User registered successfully'));
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        res.json(formatSuccess(result, 'Login successful'));
    } catch (error) {
        next(error);
    }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await AuthService.getCurrentUser(req.user.id);
        res.json(formatSuccess(user));
    } catch (error) {
        next(error);
    }
};
