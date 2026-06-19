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

    // Fade IN the light mesh as Projects section enters
    if (projectsEl) {
      const a = gsap.fromTo("#projects-local-bg",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: projectsEl,
            start: "top 85%",
            end: "top 15%",
            scrub: 1.2,
          },
        }
      )
      if (a.scrollTrigger) triggers.push(a.scrollTrigger)
    }

    // Fade OUT the light mesh as Resume section enters
    if (resumeEl) {
      const b = gsap.fromTo("#projects-local-bg",
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: resumeEl,
            start: "top 85%",
            end: "top 15%",
            scrub: 1.2,
          },
        }
      )
      if (b.scrollTrigger) triggers.push(b.scrollTrigger)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <main>
      {/* Global dark mesh — fixed, always behind everything */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <PortfolioBackground />
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div id="home"><AboutHero /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="resume"><ResumeSection /></div>
      </div>
    </main>
  )
}
