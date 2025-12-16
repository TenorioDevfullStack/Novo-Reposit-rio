"use client"

import { useEffect, useRef } from "react"

export function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    // Create particles
    const particleCount = prefersReducedMotion ? 20 : 55
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5,
      })
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.active = true
      pointer.x = e.clientX
      pointer.y = e.clientY
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("blur", onPointerLeave)

    let rafId: number | null = null

    const render = () => {
      ctx.fillStyle = "rgba(8, 12, 22, 0.12)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((p) => {
        if (pointer.active && !prefersReducedMotion) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < 160) {
            const force = (1 - dist / 160) * 0.08
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.vx *= 0.985
        p.vy *= 0.985

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0

        ctx.fillStyle = "rgba(138, 43, 226, 0.3)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    const animate = () => {
      render()

      rafId = window.requestAnimationFrame(animate)
    }

    if (prefersReducedMotion) render()
    else animate()

    window.addEventListener("resize", resize, { passive: true })

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("blur", onPointerLeave)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none opacity-30" />
}
