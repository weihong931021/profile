# 黃偉閎個人網站 (profile)

## Commands

```bash
pnpm dev      # 開發伺服器 (http://localhost:3000)
pnpm build    # 建置
pnpm lint     # ESLint 檢查
```

## Architecture

Next.js 16 App Router 個人作品集網站，中文主、英文輔，部署於 Vercel。

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

- **主題**：全站深色（`#000000` 背景），無淺色模式切換
- **主色**：`--primary: #ffa032`（橘色）
- **輔色**：`--accent: #b450ff`（紫色）
- **其他 accent 一律用 `#ffa032`**，禁止混用 `#fbbf24`（黃色）
- **Navbar**：浮動 pill，`position: fixed, top: 20px, width: 90vw`，與下方內容左右邊緣對齊
- **Layout spacing**：各頁 section 頂部留 `110px` padding（navbar 高 46px + top 20px + buffer）；首頁 about-hero 用 `paddingTop: 86px`

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
- `images.unoptimized: true` — 為 Vercel 靜態部署相容性設定
- 主題色透過 CSS 變數控制（Tailwind v4），調色時改 `app/globals.css`
- 深色/淺色模式 favicon 在 `layout.tsx` 的 `metadata.icons` 配置
- MeshGradient 顏色設定在 `background-paper-shaders.tsx`，目前 `["#000000", "#1a1a1a", "#3a3a3a", "#555555"]`，不要加白色否則會蓋住白色文字
