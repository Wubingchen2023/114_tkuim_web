# Week12 - 登入驗證與權限控管系統

## 專案目標

- 實作 Authentication（身份驗證）與 Authorization（授權控管）
- 使用 bcrypt 安全儲存密碼雜湊
- 使用 JWT 管理登入狀態
- 實作角色權限（學員/管理員）
- 保護 API 不被未授權訪問

## 功能特色

### 認證功能
- 使用者註冊（`/auth/signup`）
- 使用者登入（`/auth/login`）
- JWT Token 簽發與驗證
- Token 過期處理

### 授權功能
- 學員只能查看/操作自己的報名資料
- 管理員可以查看/操作所有資料
- 資料擁有者檢查（`ownerId`）
- 角色權限檢查（`role: student/admin`）

### 安全特性
- 密碼使用 bcrypt 雜湊（salt rounds = 10）
- JWT Secret 使用環境變數管理
- Email 唯一索引（避免重複註冊）
- 敏感資訊不會回傳給前端

## 🚀 快速開始

### 1. 產生密碼雜湊

cd server
node scripts/hash-password.js admin123


### 2. 啟動 MongoDB

cd docker
docker-compose up -d
docker ps # 確認容器運行中


### 3. 安裝依賴並啟動伺服器

cd server
npm install
npm run dev


### 4. 測試帳號

| 角色 | Email | 密碼 | 權限 |
|------|-------|------|------|
| 管理員 | admin@example.com | admin123 | 可查看/操作所有資料 |
| 學員 | student@example.com | student123 | 只能查看/操作自己的資料 |

## 📡 API 文件

### 認證 API

#### 註冊
POST /auth/signup
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123",
"role": "student" // 選填，預設 student
}


#### 登入
POST /auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

Response (200 OK):
{
"message": "登入成功",
"token": "eyJhbGciOiJIUzI1NiIs...",
"expiresIn": "2h",
"user": {
"id": "...",
"email": "user@example.com",
"role": "student"
}
}


### 報名 API（需要登入）

所有以下 API 都需要在 Header 中帶入：
Authorization: Bearer YOUR_TOKEN_HERE

#### 查詢報名列表

GET /api/signup

Response (200 OK):
{
"total": 5,
"data": [...]
}

**權限規則**：
- 學員：只能看到自己建立的報名資料
- 管理員：可以看到所有報名資料

#### 建立報名

POST /api/signup
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
"name": "王小明",
"email": "user@example.com",
"phone": "0912345678"
}

系統會自動記錄 `ownerId`（建立者 ID）。

#### 更新報名

PATCH /api/signup/:id
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
"phone": "0987654321",
"status": "confirmed"
}


**權限規則**：只有資料擁有者或管理員可以更新。

#### 刪除報名

DELETE /api/signup/:id
Authorization: Bearer YOUR_TOKEN_HERE


**權限規則**：只有資料擁有者或管理員可以刪除。

## 測試方式

### 方法 1：REST Client（推薦）

使用 VS Code 的 REST Client 擴充套件，開啟 `tests/api.http`：

1. 先執行「登入」請求
2. 複製回傳的 `token`
3. 將 token 貼到其他請求的 `Authorization: Bearer` 後面
4. 依序測試各個 API

### 方法 2：前端介面

1. 在瀏覽器開啟 `client/index.html`
2. 使用測試帳號登入
3. 測試新增、查詢、刪除功能

### 方法 3：自動化測試
cd server
npm test


## 資料庫設計

### users 集合

{
_id: ObjectId,
email: String, // 唯一索引
passwordHash: String, // bcrypt 雜湊，絕不儲存明碼
role: String, // "student" 或 "admin"
createdAt: Date,
updatedAt: Date
}


### participants 集合

{
_id: ObjectId,
name: String,
email: String,
phone: String,
status: String, // "pending" 或 "confirmed"
ownerId: ObjectId, // 建立者的 user._id
createdAt: Date,
updatedAt: Date
}

**索引**：
- `users.email`：唯一索引
- `participants.ownerId`：加速查詢

## 前端功能

1. **登入介面**：Email + 密碼登入
2. **使用者資訊**：顯示當前登入使用者與角色
3. **報名表單**：新增報名資料
4. **報名列表**：
   - 學員：只看到自己的資料
   - 管理員：看到所有資料
5. **權限控制**：只有擁有者或管理員可以刪除
6. **Token 處理**：自動檢測過期並提示重新登入

## 測試情境

### 測試 1：未登入被拒絕
GET /api/signup
預期：401 Unauthorized

### 測試 2：登入成功取得 Token

POST /auth/login
{
"email": "student@example.com",
"password": "student123"
}

預期：回傳 token

### 測試 3：學員只能看自己的資料

使用學員 token
GET /api/signup

預期：只回傳該學員建立的報名資料

### 測試 4：學員無法刪除別人的資料
使用學員 A 的 token 刪除學員 B 的資料
DELETE /api/signup/OTHER_USER_ID

預期：403 Forbidden

### 測試 5：管理員可以刪除所有資料

使用管理員 token
DELETE /api/signup/ANY_ID

預期：200 OK, 刪除成功

## 常見問題

### Q1: JWT_SECRET is not defined
**解決方式**：確認 `server/.env` 有設定 `JWT_SECRET`，並重啟伺服器。

### Q2: Token 無效或已過期
**解決方式**：重新登入取得新 token。可調整 `.env` 中的 `JWT_EXPIRES_IN`。

### Q3: bcrypt 安裝失敗
**解決方式**：
npm install bcrypt --build-from-source

### Q4: MongoDB 連線失敗
**解決方式**：
1. 確認 Docker 容器正在運行：`docker ps`
2. 檢查 `.env` 中的 `MONGODB_URI`
3. 嘗試重啟容器：`docker-compose restart`