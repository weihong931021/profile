import { ProjectCard } from "@/components/project-card"

const completedProjects = [
  {
    title: "QuantSense — 股票分析多智能體系統",
    subtitle: "以 Multi-Agent Workflow 為核心的量化分析系統",
    tech: ["FastAPI", "LangGraph", "Vue 3", "ECharts", "SQLite"],
    description: [
      "設計基於 LangGraph 的 Multi-Agent workflow，串接資料處理、指標計算與多 Agent 分析流程",
      "建構 SMA / RSI / MACD 多 Agent 架構，並設計 decision aggregation 輸出交易訊號",
      "定義 Agent 輸出 schema（signal / confidence / reasoning），提升決策可解釋性",
      "實作回測模組，評估策略績效（報酬、回撤、勝率）",
    ],
    projectUrl: "https://weihongweb.com/project1/",
    githubUrl: "https://github.com/weihong931021/stock-prediction-app",
  },
  {
    title: "TokenPay — Web3 去中心化借貸系統",
    subtitle: "基於智能合約的 DeFi 借貸協議",
    tech: ["Solidity", "Hardhat", "Vue 3", "TypeScript", "ethers.js"],
    description: [
      "設計 DeFi 借貸模型，將代幣化資產轉換為 USDC 信用額度",
      "開發 LendingPool 智能合約，實作抵押、借貸、還款與清算機制",
      "建立前端 DApp，整合 MetaMask 與 ethers.js 完成鏈上互動流程",
      "專案入圍 2025 RWA Hackathon 複賽",
    ],
    projectUrl: "https://weihongweb.com/fluid-hackathon",
    githubUrl: "https://github.com/weihong931021/Web3-RWA-Hackathon",
  },
  {
    title: "NCU Fresh 2025 — 新生資訊平台 Blog 系統",
    subtitle: "校園資訊內容平台（Markdown + API 架構）",
    tech: ["Nuxt 3", "Vue 3", "Express", "Sequelize", "Tailwind CSS"],
    description: [
      "建立 Markdown-based content pipeline，實作文章動態載入與解析流程",
      "開發後端 API（Express）與資料庫（Sequelize），實現觀看數與收藏功能（JWT 驗證）",
      "與設計與企劃團隊協作，將 Figma UI 轉換為前端實作",
      "負責 RWD 與 Tailwind CSS 樣式優化",
    ],
    projectUrl: "https://ncufresh.ncu.edu.tw/",
    gitlabUrl: "https://gitlab.com/ncufresh/ncufresh25",
  },
  {
    title: "LINE Quest — 城市探索互動系統",
    subtitle: "結合任務與互動流程的城市探索系統",
    tech: ["Vue", "JavaScript"],
    description: [
      "設計任務導向前端流程與狀態邏輯",
      "建立 UI 元件與使用者操作流程，提升互動體驗",
      "參與產品流程設計，整合 AI 劇情與任務機制",
      "入圍 LINE FRESH 校園競賽複賽",
    ],
    projectUrl: "https://weihongweb.com/LineFresh",
    githubUrl: "https://github.com/weihong931021/LINE-FRESH",
  },
]

const inProgressProjects = [
  {
    title: "亂丟垃圾行為偵測系統",
    subtitle: "監控影像中的行為辨識系統（Computer Vision）",
    tech: ["YOLOv11", "OpenCV", "CVAT", "Python"],
    description: [
      "與桃園市環境管理處合作，開發亂丟垃圾行為辨識系統",
      "建立資料處理與標註轉換 pipeline（CVAT XML → YOLO）",
      "已完成垃圾物件偵測模型訓練與初步定位",
      "規劃結合 ROI 與 3D CNN 進行時序行為分析",
    ],
    isInProgress: true,
  },
]

export function ProjectsSection() {
  return (
    <section className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          <span className="inline-block w-3 h-3 bg-primary mr-3"></span>
          Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 px-4">
          以下是我參與過的專案，涵蓋 AI 系統、Web3、全端開發與電腦視覺等領域。
        </p>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="space-y-6">
          {completedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {/* In Progress Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="inline-block w-3 h-3 bg-amber-500 mr-3"></span>
              進行中 In Progress
            </h2>
          </div>
          <div className="space-y-6">
            {inProgressProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
