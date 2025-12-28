/**
 * HBO MAX Platform - Authentication Unit Tests
 * 
 * 使用 Jest 測試框架進行單元測試
 * 安裝: npm install --save-dev jest supertest
 * 執行: npm test
 */

const request = require('supertest');
const app = require('../server/src/app');
const database = require('../server/src/config/database');
const User = require('../server/src/models/User');

// 測試資料
const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'test123456'
};

const adminUser = {
    email: 'admin@hbomax.com',
    password: 'admin123'
};

// 在所有測試前連接資料庫
beforeAll(async () => {
    await database.connect();
});

// 在所有測試後清理並斷開連接
afterAll(async () => {
    // 清理測試資料
    await User.deleteOne({ email: testUser.email });
    await database.disconnect();
});

describe('Authentication API Tests', () => {

    describe('POST /api/auth/register - 用戶註冊', () => {

        test('應該成功註冊新用戶', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data.user).toHaveProperty('username', testUser.username);
            expect(response.body.data.user).toHaveProperty('email', testUser.email);
            expect(response.body.data.user).not.toHaveProperty('password');
        });

        test('應該拒絕重複的 Email', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error).toHaveProperty('message');
        });

        test('應該拒絕無效的 Email 格式', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'invaliduser',
                    email: 'invalid-email',
                    password: 'test123456'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        test('應該拒絕過短的密碼', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'shortpass',
                    email: 'short@example.com',
                    password: '123'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        test('應該拒絕過短的使用者名稱', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'ab',
                    email: 'shortname@example.com',
                    password: 'test123456'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        test('應該拒絕缺少必填欄位', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'incomplete'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/login - 用戶登入', () => {

        test('應該成功登入有效用戶', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data.user).toHaveProperty('email', testUser.email);
        });

        test('應該拒絕錯誤的密碼', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        test('應該拒絕不存在的用戶', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'test123456'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        test('應該拒絕無效的 Email 格式', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'invalid-email',
                    password: 'test123456'
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        test('應該拒絕空密碼', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: ''
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/auth/me - 取得當前用戶', () => {

        let authToken;

        beforeAll(async () => {
            // 登入取得 Token
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            authToken = loginResponse.body.data.token;
        });

        test('應該成功取得已認證用戶資訊', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('username', testUser.username);
            expect(response.body.data).toHaveProperty('email', testUser.email);
            expect(response.body.data).not.toHaveProperty('password');
        });

        test('應該拒絕沒有 Token 的請求', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('UNAUTHORIZED');
        });

        test('應該拒絕無效的 Token', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer invalid_token_here')
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe('INVALID_TOKEN');
        });

        test('應該拒絕格式錯誤的 Authorization Header', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', authToken)
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('Password Security Tests - 密碼安全測試', () => {

        test('密碼應該被加密儲存', async () => {
            const user = await User.findOne({ email: testUser.email }).select('+password');
            expect(user.password).not.toBe(testUser.password);
            expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt hash pattern
        });

        test('comparePassword 方法應該正確驗證密碼', async () => {
            const user = await User.findOne({ email: testUser.email }).select('+password');
            const isMatch = await user.comparePassword(testUser.password);
            expect(isMatch).toBe(true);
        });

        test('comparePassword 方法應該拒絕錯誤密碼', async () => {
            const user = await User.findOne({ email: testUser.email }).select('+password');
            const isMatch = await user.comparePassword('wrongpassword');
            expect(isMatch).toBe(false);
        });
    });

    describe('Role-Based Access Control - 角色權限測試', () => {

        test('新註冊用戶應該是 user 角色', async () => {
            const user = await User.findOne({ email: testUser.email });
            expect(user.role).toBe('user');
        });

        test('管理員應該有 admin 角色', async () => {
            const admin = await User.findOne({ email: adminUser.email });
            expect(admin.role).toBe('admin');
        });
    });

    describe('Token Generation Tests - Token 生成測試', () => {

        test('登入應該返回有效的 JWT Token', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            const token = response.body.data.token;
            expect(token).toBeTruthy();
            expect(token.split('.')).toHaveLength(3); // JWT format: header.payload.signature
        });

        test('不同用戶應該有不同的 Token', async () => {
            const response1 = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            const response2 = await request(app)
                .post('/api/auth/login')
                .send({
                    email: adminUser.email,
                    password: adminUser.password
                });

            expect(response1.body.data.token).not.toBe(response2.body.data.token);
        });
    });
});

// Jest 配置
module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testTimeout: 10000
};
