const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '請輸入 Email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '請輸入有效的 Email']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    minlength: 6,
    select: false  // 查詢時預設不回傳密碼
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  refreshToken: {
    type: String,
    select: false  // 加分項目：Refresh Token
  }
}, {
  timestamps: true
});

// 儲存前自動加密密碼
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 驗證密碼方法
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
