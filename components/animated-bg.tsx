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
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches
    const reduceEffects = prefersReducedMotion || !hasFinePointer || isSmallScreen
    const maxDpr = reduceEffects ? 1.5 : 2
    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    const pointer = { x: 0, y: 0, active: false }
    const canTrackPointer = hasFinePointer && !prefersReducedMotion
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    // Create particles
    const particleCount = reduceEffects ? 24 : 55
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
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

    if (canTrackPointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("blur", onPointerLeave)
    }

    let rafId: number | null = null

    const render = () => {
      ctx.fillStyle = "rgba(8, 12, 22, 0.12)"
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        if (pointer.active && canTrackPointer && !reduceEffects) {
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

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.fillStyle = "rgba(138, 43, 226, 0.3)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (!reduceEffects) {
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
      if (canTrackPointer) {
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("blur", onPointerLeave)
      }
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none opacity-30" />
}
