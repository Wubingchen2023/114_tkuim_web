# HBO MAX 影視討論平台 - API 規格文件

## 基本資訊

- **Base URL**: `http://localhost:5000/api`
- **認證方式**: JWT Bearer Token
- **Content-Type**: `application/json`

## 統一回應格式

### 成功回應
```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

### 錯誤回應
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "details": []
  }
}
```

## HTTP 狀態碼

| 狀態碼 | 說明 |
|--------|------|
| 200 | 成功取得資源 |
| 201 | 成功創建資源 |
| 204 | 成功刪除資源（無內容） |
| 400 | 請求參數錯誤 |
| 401 | 未認證 |
| 403 | 無權限 |
| 404 | 資源不存在 |
| 500 | 伺服器錯誤 |

---

## 1. 認證 API

### 1.1 註冊用戶

**端點**: `POST /auth/register`

**需認證**: 否

**請求參數**:
```json
{
  "username": "string (min: 3)",
  "email": "string (email format)",
  "password": "string (min: 6)"
}
```

**成功回應** (201):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "testuser",
      "email": "test@example.com",
      "role": "user",
      "avatar": "https://via.placeholder.com/150"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

**錯誤回應** (400):
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ERROR",
    "message": "email already exists"
  }
}
```

---

### 1.2 登入

**端點**: `POST /auth/login`

**需認證**: 否

**請求參數**:
```json
{
  "email": "string",
  "password": "string"
}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "testuser",
      "email": "test@example.com",
      "role": "user",
      "avatar": "https://via.placeholder.com/150"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

---

### 1.3 取得當前用戶資訊

**端點**: `GET /auth/me`

**需認證**: 是

**Headers**:
```
Authorization: Bearer {token}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "role": "user",
    "avatar": "https://via.placeholder.com/150",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

## 2. 影片 API

### 2.1 取得所有影片

**端點**: `GET /videos`

**需認證**: 否

**查詢參數**:
| 參數 | 類型 | 說明 | 預設值 |
|------|------|------|--------|
| page | number | 頁碼 | 1 |
| limit | number | 每頁數量 | 12 |
| category | string | 分類篩選 | - |
| search | string | 搜尋關鍵字 | - |
| sort | string | 排序方式 | -createdAt |

**範例**: `GET /videos?page=1&limit=6&category=action`

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "不可能的任務：最終清算",
        "description": "伊森不只要面對過去的種種...",
        "thumbnail": "https://example.com/image.jpg",
        "videoUrl": "https://www.youtube.com/watch?v=...",
        "duration": 163,
        "category": "action",
        "releaseYear": 2025,
        "director": "Christopher McQuarrie",
        "cast": ["Tom Cruise", "Hayley Atwell"],
        "rating": 7.2,
        "viewCount": 1234,
        "uploadedBy": {
          "_id": "507f1f77bcf86cd799439012",
          "username": "admin",
          "avatar": "https://via.placeholder.com/150"
        },
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "pages": 5
    }
  }
}
```

---

### 2.2 取得影片詳情

**端點**: `GET /videos/:id`

**需認證**: 否

**路徑參數**:
- `id`: 影片 ID

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "不可能的任務：最終清算",
    "description": "伊森不只要面對過去的種種...",
    "thumbnail": "https://example.com/image.jpg",
    "videoUrl": "https://www.youtube.com/watch?v=...",
    "duration": 163,
    "category": "action",
    "releaseYear": 2025,
    "director": "Christopher McQuarrie",
    "cast": ["Tom Cruise", "Hayley Atwell", "Ving Rhames"],
    "rating": 7.2,
    "viewCount": 1234,
    "averageRating": 7.5,
    "uploadedBy": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "admin",
      "avatar": "https://via.placeholder.com/150"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 2.3 新增影片

**端點**: `POST /videos`

**需認證**: 是

**請求參數**:
```json
{
  "title": "string (required)",
  "description": "string",
  "thumbnail": "string (URL, required)",
  "videoUrl": "string (URL, required)",
  "duration": "number",
  "category": "string (action|drama|comedy|sci-fi|horror|animation|superhero)",
  "releaseYear": "number",
  "director": "string",
  "cast": ["string"]
}
```

**成功回應** (201):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "測試影片",
    ...
  },
  "message": "Video created successfully"
}
```

---

### 2.4 更新影片

**端點**: `PUT /videos/:id`

**需認證**: 是（需為上傳者或管理員）

**請求參數**: 同新增影片（所有欄位可選）

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  },
  "message": "Video updated successfully"
}
```

---

### 2.5 刪除影片

**端點**: `DELETE /videos/:id`

**需認證**: 是（需為上傳者或管理員）

**成功回應** (200):
```json
{
  "success": true,
  "data": null,
  "message": "Video deleted successfully"
}
```

---

### 2.6 增加觀看次數

**端點**: `PUT /videos/:id/view`

**需認證**: 否

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "viewCount": 1235,
    ...
  }
}
```

---

## 3. 評論 API

### 3.1 取得影片評論

**端點**: `GET /comments/video/:videoId`

**需認證**: 否

**成功回應** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "videoId": "507f1f77bcf86cd799439011",
      "userId": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "testuser",
        "avatar": "https://via.placeholder.com/150"
      },
      "content": "這部影片太棒了！",
      "likes": 5,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 3.2 新增評論

**端點**: `POST /comments`

**需認證**: 是

**請求參數**:
```json
{
  "videoId": "string (required)",
  "content": "string (required, max: 500)"
}
```

**成功回應** (201):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "videoId": "507f1f77bcf86cd799439011",
    "userId": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "testuser",
      "avatar": "https://via.placeholder.com/150"
    },
    "content": "這部影片太棒了！",
    "likes": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Comment created successfully"
}
```

---

### 3.3 更新評論

**端點**: `PUT /comments/:id`

**需認證**: 是（需為評論作者或管理員）

**請求參數**:
```json
{
  "content": "string (required)"
}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "content": "更新後的評論內容",
    ...
  },
  "message": "Comment updated successfully"
}
```

---

### 3.4 刪除評論

**端點**: `DELETE /comments/:id`

**需認證**: 是（需為評論作者或管理員）

**成功回應** (200):
```json
{
  "success": true,
  "data": null,
  "message": "Comment deleted successfully"
}
```

---

## 4. 評分 API

### 4.1 取得影片平均評分

**端點**: `GET /ratings/video/:videoId`

**需認證**: 否

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "averageRating": 7.5,
    "count": 42
  }
}
```

---

### 4.2 取得用戶對影片的評分

**端點**: `GET /ratings/video/:videoId/user`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "videoId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "score": 8,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 4.3 新增或更新評分

**端點**: `POST /ratings`

**需認證**: 是

**請求參數**:
```json
{
  "videoId": "string (required)",
  "score": "number (1-10, required)"
}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "videoId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "score": 8,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Rating saved successfully"
}
```

---

## 5. 播放清單 API

### 5.1 取得用戶的播放清單

**端點**: `GET /playlists`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "name": "我的收藏清單",
      "description": "收集我最喜歡的影片",
      "userId": "507f1f77bcf86cd799439012",
      "videos": [
        {
          "_id": "507f1f77bcf86cd799439011",
          "title": "不可能的任務：最終清算",
          "thumbnail": "https://example.com/image.jpg",
          "duration": 163
        }
      ],
      "isPublic": false,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 5.2 取得特定播放清單

**端點**: `GET /playlists/:id`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "我的收藏清單",
    "description": "收集我最喜歡的影片",
    "userId": "507f1f77bcf86cd799439012",
    "videos": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "不可能的任務：最終清算",
        "thumbnail": "https://example.com/image.jpg",
        "duration": 163,
        "category": "action",
        "rating": 7.2
      }
    ],
    "isPublic": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 5.3 新增播放清單

**端點**: `POST /playlists`

**需認證**: 是

**請求參數**:
```json
{
  "name": "string (required)",
  "description": "string",
  "isPublic": "boolean (default: false)"
}
```

**成功回應** (201):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "我的收藏清單",
    "description": "收集我最喜歡的影片",
    "userId": "507f1f77bcf86cd799439012",
    "videos": [],
    "isPublic": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Playlist created successfully"
}
```

---

### 5.4 更新播放清單

**端點**: `PUT /playlists/:id`

**需認證**: 是（需為清單擁有者或管理員）

**請求參數**:
```json
{
  "name": "string",
  "description": "string",
  "isPublic": "boolean"
}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "更新後的清單名稱",
    ...
  },
  "message": "Playlist updated successfully"
}
```

---

### 5.5 刪除播放清單

**端點**: `DELETE /playlists/:id`

**需認證**: 是（需為清單擁有者或管理員）

**成功回應** (200):
```json
{
  "success": true,
  "data": null,
  "message": "Playlist deleted successfully"
}
```

---

### 5.6 新增影片到播放清單

**端點**: `POST /playlists/:id/videos`

**需認證**: 是

**請求參數**:
```json
{
  "videoId": "string (required)"
}
```

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "videos": [
      {
        "_id": "507f1f77bcf86cd799439011",
        ...
      }
    ],
    ...
  },
  "message": "Video added to playlist"
}
```

---

### 5.7 從播放清單移除影片

**端點**: `DELETE /playlists/:id/videos/:videoId`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "videos": [],
    ...
  },
  "message": "Video removed from playlist"
}
```

---

## 6. 收藏 API

### 6.1 取得用戶收藏清單

**端點**: `GET /favorites`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "不可能的任務：最終清算",
      "thumbnail": "https://example.com/image.jpg",
      "duration": 163,
      "category": "action",
      "rating": 7.2,
      "viewCount": 1234
    }
  ]
}
```

---

### 6.2 新增收藏

**端點**: `POST /favorites`

**需認證**: 是

**請求參數**:
```json
{
  "videoId": "string (required)"
}
```

**成功回應** (201):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "userId": "507f1f77bcf86cd799439012",
    "videoId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "不可能的任務：最終清算",
      "thumbnail": "https://example.com/image.jpg",
      "duration": 163,
      "category": "action",
      "rating": 7.2
    },
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Added to favorites"
}
```

---

### 6.3 移除收藏

**端點**: `DELETE /favorites/:videoId`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": null,
  "message": "Removed from favorites"
}
```

---

### 6.4 檢查是否已收藏

**端點**: `GET /favorites/:videoId/check`

**需認證**: 是

**成功回應** (200):
```json
{
  "success": true,
  "data": {
    "isFavorited": true
  }
}
```

---

## 錯誤代碼

| 錯誤代碼 | 說明 |
|----------|------|
| UNAUTHORIZED | 未提供認證 Token |
| INVALID_TOKEN | Token 無效或已過期 |
| FORBIDDEN | 無權限執行此操作 |
| NOT_FOUND | 資源不存在 |
| VALIDATION_ERROR | 請求參數驗證失敗 |
| DUPLICATE_ERROR | 資源已存在（Email、Username） |
| INVALID_ID | ID 格式錯誤 |
| SERVER_ERROR | 伺服器內部錯誤 |

---

## 注意事項

1. 所有需要認證的 API 必須在 Header 中包含有效的 JWT Token
2. Token 格式: `Authorization: Bearer {your-jwt-token}`
3. 所有時間格式使用 ISO 8601 標準
4. 分頁從 1 開始計數
5. 排序參數使用 `-` 前綴表示降序（如 `-createdAt`）
6. 所有 ID 使用 MongoDB ObjectId 格式（24 個十六進制字符）

---

**版本**: v1.0.0  
**最後更新**: 2025-12-29
