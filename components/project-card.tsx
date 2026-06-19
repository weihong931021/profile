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
  lightMode?: boolean
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
  lightMode = false,
}: ProjectCardProps) {
  const t = lightMode
    ? {
        cardBg:          "rgba(255,255,255,0.52)",
        cardBorder:      "rgba(255,255,255,0.7)",
        cardBorderHover: "rgba(255,255,255,0.9)",
        titleColor:      "rgba(0,0,0,0.85)",
        subtitleColor:   "rgba(0,0,0,0.4)",
        pulseDot:        "rgba(0,0,0,0.45)",
        wipText:         "rgba(0,0,0,0.5)",
        badgeBg:         "rgba(0,0,0,0.05)",
        badgeText:       "rgba(0,0,0,0.38)",
        badgeBorder:     "rgba(0,0,0,0.1)",
        techBg:          "rgba(0,0,0,0.05)",
        techText:        "rgba(0,0,0,0.5)",
        techBorder:      "rgba(0,0,0,0.1)",
        descText:        "rgba(0,0,0,0.55)",
        descBullet:      "rgba(0,0,0,0.22)",
        linkPrimBg:      "rgba(0,0,0,0.07)",
        linkPrimText:    "rgba(0,0,0,0.7)",
        linkPrimBorder:  "rgba(0,0,0,0.15)",
        linkPrimHoverText:   "rgba(0,0,0,0.9)",
        linkPrimHoverBorder: "rgba(0,0,0,0.28)",
        linkPrimHoverBg:     "rgba(0,0,0,0.1)",
        linkSecBg:       "rgba(0,0,0,0.04)",
        linkSecText:     "rgba(0,0,0,0.45)",
        linkSecBorder:   "rgba(0,0,0,0.1)",
        linkSecHoverText:   "rgba(0,0,0,0.75)",
        linkSecHoverBorder: "rgba(0,0,0,0.2)",
      }
    : {
        cardBg:          "rgba(255,255,255,0.03)",
        cardBorder:      "rgba(255,255,255,0.07)",
        cardBorderHover: "rgba(255,255,255,0.15)",
        titleColor:      "#fff",
        subtitleColor:   "rgba(255,255,255,0.3)",
        pulseDot:        "rgba(255,255,255,0.5)",
        wipText:         "rgba(255,255,255,0.4)",
        badgeBg:         "rgba(255,255,255,0.05)",
        badgeText:       "rgba(255,255,255,0.3)",
        badgeBorder:     "rgba(255,255,255,0.08)",
        techBg:          "rgba(255,255,255,0.05)",
        techText:        "rgba(255,255,255,0.38)",
        techBorder:      "rgba(255,255,255,0.08)",
        descText:        "rgba(255,255,255,0.45)",
        descBullet:      "rgba(255,255,255,0.2)",
        linkPrimBg:      "rgba(255,255,255,0.07)",
        linkPrimText:    "rgba(255,255,255,0.7)",
        linkPrimBorder:  "rgba(255,255,255,0.15)",
        linkPrimHoverText:   "#fff",
        linkPrimHoverBorder: "rgba(255,255,255,0.28)",
        linkPrimHoverBg:     "rgba(255,255,255,0.1)",
        linkSecBg:       "rgba(255,255,255,0.04)",
        linkSecText:     "rgba(255,255,255,0.4)",
        linkSecBorder:   "rgba(255,255,255,0.08)",
        linkSecHoverText:   "rgba(255,255,255,0.7)",
        linkSecHoverBorder: "rgba(255,255,255,0.18)",
      }

  return (
    <div
      style={{
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: "12px",
        padding: "24px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: lightMode
          ? "0 2px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "none",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = t.cardBorderHover
        e.currentTarget.style.transform = "translateY(-3px)"
        e.currentTarget.style.boxShadow = lightMode
          ? "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)"
          : "0 8px 32px rgba(0,0,0,0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = t.cardBorder
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = lightMode
          ? "0 2px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "none"
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", gap: "12px", marginBottom: "12px",
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: t.titleColor, fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>
            {title}
          </h3>
          <p style={{ color: t.subtitleColor, fontSize: "13px", margin: 0 }}>
            {subtitle}
          </p>
        </div>

        {isInProgress ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: t.pulseDot,
              animation: "neon-dot-pulse 1.5s ease-in-out infinite",
            }} />
            <span style={{ color: t.wipText, fontSize: "11px", fontWeight: 500, letterSpacing: "1px" }}>
              進行中
            </span>
          </div>
        ) : (
          <span style={{
            background: t.badgeBg, color: t.badgeText, border: `1px solid ${t.badgeBorder}`,
            fontSize: "11px", padding: "2px 8px", borderRadius: "4px", flexShrink: 0,
          }}>
            完成
          </span>
        )}
      </div>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {tech.map((item) => (
          <span key={item} style={{
            background: t.techBg, color: t.techText, border: `1px solid ${t.techBorder}`,
            fontSize: "11px", padding: "3px 9px", borderRadius: "5px",
          }}>
            {item}
          </span>
        ))}
      </div>

      {/* Description */}
      <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
        {description.map((item, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "8px",
            color: t.descText, fontSize: "13px", lineHeight: 1.65,
          }}>
            <span style={{ color: t.descBullet, flexShrink: 0, marginTop: "2px" }}>·</span>
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
                background: t.linkPrimBg, color: t.linkPrimText, fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: `1px solid ${t.linkPrimBorder}`,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.linkPrimHoverText
                e.currentTarget.style.borderColor = t.linkPrimHoverBorder
                e.currentTarget.style.background = t.linkPrimHoverBg
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.linkPrimText
                e.currentTarget.style.borderColor = t.linkPrimBorder
                e.currentTarget.style.background = t.linkPrimBg
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
                background: t.linkSecBg, color: t.linkSecText, fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: `1px solid ${t.linkSecBorder}`,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.linkSecHoverText
                e.currentTarget.style.borderColor = t.linkSecHoverBorder
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.linkSecText
                e.currentTarget.style.borderColor = t.linkSecBorder
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
                background: t.linkSecBg, color: t.linkSecText, fontSize: "12px", fontWeight: 500,
                padding: "6px 14px", borderRadius: "6px",
                border: `1px solid ${t.linkSecBorder}`,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.linkSecHoverText
                e.currentTarget.style.borderColor = t.linkSecHoverBorder
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.linkSecText
                e.currentTarget.style.borderColor = t.linkSecBorder
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
