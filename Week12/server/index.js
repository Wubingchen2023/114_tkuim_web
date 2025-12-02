import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import signupRoutes from './routes/signup.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 路由
app.use('/auth', authRoutes);
app.use('/api/signup', signupRoutes);

// 錯誤處理
app.use((err, req, res, next) => {
  console.error('伺服器錯誤:', err);
  res.status(500).json({ 
    error: '伺服器錯誤',
    message: process.env.NODE_ENV === 'development' ? err.message : '請稍後再試' 
  });
});

// 啟動伺服器
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ 伺服器運行於 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ 伺服器啟動失敗:', error);
    process.exit(1);
  }
}

start();
