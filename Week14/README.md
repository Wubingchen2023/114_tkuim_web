# Netflix 風格影音平台

> 一個仿照 Netflix 介面設計的響應式影音串流平台前端專案

![Netflix Style](https://img.shields.io/badge/Style-Netflix-E50914?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 專案簡介

本專案是一個高度仿照 Netflix 介面的前端網頁應用，實作了現代化的影音串流平台核心功能，包含響應式設計、互動式輪播、搜尋功能等特性。

### 主要特色

- **Netflix 風格設計** - 完整還原 Netflix 的視覺風格與配色
- **完全響應式** - 支援桌面、平板、手機等多種裝置
- **互動式輪播** - 流暢的水平捲動與導航控制
- **智能搜尋** - 支援鍵盤快捷鍵的搜尋功能
- **精緻動畫** - 懸停效果、過渡動畫等細節處理
- **效能優化** - 採用延遲載入、節流等優化技術

---

## 快速開始

### 檔案結構

```
Week14/
├── index.html      # 主要 HTML 結構
├── styles.css      # 完整樣式表
├── script.js       # JavaScript 互動功能
├── todo.md         # 開發清單與規劃
└── README.md       # 本文件
```

### 使用方法

1. **直接開啟**
   ```bash
   # 在瀏覽器中開啟 index.html
   open index.html  # macOS
   start index.html # Windows
   ```

2. **使用本地伺服器（推薦）**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (需安裝 http-server)
   npx http-server -p 8000
   ```
   
   然後在瀏覽器訪問：`http://localhost:8000`

---

## 功能展示

### 1. 響應式導航列

- Netflix 經典紅色 Logo
- 完整導航選單（首頁、節目、電影等）
- 搜尋、通知、使用者選單
- 滾動時自動變化背景色

### 2. 搜尋功能

- **開啟搜尋：** 點擊搜尋圖示或按 `Ctrl + K` (Windows) / `Cmd + K` (Mac)
- **關閉搜尋：** 按 `ESC` 或點擊關閉按鈕
- **自動聚焦：** 開啟時自動聚焦到輸入框

### 3. 內容輪播

三個主要內容區塊：
- **Netflix 最新作品** - 最新上架影片展示
- **日本動畫** - 動畫類別內容
- **本日給您的最佳推薦** - 個人化推薦內容

**操作方式：**
- 滑鼠懸停顯示左右箭頭
- 點擊箭頭捲動內容
- 觸控裝置支援手勢滑動

### 4. 影片卡片互動

- **懸停放大** - 滑鼠懸停卡片時自動放大 (1.1x)
- **資訊顯示** - 顯示影片標題與播放按鈕
- **特殊標籤** - TOP 10 徽章、最新上架標籤

### 5. 使用者選單

- 懸停使用者頭像顯示下拉選單
- 包含帳戶設定、個人資料、登出選項

---

## 技術棧

### 前端技術

| 技術 | 說明 |
|------|------|
| **HTML5** | 語義化標籤、無障礙屬性 (aria-label) |
| **CSS3** | Flexbox、Grid、自訂屬性、動畫 |
| **JavaScript (ES6+)** | DOM 操作、事件處理、Intersection Observer |
| **Google Fonts** | Noto Sans TC（中文最佳化字體） |

### 核心技術實作

**CSS 變數系統**
```css
--netflix-red: #E50914
--netflix-black: #141414
--text-white: #FFFFFF
```

**響應式斷點**
- 桌面版：> 1024px
- 平板版：768px - 1024px
- 手機版：< 768px
- 小螢幕：< 480px

**JavaScript 功能**
- 事件監聽與處理
- 平滑捲動動畫
- Intersection Observer API
- 節流函數 (Throttle)

---

## 📱 響應式設計

### 桌面版 (> 1024px)
- 完整導航選單
- 每行顯示 6-8 個影片卡片
- 完整懸停效果與動畫

### 平板版 (768px - 1024px)
- 簡化導航選單
- 每行顯示 3-4 個影片卡片
- 調整字體與間距

### 手機版 (< 768px)
- 漢堡選單（僅顯示圖示）
- 每行顯示 2-3 個影片卡片
- 觸控友善的間距設計

---

## 效能優化

### 1. 圖片延遲載入
使用 Intersection Observer API 實作圖片延遲載入，減少初始載入時間。

### 2. 事件節流
對滾動事件進行節流處理，降低 CPU 使用率。

```javascript
const throttledScroll = throttle(() => {
    // 滾動處理邏輯
}, 100);
```

### 3. CSS 動畫優化
使用 `transform` 和 `opacity` 屬性進行動畫，啟用 GPU 加速。

### 4. 平滑捲動
採用 CSS `scroll-behavior: smooth` 與 JavaScript `scrollBy()` 結合。

---

## 設計系統

### 配色方案

| 顏色名稱 | HEX 值 | 用途 |
|---------|--------|------|
| Netflix 紅 | #E50914 | Logo、強調元素、按鈕 |
| 深黑色 | #141414 | 主背景色 |
| 深灰色 | #222222 | 次要背景 |
| 淺灰色 | #B3B3B3 | 次要文字 |
| 純白色 | #FFFFFF | 主要文字 |

### 字體系統

- **主要字體：** Noto Sans TC（Google Fonts）
- **備用字體：** -apple-system, BlinkMacSystemFont, Segoe UI, Arial
- **字重：** 400 (Regular), 500 (Medium), 700 (Bold)

### 動畫設計

所有過渡動畫統一使用 `0.3s ease` 時間函數，確保一致的使用者體驗。

---

## 鍵盤快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl + K` / `Cmd + K` | 開啟搜尋框 |
| `ESC` | 關閉搜尋框 |
| `Tab` | 鍵盤導航 |

---

## 自訂與擴充

### 修改配色

編輯 `styles.css` 中的 CSS 變數：

```css
:root {
    --netflix-red: #E50914;    /* 修改主題色 */
    --netflix-black: #141414;   /* 修改背景色 */
}
```

### 新增內容區塊

在 `index.html` 中複製現有的 `<section>` 區塊：

```html
<section class="content-section">
    <h2 class="section-title">新的分類標題</h2>
    <div class="carousel-container">
        <!-- 輪播內容 -->
    </div>
</section>
```

### 修改影片卡片

編輯 `.movie-card` 結構並更新圖片與文字：

```html
<div class="movie-card">
    <div class="movie-thumbnail">
        <img src="你的圖片路徑" alt="影片標題">
        <div class="movie-overlay">
            <h3 class="movie-title">影片標題</h3>
            <button class="play-btn">▶ 播放</button>
        </div>
    </div>
</div>
```

---

## 瀏覽器支援

| 瀏覽器 | 版本 | 支援狀態 |
|--------|------|---------|
| Chrome | 90+ | 完全支援 |
| Firefox | 88+ | 完全支援 |
| Safari | 14+ | 完全支援 |
| Edge | 90+ | 完全支援 |
| IE 11 | - | 不支援 |

---

## 專案數據

- **總代碼行數：** ~990 行
  - HTML：250 行
  - CSS：480 行
  - JavaScript：260 行
- **檔案大小：** ~30KB（未壓縮）
- **支援裝置：** 桌面、平板、手機
- **相容性：** 現代瀏覽器 (Chrome 90+, Firefox 88+, Safari 14+)

---

## 學習資源

### 相關文件

- [todo.md](todo.md) - 完整的開發規劃與檢查清單
- [index.html](index.html) - HTML 結構原始碼
- [styles.css](styles.css) - CSS 樣式原始碼
- [script.js](script.js) - JavaScript 功能原始碼

### 技術參考

- [MDN Web Docs](https://developer.mozilla.org/) - Web 技術文件
- [CSS Tricks](https://css-tricks.com/) - CSS 技巧與教學
- [JavaScript.info](https://javascript.info/) - JavaScript 教學

---

## 開發重點

### 已實作功能

- [x] 響應式導航列
- [x] 搜尋功能（含鍵盤快捷鍵）
- [x] 三個內容輪播區塊
- [x] 影片卡片懸停效果
- [x] 使用者選單下拉
- [x] 觸控裝置手勢支援
- [x] 效能優化（延遲載入、節流）
- [x] 無障礙功能支援

### 可擴充功能

- [ ] 影片預覽自動播放
- [ ] 內容篩選與分類
- [ ] 我的片單收藏功能
- [ ] 觀看歷史記錄
- [ ] 多語言切換
- [ ] 深色/淺色主題切換
- [ ] 無限捲動載入

---

## 已知問題

目前無已知問題。如發現任何問題，請在專案中記錄。

---

## 更新日誌

### Version 1.0.0 (2025-12-15)
- 初始版本發布
- 完整 Netflix 風格介面
- 響應式設計支援
- 效能優化實作
- 搜尋功能與鍵盤快捷鍵

---

## 開發資訊

**專案名稱：** Netflix 風格影音平台  
**開發週次：** Week 14  
**開發時間：** 2025-12-15  
**技術棧：** HTML5 + CSS3 + Vanilla JavaScript  
**開發工具：** VS Code, Chrome DevTools  