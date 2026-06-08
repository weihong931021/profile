# mini-navbar — 原始整合 Prompt

原始來源是 floating pill navbar 元件，已整合改寫進 `components/navbar.tsx`。

## 核心設計概念

```tsx
// 浮動置中 pill，liquid glass 效果
<header style={{
  position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
  width: "90vw", padding: "0 4vw",
  borderRadius: "9999px",
  background: "rgba(255,255,255,0.055)",
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.13)",
    "inset 0 -1px 0 rgba(0,0,0,0.22)",
    "0 8px 40px rgba(0,0,0,0.5)",
  ].join(", "),
}}>
```

## Slide-up 動畫 NavLink

```tsx
function SlideLink({ href, label, active }) {
  return (
    <Link href={href} style={{ display: "inline-block", height: "18px", overflow: "hidden" }} className="group">
      <span className="group-hover:-translate-y-1/2" style={{ display: "flex", flexDirection: "column", transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)" }}>
        <span style={{ lineHeight: "18px", color: active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)" }}>{label}</span>
        <span style={{ lineHeight: "18px", color: "rgba(255,255,255,0.88)" }}>{label}</span>
      </span>
    </Link>
  )
}
```

## 本站實際結構

- 左：`WEIHONG'S WEBSITE`（連結到 `/`）
- 分隔線
- 右：`Home / Projects / Resume`（SlideLink × 3，active 頁白色）
- `marginLeft: "auto"` 讓 nav 靠右
