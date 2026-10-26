"use client"

import { useState, useEffect } from "react"

const navItems = [
  { id: "home",     label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "resume",   label: "Resume" },
]

function SlideLink({
  label, active, onClick, lightMode,
}: { label: string; active: boolean; onClick: () => void; lightMode: boolean }) {
  const activeColor  = lightMode ? "rgba(0,0,0,0.85)"  : "rgba(255,255,255,0.88)"
  const mutedColor   = lightMode ? "rgba(0,0,0,0.38)"  : "rgba(255,255,255,0.38)"
  const hoverColor   = lightMode ? "rgba(0,0,0,0.85)"  : "rgba(255,255,255,0.88)"

  return (
    <button
      onClick={onClick}
      style={{ background: "none", border: "none", padding: "14px 0", cursor: "pointer" }}
      className="group"
    >
      {/* 14px + 18px window + 14px = the 46px bar, so the whole bar height is the tap target */}
      <span style={{ display: "block", height: "18px", overflow: "hidden" }}>
        <span
          className="group-hover:-translate-y-1/2"
          style={{ display: "flex", flexDirection: "column", transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <span style={{
            display: "block", fontSize: "12px", fontWeight: active ? 600 : 400,
            letterSpacing: "0.6px", lineHeight: "18px",
            color: active ? activeColor : mutedColor,
            whiteSpace: "nowrap",
            transition: "color 0.3s",
          }}>
            {label}
          </span>
          <span style={{
            display: "block", fontSize: "12px", fontWeight: 600,
            letterSpacing: "0.6px", lineHeight: "18px",
            color: hoverColor, whiteSpace: "nowrap",
          }}>
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const lightMode = activeSection === "projects"

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navItems.map(({ id }) => {
        const el = document.getElementById(id)
        return { id, top: el ? el.getBoundingClientRect().top : Infinity }
      })
      // The section whose top is closest to (but still above) 40% of viewport height
      const threshold = window.innerHeight * 0.4
      let active = "home"
      for (const { id, top } of offsets) {
        if (top <= threshold) active = id
      }
      setActiveSection(active)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="px-4 sm:px-[4vw]" style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "90vw",
      borderRadius: "9999px",
      background: lightMode ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.055)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: lightMode ? "1px solid rgba(0,0,0,0.09)" : "1px solid rgba(255,255,255,0.11)",
      boxShadow: lightMode
        ? "0 4px 24px rgba(0,0,0,0.1)"
        : [
            "inset 0 1px 0 rgba(255,255,255,0.13)",
            "inset 0 -1px 0 rgba(0,0,0,0.22)",
            "inset 1px 0 0 rgba(255,255,255,0.05)",
            "inset -1px 0 0 rgba(255,255,255,0.05)",
            "0 8px 40px rgba(0,0,0,0.5)",
            "0 2px 10px rgba(0,0,0,0.35)",
          ].join(", "),
      transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "46px" }}>
        {/* Brand */}
        <button
          onClick={() => scrollTo("home")}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <span style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px",
            color: lightMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)",
            whiteSpace: "nowrap", lineHeight: "46px", transition: "color 0.3s",
          }}>
            WEIHONG<span className="hidden sm:inline">&apos;S WEBSITE</span>
          </span>
        </button>

        {/* Nav links */}
        <nav className="gap-5 sm:gap-7" style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          {navItems.map(item => (
            <SlideLink
              key={item.id}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => scrollTo(item.id)}
              lightMode={lightMode}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}
