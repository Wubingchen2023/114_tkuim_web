import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../index.js';

let mongoServer;
let studentToken;
let adminToken;

beforeAll(async () => {
  // 啟動 MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Authentication Tests', () => {
  it('應該成功註冊管理員帳號', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  it('應該成功註冊學員帳號', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Student',
        email: 'student@test.com',
        password: 'student123',
        role: 'student'
      });

    expect(res.status).toBe(201);
    studentToken = res.body.token;
  });

  it('不應該允許重複 Email 註冊', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Duplicate',
        email: 'student@test.com',
        password: '123456'
      });

    expect(res.status).toBe(409);
  });

  it('應該成功登入', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'student@test.com',
        password: 'student123'
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('密碼錯誤應該登入失敗', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'student@test.com',
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
  });
});

describe('Protected Routes Tests', () => {
  it('未登入不應該能存取受保護路由', async () => {
    const res = await request(app).get('/api/signup');
    expect(res.status).toBe(401);
  });

  it('學員應該能建立報名', async () => {
    const res = await request(app)
      .post('/api/signup')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        name: 'Test',
        email: 'test@test.com',
        phone: '0912345678'
      });

    expect(res.status).toBe(201);
  });

  it('Admin 應該能看到所有報名', async () => {
    const res = await request(app)
      .get('/api/signup')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});
