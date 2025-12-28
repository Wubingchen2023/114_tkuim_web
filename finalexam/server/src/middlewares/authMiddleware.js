const { verifyToken } = require('../config/jwt');
const UserRepository = require('../repositories/UserRepository');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'No authentication token provided',
                },
            });
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'Invalid or expired token',
                },
            });
        }

        // Get user from database
        const user = await UserRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: 'User not found',
                },
            });
        }

        // Attach user to request
        req.user = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: {
                code: 'AUTHENTICATION_ERROR',
                message: 'Authentication failed',
            },
        });
    }
};

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: {
                code: 'FORBIDDEN',
                message: 'Admin access required',
            },
        });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
