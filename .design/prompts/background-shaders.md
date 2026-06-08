# background-paper-shaders — 原始整合 Prompt

## 安裝依賴

```bash
pnpm add @paper-design/shaders-react
```

## 元件程式碼

```tsx
// components/ui/background-paper-shaders.tsx
"use client"
import { MeshGradient } from "@paper-design/shaders-react"

const COLORS = ["#000000", "#1a1a1a", "#3a3a3a", "#555555"]

export function PortfolioBackground({ variant = "mesh" }: { variant?: "mesh" }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <MeshGradient
        colors={COLORS}
        speed={0.4}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
```

## 使用方式

```tsx
// section 必須有 position: relative, overflow: hidden
<section style={{ position: "relative", overflow: "hidden", background: "#000000" }}>
  <PortfolioBackground variant="mesh" />
  <div style={{ position: "relative", zIndex: 10 }}>
    {/* 頁面內容 */}
  </div>
</section>
```

## 注意事項

- `COLORS` 不要加白色（`#ffffff`），否則會蓋住白色文字
- 目前四頁（About、Projects、Resume）都有使用
- speed `0.4` 是較慢的動畫速度，避免太眩
