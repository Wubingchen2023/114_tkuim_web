# HBO MAX 影音社群分享平台

完整的 MERN 風格全端影音串流平台，具備用戶認證、影片管理、評論、評分、收藏及播放清單功能。

## 🚀 功能特色

- ✅ 用戶註冊與登入系統 (JWT 認證)
- ✅ 影片內容展示與管理 (CRUD)
- ✅ 評論與評分系統
- ✅ 收藏與播放清單
- ✅ 分類篩選與搜尋
- ✅ 權限管理 (管理員/一般用戶)
- ✅ HBO MAX 深色主題設計

## 🛠 技術棧

### 後端
- **Node.js** + **Express.js** - RESTful API 伺服器
- **MongoDB** + **Mongoose** - NoSQL 資料庫
- **JWT** - 身份驗證與授權
- **bcryptjs** - 密碼加密

### 前端
- **HTML5** + **CSS3** + **JavaScript (ES6+)**
- **Fetch API** - HTTP 請求
- 響應式設計 - 支援各種裝置

### 架構模式
- **Repository Pattern** - 資料存取層抽象化
- **Service Pattern** - 業務邏輯分離
- **Singleton Pattern** - 資料庫連線管理

### 部署
- **Docker** + **Docker Compose** - 容器化部署
- **Nginx** - 前端伺服器與反向代理

## 📁 專案結構

```
finalexam/
├── client/                 # 前端應用
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── video.js
│   │   ├── comment.js
│   │   ├── favorite.js
│   │   ├── playlist.js
│   │   └── app.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── video-detail.html
│   ├── favorites.html
│   └── playlists.html
├── server/                 # 後端應用
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── mongo-init/
│   └── init-db.js
├── docker-compose.yml
└── nginx.conf
```

## 🚀 快速開始

### 使用 Docker Compose (推薦)

1. **確保已安裝 Docker 和 Docker Compose**

```bash
docker --version
docker-compose --version
```

2. **啟動所有服務**

```bash
cd finalexam
docker-compose up -d
```

3. **訪問應用**

- 前端: http://localhost
- 後端 API: http://localhost:5000
- MongoDB: localhost:27017

4. **停止服務**

```bash
docker-compose down
```

### 本地開發

#### 後端設定

```bash
cd server
npm install
npm start
```

#### 前端設定

使用任何靜態伺服器，例如：

```bash
cd client
npx http-server -p 8080
```

## 📡 API 端點

### 認證
- `POST /api/auth/register` - 用戶註冊
- `POST /api/auth/login` - 用戶登入
- `GET /api/auth/me` - 取得當前用戶

### 影片
- `GET /api/videos` - 取得所有影片
- `GET /api/videos/:id` - 取得特定影片
- `POST /api/videos` - 新增影片 (需認證)
- `PUT /api/videos/:id` - 更新影片 (需認證)
- `DELETE /api/videos/:id` - 刪除影片 (需認證)

### 評論
- `GET /api/comments/video/:videoId` - 取得影片評論
- `POST /api/comments` - 新增評論 (需認證)
- `PUT /api/comments/:id` - 更新評論 (需認證)
- `DELETE /api/comments/:id` - 刪除評論 (需認證)

### 評分
- `GET /api/ratings/video/:videoId` - 取得影片平均評分
- `POST /api/ratings` - 新增/更新評分 (需認證)

### 播放清單
- `GET /api/playlists` - 取得用戶播放清單 (需認證)
- `POST /api/playlists` - 新增播放清單 (需認證)
- `DELETE /api/playlists/:id` - 刪除播放清單 (需認證)

### 收藏
- `GET /api/favorites` - 取得用戶收藏 (需認證)
- `POST /api/favorites` - 新增收藏 (需認證)
- `DELETE /api/favorites/:videoId` - 移除收藏 (需認證)

## 🔐 預設帳號

管理員帳號用於測試：
- Email: admin@hbomax.com
- Password: admin123

**⚠️ 請在生產環境中更改預設密碼！**

## 🎨 設計模式說明

### 1. Repository Pattern (資料存取層)
將資料庫操作邏輯封裝，提供統一的資料存取介面，使得業務邏輯與資料層解耦。

### 2. Service Pattern (業務邏輯層)
將複雜的業務邏輯從 Controller 分離到 Service 層，提高程式碼的可測試性和可維護性。

### 3. Singleton Pattern (資料庫連線)
確保整個應用只有一個 MongoDB 連線實例，避免資源浪費。

## 📝 環境變數

在 `server/.env` 檔案中設定：

```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/hbomax_platform
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=production
```

## 🧪 測試

建議使用 Postman 或 Thunder Client 測試 API 端點。

