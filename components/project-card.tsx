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
}: ProjectCardProps) {
  return (
    <div className="bg-card shadow-md p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-1 h-6 bg-primary flex-shrink-0 mt-0.5"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-lg font-bold text-primary">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4 ml-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <ul className="space-y-2 mb-6 ml-4">
        {description.map((item, index) => (
          <li key={index} className="text-sm text-card-foreground/80 flex items-start gap-2">
            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      {(projectUrl || githubUrl || gitlabUrl) && (
        <div className="flex flex-wrap gap-3 ml-4">
          {projectUrl && (
            <a 
              href={projectUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              查看專案
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
          {gitlabUrl && (
            <a 
              href={gitlabUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Gitlab className="h-4 w-4" />
              GitLab
            </a>
          )}
        </div>
      )}
    </div>
  )
}
