import { verifyToken } from '../utils/generateToken.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // 檢查 Authorization header
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: '缺少授權資訊',
      message: '請在 Header 中提供 Authorization: Bearer <token>' 
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = verifyToken(token);
    
    // 將使用者資訊寫入 req.user
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token 已過期',
        message: '請重新登入' 
      });
    }
    
    return res.status(401).json({ 
      error: 'Token 無效',
      message: '請確認您的授權資訊是否正確' 
    });
  }
}

// 角色檢查 middleware
export function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: '權限不足',
        message: `此操作需要以下角色之一：${roles.join(', ')}` 
      });
    }
    next();
  };
}
