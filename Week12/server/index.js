require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// 連線 MongoDB
connectDB();

// 中介層
app.use(cors());
app.use(express.json());

// 路由
app.use('/auth', require('./routes/auth'));
app.use('/api/signup', require('./routes/signup'));

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: '伺服器錯誤'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;  // 供測試使用
