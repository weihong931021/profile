"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
    projectUrl: "https://weihongweb.com/QuantSense",
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
    projectUrl: "https://weihongweb.com/fluid-hackathon/",
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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const triggers: gsap.core.ScrollTrigger[] = []
    const cards = sectionRef.current?.querySelectorAll(".scroll-card") ?? []

    cards.forEach((card, i) => {
      const anim = gsap.fromTo(
        card,
        { opacity: 0, y: 44, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: "power3.out",
          delay: i === 0 ? 0 : 0,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section ref={sectionRef} style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "90vw", margin: "0 auto", padding: "110px 4vw 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Page header */}
          <div className="scroll-card" style={{ textAlign: "center", marginBottom: "56px" }}>
            <h1 style={{
              fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 900,
              color: "rgba(0,0,0,0.85)", margin: "0 0 16px", lineHeight: 1,
            }}>
              Projects
            </h1>
            <p style={{
              fontSize: "12px", fontWeight: 500, letterSpacing: "3px",
              color: "rgba(0,0,0,0.4)", margin: 0,
            }}>
              AI · WEB3 · FULLSTACK · COMPUTER VISION
            </p>
          </div>

          {/* Completed projects */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {completedProjects.map((project) => (
              <div key={project.title} className="scroll-card">
                <ProjectCard {...project} lightMode />
              </div>
            ))}
          </div>

          {/* In Progress */}
          <div style={{ marginTop: "64px" }}>
            <div className="scroll-card" style={{ marginBottom: "28px" }}>
              <p style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "4px",
                color: "rgba(0,0,0,0.22)", textTransform: "uppercase", margin: "0 0 8px",
              }}>
                Currently Working On
              </p>
              <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, color: "rgba(0,0,0,0.82)", margin: 0 }}>
                In Progress
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {inProgressProjects.map((project) => (
                <div key={project.title} className="scroll-card">
                  <ProjectCard {...project} lightMode />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
