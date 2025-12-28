const mongoose = require('mongoose');

// Singleton Pattern - 確保整個應用只有一個 MongoDB 連線實例
class Database {
    constructor() {
        if (!Database.instance) {
            this.connection = null;
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect() {
        if (this.connection) {
            console.log('Using existing database connection');
            return this.connection;
        }

        try {
            this.connection = await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
            return this.connection;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
            console.log('MongoDB disconnected');
        }
    }
}

// 創建單一實例
const database = new Database();

module.exports = database;
