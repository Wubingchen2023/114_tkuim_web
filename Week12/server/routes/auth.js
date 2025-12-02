const express = require('express');
const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const router = express.Router();

// POST /auth/signup - 註冊
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 檢查使用者是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: '此 Email 已被註冊'
      });
    }

    // 建立新使用者
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student'  // 預設為 student
    });

    // 生成 Token
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 儲存 Refresh Token（加分項目）
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      message: '註冊成功',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /auth/login - 登入
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 驗證輸入
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: '請提供 Email 和密碼'
      });
    }

    // 查詢使用者（需包含密碼欄位）
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email 或密碼錯誤'
      });
    }

    // 驗證密碼
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Email 或密碼錯誤'
      });
    }

    // 生成 Token
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 更新 Refresh Token
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: '登入成功',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /auth/refresh - 刷新 Token（加分項目）
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: '請提供 Refresh Token'
      });
    }

    // 驗證 Refresh Token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('+refreshToken');

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh Token 無效'
      });
    }

    // 生成新的 Access Token
    const newToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      token: newToken
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Refresh Token 無效或已過期'
    });
  }
});

// GET /auth/me - 取得目前使用者資訊
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;
