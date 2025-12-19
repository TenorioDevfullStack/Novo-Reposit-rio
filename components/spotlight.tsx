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
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(700px_circle_at_var(--mx)_var(--my),rgba(138,43,226,0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(1000px_circle_at_calc(var(--mx)_*_0.75)_calc(var(--my)_*_0.9),rgba(0,212,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
    </div>
  )
}
