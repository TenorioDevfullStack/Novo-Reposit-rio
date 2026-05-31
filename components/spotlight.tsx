"use client"

import { useEffect, useRef } from "react"

export function Spotlight() {
  const rafId = useRef<number | null>(null)
  const latest = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (media.matches || !hasFinePointer) return

    const root = document.documentElement

    const flush = () => {
      rafId.current = null
      root.style.setProperty("--mx", `${latest.current.x}px`)
      root.style.setProperty("--my", `${latest.current.y}px`)
    }

    const onPointerMove = (event: PointerEvent) => {
      latest.current = { x: event.clientX, y: event.clientY }
      if (rafId.current == null) rafId.current = window.requestAnimationFrame(flush)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2]">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(680px_circle_at_var(--mx)_var(--my),rgba(64,245,161,0.14),transparent_56%)]" />
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(980px_circle_at_calc(var(--mx)_*_0.72)_calc(var(--my)_*_0.86),rgba(96,218,255,0.08),transparent_58%)]" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(760px_circle_at_calc(100vw_-_var(--mx))_calc(var(--my)_*_0.68),rgba(255,199,92,0.06),transparent_58%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/70" />
    </div>
  )
}
