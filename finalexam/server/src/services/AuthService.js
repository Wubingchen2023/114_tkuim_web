const UserRepository = require('../repositories/UserRepository');
const { generateToken } = require('../config/jwt');

// Service Pattern - 業務邏輯層
class AuthService {
    async register(userData) {
        // Check if user already exists
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const existingUsername = await UserRepository.findByUsername(userData.username);
        if (existingUsername) {
            throw new Error('Username already taken');
        }

        // Create new user
        const user = await UserRepository.create(userData);

        // Generate token
        const token = generateToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            token,
        };
    }

    async login(email, password) {
        // Find user with password field
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = generateToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            token,
        };
    }

    async getCurrentUser(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };
    }
}

module.exports = new AuthService();
