# Lab07 - 活動報名系統（認證與授權版）

這是一個具備完整身份驗證與角色權限控制的活動報名系統，實作 JWT 認證、RBAC（角色權限控制）、以及前後端整合。

## 功能特色

### 必做任務

1. **兩種帳號類型**
   - 一般學員 (student)：只能查看/操作自己的報名資料
   - 管理員 (admin)：可查看/操作所有報名資料

2. **認證路由**
   - `POST /auth/signup`：註冊新帳號
   - `POST /auth/login`：登入並取得 JWT Token

3. **受保護的 API**
   - `GET /api/signup`：登入後才能查詢，學員只能看自己的，admin 可看全部
   - `POST /api/signup`：登入者才能新增，自動記錄 `ownerId`
   - `PATCH /api/signup/:id`：只有資料擁有者或 admin 能更新
   - `DELETE /api/signup/:id`：只有資料擁有者或 admin 能刪除

4. **前端功能**
   - 登入/註冊介面
   - 顯示目前使用者資訊
   - 送出報名表單
   - 刪除報名資料
   - 登出功能

### 加分項目

- Refresh Token 機制
- 操作日誌（記錄使用者行為）
- 完整的單元測試（Vitest + Supertest + MongoDB Memory Server）
- 密碼加密（bcrypt）
- 環境變數管理

## 快速開始

### 1. 安裝依賴

