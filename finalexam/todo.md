# HBO MAX 影音社群分享平台 - 專案規劃

> **專案目標**: 開發一個具備完整 CRUD 功能的影音社群分享平台，提供用戶瀏覽、管理、評論、收藏影片內容，並實現前後端完整整合。

---

## 專案概述

### 核心功能
- 用戶註冊與登入系統
- 影片內容展示與管理（CRUD）
- 評論與評分系統
- 收藏與播放清單
- 社群分享功能
- 權限管理（管理員/一般用戶）

### 技術棧
- **前端**: React + Vite + TailwindCSS
- **後端**: Node.js + Express.js
- **資料庫**: MongoDB + Mongoose
- **驗證**: JWT (JSON Web Token)
- **狀態管理**: React Context API / Redux

---

## 資料庫設計與建立

### [ ] MongoDB 集合結構設計

#### [ ] Users Collection（用戶集合）
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

#### [ ] Videos Collection（影片集合）
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  thumbnail: String (URL, required),
  videoUrl: String (URL, required),
  duration: Number (seconds),
  category: String (enum: ['action', 'drama', 'comedy', 'sci-fi', 'horror', 'documentary']),
  releaseYear: Number,
  director: String,
  cast: [String],
  rating: Number (0-10, default: 0),
  viewCount: Number (default: 0),
  uploadedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

#### [ ] Comments Collection（評論集合）
```javascript
{
  _id: ObjectId,
  videoId: ObjectId (ref: 'Video', required),
  userId: ObjectId (ref: 'User', required),
  content: String (required, maxLength: 500),
  likes: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

#### [ ] Ratings Collection（評分集合）
```javascript
{
  _id: ObjectId,
  videoId: ObjectId (ref: 'Video', required),
  userId: ObjectId (ref: 'User', required),
  score: Number (1-10, required),
  createdAt: Date
}
```

#### [ ] Playlists Collection（播放清單集合）
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  userId: ObjectId (ref: 'User', required),
  videos: [ObjectId] (ref: 'Video'),
  isPublic: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### [ ] Favorites Collection（收藏集合）
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  videoId: ObjectId (ref: 'Video', required),
  createdAt: Date
}
```

### [ ] 建立 MongoDB 資料庫
- [ ] 安裝 MongoDB 本地端或使用 MongoDB Atlas
- [ ] 創建資料庫：`hbomax_platform`
- [ ] 設定資料庫連線字串
- [ ] 安裝 Mongoose ODM

---

## 後端開發

### [ ] 專案初始化
- [ ] 初始化 Node.js 專案 (`npm init -y`)
- [ ] 安裝必要套件
  - [ ] Express.js (`express`)
  - [ ] Mongoose (`mongoose`)
  - [ ] dotenv (`dotenv`)
  - [ ] bcryptjs (`bcryptjs`)
  - [ ] jsonwebtoken (`jsonwebtoken`)
  - [ ] cors (`cors`)
  - [ ] express-validator (`express-validator`)
  - [ ] multer (`multer`) - 檔案上傳

### [ ] 專案架構設計（Repository + Service Pattern）
```
backend/
├── src/
│   ├── config/          # 配置檔案
│   │   ├── database.js
│   │   └── jwt.js
│   ├── models/          # Mongoose Models
│   │   ├── User.js
│   │   ├── Video.js
│   │   ├── Comment.js
│   │   ├── Rating.js
│   │   ├── Playlist.js
│   │   └── Favorite.js
│   ├── repositories/    # Repository Pattern (資料存取層)
│   │   ├── UserRepository.js
│   │   ├── VideoRepository.js
│   │   ├── CommentRepository.js
│   │   ├── RatingRepository.js
│   │   ├── PlaylistRepository.js
│   │   └── FavoriteRepository.js
│   ├── services/        # Service Pattern (業務邏輯層)
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   ├── VideoService.js
│   │   ├── CommentService.js
│   │   ├── RatingService.js
│   │   ├── PlaylistService.js
│   │   └── FavoriteService.js
│   ├── controllers/     # 控制器
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── videoController.js
│   │   ├── commentController.js
│   │   ├── ratingController.js
│   │   ├── playlistController.js
│   │   └── favoriteController.js
│   ├── middlewares/     # 中介軟體
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validator.js
│   │   └── uploadMiddleware.js
│   ├── routes/          # 路由
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── videoRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── ratingRoutes.js
│   │   ├── playlistRoutes.js
│   │   └── favoriteRoutes.js
│   ├── utils/           # 工具函數
│   │   ├── responseFormatter.js
│   │   └── constants.js
│   └── app.js           # Express 應用主檔案
├── .env
├── .gitignore
└── package.json
```

### [ ] 建立 Mongoose Models
- [ ] User Model
- [ ] Video Model
- [ ] Comment Model
- [ ] Rating Model
- [ ] Playlist Model
- [ ] Favorite Model

### [ ] 實作 Repository Pattern（資料存取層）
- [ ] UserRepository - 用戶資料 CRUD
- [ ] VideoRepository - 影片資料 CRUD
- [ ] CommentRepository - 評論資料 CRUD
- [ ] RatingRepository - 評分資料 CRUD
- [ ] PlaylistRepository - 播放清單資料 CRUD
- [ ] FavoriteRepository - 收藏資料 CRUD

### [ ] 實作 Service Pattern（業務邏輯層）
- [ ] AuthService - 註冊、登入、JWT 驗證邏輯
- [ ] UserService - 用戶管理邏輯
- [ ] VideoService - 影片管理邏輯（包含觀看次數更新）
- [ ] CommentService - 評論管理邏輯
- [ ] RatingService - 評分管理邏輯（計算平均分）
- [ ] PlaylistService - 播放清單管理邏輯
- [ ] FavoriteService - 收藏管理邏輯

### [ ] 設計 API 端點（RESTful API）

#### [ ] 認證 API (`/api/auth`)
- [ ] `POST /api/auth/register` - 用戶註冊
- [ ] `POST /api/auth/login` - 用戶登入
- [ ] `POST /api/auth/logout` - 用戶登出
- [ ] `GET /api/auth/me` - 取得當前用戶資訊

#### [ ] 用戶管理 API (`/api/users`)
- [ ] `GET /api/users` - 取得所有用戶（僅管理員）
- [ ] `GET /api/users/:id` - 取得特定用戶
- [ ] `PUT /api/users/:id` - 更新用戶資料
- [ ] `DELETE /api/users/:id` - 刪除用戶（僅管理員）

#### [ ] 影片管理 API (`/api/videos`)
- [ ] `GET /api/videos` - 取得所有影片（支援分頁、篩選、排序）
- [ ] `GET /api/videos/:id` - 取得特定影片詳情
- [ ] `POST /api/videos` - 新增影片（需認證）
- [ ] `PUT /api/videos/:id` - 更新影片資訊（需認證、權限驗證）
- [ ] `DELETE /api/videos/:id` - 刪除影片（需認證、權限驗證）
- [ ] `GET /api/videos/category/:category` - 按分類取得影片
- [ ] `PUT /api/videos/:id/view` - 增加觀看次數

#### [ ] 評論管理 API (`/api/comments`)
- [ ] `GET /api/comments/video/:videoId` - 取得特定影片的所有評論
- [ ] `POST /api/comments` - 新增評論（需認證）
- [ ] `PUT /api/comments/:id` - 更新評論（需認證、權限驗證）
- [ ] `DELETE /api/comments/:id` - 刪除評論（需認證、權限驗證）

#### [ ] 評分管理 API (`/api/ratings`)
- [ ] `GET /api/ratings/video/:videoId` - 取得特定影片的平均評分
- [ ] `POST /api/ratings` - 新增或更新評分（需認證）
- [ ] `GET /api/ratings/video/:videoId/user` - 取得當前用戶對特定影片的評分

#### [ ] 播放清單 API (`/api/playlists`)
- [ ] `GET /api/playlists` - 取得當前用戶的播放清單
- [ ] `GET /api/playlists/:id` - 取得特定播放清單
- [ ] `POST /api/playlists` - 新增播放清單（需認證）
- [ ] `PUT /api/playlists/:id` - 更新播放清單（需認證、權限驗證）
- [ ] `DELETE /api/playlists/:id` - 刪除播放清單（需認證、權限驗證）
- [ ] `POST /api/playlists/:id/videos` - 新增影片到播放清單
- [ ] `DELETE /api/playlists/:id/videos/:videoId` - 從播放清單移除影片

#### [ ] 收藏管理 API (`/api/favorites`)
- [ ] `GET /api/favorites` - 取得當前用戶的收藏清單
- [ ] `POST /api/favorites` - 新增收藏（需認證）
- [ ] `DELETE /api/favorites/:videoId` - 移除收藏（需認證）

### [ ] 統一回應格式設計
```javascript
// 成功回應
{
  success: true,
  data: { ... },
  message: "操作成功"
}

// 錯誤回應
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "錯誤訊息",
    details: { ... }
  }
}
```

### [ ] HTTP 狀態碼處理
- [ ] 200 OK - 成功取得資源
- [ ] 201 Created - 成功創建資源
- [ ] 204 No Content - 成功刪除資源
- [ ] 400 Bad Request - 請求參數錯誤
- [ ] 401 Unauthorized - 未認證
- [ ] 403 Forbidden - 無權限
- [ ] 404 Not Found - 資源不存在
- [ ] 500 Internal Server Error - 伺服器錯誤

### [ ] 中介軟體開發
- [ ] 身份驗證中介軟體（JWT 驗證）
- [ ] 權限驗證中介軟體（管理員/用戶）
- [ ] 錯誤處理中介軟體
- [ ] 請求驗證中介軟體（express-validator）
- [ ] 檔案上傳中介軟體（Multer）

### [ ] 設計模式實作說明

#### [ ] Singleton Pattern - 資料庫連線
```javascript
// 確保整個應用只有一個 MongoDB 連線實例
class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = null;
      Database.instance = this;
    }
    return Database.instance;
  }
  
  async connect() {
    if (!this.connection) {
      this.connection = await mongoose.connect(process.env.MONGODB_URI);
    }
    return this.connection;
  }
}
```

#### [ ] Repository Pattern - 資料存取抽象化
```javascript
// 將資料庫操作邏輯封裝，提供統一介面
class VideoRepository {
  async findAll(filter = {}, options = {}) {
    return await Video.find(filter, null, options);
  }
  
  async findById(id) {
    return await Video.findById(id);
  }
  
  async create(data) {
    return await Video.create(data);
  }
  
  async update(id, data) {
    return await Video.findByIdAndUpdate(id, data, { new: true });
  }
  
  async delete(id) {
    return await Video.findByIdAndDelete(id);
  }
}
```

#### [ ] Service Pattern - 業務邏輯分離
```javascript
// 將業務邏輯從 Controller 分離，提高可測試性
class VideoService {
  constructor(videoRepository, ratingRepository) {
    this.videoRepository = videoRepository;
    this.ratingRepository = ratingRepository;
  }
  
  async getVideoWithRating(id) {
    const video = await this.videoRepository.findById(id);
    const avgRating = await this.ratingRepository.calculateAverage(id);
    return { ...video.toObject(), averageRating: avgRating };
  }
}
```

---

## 前端開發

### [ ] 專案初始化
- [ ] 使用 Vite 建立 React 專案 (`npm create vite@latest frontend -- --template react`)
- [ ] 安裝必要套件
  - [ ] React Router DOM (`react-router-dom`)
  - [ ] Axios (`axios`)
  - [ ] TailwindCSS (`tailwindcss`, `postcss`, `autoprefixer`)
  - [ ] React Icons (`react-icons`)
  - [ ] React Hot Toast (`react-hot-toast`)
  - [ ] Zustand / Redux Toolkit（狀態管理）

### [ ] 專案架構設計
```
frontend/
├── src/
│   ├── api/              # API 串接
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   ├── videoApi.js
│   │   ├── commentApi.js
│   │   ├── ratingApi.js
│   │   ├── playlistApi.js
│   │   └── favoriteApi.js
│   ├── components/       # 可重用元件
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── Modal.jsx
│   │   ├── video/
│   │   │   ├── VideoCard.jsx
│   │   │   ├── VideoGrid.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── VideoInfo.jsx
│   │   ├── comment/
│   │   │   ├── CommentList.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   └── CommentForm.jsx
│   │   ├── rating/
│   │   │   └── RatingStars.jsx
│   │   └── playlist/
│   │       ├── PlaylistCard.jsx
│   │       └── PlaylistForm.jsx
│   ├── pages/            # 頁面元件
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── VideoDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── MyPlaylists.jsx
│   │   ├── Favorites.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFound.jsx
│   ├── context/          # Context API (狀態管理)
│   │   ├── AuthContext.jsx
│   │   └── VideoContext.jsx
│   ├── hooks/            # 自訂 Hooks
│   │   ├── useAuth.js
│   │   ├── useVideos.js
│   │   ├── useComments.js
│   │   └── useFavorites.js
│   ├── utils/            # 工具函數
│   │   ├── formatDate.js
│   │   ├── formatDuration.js
│   │   └── constants.js
│   ├── styles/           # 樣式檔案
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── tailwind.config.js
└── package.json
```

### [ ] 配置 TailwindCSS
- [ ] 安裝 TailwindCSS
- [ ] 配置 `tailwind.config.js`
- [ ] 引入 Tailwind 指令到 CSS

### [ ] 建立可重用元件

#### [ ] 通用元件
- [ ] Header - 導航列（含登入狀態、用戶頭像）
- [ ] Footer - 頁尾
- [ ] Loading - 載入動畫
- [ ] ErrorMessage - 錯誤訊息顯示
- [ ] Modal - 彈出視窗（用於表單、確認對話框）
- [ ] Button - 按鈕元件
- [ ] Input - 輸入框元件
- [ ] SearchBar - 搜尋列

#### [ ] 影片相關元件
- [ ] VideoCard - 影片卡片（縮圖、標題、評分）
- [ ] VideoGrid - 影片網格列表
- [ ] VideoPlayer - 影片播放器
- [ ] VideoInfo - 影片詳細資訊
- [ ] CategoryFilter - 分類篩選器

#### [ ] 評論相關元件
- [ ] CommentList - 評論列表
- [ ] CommentItem - 單一評論項目
- [ ] CommentForm - 評論表單

#### [ ] 評分元件
- [ ] RatingStars - 星級評分（顯示與互動）

#### [ ] 播放清單元件
- [ ] PlaylistCard - 播放清單卡片
- [ ] PlaylistForm - 播放清單建立/編輯表單
- [ ] VideoToPlaylistModal - 新增影片到播放清單彈窗

### [ ] 頁面開發

#### [ ] 首頁 (Home.jsx)
- [ ] 顯示精選影片輪播
- [ ] 顯示最新上傳影片
- [ ] 按分類顯示影片（Action、Drama、Comedy 等）
- [ ] 搜尋功能
- [ ] 分頁功能

#### [ ] 登入頁面 (Login.jsx)
- [ ] 登入表單（Email、Password）
- [ ] 表單驗證
- [ ] 登入錯誤處理
- [ ] 導向首頁或前一頁

#### [ ] 註冊頁面 (Register.jsx)
- [ ] 註冊表單（Username、Email、Password、Confirm Password）
- [ ] 表單驗證
- [ ] 註冊錯誤處理
- [ ] 註冊成功後導向登入頁

#### [ ] 影片詳情頁面 (VideoDetail.jsx)
- [ ] 影片播放器
- [ ] 影片資訊（標題、描述、導演、演員、年份）
- [ ] 平均評分顯示
- [ ] 用戶評分功能（需登入）
- [ ] 評論列表與新增評論（需登入）
- [ ] 收藏按鈕（需登入）
- [ ] 新增到播放清單按鈕（需登入）

#### [ ] 個人資料頁面 (Profile.jsx)
- [ ] 顯示用戶資訊
- [ ] 編輯個人資料表單
- [ ] 上傳頭像功能
- [ ] 顯示用戶上傳的影片（可編輯、刪除）

#### [ ] 我的播放清單頁面 (MyPlaylists.jsx)
- [ ] 顯示所有播放清單
- [ ] 建立新播放清單
- [ ] 編輯播放清單
- [ ] 刪除播放清單
- [ ] 查看播放清單內的影片

#### [ ] 我的收藏頁面 (Favorites.jsx)
- [ ] 顯示所有收藏的影片
- [ ] 移除收藏功能

#### [ ] 管理員儀表板 (AdminDashboard.jsx)
- [ ] 顯示所有影片（可新增、編輯、刪除）
- [ ] 顯示所有用戶（可刪除、變更權限）
- [ ] 統計資訊（總影片數、總用戶數、總評論數）

#### [ ] 404 頁面 (NotFound.jsx)
- [ ] 友善的 404 錯誤頁面

### [ ] 路由設定 (React Router)
- [ ] 公開路由
  - [ ] `/` - 首頁
  - [ ] `/login` - 登入頁
  - [ ] `/register` - 註冊頁
  - [ ] `/videos/:id` - 影片詳情頁
- [ ] 需認證路由（Protected Routes）
  - [ ] `/profile` - 個人資料頁
  - [ ] `/playlists` - 播放清單頁
  - [ ] `/favorites` - 收藏頁
- [ ] 管理員路由
  - [ ] `/admin/dashboard` - 管理員儀表板

### [ ] 狀態管理 (Context API / Redux)

#### [ ] AuthContext
- [ ] 管理登入狀態
- [ ] 儲存用戶資訊
- [ ] 管理 JWT Token
- [ ] 提供登入、登出、註冊方法

#### [ ] VideoContext（或使用 Custom Hooks）
- [ ] 管理影片列表狀態
- [ ] 管理篩選條件
- [ ] 管理分頁狀態

### [ ] API 串接

#### [ ] Axios 配置
- [ ] 建立 Axios 實例
- [ ] 設定 Base URL
- [ ] 設定攔截器（Interceptor）自動添加 JWT Token
- [ ] 設定錯誤處理

#### [ ] API 函數
- [ ] authApi.js - 認證相關 API
- [ ] videoApi.js - 影片相關 API
- [ ] commentApi.js - 評論相關 API
- [ ] ratingApi.js - 評分相關 API
- [ ] playlistApi.js - 播放清單相關 API
- [ ] favoriteApi.js - 收藏相關 API

### [ ] 前端設計模式實作說明

#### [ ] Observer Pattern - 狀態管理（Context API）
```javascript
// 使用 React Context 實現觀察者模式
// 當狀態改變時，自動通知所有訂閱的元件
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // 狀態改變時，所有使用 useAuth 的元件會自動更新
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### [ ] Factory Pattern - 元件工廠
```javascript
// 根據不同類型動態生成元件
const ComponentFactory = {
  video: (props) => <VideoCard {...props} />,
  playlist: (props) => <PlaylistCard {...props} />,
  user: (props) => <UserCard {...props} />
};

const CardFactory = ({ type, data }) => {
  const Component = ComponentFactory[type];
  return Component ? <Component {...data} /> : null;
};
```

#### [ ] Higher-Order Component (HOC) - 權限控制
```javascript
// 使用 HOC 保護需要認證的路由
const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <Component {...props} />;
  };
};
```

### [ ] 樣式設計
- [ ] 使用 TailwindCSS 實作響應式設計
- [ ] 設計 HBO MAX 風格的深色主題
- [ ] 設計 hover 效果與過渡動畫
- [ ] 設計載入動畫
- [ ] 設計表單驗證視覺回饋

---

## 功能實作檢查清單

### [ ] CRUD 功能實作

#### [ ] Create（創建）
- [ ] 用戶註冊
- [ ] 新增影片（管理員/上傳者）
- [ ] 新增評論
- [ ] 新增評分
- [ ] 新增播放清單
- [ ] 新增收藏

#### [ ] Read（讀取）
- [ ] 顯示所有影片（支援分頁、篩選）
- [ ] 顯示影片詳情
- [ ] 顯示評論列表
- [ ] 顯示播放清單
- [ ] 顯示收藏列表
- [ ] 顯示用戶資料

#### [ ] Update（更新）
- [ ] 更新用戶資料
- [ ] 更新影片資訊
- [ ] 更新評論
- [ ] 更新評分
- [ ] 更新播放清單

#### [ ] Delete（刪除）
- [ ] 刪除用戶（管理員）
- [ ] 刪除影片
- [ ] 刪除評論
- [ ] 刪除播放清單
- [ ] 移除收藏

### [ ] 前後端整合
- [ ] 前端成功呼叫所有後端 API
- [ ] 正確處理 API 回應
- [ ] 正確顯示錯誤訊息
- [ ] 實作 Loading 狀態
- [ ] 實作錯誤處理

---

## 加分項目

### [ ] 1. Figma 設計稿
- [ ] 建立 Figma 專案
- [ ] 設計首頁
- [ ] 設計影片詳情頁
- [ ] 設計登入/註冊頁
- [ ] 設計個人資料頁
- [ ] 設計播放清單頁
- [ ] 設計管理員儀表板
- [ ] 設計響應式版本（手機、平板）
- [ ] 定義設計系統（顏色、字體、間距）

### [ ] 2. 登入與權限管理

#### [ ] 後端實作
- [ ] JWT Token 生成與驗證
- [ ] 密碼加密（bcryptjs）
- [ ] Refresh Token 機制
- [ ] 身份驗證中介軟體
- [ ] 權限驗證中介軟體（管理員/一般用戶）
- [ ] 保護需認證的 API 端點

#### [ ] 前端實作
- [ ] 登入表單與驗證
- [ ] 註冊表單與驗證
- [ ] Token 儲存（localStorage / sessionStorage）
- [ ] 自動添加 Token 到 HTTP 請求 Header
- [ ] Protected Routes（需登入才能訪問的頁面）
- [ ] 管理員專屬頁面權限控制
- [ ] 登出功能
- [ ] Token 過期處理

### [ ] 3. 設計模式應用文件

#### [ ] 建立設計模式說明文件 (DESIGN_PATTERNS.md)
- [ ] 後端設計模式
  - [ ] Singleton Pattern 說明與實現
  - [ ] Repository Pattern 說明與實現
  - [ ] Service Pattern 說明與實現
- [ ] 前端設計模式
  - [ ] Observer Pattern 說明與實現（Context API）
  - [ ] Factory Pattern 說明與實現
  - [ ] HOC Pattern 說明與實現
- [ ] 各模式的應用場景與優勢

---

## 測試與部署

### [ ] 測試
- [ ] 後端 API 測試（使用 Postman / Thunder Client）
  - [ ] 測試所有 CRUD 端點
  - [ ] 測試錯誤處理
  - [ ] 測試權限控制
- [ ] 前端功能測試
  - [ ] 測試所有頁面渲染
  - [ ] 測試表單提交
  - [ ] 測試路由跳轉
  - [ ] 測試權限控制
- [ ] 整合測試
  - [ ] 測試前後端完整流程

### [ ] 部署準備
- [ ] 建立 .env.example 檔案
- [ ] 撰寫 README.md
  - [ ] 專案說明
  - [ ] 安裝步驟
  - [ ] 啟動方式
  - [ ] API 文件
  - [ ] 設計模式說明
- [ ] 建立 .gitignore

### [ ] （選擇性）部署
- [ ] 後端部署至 Heroku / Render / Railway
- [ ] 前端部署至 Vercel / Netlify
- [ ] MongoDB Atlas 雲端資料庫設定

---

## 文件撰寫

### [ ] API 文件 (API_DOCUMENTATION.md)
- [ ] 所有 API 端點列表
- [ ] 請求參數說明
- [ ] 回應格式範例
- [ ] 錯誤代碼說明

### [ ] 資料庫設計文件 (DATABASE_SCHEMA.md)
- [ ] 所有集合結構
- [ ] 欄位說明
- [ ] 關聯關係圖

### [ ] 設計模式文件 (DESIGN_PATTERNS.md)
- [ ] 已實作的設計模式
- [ ] 應用場景
- [ ] 程式碼範例

---

## 專案完成檢查

### [ ] 功能完整性
- [ ] 所有 CRUD 功能正常運作
- [ ] 前後端成功整合
- [ ] 權限控制正確實作

### [ ] 程式碼品質
- [ ] 程式碼結構清晰
- [ ] 遵循最佳實踐
- [ ] 錯誤處理完善
- [ ] 設計模式正確應用

### [ ] 使用者體驗
- [ ] 介面美觀易用
- [ ] 載入狀態明確
- [ ] 錯誤訊息友善
- [ ] 響應式設計

### [ ] 文件完整性
- [ ] README.md 完整
- [ ] API 文件清楚
- [ ] 設計模式說明詳細
- [ ] 資料庫設計文件完整

---

## 開發順序建議

1. **第一階段：基礎建設（Week 1）**
   - 資料庫設計與建立
   - 後端專案初始化與架構設計
   - 建立 Models 與 Repositories

2. **第二階段：後端開發（Week 2-3）**
   - 實作 Services 與 Controllers
   - 建立所有 API 端點
   - 實作權限控制
   - 使用 Postman 測試 API

3. **第三階段：前端開發（Week 4-5）**
   - 前端專案初始化
   - 建立可重用元件
   - 開發所有頁面
   - 實作路由與狀態管理

4. **第四階段：整合與優化（Week 6）**
   - 前後端整合
   - 完整功能測試
   - UI/UX 優化
   - 撰寫文件

5. **第五階段：加分項目（Week 7）**
   - Figma 設計稿
   - 設計模式文件
   - 部署上線


