# 個人網站重設計：Glass / Dark Neon

**日期：** 2026-05-25
**範圍：** 全站三頁（首頁、Projects、Resume）

---

## 設計方向

Glass / Dark Neon 風格。深色底搭配毛玻璃卡片、旋轉環形軌道、脈衝光暈，以及豐富進場動畫。強調 AI / Web3 技術背景。

---

## 視覺語言

### 色彩
| 用途 | 值 |
|------|-----|
| 背景底色 | `#080810` |
| Accent A（琥珀） | `#ffa032` |
| Accent B（紫） | `#b450ff` |
| 漸層方向 | `linear-gradient(90deg/135deg, #ffa032, #b450ff)` |
| 毛玻璃卡片底 | `rgba(255,255,255,0.04)` |
| 毛玻璃卡片邊框 | `rgba(255,255,255,0.07)` |
| 次要文字 | `rgba(255,255,255,0.35)` |
| 弱化文字 | `rgba(255,255,255,0.2)` |

### 動態效果（CSS-only，無外部 library）
- **光暈脈衝**：`opacity 0.15 → 0.32`，4s ease-in-out infinite
- **光暈浮動**：`translateY 0 → -10px`，7s ease-in-out infinite
- **旋轉環**：外環順時針 12s，內環逆時針 9s，linear infinite
- **進場 fade-up**：`opacity 0 + translateY(14px) → 正常`，0.6s ease，各元素 0.15s 錯開
- **badge 進場**：`scale(0.85) → scale(1)`，0.5s ease，比文字晚 0.3–0.5s

### 排版
- 字型沿用現有：Noto Sans TC（中文）/ Inter（英文）
- 主標題：`font-weight: 900`，大字
- 漸層文字：`background-clip: text` + `-webkit-text-fill-color: transparent`
- letter-spacing 廣泛使用於 label / 小標

### Navbar
- 所有頁面共用：`position: fixed`，毛玻璃背景 `rgba(8,8,16,0.7) + backdrop-filter: blur(12px)`
- 底部 `border-bottom: 1px solid rgba(255,255,255,0.05)`
- Logo 文字：`W·H`，`letter-spacing: 3px`，`font-weight: 800`

---

## 頁面設計

### 首頁（`app/page.tsx` + `components/about-hero.tsx`）

**版面：** 全螢幕沉浸式，內容錨定底部左側。

**背景層（z-0）**
- 底色 `#080810`
- 3 個光暈 blob：左上琥珀大球、右上紫中球、右下琥珀小球，各自獨立的 pulse + float 動畫
- 2 個旋轉環（`position: absolute; top: 50%; left: 50%`）：外圈 `220px` 琥珀細線，內圈 `160px` 紫虛線

**Navbar（z-10）**
- 左：`W·H` logo
- 右：About / Projects / Resume 連結

**底部內容區（z-10，`position: absolute; bottom: 24px; left: 24px; right: 24px`）**
- 小標：`PORTFOLIO · 2026`，letter-spacing，弱化白色
- 主標：`黃偉閎`，font-size 極大（`clamp(48px, 8vw, 96px)`），font-weight 900
- 副標：`AI · MULTI-AGENT · WEB3 · FULLSTACK`，漸層文字
- Tech badge 行：LangGraph（琥珀）、Multi-Agent（紫）、Solidity / Vue 3 / FastAPI（白半透明）
- 右下角：圓形 avatar（漸層邊框）+ Resume / Projects 兩顆按鈕（上：漸層填充；下：毛玻璃描邊）

**進場序列：** 小標 → 主標 → 副標 → badges → 按鈕，各差 0.15s fade-up

---

### Projects 頁（`app/projects/page.tsx` + `components/projects-section.tsx`）

**版面：** 單欄 scroll，最大寬度 `max-w-3xl mx-auto`。

**頁頭**
- 與首頁同款漸層文字標題：`Projects`
- 副標文字：`rgba(255,255,255,0.35)`

**專案卡片（`components/project-card.tsx`）**
```
background: rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.07)
border-radius: 12px
backdrop-filter: blur(8px)
hover: border-color → rgba(255,160,50,0.3), translateY(-2px), box-shadow 琥珀光暈
transition: all 0.25s ease
```

卡片內部：
- 標題（白色 font-weight 700）+ 副標（弱化白）+ 狀態 badge（完成：琥珀；進行中：橘色脈衝點）
- 技術 badge 行：AI 相關→琥珀色系；Web3 相關→紫色系；其他→白半透明
- 連結按鈕（GitHub / 網址）：毛玻璃小按鈕

**In Progress 區塊**
- 標題改用琥珀色（`#ffa032`）
- 進行中 badge：橘色脈衝點（`animation: pulse-glow 1.5s infinite`）

---

### Resume 頁（`app/resume/page.tsx` + `components/resume-section.tsx`）

**版面：** 單欄，最大寬度 `max-w-3xl mx-auto`，各 section 之間 `border-top: 1px solid rgba(255,255,255,0.06)` 分隔。

**Header 區塊**
- 學校名稱：白色大字
- 學程：漸層文字（`#ffa032 → #b450ff`）
- 成績卡片（Rank / Average）：毛玻璃卡片，數字用漸層文字
- 三個領域 badge：AI Design（琥珀）、Multi-Agent（紫）、Full-Stack（白半透明）

**Contact**
- 連結 hover：`color → #ffa032`，加 underline

**Technical Skills**
- 類別標籤（AI/Data、Backend…）：弱化白色，固定寬度對齊
- 內容：`rgba(255,255,255,0.5)`

**Activities / Leadership**
- 每條項目：標題白色 + 描述弱化白
- 黑客松入圍：加小琥珀 badge `入圍`

**Relevant Coursework**
- 每行 `justify-between`：課名（白色）+ 分數（漸層文字，font-size 大）
- `border-bottom: 1px solid rgba(255,255,255,0.05)`

---

## 實作範圍

| 檔案 | 改動說明 |
|------|---------|
| `app/globals.css` | 新增全域 keyframes（float, pulse-glow, spin-slow, spin-rev, fade-up, badge-in）；`body` 背景改 `#080810` |
| `app/layout.tsx` | `<html>` 移除 light/dark class 切換（全站固定深色）；Navbar 改為 fixed + 毛玻璃 |
| `components/navbar.tsx` | 毛玻璃 fixed navbar，logo 改 `W·H` |
| `components/about-hero.tsx` | 全部重寫，沉浸式版面 |
| `components/projects-section.tsx` | 更新標題樣式、背景、排版 |
| `components/project-card.tsx` | 重寫為毛玻璃卡片 |
| `components/resume-section.tsx` | 更新所有 section 樣式 |

**不動：**
- `components/ui/` 下所有 shadcn/ui 元件
- 所有頁面的文字內容（中英文內容一字不改）
- `next.config.mjs` / `tsconfig.json`
- `public/` 靜態資源

---

## 技術注意事項

- 所有動畫用純 CSS keyframes，不引入任何動畫 library
- `backdrop-filter: blur()` 在 Safari 需加 `-webkit-backdrop-filter`
- 漸層文字用 `background-clip: text` + `-webkit-text-fill-color: transparent`（需 `-webkit-background-clip: text`）
- 現有 `next-themes` 的 dark/light 切換可移除，改為全站固定深色（`<html>` 不需要 `class="dark"`）
- Tailwind v4 繼續使用；新增的動畫 class 在 `globals.css` 定義，以 `@keyframes` + utility class 方式加入
