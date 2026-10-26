# 黃偉閎個人網站 (profile)

## Commands

```bash
pnpm dev      # 開發伺服器 (http://localhost:3000)
pnpm build    # 建置
pnpm lint     # ESLint 檢查（⚠️ eslint 目前未安裝會直接失敗；型別檢查用 pnpm exec tsc --noEmit -p .）

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
- **Layout spacing**：各頁 section 頂部留 `110px` padding（navbar 高 46px + top 20px + buffer）；首頁 about-hero 頂部 padding 桌面 `86px`、手機 `120px`（`pt-[120px] md:pt-[86px]`，讓大頭貼和 navbar 之間有空間）
- **首頁 scroll**：`about-hero` 手機 `min-h-svh`、桌面 `md:min-h-screen`（100vh），GSAP ScrollTrigger scrub 驅動離場動畫（左欄 y:-48 + opacity:0，右欄 scale:0.82 + opacity:0）；背景由 `app/page.tsx` 依捲動位置控制 dark↔light 切換（見下方 GSAP 段落）

## Key Patterns

- **所有內容都 hardcode 在元件裡**：專案資料在 `projects-section.tsx`，履歷在 `resume-section.tsx`，沒有 CMS 或外部 API
- **套件管理器用 pnpm**，不要用 npm 或 yarn
- **新增 shadcn 元件**：`npx shadcn@latest add <component>`，不要手動改 `components/ui/` 裡的 shadcn 檔案
- **自製 UI 元件**（`liquid-glass-button`、`background-paper-shaders`、`text-scramble`、`perspective-highlight`）可直接修改
- **GlassFilter**：使用多個 `LiquidButton` 的頁面請在 section 頂部放一個 `<GlassFilterProvider />`，避免重複渲染 SVG filter
- **Container 寬度**：首頁用 `maxWidth: 90vw`；Projects/Resume 外層 `maxWidth: 90vw` + 內層 `maxWidth: 720px, margin: 0 auto`；兩者的 `4vw` 內距只在桌面（`md:px-[4vw]`）

## RWD（手機版）

- **斷點**：`md`（768px）切換版面——以下手機單欄、以上桌面兩欄（平板直向、寬度 ≥ 768px 的手機橫放走桌面版）；`sm`（640px）只用在 navbar（< 640px 品牌字只顯示 `WEIHONG`、連結間距縮小）
- **inline style 會蓋掉 Tailwind class**：手機/桌面值不同的屬性必須從 `style={{}}` 移除，改寫成 mobile-first class + `md:` 原本的桌面值（例：`className="grid-cols-1 md:grid-cols-[1fr_36vw]"`）。屬性留在 inline 的話 class 會無聲失效
- **手機容器**：內容寬 = 90vw，與 navbar 左右對齊
- **手機 Hero**：單欄置中，大頭貼＋聯絡圖示在上（`order-first md:order-none`），scroll 提示隱藏，兩顆 CTA 等寬 44px 高，技術標籤寬度上限 300px 讓它排 3+2
- **觸控 hover**：JS hover 效果用 `onPointerEnter` + `if (e.pointerType !== "mouse") return`（觸控每次點擊、開始捲動都會觸發 pointerenter），`onPointerLeave` 無條件還原。Tailwind v4 的 `hover:` 已自帶 `@media (hover: hover)`，不用處理
- **JS media query**：用和 Tailwind `md` 同單位、剛好互補的 `(min-width: 48rem)` / `not all and (min-width: 48rem)`。寫成 px 的話，使用者放大瀏覽器預設字級時 CSS 和 JS 會在不同寬度切換
- **效能**：觸控裝置不跑 `Perspective` 的 rAF 迴圈（`(hover: none)` 直接 return）；手機上 MeshGradient `maxPixelCount` 限 1280×720；fixed 背景層用 `top: 0` + `height: 100vh` 而非 `inset: 0`（避免手機網址列收合時 WebGL canvas 反覆重配置）

## GSAP Animation Patterns

### 背景 Dark↔Light 切換 (`app/page.tsx`)
兩層全域 fixed 背景（dark z-index:0，light z-index:1）。light 層 opacity 是**捲動位置的純函數**：`進入 Projects 進度 × (1 − 進入 Resume 進度)`，用 `gsap.quickTo`（0.3s `expo`，等同 `scrub: 0.3` 的手感）套用。兩段轉場都是 trigger 頂端從視窗 70% → 30%，置中在兩區之間的空白，讓全白時段涵蓋整個 Projects。

```ts
const setOpacity = gsap.quickTo("#global-light-bg", "opacity", { duration: 0.3, ease: "expo" })
const update = () => {
  const [enter, exit] = triggers
  setOpacity((enter?.progress ?? 0) * (1 - (exit?.progress ?? 0)))
}
triggers.push(
  ScrollTrigger.create({ trigger: projectsEl, start: "top 70%", end: "top 30%", onUpdate: update, onRefresh: update }),
  ScrollTrigger.create({ trigger: resumeEl,   start: "top 70%", end: "top 30%", onUpdate: update, onRefresh: update }),
)
update()   // onRefresh 在 create() 內、push 之前就觸發（當時 triggers 還是空的），push 完要再算一次
return () => { triggers.forEach((t) => t.kill()); setOpacity.tween.kill() }
```

**不要**再用兩個 tween（`gsap.to()` 或 `fromTo()`）對同一個 opacity 做 scrub：ScrollTrigger 建立時會先把綁定的 tween 在 progress 0 render 一次（除非 `immediateRender: false`），第二個 tween 因此把載入當下的 opacity 0 記成起始值 → 白→黑變成硬切、往回捲時 Projects 被設回黑底（快速捲動時最明顯）。`fromTo` 則會在 init 時立即套用 FROM state（整頁變白）。

### About Hero 離場動畫 (`components/about-hero.tsx`)
scrub 驅動，no x-axis movement（水平滑走視覺很差）。左欄向上飄離，右欄縮小退場。用 `gsap.matchMedia()` 分桌面/手機，cleanup 用 `mm.revert()`：

```ts
// 桌面 (min-width: 48rem) — trigger: section, start: "top top", end: "bottom top", scrub: 0.5
tl.to(".about-left-col",  { y: -48, opacity: 0, ease: "none" }, 0)
  .to(".about-right-col", { scale: 0.82, opacity: 0, ease: "none" }, 0)
// 手機 not all and (min-width: 48rem) — 單欄堆疊，同樣的 to() 但各欄自己當 trigger（"top top" → "bottom top"），
// 捲過頂端才淡出，避免還在讀介紹文字時就在淡出
```

scroll 回來時 scrub 自動 reverse，不需另外處理。右欄的 CSS 進場動畫放在 `.about-right-col` 的內層 div（原因見 Gotchas）。

### Project Cards 進場動畫 (`components/projects-section.tsx`)
每張 card 獨立 GSAP timeline，5 段依序疊加，支援 scroll 進出雙向：

```ts
// 觸發類名：.scroll-card；內部元素：.card-header / .card-badge / .card-desc-item / .card-links
ScrollTrigger.create({
  trigger: card, start: "top 92%",
  onEnter: () => tl.play(),
  onLeaveBack: () => tl.reverse(),   // 往上滾也有動畫
})

// Timeline 順序：card 3D tilt-in → header → badges (back.out 彈入) → desc 逐行 → links
tl.fromTo(card, { opacity:0, y:60, rotateX:10 }, { opacity:1, y:0, rotateX:0, duration:0.85 })
  .fromTo(".card-header", { opacity:0, y:16 }, { opacity:1, y:0 }, "-=0.58")
  .fromTo(".card-badge",  { opacity:0, x:-12, scale:0.82 }, { opacity:1, x:0, scale:1, stagger:0.045 }, "-=0.32")
  .fromTo(".card-desc-item", { opacity:0, x:-10 }, { opacity:1, x:0, stagger:0.038 }, "-=0.22")
  .fromTo(".card-links", { opacity:0, y:10 }, { opacity:1, y:0 }, "-=0.14")
```

### ScrollTrigger Cleanup 正確寫法
**絕對不能** `ScrollTrigger.getAll().forEach(t => t.kill())` — 會殺掉所有其他元件的 trigger。
每個元件自己存自己的 triggers，cleanup 只 kill 自己的（或用 `gsap.matchMedia()` 的 `mm.revert()`）：

```ts
const triggers: ScrollTrigger[] = []   // 不是 gsap.core.ScrollTrigger（那不是型別）
// ... 建立時 push 進去
return () => triggers.forEach(t => t.kill())
```

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
Nav link 有 slide-up hover 動畫（flex column + translateY）；按鈕上下各 14px padding，整條 46px 高都是點擊區。

## Gotchas

- `next.config.mjs` 設定 `typescript.ignoreBuildErrors: true`，TypeScript 錯誤不會擋 build
- `next.config.mjs` 設定 `output: 'standalone'`，供 Cloud Run 容器以 `node server.js` 啟動（Dockerfile 只複製 `.next/standalone` + `.next/static` + `public`）
- `images.unoptimized: true` — 關閉 Next.js 圖片最佳化（不依賴 sharp）
- 主題色透過 CSS 變數控制（Tailwind v4），調色時改 `app/globals.css`
- 深色/淺色模式 favicon 在 `layout.tsx` 的 `metadata.icons` 配置
- MeshGradient 顏色設定在 `background-paper-shaders.tsx`，目前 `["#000000", "#1a1a1a", "#3a3a3a", "#555555"]`，不要加白色否則會蓋住白色文字
- **被 GSAP 動畫的元素本身不能掛 CSS `animation`**（例如 `neon-fade-up ... both`）：fill-mode 會讓最終 keyframe 持續生效並蓋過 GSAP 的 inline opacity/transform，GSAP 動畫等於沒跑。進場動畫要放在內層元素

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
