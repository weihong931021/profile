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
    const triggers: ScrollTrigger[] = []

    const projectsEl = document.getElementById("projects")
    const resumeEl   = document.getElementById("resume")
    if (!projectsEl || !resumeEl) return

    // Light-bg opacity = f(scroll position), eased like scrub: 0.3. Not two gsap.to() tweens on one opacity:
    // ScrollTrigger renders each at progress 0 on creation, so the light → dark one froze 0 as its start value.
    const setOpacity = gsap.quickTo("#global-light-bg", "opacity", { duration: 0.3, ease: "expo" })
    const update = () => {
      const [enter, exit] = triggers
      setOpacity((enter?.progress ?? 0) * (1 - (exit?.progress ?? 0)))
    }

    // dark → light entering Projects, light → dark entering Resume; short fades centred on the gap between
    // sections keep the white stretch over as much of Projects as possible
    triggers.push(
      ScrollTrigger.create({ trigger: projectsEl, start: "top 70%", end: "top 30%", onUpdate: update, onRefresh: update }),
      ScrollTrigger.create({ trigger: resumeEl,   start: "top 70%", end: "top 30%", onUpdate: update, onRefresh: update }),
    )
    update()

    return () => {
      triggers.forEach((t) => t.kill())
      setOpacity.tween.kill()
    }
  }, [])

  return (
    <main>
      {/* 100vh, not inset:0 — on mobile inset:0 resizes as the toolbar hides/shows, re-allocating both WebGL canvases mid-scroll */}
      {/* Layer 0: dark mesh — fixed, always behind */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0 }}>
        <PortfolioBackground />
      </div>

      {/* Layer 1: light mesh — fixed, fades in/out with scroll */}
      <div id="global-light-bg" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 1, opacity: 0 }}>
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
