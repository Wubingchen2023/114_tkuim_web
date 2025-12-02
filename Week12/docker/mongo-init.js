// 切換到 week12 資料庫
db = db.getSiblingDB('week12');

// 建立應用程式專用帳號
db.createUser({
  user: 'week12-admin',
  pwd: 'week12-pass',
  roles: [{ role: 'readWrite', db: 'week12' }]
});

// 建立 participants 集合並建立 ownerId 索引
db.createCollection('participants');
db.participants.createIndex({ ownerId: 1 });
db.participants.createIndex({ email: 1 }, { unique: true });

// 建立 users 集合並建立 email 唯一索引
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });

// 預先建立管理員帳號（密碼：admin123）
db.users.insertOne({
  email: 'admin@example.com',
  passwordHash: '$2b$10$YourBcryptHashHere', // 需要用 bcrypt 產生
  role: 'admin',
  createdAt: new Date()
});

// 預先建立一般學員帳號（密碼：student123）
db.users.insertOne({
  email: 'student@example.com',
  passwordHash: '$2b$10$YourBcryptHashHere', // 需要用 bcrypt 產生
  role: 'student',
  createdAt: new Date()
});

print('Week12 資料庫初始化完成');
