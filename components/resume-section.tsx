"use client"

import type { CSSProperties } from "react"
import { Github, Mail, Download } from "lucide-react"
import { PortfolioBackground } from "@/components/ui/background-paper-shaders"

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

const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "10px",
  padding: "20px 24px",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
}

const divider: CSSProperties = {
  margin: "40px 0",
  border: "none",
  borderTop: "1px solid rgba(255,255,255,0.06)",
}

const accentText: CSSProperties = {
  color: "#ffffff",
}

export function ResumeSection() {
  return (
    <section style={{ minHeight: "100vh", background: "#000000", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
      <PortfolioBackground variant="mesh" />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "90vw", margin: "0 auto", padding: "110px 4vw 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1 }}>
            Resume
          </h1>
          <p style={{
            fontSize: "12px", fontWeight: 500, letterSpacing: "3px",
            color: "rgba(255,255,255,.4)", margin: 0,
          }}>
            SKILLS &amp; EXPERIENCE
          </p>
        </div>

        {/* School + Stats + Tags */}
        <div style={{ marginBottom: "0" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, margin: "0 0 6px" }}>
            國立中央大學資訊管理學系
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: 500, letterSpacing: "2px", margin: "0 0 20px" }}>
            人工智慧學分學程
          </p>

          {/* Stats cards */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            <div style={{ ...glassCard, textAlign: "center", minWidth: "110px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px", margin: "0 0 6px" }}>RANK</p>
              <p style={{ color: "#fff", fontSize: "26px", fontWeight: 900, margin: 0, lineHeight: 1 }}>
                32<span style={{ fontSize: "14px", opacity: 0.5 }}>/99</span>
              </p>
            </div>
            <div style={{ ...glassCard, textAlign: "center", minWidth: "110px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px", margin: "0 0 6px" }}>AVERAGE</p>
              <p style={{ color: "#fff", fontSize: "26px", fontWeight: 900, margin: 0, lineHeight: 1 }}>
                89.24
              </p>
            </div>
          </div>

          {/* Domain tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["AI System Design", "Multi-Agent Workflow", "Full-Stack Development"].map(tag => (
              <span key={tag} style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.38)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "12px", padding: "4px 12px", borderRadius: "5px",
              }}>
                {tag}
              </span>
            ))}
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
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}
              >
                <Github size={18} /> weihong931021
              </a>
            </li>
            <li>
              <a href="mailto:weihong609193@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)" }}
              >
                <Mail size={18} /> weihong609193@gmail.com
              </a>
            </li>
            <li>
              <a href="/resume.pdf" download
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)" }}
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
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.1)",
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
                <span style={{ color: "#fff", fontSize: "24px", fontWeight: 900 }}>
                  {c.score}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
