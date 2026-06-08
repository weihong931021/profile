# liquid-glass-button — 原始整合 Prompt

## 安裝依賴

```bash
pnpm add @radix-ui/react-slot class-variance-authority
```

## 核心原理

使用 SVG `<feGaussianBlur>` + `<feComposite>` filter 製造液態玻璃邊緣，搭配 `backdropFilter: url("#container-glass")` 套用在按鈕背景層。

```tsx
// GlassFilter SVG — 每個頁面只需一個
function GlassFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="container-glass" ...>
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}
export function GlassFilterProvider() {
  return <GlassFilter />
}
```

## 尺寸

```ts
const liquidbuttonVariants = cva("...", {
  variants: {
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",   // default
      lg: "h-11 px-6 text-base",
    }
  }
})
```

## 本站用法

```tsx
// 頁面頂部（about-hero）
<GlassFilterProvider />

// Tech badge（tag 感，non-interactive）
<LiquidButton size="sm" className="rounded-full text-[10px] text-white/35 cursor-default">
  LangGraph
</LiquidButton>

// CTA（有邊框、可點擊）
<LiquidButton
  size="lg"
  onClick={() => router.push("/resume")}
  className="rounded-full px-8 text-[11px] font-bold tracking-[2.5px] uppercase text-white border border-white/20 hover:border-white/40 transition-colors"
>
  RESUME
</LiquidButton>
```
