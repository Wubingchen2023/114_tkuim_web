# HBO MAX Platform - 測試指南

## 測試檔案說明

### 1. api.http
HTTP API 測試檔案，可使用 VS Code 的 REST Client 擴充套件執行。

**安裝 REST Client:**
- 在 VS Code 中搜尋並安裝 "REST Client" 擴充套件

**使用方式:**
1. 開啟 `api.http` 檔案
2. 點擊每個請求上方的 "Send Request" 連結
3. 查看回應結果

**重要提示:**
- 將 `[VIDEO_ID]`、`[COMMENT_ID]` 等替換為實際的 ID
- 登入後將 Token 複製到 `@token` 變數中

### 2. auth.test.js
認證功能的單元測試，使用 Jest 測試框架。

**安裝測試依賴:**
```bash
cd server
npm install --save-dev jest supertest
```

**執行測試:**
```bash
npm test
```

**測試覆蓋率:**
- ✅ 用戶註冊（成功與失敗案例）
- ✅ 用戶登入（成功與失敗案例）
- ✅ 取得當前用戶資訊
- ✅ 密碼加密驗證
- ✅ 角色權限測試
- ✅ JWT Token 生成

## 測試前準備

1. **啟動後端伺服器:**
```bash
cd server
npm install
npm start
```

2. **確保 MongoDB 正在運行:**
```bash
docker-compose up -d mongodb
```
或使用本地 MongoDB

3. **初始化測試資料庫:**
確保有 `admin@hbomax.com` 管理員帳號

## API 測試工作流程

### 基本流程
1. 註冊新用戶
2. 登入取得 Token
3. 將 Token 設定到 `@token` 變數
4. 測試需認證的 API

### 範例工作流程
```http
### 1. 註冊
POST {{baseURL}}/auth/register
Content-Type: application/json

{
  "username": "demo",
  "email": "demo@example.com",
  "password": "demo123456"
}

### 2. 登入並複製 Token
# @name login
POST {{baseURL}}/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "demo123456"
}

### 3. 將上面回應中的 token 複製到變數
@token = YOUR_TOKEN_HERE

### 4. 測試受保護的 API
GET {{baseURL}}/favorites
Authorization: Bearer {{token}}
```

## 單元測試工作流程

### 執行所有測試
```bash
npm test
```

### 執行特定測試
```bash
npm test -- auth.test.js
```

### 查看測試覆蓋率
```bash
npm test -- --coverage
```

## 測試檢查清單

### 認證測試
- [ ] 成功註冊新用戶
- [ ] 拒絕重複 Email
- [ ] 拒絕無效 Email 格式
- [ ] 拒絕過短密碼
- [ ] 成功登入
- [ ] 拒絕錯誤密碼
- [ ] 取得當前用戶資訊

### 影片 API 測試
- [ ] 取得所有影片
- [ ] 取得影片詳情
- [ ] 新增影片（需認證）
- [ ] 更新影片（需權限）
- [ ] 刪除影片（需權限）
- [ ] 搜尋影片
- [ ] 分類篩選

### 評論 API 測試
- [ ] 取得影片評論
- [ ] 新增評論（需認證）
- [ ] 更新評論（需權限）
- [ ] 刪除評論（需權限）

### 評分 API 測試
- [ ] 取得平均評分
- [ ] 新增評分（需認證）
- [ ] 更新評分

### 播放清單 API 測試
- [ ] 取得播放清單（需認證）
- [ ] 建立播放清單（需認證）
- [ ] 更新播放清單（需權限）
- [ ] 刪除播放清單（需權限）
- [ ] 新增影片到清單
- [ ] 移除影片

### 收藏 API 測試
- [ ] 取得收藏清單（需認證）
- [ ] 新增收藏（需認證）
- [ ] 移除收藏（需認證）

## 常見問題

### Q: 測試時出現連線錯誤
A: 確保後端伺服器正在運行於 `http://localhost:5000`

### Q: 測試時出現認證錯誤
A: 確保已登入並將 Token 設定到 `@token` 變數

### Q: 單元測試失敗
A: 檢查 MongoDB 連線狀態，確保測試資料庫可用

### Q: 如何清理測試資料
A: 測試會自動清理，也可手動刪除測試用戶

## 擴展測試

您可以根據需要添加更多測試：

1. **影片 CRUD 測試** - `video.test.js`
2. **評論功能測試** - `comment.test.js`
3. **評分系統測試** - `rating.test.js`
4. **播放清單測試** - `playlist.test.js`
5. **收藏功能測試** - `favorite.test.js`

