# Dark Neon Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將三頁個人網站（首頁、Projects、Resume）全面改為 Glass/Dark Neon 風格，使用琥珀 (#ffa032) + 紫 (#b450ff) 漸層配色、旋轉環形裝飾、脈衝光暈、及豐富進場動畫。

**Architecture:** 純 CSS + React inline styles，不引入任何動畫 library。Keyframes 統一定義在 `globals.css`，各元件用 `animation` inline style 引用。Navbar 改為 `position: fixed`，`main` 加 `paddingTop: 56px` 補償。

**Tech Stack:** Next.js 16 App Router, React, TypeScript, Tailwind v4 (minimal usage), pure CSS animations

**Spec:** `docs/superpowers/specs/2026-05-25-dark-neon-redesign.md`

**Note on testing:** 這是純視覺改版，無業務邏輯，不寫 unit tests。每個 task 結尾用 `pnpm dev` 目視驗證，並跑 `pnpm build` 確認無 build error。

---

## File Map

| 檔案 | 操作 | 說明 |
|------|------|------|
| `app/globals.css` | 修改 | 加 keyframes、改 body 背景 |
| `app/layout.tsx` | 修改 | main 加 paddingTop: 56px |
| `app/projects/page.tsx` | 修改 | 移除 bg-secondary wrapper |
| `app/resume/page.tsx` | 修改 | 移除 bg-secondary wrapper |
| `components/navbar.tsx` | 重寫 | Fixed 毛玻璃 navbar，W·H logo |
| `components/about-hero.tsx` | 重寫 | 沉浸式全版首頁 hero |
| `components/project-card.tsx` | 重寫 | 毛玻璃卡片 |
| `components/projects-section.tsx` | 重寫 | 深色背景 + 漸層標題 |
| `components/resume-section.tsx` | 重寫 | 深色玻璃履歷 |

---

## Task 1: CSS Foundation（Keyframes + Body）

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: 在 globals.css 底部加入 keyframes 和 body 覆寫**

在 `app/globals.css` 現有內容末尾（`@layer base` 之後）加入：

```css
/* ── Dark Neon base ── */
body {
  background-color: #080810 !important;
  color: #ffffff;
}

/* ── Animation keyframes ── */
@keyframes neon-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.04); }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.32; }
}

@keyframes neon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes neon-spin-rev {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes neon-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes neon-badge-in {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes neon-dot-pulse {
  0%, 100% { opacity: 0.5; box-shadow: 0 0 4px rgba(255, 160, 50, 0.5); }
  50% { opacity: 1; box-shadow: 0 0 12px rgba(255, 160, 50, 1); }
}
```

- [ ] **Step 2: 驗證**

```bash
pnpm dev
```

打開 http://localhost:3000，確認背景變黑色 (#080810)。

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add dark neon keyframes and body background"
```

---

## Task 2: Layout — main paddingTop

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 更新 main 元素**

在 `app/layout.tsx` 中，將：
```tsx
<main>
  {children}
</main>
```
改為：
```tsx
<main style={{ paddingTop: "56px" }}>
  {children}
</main>
```

- [ ] **Step 2: 更新 projects 和 resume page wrapper**

`app/projects/page.tsx` 改為：
```tsx
import { ProjectsSection } from "@/components/projects-section"

export default function ProjectsPage() {
  return <ProjectsSection />
}
```

`app/resume/page.tsx` 改為：
```tsx
import { ResumeSection } from "@/components/resume-section"

export default function ResumePage() {
  return <ResumeSection />
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx app/projects/page.tsx app/resume/page.tsx
git commit -m "style: add main paddingTop for fixed navbar, clean page wrappers"
```

---

## Task 3: Navbar — 毛玻璃 Fixed

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: 重寫 navbar.tsx**

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "56px",
        background: "rgba(8, 8, 16, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "4px",
            textDecoration: "none",
          }}
        >
          W·H
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "28px" }} className="hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "1px",
                textDecoration: "none",
                transition: "color 0.2s",
                color: pathname === item.href
                  ? "#ffa032"
                  : "rgba(255, 255, 255, 0.4)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav
          style={{
            background: "rgba(8, 8, 16, 0.95)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "1px",
                textDecoration: "none",
                color: pathname === item.href
                  ? "#ffa032"
                  : "rgba(255,255,255,0.5)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: 目視驗證**

```bash
pnpm dev
```

確認 navbar 固定在頂部、毛玻璃效果、W·H logo、active link 顯示琥珀色。

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx
git commit -m "style: rewrite navbar to fixed glass dark neon style"
```

---

## Task 4: About Hero — 沉浸式全版

**Files:**
- Modify: `components/about-hero.tsx`

- [ ] **Step 1: 重寫 about-hero.tsx**

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Github, Instagram } from "lucide-react"

const techBadges = [
  { label: "LangGraph", color: "amber" },
  { label: "Multi-Agent", color: "purple" },
  { label: "FastAPI", color: "muted" },
  { label: "Vue 3", color: "muted" },
  { label: "Solidity", color: "muted" },
] as const

function getBadgeStyle(color: "amber" | "purple" | "muted") {
  if (color === "amber") return {
    background: "rgba(255, 160, 50, 0.18)",
    color: "#fbbf24",
    border: "1px solid rgba(255, 160, 50, 0.3)",
  }
  if (color === "purple") return {
    background: "rgba(180, 80, 255, 0.18)",
    color: "#d08bff",
    border: "1px solid rgba(180, 80, 255, 0.25)",
  }
  return {
    background: "rgba(255, 255, 255, 0.05)",
    color: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  }
}

export function AboutHero() {
  return (
    <section
      style={{
        position: "relative",
        height: "calc(100vh - 56px)",
        overflow: "hidden",
        background: "#080810",
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: "-60px", left: "-20px",
        width: "320px", height: "320px",
        background: "rgba(255, 160, 50, 0.18)",
        borderRadius: "50%", filter: "blur(70px)",
        animation: "neon-pulse 4s ease-in-out infinite, neon-float 7s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "60px", right: "-40px",
        width: "240px", height: "240px",
        background: "rgba(180, 80, 255, 0.18)",
        borderRadius: "50%", filter: "blur(55px)",
        animation: "neon-pulse 4s ease-in-out infinite 2s, neon-float 9s ease-in-out infinite 1s",
      }} />
      <div style={{
        position: "absolute", bottom: "100px", right: "20%",
        width: "180px", height: "180px",
        background: "rgba(255, 160, 50, 0.1)",
        borderRadius: "50%", filter: "blur(45px)",
        animation: "neon-pulse 5s ease-in-out infinite 1s, neon-float 11s ease-in-out infinite 3s",
      }} />

      {/* Rotating rings */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "520px", height: "520px",
        marginTop: "-260px", marginLeft: "-260px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 160, 50, 0.06)",
        animation: "neon-spin 18s linear infinite",
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "370px", height: "370px",
        marginTop: "-185px", marginLeft: "-185px",
        borderRadius: "50%",
        border: "1px dashed rgba(180, 80, 255, 0.07)",
        animation: "neon-spin-rev 12s linear infinite",
      }} />

      {/* Bottom-anchored content */}
      <div style={{
        position: "absolute",
        bottom: "32px", left: "32px", right: "32px",
      }}>
        <p style={{
          color: "rgba(255, 255, 255, 0.2)",
          fontSize: "11px",
          letterSpacing: "4px",
          margin: "0 0 14px",
          animation: "neon-fade-up 0.6s ease both",
        }}>
          PORTFOLIO · 2026
        </p>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          {/* Left: name + tagline + bio + badges */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h1 style={{
              color: "#fff",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 900,
              lineHeight: 1,
              margin: "0 0 12px",
              animation: "neon-fade-up 0.6s 0.1s ease both",
            }}>
              黃偉閎
            </h1>

            <p style={{
              background: "linear-gradient(90deg, #ffa032, #b450ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "3px",
              margin: "0 0 16px",
              animation: "neon-fade-up 0.6s 0.18s ease both",
            }}>
              AI · MULTI-AGENT · WEB3 · FULLSTACK
            </p>

            <p style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "13px",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 0 18px",
              animation: "neon-fade-up 0.6s 0.25s ease both",
            }}>
              國立中央大學資訊管理學系，專注於 AI 應用與全端系統開發，特別關注 Multi-Agent 系統與實務落地。
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {techBadges.map((badge, i) => (
                <span
                  key={badge.label}
                  style={{
                    ...getBadgeStyle(badge.color),
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    animation: `neon-badge-in 0.5s ${0.32 + i * 0.07}s ease both`,
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: avatar + buttons + social */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            animation: "neon-fade-up 0.6s 0.3s ease both",
          }}>
            {/* Avatar with gradient ring */}
            <div style={{
              width: "92px", height: "92px",
              borderRadius: "50%",
              padding: "2px",
              background: "linear-gradient(135deg, #ffa032, #b450ff)",
              boxShadow: "0 0 28px rgba(255, 160, 50, 0.3)",
            }}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#080810",
              }}>
                <Image
                  src="/images/profile.jpg"
                  alt="黃偉閎"
                  width={88}
                  height={88}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "120px" }}>
              <Link
                href="/resume"
                style={{
                  background: "linear-gradient(135deg, rgba(255,160,50,0.6), rgba(180,80,255,0.6))",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  padding: "8px 0",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                RESUME
              </Link>
              <Link
                href="/projects"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  padding: "8px 0",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                PROJECTS
              </Link>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "14px" }}>
              <a
                href="https://www.facebook.com/huang.wei.hong.718327"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s", display: "flex" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://github.com/weihong931021"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s", display: "flex" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.instagram.com/ytailred/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s", display: "flex" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "8px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(8,8,16,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "11px", margin: 0 }}>
          © 2026 黃偉閎
        </p>
        <a
          href="mailto:weihong609193@gmail.com"
          style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)" }}
        >
          weihong609193@gmail.com
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 目視驗證**

```bash
pnpm dev
```

確認：
- 首頁全螢幕暗色背景
- 光暈 blob 有浮動動畫
- 兩個旋轉環可見
- 名字大字進場 fade-up
- 漸層副標題文字
- Avatar 有漸層圓環
- RESUME / PROJECTS 按鈕樣式正確
- footer strip 在最底部

- [ ] **Step 3: Commit**

```bash
git add components/about-hero.tsx
git commit -m "style: rewrite about-hero to immersive dark neon layout"
```

---

## Task 5: Project Card — 毛玻璃卡片

**Files:**
- Modify: `components/project-card.tsx`

- [ ] **Step 1: 重寫 project-card.tsx**

```tsx
"use client"

import { ExternalLink, Github, Gitlab } from "lucide-react"

interface ProjectCardProps {
  title: string
  subtitle: string
  tech: string[]
  description: string[]
  projectUrl?: string
  githubUrl?: string
  gitlabUrl?: string
  isInProgress?: boolean
}

const AI_TECH = new Set([
  "LangGraph", "LangChain", "FastAPI", "Python",
  "YOLOv11", "OpenCV", "CVAT", "TensorFlow", "Scikit-learn",
])
const WEB3_TECH = new Set([
  "Solidity", "Hardhat", "ethers.js", "MetaMask",
])

function getBadgeStyle(tech: string) {
  if (AI_TECH.has(tech)) return {
    background: "rgba(255, 160, 50, 0.15)",
    color: "#fbbf24",
    border: "1px solid rgba(255, 160, 50, 0.25)",
  }
  if (WEB3_TECH.has(tech)) return {
    background: "rgba(180, 80, 255, 0.15)",
    color: "#d08bff",
    border: "1px solid rgba(180, 80, 255, 0.2)",
  }
  return {
    background: "rgba(255, 255, 255, 0.05)",
    color: "rgba(255, 255, 255, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  }
}

export function ProjectCard({
  title,
  subtitle,
  tech,
  description,
  projectUrl,
  githubUrl,
  gitlabUrl,
  isInProgress = false,
}: ProjectCardProps) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        borderRadius: "12px",
        padding: "24px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 160, 50, 0.3)"
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 160, 50, 0.08)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)"
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "12px",
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>
            {title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: 0 }}>
            {subtitle}
          </p>
        </div>

        {isInProgress ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <div style={{
              width: "7px", height: "7px",
              borderRadius: "50%",
              background: "#ffa032",
              animation: "neon-dot-pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{ color: "#fbbf24", fontSize: "11px", fontWeight: 600, letterSpacing: "1px" }}>
              進行中
            </span>
          </div>
        ) : (
          <span style={{
            background: "rgba(255, 160, 50, 0.12)",
            color: "#fbbf24",
            border: "1px solid rgba(255, 160, 50, 0.2)",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "4px",
            flexShrink: 0,
          }}>
            完成
          </span>
        )}
      </div>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {tech.map((t) => (
          <span key={t} style={{
            ...getBadgeStyle(t),
            fontSize: "11px",
            padding: "3px 9px",
            borderRadius: "5px",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <ul style={{
        margin: "0 0 20px", padding: 0,
        listStyle: "none",
        display: "flex", flexDirection: "column", gap: "8px",
      }}>
        {description.map((item, i) => (
          <li key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            color: "rgba(255,255,255,0.55)",
            fontSize: "13px",
            lineHeight: 1.6,
          }}>
            <span style={{ color: "#ffa032", flexShrink: 0, marginTop: "2px" }}>·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Links */}
      {(projectUrl || githubUrl || gitlabUrl) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg, rgba(255,160,50,0.5), rgba(180,80,255,0.5))",
                color: "#fff", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8" }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
            >
              <ExternalLink size={13} />
              查看專案
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.55)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              }}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {gitlabUrl && (
            <a
              href={gitlabUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.55)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              }}
            >
              <Gitlab size={13} />
              GitLab
            </a>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/project-card.tsx
git commit -m "style: rewrite project-card to glass dark neon style"
```

---

## Task 6: Projects Section

**Files:**
- Modify: `components/projects-section.tsx`

- [ ] **Step 1: 重寫 projects-section.tsx**

保留原有的資料陣列不變，只改 JSX 和樣式：

```tsx
import { ProjectCard } from "@/components/project-card"

const completedProjects = [
  {
    title: "QuantSense — 股票分析多智能體系統",
    subtitle: "以 Multi-Agent Workflow 為核心的量化分析系統",
    tech: ["FastAPI", "LangGraph", "Vue 3", "ECharts", "SQLite"],
    description: [
      "設計基於 LangGraph 的 Multi-Agent workflow，串接資料處理、指標計算與多 Agent 分析流程",
      "建構 SMA / RSI / MACD 多 Agent 架構，並設計 decision aggregation 輸出交易訊號",
      "定義 Agent 輸出 schema（signal / confidence / reasoning），提升決策可解釋性",
      "實作回測模組，評估策略績效（報酬、回撤、勝率）",
    ],
    projectUrl: "https://weihongweb.com/QuantSense",
    githubUrl: "https://github.com/weihong931021/stock-prediction-app",
  },
  {
    title: "TokenPay — Web3 去中心化借貸系統",
    subtitle: "基於智能合約的 DeFi 借貸協議",
    tech: ["Solidity", "Hardhat", "Vue 3", "TypeScript", "ethers.js"],
    description: [
      "設計 DeFi 借貸模型，將代幣化資產轉換為 USDC 信用額度",
      "開發 LendingPool 智能合約，實作抵押、借貸、還款與清算機制",
      "建立前端 DApp，整合 MetaMask 與 ethers.js 完成鏈上互動流程",
      "專案入圍 2025 RWA Hackathon 複賽",
    ],
    projectUrl: "https://weihongweb.com/fluid-hackathon/",
    githubUrl: "https://github.com/weihong931021/Web3-RWA-Hackathon",
  },
  {
    title: "NCU Fresh 2025 — 新生資訊平台 Blog 系統",
    subtitle: "校園資訊內容平台（Markdown + API 架構）",
    tech: ["Nuxt 3", "Vue 3", "Express", "Sequelize", "Tailwind CSS"],
    description: [
      "建立 Markdown-based content pipeline，實作文章動態載入與解析流程",
      "開發後端 API（Express）與資料庫（Sequelize），實現觀看數與收藏功能（JWT 驗證）",
      "與設計與企劃團隊協作，將 Figma UI 轉換為前端實作",
      "負責 RWD 與 Tailwind CSS 樣式優化",
    ],
    projectUrl: "https://ncufresh.ncu.edu.tw/",
    gitlabUrl: "https://gitlab.com/ncufresh/ncufresh25",
  },
  {
    title: "LINE Quest — 城市探索互動系統",
    subtitle: "結合任務與互動流程的城市探索系統",
    tech: ["Vue", "JavaScript"],
    description: [
      "設計任務導向前端流程與狀態邏輯",
      "建立 UI 元件與使用者操作流程，提升互動體驗",
      "參與產品流程設計，整合 AI 劇情與任務機制",
      "入圍 LINE FRESH 校園競賽複賽",
    ],
    projectUrl: "https://weihongweb.com/LineFresh",
    githubUrl: "https://github.com/weihong931021/LINE-FRESH",
  },
]

const inProgressProjects = [
  {
    title: "亂丟垃圾行為偵測系統",
    subtitle: "監控影像中的行為辨識系統（Computer Vision）",
    tech: ["YOLOv11", "OpenCV", "CVAT", "Python"],
    description: [
      "與桃園市環境管理處合作，開發亂丟垃圾行為辨識系統",
      "建立資料處理與標註轉換 pipeline（CVAT XML → YOLO）",
      "已完成垃圾物件偵測模型訓練與初步定位",
      "規劃結合 ROI 與 3D CNN 進行時序行為分析",
    ],
    isInProgress: true,
  },
]

export function ProjectsSection() {
  return (
    <section style={{ minHeight: "100vh", background: "#080810", paddingBottom: "80px", position: "relative" }}>
      {/* Ambient blobs (fixed so they don't scroll) */}
      <div style={{
        position: "fixed", top: "20%", right: "-80px",
        width: "280px", height: "280px",
        background: "rgba(255, 160, 50, 0.07)",
        borderRadius: "50%", filter: "blur(80px)",
        pointerEvents: "none", zIndex: 0,
        animation: "neon-pulse 5s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "20%", left: "-60px",
        width: "240px", height: "240px",
        background: "rgba(180, 80, 255, 0.07)",
        borderRadius: "50%", filter: "blur(70px)",
        pointerEvents: "none", zIndex: 0,
        animation: "neon-pulse 5s ease-in-out infinite 2.5s",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "768px", margin: "0 auto", padding: "48px 24px 0" }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 900,
            background: "linear-gradient(90deg, #ffa032, #b450ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 12px",
          }}>
            Projects
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "15px",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            涵蓋 AI 系統、Web3、全端開發與電腦視覺等領域。
          </p>
        </div>

        {/* Completed projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {completedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {/* In Progress */}
        <div style={{ marginTop: "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 900,
              color: "#ffa032",
              margin: 0,
            }}>
              進行中 In Progress
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {inProgressProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 目視驗證**

```bash
pnpm dev
```

前往 http://localhost:3000/projects，確認：
- 暗色背景，環境光暈
- 漸層標題 "Projects"
- 毛玻璃卡片，hover 有琥珀邊框 + 上浮效果
- 技術 badge 顏色正確（AI → 琥珀，Web3 → 紫）
- In Progress 卡片有橘色脈衝點

- [ ] **Step 3: Commit**

```bash
git add components/projects-section.tsx
git commit -m "style: rewrite projects-section to dark neon style"
```

---

## Task 7: Resume Section

**Files:**
- Modify: `components/resume-section.tsx`

- [ ] **Step 1: 重寫 resume-section.tsx**

```tsx
"use client"

import { Github, Mail, Download } from "lucide-react"

const skills: Record<string, string> = {
  "AI / Data": "LangGraph, LangChain, Scikit-learn, TensorFlow",
  "Backend": "Python, FastAPI, Express.js, SQL",
  "Frontend": "Vue 3, Nuxt 3, JavaScript, Tailwind CSS",
  "Tools": "Docker, Git, Nginx, Power BI",
}

const activities = [
  { title: "ERP GA 組長", desc: "負責 Power BI 教學與資料分析應用" },
  { title: "SALLY LAB", desc: "參與 AI / Computer Vision 相關專案研究" },
  { title: "保誠人壽黑客松", desc: "提出 AI 心理健康保險提案", badge: "決賽" },
  { title: "雙北城市儀表板黑客松", desc: "參與災害資料視覺化 Dashboard 專案", badge: "決賽" },
]

const coursework = [
  { name: "Web Programming", score: 98 },
  { name: "Database Management", score: 97 },
  { name: "Introduction to AI", score: 97 },
  { name: "Computer Vision Applications", score: 96 },
  { name: "Machine Learning", score: 95 },
]

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "10px",
  padding: "20px 24px",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
}

const divider: React.CSSProperties = {
  margin: "40px 0",
  border: "none",
  borderTop: "1px solid rgba(255,255,255,0.06)",
}

const gradientText: React.CSSProperties = {
  background: "linear-gradient(90deg, #ffa032, #b450ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

export function ResumeSection() {
  return (
    <section style={{ minHeight: "100vh", background: "#080810", paddingBottom: "80px", position: "relative" }}>
      {/* Ambient blobs */}
      <div style={{
        position: "fixed", top: "15%", left: "-80px",
        width: "260px", height: "260px",
        background: "rgba(255,160,50,0.07)",
        borderRadius: "50%", filter: "blur(80px)",
        pointerEvents: "none", zIndex: 0,
        animation: "neon-pulse 5s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "25%", right: "-60px",
        width: "220px", height: "220px",
        background: "rgba(180,80,255,0.07)",
        borderRadius: "50%", filter: "blur(70px)",
        pointerEvents: "none", zIndex: 0,
        animation: "neon-pulse 5s ease-in-out infinite 2.5s",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "768px", margin: "0 auto", padding: "48px 24px 0" }}>
        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ ...gradientText, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 900, margin: "0 0 8px" }}>
            Resume
          </h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", margin: 0 }}>
            About Me &amp; Skills
          </p>
        </div>

        {/* School + Stats + Tags */}
        <div style={{ marginBottom: "0" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, margin: "0 0 6px" }}>
            國立中央大學資訊管理學系
          </h2>
          <p style={{ ...gradientText, fontSize: "17px", fontWeight: 700, margin: "0 0 20px" }}>
            人工智慧學分學程
          </p>

          {/* Stats cards */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            <div style={{ ...glassCard, textAlign: "center", minWidth: "110px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px", margin: "0 0 6px" }}>RANK</p>
              <p style={{ ...gradientText, fontSize: "26px", fontWeight: 900, margin: 0, lineHeight: 1 }}>
                32<span style={{ fontSize: "14px", opacity: 0.5 }}>/99</span>
              </p>
            </div>
            <div style={{ ...glassCard, textAlign: "center", minWidth: "110px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px", margin: "0 0 6px" }}>AVERAGE</p>
              <p style={{ ...gradientText, fontSize: "26px", fontWeight: 900, margin: 0, lineHeight: 1 }}>
                89.24
              </p>
            </div>
          </div>

          {/* Domain tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ background: "rgba(255,160,50,0.15)", color: "#fbbf24", border: "1px solid rgba(255,160,50,0.25)", fontSize: "12px", padding: "4px 12px", borderRadius: "5px" }}>
              AI System Design
            </span>
            <span style={{ background: "rgba(180,80,255,0.15)", color: "#d08bff", border: "1px solid rgba(180,80,255,0.2)", fontSize: "12px", padding: "4px 12px", borderRadius: "5px" }}>
              Multi-Agent Workflow
            </span>
            <span style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", padding: "4px 12px", borderRadius: "5px" }}>
              Full-Stack Development
            </span>
          </div>
        </div>

        <hr style={divider} />

        {/* Contact */}
        <div style={{ marginBottom: "0" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 20px" }}>Contact</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            <li>
              <a href="https://github.com/weihong931021" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}
              >
                <Github size={18} /> weihong931021
              </a>
            </li>
            <li>
              <a href="mailto:weihong609193@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}
              >
                <Mail size={18} /> weihong609193@gmail.com
              </a>
            </li>
            <li>
              <a href="/resume.pdf" download
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffa032" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}
              >
                <Download size={18} /> Resume PDF Download
              </a>
            </li>
          </ul>
        </div>

        <hr style={divider} />

        {/* Technical Skills */}
        <div style={{ marginBottom: "0" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 20px" }}>Technical Skills</h2>
          <div style={glassCard}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", width: "72px", flexShrink: 0, paddingTop: "2px" }}>
                    {category}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.5 }}>
                    {items}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr style={divider} />

        {/* Activities */}
        <div style={{ marginBottom: "0" }}>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 20px" }}>Activities / Leadership</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {activities.map((a) => (
              <div key={a.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div>
                  <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: "0 0 4px" }}>{a.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>{a.desc}</p>
                </div>
                {a.badge && (
                  <span style={{
                    background: "rgba(255,160,50,0.12)",
                    color: "#fbbf24",
                    border: "1px solid rgba(255,160,50,0.2)",
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}>
                    {a.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr style={divider} />

        {/* Coursework */}
        <div>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 20px" }}>Relevant Coursework</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {coursework.map((c, i) => (
              <div key={c.name} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: i < coursework.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", fontWeight: 500 }}>
                  {c.name}
                </span>
                <span style={{ ...gradientText, fontSize: "24px", fontWeight: 900 }}>
                  {c.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 目視驗證**

```bash
pnpm dev
```

前往 http://localhost:3000/resume，確認：
- 暗色背景
- 漸層標題 "Resume"
- RANK / AVERAGE 毛玻璃統計卡
- 技能表格對齊
- 黑客松條目有琥珀 "決賽" badge
- 課程分數顯示漸層大字
- hover 連結變琥珀色

- [ ] **Step 3: Commit**

```bash
git add components/resume-section.tsx
git commit -m "style: rewrite resume-section to dark neon style"
```

---

## Task 8: 最終驗證與 Build Check

- [ ] **Step 1: 跑 build**

```bash
pnpm build
```

預期：Build 成功，無 fatal error（`ignoreBuildErrors: true` 已在 next.config.mjs 設定，TS 警告不擋 build）。

- [ ] **Step 2: 全站目視驗收**

用 `pnpm dev` 逐一確認：

| 頁面 | 確認項目 |
|------|---------|
| 首頁 | 全螢幕暗色、旋轉環、光暈動畫、fade-up 進場、avatar 漸層圓環 |
| /projects | 毛玻璃卡片、hover 效果、badge 顏色、In Progress 脈衝點 |
| /resume | 統計卡片、技能表、活動 badge、課程漸層分數 |
| 所有頁 | Navbar fixed、毛玻璃、W·H logo、active link 琥珀色 |
| Mobile | Navbar hamburger 可開關、排版不破版 |

- [ ] **Step 3: 最終 commit**

```bash
git add -A
git commit -m "feat: complete dark neon redesign across all three pages"
```
