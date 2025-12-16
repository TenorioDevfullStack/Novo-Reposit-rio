"use client"

import { useEffect, useMemo, useState } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "")
  const key = useMemo(() => sectionIds.join("|"), [sectionIds])

  useEffect(() => {
    if (!sectionIds.length) return

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        const top = visible[0]?.target
        if (top instanceof HTMLElement) setActiveId(top.id)
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -65% 0px",
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [key])

  return activeId
}
