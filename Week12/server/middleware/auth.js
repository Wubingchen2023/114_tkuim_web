// middleware/auth.js (ESM)

import jwt from 'jsonwebtoken';

// 保護路由的 middleware
export function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  // 沒帶 token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 驗證 JWT，JWT_SECRET 要寫在 .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 把解出的 payload 放在 req.user，後面的 handler 可以用
    req.user = decoded;

    // 驗證成功
    next();
  } catch (err) {
    console.error('JWT verify failed:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
}
