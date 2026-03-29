"use client"

import { Github, Mail, Download } from "lucide-react"

export function ResumeSection() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="inline-block w-3 h-3 bg-primary mr-3"></span>
            履歷 Resume
          </h1>
          <p className="text-muted-foreground text-lg">
            About Me & Skills
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header Summary */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">國立中央大學資訊管理學系</h2>
            <p className="text-xl md:text-2xl text-primary font-bold mb-6">人工智慧學分學程</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-lg md:text-xl text-muted-foreground mb-8 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <span>Department Rank: <span className="text-foreground font-bold tracking-tight">32 / 99</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <span>Average: <span className="text-foreground font-bold tracking-tight">89.24</span></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-background text-foreground border border-border/80 px-5 py-2 rounded-full text-base font-semibold shadow-sm hover:border-primary/50 transition-colors">AI System Design</span>
              <span className="bg-background text-foreground border border-border/80 px-5 py-2 rounded-full text-base font-semibold shadow-sm hover:border-primary/50 transition-colors">Multi-Agent Workflow</span>
              <span className="bg-background text-foreground border border-border/80 px-5 py-2 rounded-full text-base font-semibold shadow-sm hover:border-primary/50 transition-colors">Full-Stack Development</span>
            </div>
          </div>

          <hr className="border-border" />

          {/* Contact */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Contact</h2>
            <ul className="space-y-4 text-lg text-muted-foreground font-medium">
              <li>
                <a href="https://github.com/weihong931021" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-primary transition-colors w-fit">
                  <Github className="w-5 h-5" />
                  <span>weihong931021</span>
                </a>
              </li>
              <li>
                <a href="mailto:weihong609193@gmail.com" className="flex items-center gap-4 hover:text-primary transition-colors w-fit">
                  <Mail className="w-5 h-5" />
                  <span className="break-all">weihong609193@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="/resume.pdf" download className="flex items-center gap-4 hover:text-primary transition-colors w-fit text-foreground">
                  <Download className="w-5 h-5" />
                  <span>Resume PDF Download</span>
                </a>
              </li>
            </ul>
          </div>

          <hr className="border-border" />

          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Technical Skills</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">AI / Data</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">LangGraph, LangChain, Scikit-learn, TensorFlow</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Backend</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">Python, FastAPI, Express.js, SQL</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Frontend</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">Vue 3, Nuxt 3, JavaScript, Tailwind CSS</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tools</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">Docker, Git, Nginx, Power BI</p>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Activities / Leadership */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Activities / Leadership</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">ERP GA 組長</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">負責 Power BI 教學與資料分析應用</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">SALLY LAB</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">參與 AI / Computer Vision 相關專案研究</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">保誠人壽黑客松｜決賽</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">提出 AI 心理健康保險提案</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">雙北城市儀表板黑客松｜決賽</h3>
                <p className="text-lg text-muted-foreground leading-snug font-medium">參與災害資料視覺化 Dashboard 專案</p>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Relevant Coursework */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Relevant Coursework</h2>
            <ul className="space-y-5">
              <li className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-lg md:text-xl font-semibold">Web Programming</span> 
                <span className="text-xl md:text-2xl font-bold text-primary">98</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-lg md:text-xl font-semibold">Database Management</span> 
                <span className="text-xl md:text-2xl font-bold text-primary">97</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-lg md:text-xl font-semibold">Introduction to AI</span> 
                <span className="text-xl md:text-2xl font-bold text-primary">97</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-lg md:text-xl font-semibold">Computer Vision Applications</span> 
                <span className="text-xl md:text-2xl font-bold text-primary">96</span>
              </li>
              <li className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-lg md:text-xl font-semibold">Machine Learning</span> 
                <span className="text-xl md:text-2xl font-bold text-primary">95</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

