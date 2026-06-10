"use client"

import { useEffect, useRef } from "react"

const INDIGO = "rgb(79, 70, 229)"
const AMBER = "rgb(245, 158, 11)"
const SPACING = 28 // px between dots
const CURSOR_RADIUS = 170
const RIPPLE_SPEED = 340 // px/s — how fast a ripple ring expands
const RIPPLE_WIDTH = 70 // px — thickness of the ripple band
const RIPPLE_LIFE = 2.2 // s

type Ripple = { x: number; y: number; t0: number }

/**
 * AmbientBackground — a matrix of tiny indigo dots that breathes:
 * slow waves travel across the lattice modulating size and opacity,
 * the cursor lights up nearby dots, and clicks (or larger mouse moves)
 * launch concentric ripples that flash amber at their crest.
 * Renders one static frame under prefers-reduced-motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let raf = 0
    let ripples: Ripple[] = []
    const mouse = { x: -9999, y: -9999 }
    const lastSpawn = { x: -9999, y: -9999, t: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / SPACING) + 1
      rows = Math.ceil(height / SPACING) + 1
      if (reducedMotion) draw(12)
    }

    /* slow breathing waves crossing the lattice in three directions */
    const waveAt = (x: number, y: number, t: number) => {
      const w =
        Math.sin(x * 0.011 + t * 0.7) + Math.sin(y * 0.009 - t * 0.55) + Math.sin((x + y) * 0.006 + t * 0.4)
      return 0.5 + w / 6 // → [0, 1]
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)

      const active: Ripple[] = []
      for (const r of ripples) if (t - r.t0 < RIPPLE_LIFE) active.push(r)
      ripples = active

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING
          const y = j * SPACING

          let intensity = waveAt(x, y, t) * 0.55

          // cursor glow
          const dxm = x - mouse.x
          const dym = y - mouse.y
          const dm = Math.hypot(dxm, dym)
          if (dm < CURSOR_RADIUS) intensity += (1 - dm / CURSOR_RADIUS) ** 2 * 0.9

          // expanding ripple rings
          let ripple = 0
          for (const r of ripples) {
            const age = t - r.t0
            const front = age * RIPPLE_SPEED
            const d = Math.hypot(x - r.x, y - r.y)
            const band = Math.exp(-((d - front) ** 2) / (2 * RIPPLE_WIDTH ** 2))
            ripple += band * Math.exp(-age * 1.5)
          }
          intensity += ripple

          if (intensity < 0.04) continue
          if (intensity > 1.6) intensity = 1.6

          ctx.fillStyle = ripple > 0.45 ? AMBER : INDIGO
          ctx.globalAlpha = Math.min(0.08 + intensity * 0.34, 0.78)
          ctx.beginPath()
          ctx.arc(x, y, 0.8 + intensity * 1.9, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const step = (now: number) => {
      draw(now / 1000)
      raf = requestAnimationFrame(step)
    }

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      // a sweeping gesture sheds ripples along the way
      const t = performance.now() / 1000
      const moved = Math.hypot(mouse.x - lastSpawn.x, mouse.y - lastSpawn.y)
      if (moved > 180 && t - lastSpawn.t > 0.35) {
        ripples.push({ x: mouse.x, y: mouse.y, t0: t })
        lastSpawn.x = mouse.x
        lastSpawn.y = mouse.y
        lastSpawn.t = t
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() / 1000 })
    }
    const onPointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener("resize", resize)

    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerdown", onPointerDown)
      document.documentElement.addEventListener("pointerleave", onPointerLeave)
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: "radial-gradient(ellipse 120% 110% at 50% 38%, black 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 110% at 50% 38%, black 55%, transparent 100%)",
        }}
      />
    </div>
  )
}
