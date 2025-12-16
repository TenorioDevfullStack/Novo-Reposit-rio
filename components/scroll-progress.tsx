"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress({ className }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    let rafId: number | null = null

    const update = () => {
      rafId = null
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${progress})`
    }

    const onChange = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onChange, { passive: true })
    window.addEventListener("resize", onChange, { passive: true })

    return () => {
      window.removeEventListener("scroll", onChange)
      window.removeEventListener("resize", onChange)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div aria-hidden="true" className={cn("fixed left-0 top-0 z-50 h-1 w-full", className)}>
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-secondary shadow-[0_0_24px_rgba(138,43,226,0.45)]"
      />
    </div>
  )
}

