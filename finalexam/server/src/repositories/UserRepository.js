const User = require('../models/User');

// Repository Pattern - 資料存取層
class UserRepository {
    async findAll(filter = {}, options = {}) {
        return await User.find(filter, null, options);
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async count(filter = {}) {
        return await User.countDocuments(filter);
    }
}

module.exports = new UserRepository();
