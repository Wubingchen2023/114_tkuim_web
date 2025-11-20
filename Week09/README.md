# Week09 - 註冊表單 + Node.js API 整合

## 專案結構

- `client/`：前端註冊表單頁面 (`signup_form.html`, `signup_form.js`)
- `server/`：Node.js + Express API (`app.js`, `routes/signup.js`)
- `tests/`：API 測試腳本 (`api.http`, `signup_collection.json`)

---

## 如何啟動前端

- 方式一：VS Code Live Server
- 在 client/signup_form.html 上按右鍵 →「Open with Live Server」
- 方式二：其他靜態伺服器 / Vite
- 只要能把 client/ 當作靜態檔案目錄即可。

## 如何啟動後端

```bash
cd server
npm install
npm run dev
# 伺服器預設在 http://localhost:3000


## API 文件

# POST /api/signup

- 說明：送出註冊資料，驗證所有欄位。
- Request Body (JSON)：
{
  "name": "string",
  "email": "string",
  "phone": "string (10 digits)",
  "password": "string (>=8, 英數混合)",
  "confirmPassword": "string",
  "interests": ["string"],
  "termsAccepted": true
}

- 成功回應 (201)：
{
  "message": "報名成功",
  "data": {
    "id": 1,
    "name": "...",
    "email": "...",
    "phone": "...",
    "interests": ["..."],
    "createdAt": "..."
  },
  "total": 1
}

- 失敗回應 (400)：
{
  "message": "欄位驗證失敗",
  "errors": [
    { "field": "email", "message": "Email 格式不正確" }
  ]
}

# GET /api/signup

- 說明：取得目前所有報名資料。
- 成功回應 (200)：
{
  "total": 3,
  "data": [
    { "id": 1, "name": "...", "...": "..." }
  ]
}
