"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Menu, Search, Terminal, X } from "lucide-react"

import { useActiveSection } from "@/hooks/use-active-section"
import { useCommandMenu } from "@/components/command-menu"
import { scrollToSection } from "@/lib/scroll-to-section"
import { contactInfo, navIds, navItems } from "@/lib/nav"

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function ConsoleShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { openMenu } = useCommandMenu()
  const active = useActiveSection(navIds)
  const clock = useClock()
  const pctRef = useRef<HTMLSpanElement>(null)

  const activeItem = navItems.find((item) => item.id === active) ?? navItems[0]

  // Update scroll % directly on the DOM node (no per-frame React render).
  useEffect(() => {
    let raf: number | null = null
    const update = () => {
      raf = null
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0
      if (pctRef.current) pctRef.current.textContent = `${pct.toString().padStart(3, "0")}%`
    }
    const onScroll = () => {
      if (raf == null) raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf != null) window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id, { delay: open ? 220 : 0, offset: 64 })
  }

  const timeStr = clock
    ? clock.toLocaleTimeString("pt-BR", { hour12: false })
    : "--:--:--"

  return (
    <>
      {/* ---- SYSTEM BAR (top) ---- */}
      <header className="fixed inset-x-0 top-0 z-50 h-11 border-b border-[rgb(var(--rgb-green)/0.18)] bg-[oklch(0.15_0.012_180)/0.92] backdrop-blur-md">
        <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center border border-[rgb(var(--rgb-green)/0.3)] text-primary transition-colors hover:bg-[rgb(var(--rgb-green)/0.12)] lg:hidden"
              aria-label="Alternar menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center border border-[rgb(var(--rgb-green)/0.45)] bg-[rgb(var(--rgb-green)/0.1)] text-primary">
                <Terminal size={15} />
              </span>
              <span className="hidden font-mono text-xs tracking-[0.18em] text-foreground sm:inline">
                leandro.tenorio
                <span className="text-muted-foreground"> // mission_control</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openMenu}
              className="flex items-center gap-2 border border-[rgb(var(--rgb-green)/0.25)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-[rgb(var(--rgb-green)/0.5)] hover:text-primary"
              aria-label="Abrir paleta de comandos (Ctrl+K)"
            >
              <Search size={13} />
              <span className="hidden sm:inline">cmd</span>
              <span className="hidden border-l border-[rgb(var(--rgb-green)/0.25)] pl-2 text-[10px] sm:inline">⌘K</span>
            </button>
            <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground md:flex">
              <span className="led" />
              ONLINE
            </span>
            <span className="font-mono text-[11px] tabular-nums tracking-[0.16em] text-secondary">{timeStr}</span>
          </div>
        </div>
      </header>

      {/* ---- COMMAND RAIL (left) ---- */}
      <aside
        className={`fixed bottom-7 left-0 top-11 z-40 w-64 border-r border-[rgb(var(--rgb-green)/0.18)] bg-[oklch(0.15_0.012_180)/0.96] backdrop-blur-md transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <p className="px-2 pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            // navegação
          </p>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.id)
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-3 border-l-2 px-3 py-2.5 font-mono text-xs transition-colors ${
                    isActive
                      ? "border-primary bg-[rgb(var(--rgb-green)/0.08)] text-primary"
                      : "border-transparent text-muted-foreground hover:border-[rgb(var(--rgb-green)/0.4)] hover:text-foreground"
                  }`}
                >
                  <span className="text-[10px] tabular-nums opacity-60">{item.index}</span>
                  <span className="tracking-[0.18em]">{item.label}</span>
                  {isActive && <span className="led ml-auto" />}
                </a>
              )
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-[rgb(var(--rgb-green)/0.15)] pt-4">
            <div className="flex gap-2">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 flex-1 items-center justify-center border border-[rgb(var(--rgb-green)/0.25)] text-muted-foreground transition-colors hover:border-[rgb(var(--rgb-green)/0.55)] hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 flex-1 items-center justify-center border border-[rgb(var(--rgb-green)/0.25)] text-muted-foreground transition-colors hover:border-[rgb(var(--rgb-green)/0.55)] hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
            <p className="px-1 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-muted-foreground">
              <span className="text-primary">$</span> status: <span className="text-secondary">disponível</span>
              <br />
              <span className="text-primary">$</span> foco: <span className="text-secondary">dados / ia</span>
            </p>
          </div>
        </div>
      </aside>

      {/* mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-11 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ---- MAIN ---- */}
      <main className="relative z-10 min-h-[100svh] w-full min-w-0 pb-7 pt-11 lg:pl-64">
        {children}
      </main>

      {/* ---- STATUS BAR (bottom) ---- */}
      <footer className="fixed inset-x-0 bottom-0 z-40 h-7 border-t border-[rgb(var(--rgb-green)/0.18)] bg-[oklch(0.15_0.012_180)/0.95] backdrop-blur-md">
        <div className="flex h-full items-center justify-between gap-3 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:px-4">
          <div className="flex items-center gap-2 truncate">
            <span className="led-cyan led" />
            <span className="text-secondary">module</span>
            <span className="text-foreground">
              {activeItem.index} · {activeItem.label}
            </span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>lat: -23.55 · lon: -46.63</span>
            <span className="text-muted-foreground/70">são paulo · br</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">scroll</span>
            <span ref={pctRef} className="tabular-nums text-primary">000%</span>
            <span className="hidden text-muted-foreground/70 sm:inline">© 2026 LT</span>
          </div>
        </div>
      </footer>
    </>
  )
}
