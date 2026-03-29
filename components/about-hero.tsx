import Image from "next/image"
import Link from "next/link"
import { Facebook, Github, Instagram } from "lucide-react"

export function AboutHero() {
  return (
    <section className="h-screen flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Background split - left beige, right white */}
        <div className="absolute inset-0 flex">
          <div className="w-[40%] bg-background" />
          <div className="w-[60%] bg-card" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 lg:px-0">
          {/* Combined Card - Profile + Content as ONE card */}
          <div className="bg-card shadow-lg flex flex-col lg:flex-row max-w-5xl w-full h-[500px]">
            {/* Left - Profile Section with background */}
            <div className="lg:w-1/2 p-10 text-center shrink-0 bg-secondary flex flex-col justify-center">
              <div className="w-40 h-40 mx-auto mb-6 relative">
                <Image
                  src="/images/profile.jpg"
                  alt="黃偉閎的個人照片"
                  width={160}
                  height={160}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
              </div>
              <h2 className="text-4xl font-bold text-card-foreground mb-4 tracking-wide">
                黃偉閎
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mb-5"></div>
              <p className="text-xs text-muted-foreground tracking-widest mb-8 uppercase">
                Wei-Hong Huang
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/huang.wei.hong.718327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/weihong931021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/ytailred/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right - Content Section */}
            <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col justify-center bg-card">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-3 italic">
                Hello
              </h1>
              <p className="text-base text-muted-foreground mb-6">
                Here&apos;s who I am &amp; what I do
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link 
                  href="/resume" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
                >
                  RESUME
                </Link>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-card text-foreground text-sm font-medium rounded-full border border-foreground hover:bg-foreground hover:text-card transition-colors"
                >
                  PROJECTS
                </Link>
              </div>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <p>
                  我目前就讀於國立中央大學資訊管理學系，專注於 AI 應用與全端系統開發，特別關注 Multi-Agent 系統與實務落地。
                </p>
                <p>
                  過去曾開發多個跨領域專案，包含股票分析 Multi-Agent 系統、Web3 DeFi 借貸平台，以及新生資訊平台 Blog 系統，具備從 系統設計、資料處理到前後端整合的實作經驗。
                </p>
                <p>
                  我擅長將複雜問題拆解為可執行的系統架構，並透過 AI Workflow、資料管線與產品化思維，打造真正可運作的應用。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-4 md:px-8 bg-card">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 by 黃偉閎.
          </p>
          <div className="flex items-center gap-12 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Write</span>
              <a href="mailto:weihong609193@gmail.com" className="text-foreground hover:text-primary transition-colors">
                weihong609193@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Follow</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/huang.wei.hong.718327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/weihong931021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/ytailred/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
