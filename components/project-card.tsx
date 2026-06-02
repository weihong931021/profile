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
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "24px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", gap: "12px", marginBottom: "12px",
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>
            {title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>
            {subtitle}
          </p>
        </div>

        {isInProgress ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              animation: "neon-dot-pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 500, letterSpacing: "1px" }}>
              進行中
            </span>
          </div>
        ) : (
          <span style={{
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "11px", padding: "2px 8px",
            borderRadius: "4px", flexShrink: 0,
          }}>
            完成
          </span>
        )}
      </div>

      {/* Tech badges — all neutral */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {tech.map((t) => (
          <span key={t} style={{
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.38)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "11px", padding: "3px 9px", borderRadius: "5px",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <ul style={{
        margin: "0 0 20px", padding: 0, listStyle: "none",
        display: "flex", flexDirection: "column", gap: "8px",
      }}>
        {description.map((item, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "8px",
            color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.65,
          }}>
            <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: "2px" }}>·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Links */}
      {(projectUrl || githubUrl || gitlabUrl) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {projectUrl && (
            <a
              href={projectUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.15)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"
                e.currentTarget.style.background = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
                e.currentTarget.style.background = "rgba(255,255,255,0.07)"
              }}
            >
              <ExternalLink size={13} />
              查看專案
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.4)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
              }}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {gitlabUrl && (
            <a
              href={gitlabUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.4)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
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
