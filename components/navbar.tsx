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
