"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: "cyan" | "lime" | "coral"
  phase: number
}

const palette = {
  cyan: "96, 218, 255",
  lime: "64, 245, 161",
  coral: "255, 199, 92",
}

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
    const reduceEffects = prefersReducedMotion || isSmallScreen
    const maxDpr = reduceEffects ? 1.25 : 1.75

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    let rafId: number | null = null
    let time = 0

    const pointer = {
      x: width * 0.5,
      y: height * 0.5,
      active: false,
    }

    const nodes: Node[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seedNodes = () => {
      nodes.length = 0
      const count = reduceEffects ? 38 : 72
      const hues: Node["hue"][] = ["cyan", "lime", "coral"]

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.8 + 0.6,
          hue: hues[i % hues.length],
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const drawCircuitLines = () => {
      ctx.save()
      ctx.globalAlpha = 0.22
      ctx.lineWidth = 1

      for (let y = 64; y < height; y += 112) {
        const offset = Math.sin(time * 0.006 + y * 0.012) * 24
        const gradient = ctx.createLinearGradient(0, y, width, y)
        gradient.addColorStop(0, "rgba(96, 218, 255, 0)")
        gradient.addColorStop(0.5, "rgba(64, 245, 161, 0.32)")
        gradient.addColorStop(1, "rgba(255, 199, 92, 0)")
        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(-40, y + offset)
        for (let x = 0; x <= width + 40; x += 80) {
          ctx.lineTo(x, y + Math.sin(time * 0.006 + x * 0.012 + y) * 18)
        }
        ctx.stroke()
      }

      ctx.restore()
    }

    const render = () => {
      time += reduceEffects ? 0.2 : 1

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "rgba(8, 14, 12, 0.28)"
      ctx.fillRect(0, 0, width, height)

      drawCircuitLines()

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const wave = Math.sin(time * 0.014 + node.phase) * 0.08

        if (pointer.active && hasFinePointer && !reduceEffects) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < 230) {
            const pull = (1 - dist / 230) * 0.06
            node.vx += (dx / dist) * pull
            node.vy += (dy / dist) * pull
          }
        }

        node.vx = (node.vx + Math.cos(node.phase + time * 0.003) * wave) * 0.985
        node.vy = (node.vy + Math.sin(node.phase + time * 0.003) * wave) * 0.985
        node.x += node.vx
        node.y += node.vy

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dist = Math.hypot(other.x - node.x, other.y - node.y)
          if (dist < 145) {
            const alpha = (1 - dist / 145) * 0.18
            ctx.strokeStyle = `rgba(${palette[node.hue]}, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = `rgba(${palette[node.hue]}, 0.9)`
        ctx.shadowColor = `rgba(${palette[node.hue]}, 0.55)`
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const animate = () => {
      render()
      rafId = window.requestAnimationFrame(animate)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.active = true
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onResize = () => {
      resize()
      seedNodes()
    }

    resize()
    seedNodes()

    if (prefersReducedMotion) render()
    else animate()

    if (hasFinePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("blur", onPointerLeave)
    }
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      window.removeEventListener("resize", onResize)
      if (hasFinePointer) {
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("blur", onPointerLeave)
      }
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] opacity-80" />
}
