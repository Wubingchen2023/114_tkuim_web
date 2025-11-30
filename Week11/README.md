# Week11 作業說明

後端使用 **Node.js + Express**，  
資料庫使用 **MongoDB（Docker 容器）**，並提供前端表單進行操作。

---

## 環境需求

- Node.js 
- npm
- Docker & Docker Compose
- MongoDB Shell：`mongosh`（或使用 MongoDB Compass GUI）
- （選用）REST Client / Postman 方便測試 API

---

## 專案啟動流程

1. **啟動 MongoDB 容器**

   ```bash
   # 於 Week11 資料夾下
   docker compose up -d
   docker ps      # 確認 Mongo 容器有在執行

## 環境變數設定 (.env)

### .env
PORT=3000

### MongoDB 連線資訊
### 格式: mongodb://[帳號]:[密碼]@[主機]:[埠號]/[資料庫名稱]?authSource=admin
MONGO_URI=mongodb://root:example@localhost:27017/week11db?authSource=admin

### 如果你在程式中是分開管理帳密，也可參考以下配置：
MONGO_USER=root
MONGO_PASS=example


#### 欄位說明

| 變數 | 說明 | 範例值 |
|------|------|--------|
| `MONGO_URI` | MongoDB 連線字串 | `mongodb://localhost:27017/signup_db` |
| `MONGO_USERNAME` | 資料庫帳號（選用） | `admin` |
| `MONGO_PASSWORD` | 資料庫密碼（選用） | `password123` |
| `PORT` | API 伺服器埠號 | `3000` |
| `NODE_ENV` | 執行環境 | `development` / `production` |

### 啟動伺服器
- npm run dev

### 成功啟動後應看到：
- Server running on http://localhost:3000
- MongoDB connected successfully

## 測試方式
1. 使用 REST Client / Postman

以 Postman 為例，新增一個環境變數 baseUrl = http://localhost:PORT，底下可建立以下請求：

- POST {{baseUrl}}/api/signup
- Body: raw JSON，如上範例。
- GET {{baseUrl}}/api/signup?page=1&limit=10
- PATCH {{baseUrl}}/api/signup/:id
- DELETE {{baseUrl}}/api/signup/:id

2. Mongo Shell 指令範例（mongosh）

// 連線 DB
use <MONGO_DB_NAME>;

// 查看 participants 集合
db.participants.find().pretty();

// 建立 email 唯一索引
db.participants.createIndex({ email: 1 }, { unique: true });

// skip / limit 示範：第二頁，每頁 10 筆
db.participants.find().skip(10).limit(10);
