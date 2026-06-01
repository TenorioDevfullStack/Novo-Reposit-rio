"use client"

import { useEffect, useState } from "react"
import { Download, Menu, Search, X } from "lucide-react"

import { useActiveSection } from "@/hooks/use-active-section"
import { useCommandMenu } from "@/components/command-menu"
import { scrollToSection } from "@/lib/scroll-to-section"
import { cvPaths, navIds, navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

// Anchor links shown in the desktop bar (skip the redundant "Início").
const linkItems = navItems.filter((item) => item.id !== "home")

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openMenu } = useCommandMenu()
  const active = useActiveSection(navIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
    scrollToSection(id, { delay: open ? 200 : 0, offset: 80 })
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* brand */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2.5"
            aria-label="Voltar ao topo"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-display text-base font-semibold text-primary-foreground shadow-[0_6px_16px_-8px_rgb(79_70_229_/_0.7)]">
              LT
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
              Leandro Tenório
            </span>
          </button>

          {/* desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {linkItems.map((item) => {
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
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openMenu}
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:flex"
              aria-label="Abrir busca (Ctrl+K)"
            >
              <Search size={14} />
              <span>Buscar</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </button>

            <a href={cvPaths.pdf} download className="btn-primary hidden h-9 px-4 text-sm sm:inline-flex">
              <Download size={15} />
              Baixar CV
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-primary/40 lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-16 mx-4 rounded-2xl border border-border bg-card p-3 shadow-xl transition-all duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <div className="flex flex-col">
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
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    isActive ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted",
                  )}
                >
                  <span className="text-xs tabular-nums text-muted-foreground">{item.index}</span>
                  {item.title}
                </a>
              )
            })}
            <a href={cvPaths.pdf} download className="btn-primary mt-2 w-full">
              <Download size={15} />
              Baixar CV
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
