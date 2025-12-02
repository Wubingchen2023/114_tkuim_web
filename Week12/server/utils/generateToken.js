import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

export function generateToken(user) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET 未設定，請檢查 .env 檔案');
  }

  return jwt.sign(
    {
      sub: user._id?.toString() ?? user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
