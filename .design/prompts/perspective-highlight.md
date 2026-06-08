# perspective-highlight — 原始整合 Prompt

## 元件程式碼

```tsx
// components/ui/perspective-highlight.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface PerspectiveProps extends React.HTMLAttributes<HTMLDivElement> {
  maxRotateX?: number;
  maxRotateY?: number;
  smoothing?: number;
  cardClassName?: string;
}

export const Perspective = ({
  maxRotateX = 14, maxRotateY = 30, smoothing = 0.12,
  className, cardClassName, children, ...props
}: PerspectiveProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0, targetY = 0, rotX = 0, rotY = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const dist = Math.hypot(dx, dy);
      const falloff = dist <= 1 ? 1 : Math.max(0, 1 - (dist - 1) / 2);
      targetX = clamp(dy, -1, 1) * maxRotateX * falloff;
      targetY = -clamp(dx, -1, 1) * maxRotateY * falloff;
    };

    const tick = () => {
      rotX += (targetX - rotX) * smoothing;
      rotY += (targetY - rotY) * smoothing;
      const lift = Math.min(1, Math.hypot(rotX / maxRotateX, rotY / maxRotateY));
      container.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
      container.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
      container.style.setProperty("--lift", lift.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => { targetX = 0; targetY = 0; });
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [maxRotateX, maxRotateY, smoothing]);

  return (
    <div ref={containerRef} className={cn("[perspective:1200px] motion-safe:animate-perspective-blur-in", className)} {...props}>
      <div className="[transform-style:preserve-3d]">
        <div ref={cardRef} className={cn("will-change-transform", cardClassName ?? "max-w-[480px] p-10")}
          style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Highlight span 也在同一個檔案，可搭配 Perspective 使用
export const Highlight = ({ color = "green", className, style, children, ...props }) => (
  <span className={cn("inline-block rounded-[3px] px-1 text-white will-change-[transform,box-shadow]", className)}
    style={{
      background: `var(--perspective-${color}-bg)`,
      transform: "translate(calc(-8px * var(--lift, 0)), calc(-6px * var(--lift, 0)))",
      boxShadow: `rgba(var(--perspective-${color}-ring), calc(0.8 * var(--lift, 0))) 2px 1.5px 0px 0.75px`,
      ...style,
    }} {...props}>
    {children}
  </span>
);

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
```

## 需要加到 globals.css

```css
@keyframes perspective-blur-in {
  from { opacity: 0; filter: blur(10px); transform: translateY(6px); }
  to   { opacity: 1; filter: blur(0);    transform: translateY(0); }
}
/* 在 @theme inline 加: */
--animate-perspective-blur-in: perspective-blur-in 0.6s ease both;
```

## 本站用法（頭貼）

```tsx
<Perspective maxRotateX={18} maxRotateY={22} smoothing={0.08} cardClassName="will-change-transform">
  <div style={{ width: "240px", height: "240px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
    <Image src="/images/profile.jpg" alt="黃偉閎" width={240} height={240}
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.91) brightness(1.14)" }} priority />
  </div>
</Perspective>
```
