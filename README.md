# Fidogood 飛朵資訊

個人專業作品集網站，展示技術能力與專案經歷。

---

## � Specification（規格）

### 功能需求

| ID | 功能名稱 | 描述 | 優先級 |
|----|---------|------|--------|
| F01 | 自我介紹 | 展示個人簡介、職稱、Email、所在地 | P0 |
| F02 | 技能展示 | 分類顯示技術技能（Backend、Database、Frontend、SA） | P0 |
| F03 | 專案戰績 | 列表顯示歷年專案、使用技術、擔任角色 | P0 |
| F04 | 聯絡表單 | 訪客可填寫表單發送郵件給站長 | P1 |
| F05 | CMS 後台 | 密碼保護的內容管理系統，可編輯所有內容 | P1 |
| F06 | 響應式設計 | 支援桌面、平板、手機瀏覽 | P0 |
| F07 | 深色主題 | 深藍色背景搭配互補色區塊設計 | P2 |

### 非功能需求

| ID | 需求 | 描述 |
|----|------|------|
| NF01 | 效能 | 首頁載入時間 < 3 秒 |
| NF02 | 相容性 | 支援 Chrome、Firefox、Safari、Edge 最新版本 |
| NF03 | 安全性 | 環境變數不得暴露於前端程式碼 |
| NF04 | SEO | 具備基本 meta tags 和語意化 HTML |

---

## 🏗 Design（設計）

### 系統架構

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Navbar  │  │  Hero   │  │ Skills  │  │Projects │  ...   │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
│       └────────────┴────────────┴────────────┘              │
│                         │                                    │
│              ┌──────────▼──────────┐                        │
│              │   ContentContext    │ ◄── React Context API  │
│              │   (Global State)    │                        │
│              └──────────┬──────────┘                        │
│                         │                                    │
│              ┌──────────▼──────────┐                        │
│              │    localStorage     │ ◄── 資料持久化          │
│              └─────────────────────┘                        │
├─────────────────────────────────────────────────────────────┤
│                    External Services                         │
│  ┌─────────────┐                    ┌─────────────┐         │
│  │   EmailJS   │ ◄── 郵件發送       │GitHub Pages │ ◄── 託管│
│  └─────────────┘                    └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 元件結構

```
App
├── ContentProvider          # 全域狀態提供者
│   └── MainContent
│       ├── Navbar           # 導覽列（含登入功能）
│       ├── [Home Page]
│       │   ├── Hero         # 自我介紹
│       │   ├── Skills       # 技能展示
│       │   ├── Projects     # 專案戰績
│       │   ├── Contact      # 聯絡表單
│       │   └── Footer       # 頁尾
│       └── [CMS Page]
│           └── CMS          # 後台管理介面
```

### 配色設計

| 區塊 | 背景色調 | 強調色 |
|------|---------|--------|
| Navbar | white (淺色系) | blue |
| Hero（自我介紹） | cyan/sky/blue | cyan |
| Skills（萬能工具箱） | slate/zinc/neutral | lime |
| Projects（專案戰績） | orange/red/rose | amber |
| Contact（和我聯絡） | slate/indigo | violet |
| Footer | slate-100 (淺色系) | blue |

---

## 💻 Development（開發）

### 技術棧

| 類別 | 技術 | 版本 |
|------|------|------|
| 框架 | React | 19.x |
| 語言 | TypeScript | 5.8.x |
| 建構工具 | Vite | 6.x |
| 樣式 | Tailwind CSS | CDN |
| 圖示 | Lucide React | 0.561.x |
| 郵件服務 | EmailJS | REST API |
| 部署 | GitHub Actions | - |
| 託管 | GitHub Pages | - |

### 目錄結構

```
AlexWeb/
├── components/              # React 元件
│   ├── Navbar.tsx           # 導覽列（含圖示、登入表單）
│   ├── Hero.tsx             # 自我介紹區塊
│   ├── Skills.tsx           # 技能展示（4 欄卡片）
│   ├── Projects.tsx         # 專案戰績（3 欄卡片）
│   ├── Contact.tsx          # 聯絡表單（EmailJS 整合）
│   ├── Footer.tsx           # 頁尾
│   ├── CMS.tsx              # 後台管理介面
│   └── Editable.tsx         # 可編輯文字元件
├── context/
│   └── ContentContext.tsx   # 全域狀態管理（Context + localStorage）
├── .github/workflows/
│   └── deploy.yml           # CI/CD 部署腳本
├── public/
│   └── CNAME                # 自訂網域設定
├── App.tsx                  # 主應用程式入口
├── index.tsx                # React DOM 渲染進入點
├── index.html               # HTML 模板
├── constants.ts             # 初始資料設定
├── types.ts                 # TypeScript 型別定義
├── vite-env.d.ts            # Vite 環境變數型別
├── vite.config.ts           # Vite 設定檔
├── tsconfig.json            # TypeScript 設定
└── package.json             # 專案依賴與腳本
```

### 環境變數

| 變數名稱 | 用途 | 必要 |
|----------|------|------|
| `VITE_ADMIN_PASSWORD` | CMS 後台登入密碼 | ✅ |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS 服務 ID | ✅ |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS 模板 ID | ✅ |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS 公開金鑰 | ✅ |

### 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（http://localhost:3000）
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

### 部署流程

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│  Push    │ ──► │   GitHub     │ ──► │    Build     │ ──► │   Deploy    │
│  Code    │     │   Actions    │     │  (npm build) │     │ GitHub Pages│
└──────────┘     └──────────────┘     └──────────────┘     └─────────────┘
                       │
                       ▼
              ┌──────────────┐
              │   Secrets    │
              │ (環境變數)    │
              └──────────────┘
```

---

## 🌐 Deployment（部署資訊）

| 項目 | 值 |
|------|-----|
| **網站網址** | https://fidogood.com |
| **GitHub Repo** | https://github.com/linalex1314/AlexWeb |
| **部署方式** | GitHub Actions → GitHub Pages |
| **分支** | main |

---

## 📄 License

© 2025 DEV.LOG Portfolio. All rights reserved.
