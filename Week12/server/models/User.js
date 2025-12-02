import { ObjectId } from 'mongodb';

export class User {
  constructor({ _id, email, passwordHash, role, createdAt, updatedAt }) {
    this._id = _id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role || 'student'; // student 或 admin
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // 序列化（不包含密碼）
  toJSON() {
    return {
      id: this._id?.toString(),
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}
