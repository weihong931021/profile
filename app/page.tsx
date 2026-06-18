"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AboutHero } from "@/components/about-hero"
import { ProjectsSection } from "@/components/projects-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioBackground } from "@/components/ui/background-paper-shaders"

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const triggers: gsap.core.ScrollTrigger[] = []

    const projectsEl = document.getElementById("projects")
    const resumeEl   = document.getElementById("resume")

    if (projectsEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: projectsEl,
          start: "top 70%",
          end: "top 5%",
          scrub: 0.8,
          onUpdate: (self) => {
            const el = document.getElementById("projects-bg")
            if (el) el.style.opacity = String(self.progress)
          },
        })
      )
    }

    if (resumeEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: resumeEl,
          start: "top 70%",
          end: "top 5%",
          scrub: 0.8,
          onUpdate: (self) => {
            const el = document.getElementById("projects-bg")
            if (el) el.style.opacity = String(1 - self.progress)
          },
        })
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <main>
      {/* One shared fixed background for the whole page */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <PortfolioBackground variant="mesh" />
      </div>

      {/* White overlay — fades in for Projects, out for Resume */}
      <div
        id="projects-bg"
        style={{
          position: "fixed", inset: 0, zIndex: 1,
          background: "#f2f2f2",
          opacity: 0,
          pointerEvents: "none",
          transition: "none",
        }}
      />

      {/* Scrollable content above the backgrounds */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div id="home"><AboutHero /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="resume"><ResumeSection /></div>
      </div>
    </main>
  )
}
