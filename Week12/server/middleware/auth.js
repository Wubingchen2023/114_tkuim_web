const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT 驗證中介層
exports.protect = async (req, res, next) => {
  let token;

  // 從 Authorization Header 取得 Token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: '未提供授權 Token，請先登入'
    });
  }

  try {
    // 驗證 Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 將使用者資訊附加到 req.user
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: '使用者不存在'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token 無效或已過期'
    });
  }
};

// 生成 JWT Token
exports.generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// 生成 Refresh Token（加分項目）
exports.generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};
