import express from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/users.js';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();
const SALT_ROUNDS = 10;

// 註冊
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 驗證必填欄位
    if (!email || !password) {
      return res.status(400).json({ 
        error: '缺少必填欄位',
        message: 'Email 和密碼為必填' 
      });
    }

    // 驗證 Email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email 格式錯誤',
        message: '請輸入有效的 Email 地址' 
      });
    }

    // 檢查密碼長度
    if (password.length < 6) {
      return res.status(400).json({ 
        error: '密碼太短',
        message: '密碼長度至少需要 6 個字元' 
      });
    }

    // 檢查 Email 是否已存在
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email 已被註冊',
        message: '此 Email 已經被使用，請使用其他 Email' 
      });
    }

    // 產生密碼雜湊
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // 建立使用者（角色預設為 student）
    const user = await createUser({ 
      email, 
      passwordHash, 
      role: role || 'student' 
    });

    res.status(201).json({
      message: '註冊成功',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('註冊失敗:', error);
    res.status(500).json({ 
      error: '伺服器錯誤',
      message: '註冊過程中發生錯誤，請稍後再試' 
    });
  }
});

// 登入
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 驗證必填欄位
    if (!email || !password) {
      return res.status(400).json({ 
        error: '缺少必填欄位',
        message: 'Email 和密碼為必填' 
      });
    }

    // 查找使用者
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        error: '登入失敗',
        message: 'Email 或密碼錯誤' 
      });
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: '登入失敗',
        message: 'Email 或密碼錯誤' 
      });
    }

    // 簽發 JWT Token
    const token = generateToken(user);

    res.json({
      message: '登入成功',
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '2h',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('登入失敗:', error);
    res.status(500).json({ 
      error: '伺服器錯誤',
      message: '登入過程中發生錯誤，請稍後再試' 
    });
  }
});

export default router;
