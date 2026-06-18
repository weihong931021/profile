# 黃偉閎個人網站 (profile)

## Commands

```bash
pnpm dev      # 開發伺服器 (http://localhost:3000)
pnpm build    # 建置
pnpm lint     # ESLint 檢查

# 部署到 GCP Cloud Run（用根目錄 Dockerfile 建置 + 部署）
gcloud run deploy profile --source . --region asia-east1 \
  --allow-unauthenticated --port 8080 --memory 512Mi
```

## Architecture

Next.js 16 App Router 個人作品集網站，中文主、英文輔，以 Docker 容器部署於 **GCP Cloud Run**，正式網址 **[weihongweb.com](https://weihongweb.com)**。

```text
app/
  page.tsx             # 首頁 (AboutHero)
  projects/page.tsx    # 專案列表
  resume/page.tsx      # 履歷
  globals.css          # 全域樣式、CSS 變數、主題色
  layout.tsx           # 根 layout，載入字型、Navbar、Analytics
components/
  about-hero.tsx       # 首頁主要區塊（hero grid、avatar、contact pills）
  navbar.tsx           # 浮動 pill 導覽列（position: fixed, top: 20px）
  project-card.tsx     # 專案卡片元件
  projects-section.tsx # 專案頁內容（含 hardcoded 資料）
  resume-section.tsx   # 履歷頁內容
  ui/
    liquid-glass-button.tsx      # LiquidButton、GlassFilterProvider（自製）
    background-paper-shaders.tsx # PortfolioBackground — MeshGradient 背景（自製）
    text-scramble.tsx            # TextScramble 打亂字效果（自製）
    perspective-highlight.tsx    # Perspective 視差傾斜效果（自製）
    button.tsx / ...             # shadcn/ui 自動產生，勿手動修改
public/
  images/profile.jpg   # 大頭貼
  resume.pdf           # 可下載的 PDF 履歷
```

## Tech Stack

| 分類 | 套件 | 用途 |
| ---- | ---- | ---- |
| 框架 | Next.js 16 (App Router) | 路由、SSR、Image 最佳化 |
| UI | React 19 + TypeScript 5.7 | |
| 樣式 | Tailwind CSS v4 + tw-animate-css | utility classes、動畫 |
| 元件庫 | shadcn/ui (Radix UI) | 基礎元件（`components/ui/`） |
| 按鈕 | `@radix-ui/react-slot` + `class-variance-authority` | LiquidButton 實作 |
| 圖示 | lucide-react | navbar、project-card、resume 的 icon |
| 背景 | `@paper-design/shaders-react` (MeshGradient) | 全站背景動態漸層 |
| 字型 | `next/font/google` — Noto Sans TC + Inter | CSS var `--font-noto-sans-tc` / `--font-inter` |
| Analytics | `@vercel/analytics` | Vercel 流量統計 |
| 動畫 | framer-motion、gsap | 已安裝，部分元件使用 |
| 3D | three + @react-three/fiber | 已安裝，備用 |

## Design System

- **主題**：全站黑白單色（`#000000` 背景），無淺色模式切換
- **主色**：`--primary: #ffffff`（白色）— 所有 highlight、hover、accent 一律用白色系
- **輔色**：`--accent: rgba(255,255,255,0.55)`（半透明白）
- **禁止使用任何有色 accent**：橘色 `#ffa032`、紫色 `#b450ff`、黃色 `#fbbf24` 全部禁用
- **Hover 統一規則**：文字 hover → `rgba(255,255,255,0.85)`，border hover → `rgba(255,255,255,0.22)`，背景 hover → `rgba(255,255,255,0.07)`
- **Glow 效果**：`box-shadow: 0 0 18–24px rgba(255,255,255,0.18–0.3)`（白色，低透明度）
- **Navbar**：浮動 pill，`position: fixed, top: 20px, width: 90vw`，與下方內容左右邊緣對齊
- **Layout spacing**：各頁 section 頂部留 `110px` padding（navbar 高 46px + top 20px + buffer）；首頁 about-hero sticky 容器內用 `paddingTop: 86px`
- **首頁 scroll**：`about-hero` 為 `height: 250vh`，inner container `position: sticky; top: 0; height: 100vh`，GSAP ScrollTrigger 驅動 3 幕動畫

## Key Patterns

- **所有內容都 hardcode 在元件裡**：專案資料在 `projects-section.tsx`，履歷在 `resume-section.tsx`，沒有 CMS 或外部 API
- **套件管理器用 pnpm**，不要用 npm 或 yarn
- **新增 shadcn 元件**：`npx shadcn@latest add <component>`，不要手動改 `components/ui/` 裡的 shadcn 檔案
- **自製 UI 元件**（`liquid-glass-button`、`background-paper-shaders`、`text-scramble`、`perspective-highlight`）可直接修改
- **GlassFilter**：使用多個 `LiquidButton` 的頁面請在 section 頂部放一個 `<GlassFilterProvider />`，避免重複渲染 SVG filter
- **Container 寬度**：首頁用 `maxWidth: 90vw`；Projects/Resume 外層 `maxWidth: 90vw` + 內層 `maxWidth: 720px, margin: 0 auto`

## Custom UI Components — 使用說明

> 原始整合 Prompt（完整程式碼）存在 `.design/prompts/`：
> [`text-scramble.md`](.design/prompts/text-scramble.md) ·
> [`perspective-highlight.md`](.design/prompts/perspective-highlight.md) ·
> [`mini-navbar.md`](.design/prompts/mini-navbar.md) ·
> [`liquid-glass-button.md`](.design/prompts/liquid-glass-button.md) ·
> [`background-shaders.md`](.design/prompts/background-shaders.md)

### TextScramble (`components/ui/text-scramble.tsx`)
亂碼解碼動畫：hover 或頁面載入時，字元隨機打亂後逐一還原。

```tsx
<TextScramble
  text="HUANG WEI-HONG"
  scrambleClassName="text-white/20"   // 亂碼中的字元顏色
  className="opacity-40 hover:opacity-100 transition-opacity duration-300"
  autoPlay           // 頁面載入後自動播一次
  autoPlayDelay={600} // 延遲 ms
/>
```

### Perspective (`components/ui/perspective-highlight.tsx`)
滑鼠跟隨的 3D 傾斜視差效果，cursor 靠近元素時傾斜，離開後彈回。

```tsx
<Perspective
  maxRotateX={18}      // 上下最大傾斜角度
  maxRotateY={22}      // 左右最大傾斜角度
  smoothing={0.08}     // lerp 平滑係數（越小越慢）
  cardClassName="will-change-transform"  // 內層 card 的 className
>
  {/* 任何內容，通常是 avatar 或卡片 */}
</Perspective>
```

### LiquidButton + GlassFilterProvider (`components/ui/liquid-glass-button.tsx`)
液態玻璃質感按鈕，依賴 SVG filter。頁面有多個 LiquidButton 時，只需一個 `<GlassFilterProvider />`。

```tsx
// 頁面頂部放一次
<GlassFilterProvider />

// Tag 用法（小、non-interactive）
<LiquidButton size="sm" className="rounded-full text-white/35 cursor-default">
  LangGraph
</LiquidButton>

// CTA 用法（大、有邊框）
<LiquidButton
  size="lg"
  onClick={() => router.push("/resume")}
  className="rounded-full px-8 text-[11px] font-bold tracking-[2.5px] uppercase text-white border border-white/20 hover:border-white/40 transition-colors"
>
  RESUME
</LiquidButton>
```

### PortfolioBackground (`components/ui/background-paper-shaders.tsx`)
WebGL MeshGradient 背景動畫（@paper-design/shaders-react）。使用時 section 需要 `position: relative, overflow: hidden`，本身是 `position: absolute, inset: 0`。

```tsx
<section style={{ position: "relative", overflow: "hidden", background: "#000000" }}>
  <PortfolioBackground variant="mesh" />
  <div style={{ position: "relative", zIndex: 10 }}>
    {/* 內容 */}
  </div>
</section>
```

顏色設定在 `background-paper-shaders.tsx` 的 `COLORS` 陣列，目前是 `["#000000", "#1a1a1a", "#3a3a3a", "#555555"]`。

### Navbar (`components/navbar.tsx`)
浮動 pill，`position: fixed, top: 20px`，寬度 `90vw` 與頁面內容左右對齊。
Nav link 有 slide-up hover 動畫（flex column + translateY）。

## Gotchas

- `next.config.mjs` 設定 `typescript.ignoreBuildErrors: true`，TypeScript 錯誤不會擋 build
- `next.config.mjs` 設定 `output: 'standalone'`，供 Cloud Run 容器以 `node server.js` 啟動（Dockerfile 只複製 `.next/standalone` + `.next/static` + `public`）
- `images.unoptimized: true` — 關閉 Next.js 圖片最佳化（不依賴 sharp）
- 主題色透過 CSS 變數控制（Tailwind v4），調色時改 `app/globals.css`
- 深色/淺色模式 favicon 在 `layout.tsx` 的 `metadata.icons` 配置
- MeshGradient 顏色設定在 `background-paper-shaders.tsx`，目前 `["#000000", "#1a1a1a", "#3a3a3a", "#555555"]`，不要加白色否則會蓋住白色文字

## Deployment (GCP Cloud Run)

正式網址 **[weihongweb.com](https://weihongweb.com)**（含 `www`），HTTPS 憑證由 Google Trust Services 自動簽發/續期。

| 項目 | 值 |
| ---- | -- |
| GCP 專案 | `profolio-491709`（asia-east1） |
| Cloud Run 服務 | `profile`，port 8080、memory 512Mi、`min-instances=0`（閒置縮到零、不計費） |
| Cloud Run 原生網址 | `https://profile-u2ignn7ysa-de.a.run.app` |
| 建置 | `gcloud run deploy profile --source .` → Cloud Build 用根目錄 `Dockerfile` |

部署相關檔案：

- **`Dockerfile`** — 多階段（node:22-alpine + corepack/pnpm），用 Next.js `output: 'standalone'`，最終 `CMD node server.js`。
- **`.dockerignore` / `.gcloudignore`** — 排除 `node_modules`、`.next`、`public/venv`（本機 Python venv 垃圾）、`presentation/`、`.claude/` 等，避免進映像或被當公開靜態檔。
- **`package.json` 釘 `"packageManager": "pnpm@10.20.0"`** — ⚠️ 必要。否則 Docker 內 corepack 會抓最新 pnpm 11，把 `sharp` 的 ignored build script 當致命錯誤、`pnpm install --frozen-lockfile` 直接失敗。釘成本機版本（lockfile v9.0）即可。

自訂網域（Namecheap → Advanced DNS / BasicDNS）：

- apex `@` → 4 筆 A：`216.239.32.21 / 34.21 / 36.21 / 38.21`
- `www` → CNAME：`ghs.googlehosted.com`
- 擁有權驗證 TXT `google-site-verification=...`（@，勿刪）
- 對應指令：`gcloud beta run domain-mappings create --service profile --domain weihongweb.com --region asia-east1`（apex + `www` 各一個）
- 加速憑證簽發：DNS 完全傳播後，把 domain-mapping 刪掉重建即可強制立即重跑 ACME challenge（DNS 記錄不變）

成本：個人站流量低 + 縮到零，落在 Cloud Run 永久免費額度內，實際約 **$0/月**；勿把 `min-instances` 設 ≥ 1（會 24h 持續計費）。
