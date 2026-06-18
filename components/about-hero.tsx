"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PortfolioBackground } from "@/components/ui/background-paper-shaders"
import { LiquidButton, GlassFilterProvider } from "@/components/ui/liquid-glass-button"
import { TextScramble } from "@/components/ui/text-scramble"
import { Perspective } from "@/components/ui/perspective-highlight"


const pillStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "7px",
  padding: "7px 14px", borderRadius: "20px",
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.09)",
  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
  fontSize: "11px", fontWeight: 400, letterSpacing: ".3px",
  color: "rgba(255,255,255,.38)", textDecoration: "none",
  transition: "color .2s, border-color .2s, background .2s",
}
const pillIn  = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "rgba(255,255,255,0.75)"
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"
  e.currentTarget.style.background = "rgba(255,255,255,0.07)"
}
const pillOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "rgba(255,255,255,.38)"
  e.currentTarget.style.borderColor = "rgba(255,255,255,.09)"
  e.currentTarget.style.background = "rgba(255,255,255,.045)"
}

const CONTACTS = [
  {
    short: "gmail",
    value: "weihong609193@gmail.com",
    href: "mailto:weihong609193@gmail.com",
    external: false,
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    short: "github",
    value: "weihong931021",
    href: "https://github.com/weihong931021",
    external: true,
    icon: (
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    short: "ig",
    value: "ytailred",
    href: "https://www.instagram.com/ytailred/",
    external: true,
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    short: "fb",
    value: "黃偉閎",
    href: "https://www.facebook.com/huang.wei.hong.718327",
    external: true,
    icon: (
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
]

export function AboutHero() {
  const router = useRouter()
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)

  return (
    <section style={{
      minHeight: "100vh",
      paddingTop: "86px",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "#000000",
    }}>
      <style>{``}</style>

      <GlassFilterProvider />
      {/* ── WebGL shader background ── */}
      <PortfolioBackground variant="mesh" />

      {/* ── 2-column grid ── */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "grid", gridTemplateColumns: "1fr 36vw",
        alignItems: "center", gap: "4vw",
        maxWidth: "90vw", width: "100%", padding: "0 4vw",
      }}>

        {/* Left column */}
        <div>
          <div style={{ marginBottom: "2vh" }}>
            <TextScramble
              text="HUANG WEI-HONG"
              scrambleClassName="text-white/20"
              className="opacity-40 hover:opacity-100 transition-opacity duration-300"
              autoPlay
              autoPlayDelay={600}
            />
          </div>

          <h1 style={{
            fontFamily: "var(--font-noto-sans-tc), sans-serif",
            fontSize: "clamp(58px, 7.5vw, 100px)", fontWeight: 900, lineHeight: 0.9,
            color: "#fff", margin: "0 0 3vh",
          }}>
            黃偉閎
          </h1>

          <p style={{
            fontSize: "12px", fontWeight: 500, letterSpacing: "3px",
            color: "rgba(255,255,255,.45)",
            margin: "0 0 3.5vh",
          }}>
            AI · MULTI-AGENT · WEB3 · FULLSTACK
          </p>

          <p style={{
            fontSize: "13px", fontWeight: 300, lineHeight: 2.0,
            color: "rgba(255,255,255,.35)", maxWidth: "88%", margin: "0 0 2.2vh",
          }}>
            我目前就讀國立中央大學資訊管理學系，並修習人工智慧學分學程。專注於 AI 系統設計、Multi-Agent Workflow、全端開發與 Web3 應用。
          </p>
          <p style={{
            fontSize: "13px", fontWeight: 300, lineHeight: 2.0,
            color: "rgba(255,255,255,.35)", maxWidth: "88%",
            margin: "0 0 3.5vh",
          }}>
            過去參與過多個實務導向專案，包括股票分析 Multi-Agent 系統、Web3 DeFi 借貸協議、新生資訊平台 Blog 系統，以及電腦視覺行為辨識專案。
          </p>

          {/* Badges — tag style, non-interactive */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "3.2vh" }}>
            {["LangGraph", "Multi-Agent", "FastAPI", "Vue 3", "Solidity"].map(label => (
              <LiquidButton
                key={label}
                size="sm"
                className="rounded-full text-[10px] font-medium tracking-[.5px] text-white/35 cursor-default"
              >
                {label}
              </LiquidButton>
            ))}
          </div>

          {/* CTA — action buttons, clear border to stand out */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "2.5vh" }}>
            <LiquidButton
              size="lg"
              onClick={() => router.push("/resume")}
              className="rounded-full px-8 text-[11px] font-bold tracking-[2.5px] uppercase text-white border border-white/20 hover:border-white/40 transition-colors"
            >
              RESUME
            </LiquidButton>
            <LiquidButton
              size="lg"
              onClick={() => router.push("/projects")}
              className="rounded-full px-8 text-[11px] font-bold tracking-[2.5px] uppercase text-white border border-white/20 hover:border-white/40 transition-colors"
            >
              PROJECTS
            </LiquidButton>
          </div>

        </div>

        {/* Right column — visual */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "1.2vw", overflow: "visible", marginTop: "-2vh",
        }}>

          {/* Avatar */}
          <Perspective
            maxRotateX={18}
            maxRotateY={22}
            smoothing={0.08}
            cardClassName="will-change-transform"
          >
            <div style={{
              width: "240px", height: "240px", borderRadius: "50%",
              overflow: "hidden", flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <Image src="/images/profile.jpg" alt="黃偉閎" width={240} height={240}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.91) brightness(1.14)" }} priority />
            </div>
          </Perspective>

          {/* Contact — hover to expand */}
          <div style={{
            display: "flex", gap: "6px", alignItems: "center",
            marginTop: "2vh",
          }}>
            {CONTACTS.map((c, i) => {
              const isHov = hoveredContact === i
              return (
                <a
                  key={c.short}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredContact(i)}
                  onMouseLeave={() => setHoveredContact(null)}
                  style={{
                    display: "flex", alignItems: "center", textDecoration: "none",
                    borderRadius: "9999px", cursor: "pointer",
                    padding: isHov ? "4px 11px 4px 4px" : "4px",
                    background: isHov ? "rgba(255,255,255,.07)" : "transparent",
                    border: "1px solid",
                    borderColor: isHov ? "rgba(255,255,255,.12)" : "transparent",
                    transition: "all .45s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isHov ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.07)",
                    color: isHov ? "#ffffff" : "rgba(255,255,255,.4)",
                    transition: "all .4s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    {c.icon}
                  </div>

                  {/* Expanding text */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isHov ? "1fr" : "0fr",
                    opacity: isHov ? 1 : 0,
                    marginLeft: isHov ? "8px" : "0",
                    transition: "grid-template-columns .45s cubic-bezier(0.4,0,0.2,1), opacity .3s, margin-left .45s cubic-bezier(0.4,0,0.2,1)",
                    alignItems: "center",
                    height: "26px",
                  }}>
                    <div style={{ overflow: "hidden", display: "flex", alignItems: "center", height: "100%" }}>
                      <span style={{
                        fontSize: "11px", fontWeight: 400, whiteSpace: "nowrap",
                        color: "rgba(255,255,255,.6)", lineHeight: 1,
                      }}>
                        {c.value}
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
