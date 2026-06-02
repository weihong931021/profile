"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
]

function SlideLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none", display: "inline-block", height: "18px", overflow: "hidden" }}
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
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()

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
      transition: "border-radius 0s",
    }}>

      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "46px" }}>

        {/* Brand — left */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.5)",
            whiteSpace: "nowrap",
            lineHeight: "46px",
          }}>
            WEIHONG&apos;S WEBSITE
          </span>
        </Link>

        {/* Nav links — right */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px", marginLeft: "auto" }}>
          {navItems.map(item => (
            <SlideLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
          ))}
        </nav>
      </div>
    </header>
  )
}
