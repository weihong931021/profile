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
