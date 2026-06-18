import { AboutHero } from "@/components/about-hero"
import { ProjectsSection } from "@/components/projects-section"
import { ResumeSection } from "@/components/resume-section"

export default function HomePage() {
  return (
    <main>
      <div id="home">
        <AboutHero />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="resume">
        <ResumeSection />
      </div>
    </main>
  )
}
