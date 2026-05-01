"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface MouseResponsiveBackgroundProps {
  imageUrl?: string
  label?: ReactNode
  showLabel?: boolean
  className?: string
  imageClassName?: string
  children?: ReactNode
}

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function ParallaxBackground({
  imageUrl = DEFAULT_IMAGE_URL,
  label = "Hover me",
  showLabel = true,
  className,
  imageClassName,
  children,
}: MouseResponsiveBackgroundProps) {
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    let animationFrame = 0

    const handleMouseMove = (event: MouseEvent) => {
      window.cancelAnimationFrame(animationFrame)

      animationFrame = window.requestAnimationFrame(() => {
        const windowWidth = window.innerWidth / 5
        const windowHeight = window.innerHeight / 5
        const mouseX = event.clientX / windowWidth
        const mouseY = event.clientY / windowHeight

        bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={cn("relative h-screen w-full overflow-hidden", className)}>
      <div
        ref={bgRef}
        className={cn("absolute left-0 top-0 h-[110%] w-[110%] bg-cover bg-center will-change-transform", imageClassName)}
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {showLabel ? (
        <h1 className="pointer-events-none absolute left-1/2 top-1/2 z-[9] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-6xl italic text-white sm:text-8xl lg:text-[100px]">
          {label}
        </h1>
      ) : null}

      {children}
    </div>
  )
}
