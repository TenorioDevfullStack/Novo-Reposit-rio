"use client"

import { useEffect, useRef, useState } from "react"

type SkillBarProps = {
  label: string
  /** 0–100 */
  value: number
  detail?: string
  className?: string
}

/**
 * Horizontal skill bar that fills once it scrolls into view.
 * Reads as a small, friendly data visualization.
 */
export function SkillBar({ label, value, detail, className }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-primary">{value}%</span>
      </div>
      <div className="skill-track">
        <span className="skill-fill" style={{ width: active ? `${value}%` : "0%" }} />
      </div>
      {detail ? <p className="mt-1.5 text-xs text-muted-foreground">{detail}</p> : null}
    </div>
  )
}
