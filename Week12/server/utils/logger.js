const mongoose = require('mongoose');

const ActionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  details: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ActionLog = mongoose.model('ActionLog', ActionLogSchema);

// 記錄使用者操作
exports.logAction = async (userId, action, details = {}) => {
  try {
    await ActionLog.create({
      userId,
      action,
      details
    });
  } catch (error) {
    console.error('記錄操作失敗:', error);
  }
};

// 查詢使用者操作歷史（admin 專用）
exports.getUserLogs = async (userId, limit = 50) => {
  return await ActionLog.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('userId', 'name email');
};
