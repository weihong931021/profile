"use client"

import { useState, useEffect } from "react"

const navItems = [
  { id: "home",     label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "resume",   label: "Resume" },
]

function SlideLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", padding: 0, cursor: "pointer",
        textDecoration: "none", display: "inline-block", height: "18px", overflow: "hidden",
      }}
      className="group"
    >
      <span
        className="group-hover:-translate-y-1/2"
        style={{
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <span style={{
          display: "block",
          fontSize: "12px",
          fontWeight: active ? 600 : 400,
          letterSpacing: "0.6px",
          lineHeight: "18px",
          color: active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)",
          whiteSpace: "nowrap",
        }}>
          {label}
        </span>
        <span style={{
          display: "block",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.6px",
          lineHeight: "18px",
          color: "rgba(255,255,255,0.88)",
          whiteSpace: "nowrap",
        }}>
          {label}
        </span>
      </span>
    </button>
  )
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")

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
    <header style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "90vw",
      padding: "0 4vw",
      borderRadius: "9999px",
      background: "rgba(255,255,255,0.055)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.11)",
      boxShadow: [
        "inset 0 1px 0 rgba(255,255,255,0.13)",
        "inset 0 -1px 0 rgba(0,0,0,0.22)",
        "inset 1px 0 0 rgba(255,255,255,0.05)",
        "inset -1px 0 0 rgba(255,255,255,0.05)",
        "0 8px 40px rgba(0,0,0,0.5)",
        "0 2px 10px rgba(0,0,0,0.35)",
      ].join(", "),
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "46px" }}>
        {/* Brand */}
        <button
          onClick={() => scrollTo("home")}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <span style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", lineHeight: "46px",
          }}>
            WEIHONG&apos;S WEBSITE
          </span>
        </button>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px", marginLeft: "auto" }}>
          {navItems.map(item => (
            <SlideLink
              key={item.id}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => scrollTo(item.id)}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}
