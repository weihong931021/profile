# 黃偉閎個人網站 (profile)

## Commands

```bash
pnpm dev      # 開發伺服器 (http://localhost:3000)
pnpm build    # 建置
pnpm lint     # ESLint 檢查
```

## Architecture

Next.js 16 App Router 個人作品集網站，中文主、英文輔，部署於 Vercel。

```
app/
  page.tsx             # 首頁 (AboutHero)
  projects/page.tsx    # 專案列表
  resume/page.tsx      # 履歷
components/
  about-hero.tsx       # 首頁主要區塊
  navbar.tsx           # 導覽列
  project-card.tsx     # 專案卡片元件
  projects-section.tsx # 專案頁內容（含 hardcoded 資料）
  resume-section.tsx   # 履歷頁內容
  ui/                  # shadcn/ui 自動產生，勿手動修改
public/
  images/profile.jpg   # 大頭貼
  resume.pdf           # 可下載的 PDF 履歷
```

## Key Patterns

- **所有內容都 hardcode 在元件裡**：專案資料在 `projects-section.tsx`，履歷在 `resume-section.tsx`，沒有 CMS 或外部 API
- **套件管理器用 pnpm**，不要用 npm 或 yarn
- **UI 元件**：`components/ui/` 是 shadcn/ui 元件，用 `npx shadcn@latest add <component>` 新增，不要手動改裡面的檔案
- **字型**：Noto Sans TC（中文）+ Inter（英文），透過 CSS variable `--font-noto-sans-tc` / `--font-inter` 套用

## Gotchas

- `next.config.mjs` 設定 `typescript.ignoreBuildErrors: true`，TypeScript 錯誤不會擋 build
- `images.unoptimized: true` — 為 Vercel 靜態部署相容性設定
- 主題色透過 CSS 變數控制（Tailwind v4），調色時改 `app/globals.css`
- 深色/淺色模式 favicon 在 `layout.tsx` 的 `metadata.icons` 配置
