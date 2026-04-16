type ScrollToSectionOptions = {
  delay?: number
  offset?: number
}

/**
 * Scrolls smoothly to a section by its element ID.
 * Uses the document scrolling element with a scrollIntoView fallback for better mobile support.
 */
export function scrollToSection(id: string, options: ScrollToSectionOptions = {}) {
  const { delay = 0, offset = 24 } = options

  const scroll = () => {
    const el = document.getElementById(id)
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth"
    const scrollingElement = document.scrollingElement ?? document.documentElement
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)

    // Ensures the page is scrollable again before attempting the mobile scroll.
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = ""
    }

    requestAnimationFrame(() => {
      scrollingElement.scrollTo({ top, behavior })
      window.scrollTo({ top, behavior })

      // Fallback that helps iOS Safari when programmatic scroll is ignored after overlays close.
      setTimeout(() => {
        const currentTop = Math.abs(el.getBoundingClientRect().top - offset)
        if (currentTop > 4) {
          el.scrollIntoView({ behavior, block: "start", inline: "nearest" })
          if (offset) {
            const adjustedTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
            scrollingElement.scrollTo({ top: adjustedTop, behavior })
          }
        }
      }, 50)
    })

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`)
    }
  }

  if (delay > 0) {
    window.setTimeout(scroll, delay)
    return
  }

  scroll()
}
