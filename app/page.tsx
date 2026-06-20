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

    // Cross-fade: dark → light when entering Projects
    if (projectsEl) {
      const a = gsap.to("#global-light-bg", {
        opacity: 1, ease: "none",
        scrollTrigger: {
          trigger: projectsEl,
          start: "top 100%",
          end: "top 0%",
          scrub: 0.3,
        },
      })
      if (a.scrollTrigger) triggers.push(a.scrollTrigger)
    }

    // Cross-fade: light → dark when entering Resume
    if (resumeEl) {
      const b = gsap.to("#global-light-bg", {
        opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: resumeEl,
          start: "top 100%",
          end: "top 0%",
          scrub: 0.3,
        },
      })
      if (b.scrollTrigger) triggers.push(b.scrollTrigger)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <main>
      {/* Layer 0: dark mesh — fixed, always behind */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <PortfolioBackground />
      </div>

      {/* Layer 1: light mesh — fixed, fades in/out with scroll */}
      <div id="global-light-bg" style={{ position: "fixed", inset: 0, zIndex: 1, opacity: 0 }}>
        <PortfolioBackground light />
      </div>

      {/* Layer 2: scrollable content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div id="home"><AboutHero /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="resume"><ResumeSection /></div>
      </div>
    </main>
  )
}
