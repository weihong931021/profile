# text-scramble — 原始整合 Prompt

## 元件程式碼

```tsx
// components/ui/text-scramble.tsx
"use client"

import { useState, useCallback, useRef, useEffect } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface TextScrambleProps {
  text: string
  className?: string
  scrambleClassName?: string
  autoPlay?: boolean
  autoPlayDelay?: number
}

export function TextScramble({ text, className = "", scrambleClassName = "text-white/30", autoPlay = false, autoPlayDelay = 400 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 3
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)
      const newText = text.split("").map((char, i) => {
        if (char === " ") return " "
        if (i < revealedLength) return text[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join("")
      setDisplayText(newText)
      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text])

  const handleMouseEnter = () => { scramble() }

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(() => scramble(), autoPlayDelay)
      return () => { clearTimeout(t); if (intervalRef.current) clearInterval(intervalRef.current) }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [autoPlay, autoPlayDelay, scramble])

  return (
    <div className={`group relative inline-flex flex-col cursor-pointer select-none ${className}`} onMouseEnter={handleMouseEnter}>
      <span className="relative font-mono text-lg tracking-widest uppercase whitespace-nowrap">
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${isScrambling && char !== text[i] ? scrambleClassName : "text-foreground"}`}
            style={{ transitionDelay: `${i * 10}ms`, minWidth: text[i] === " " ? "0.5em" : undefined }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </div>
  )
}
```

## Demo 用法

```tsx
import { TextScramble } from "@/components/ui/text-scramble";

<TextScramble text="VIEW WORK" />
```

## 本站用法

```tsx
<TextScramble
  text="HUANG WEI-HONG"
  scrambleClassName="text-white/20"
  className="opacity-40 hover:opacity-100 transition-opacity duration-300"
  autoPlay
  autoPlayDelay={600}
/>
```
