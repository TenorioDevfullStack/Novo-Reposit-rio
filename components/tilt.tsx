"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type TiltProps = React.HTMLAttributes<HTMLDivElement> & {
  max?: number
  perspective?: number
  scale?: number
}

export function Tilt({ max = 10, perspective = 900, scale = 1.03, className, ...props }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    enabledRef.current = hasFinePointer && !prefersReducedMotion
  }, [])

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)"
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !enabledRef.current) return

    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    const rotateY = (px - 0.5) * 2 * max
    const rotateX = (0.5 - py) * 2 * max

    el.style.transition = "transform 60ms linear"
    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  const onPointerLeave = () => reset()

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("will-change-transform", className)}
      {...props}
    />
  )
}

