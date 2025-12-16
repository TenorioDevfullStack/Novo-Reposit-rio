"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Moon, Search, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

import { useActiveSection } from "@/hooks/use-active-section"
import { useCommandMenu } from "@/components/command-menu"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { openMenu } = useCommandMenu()

  const activeSection = useActiveSection(["home", "about", "experience", "projects", "tech", "contact"])

  const navItems = [
    { label: "INÍCIO", href: "#home", id: "home" },
    { label: "SOBRE", href: "#about", id: "about" },
    { label: "EXPERIÊNCIA", href: "#experience", id: "experience" },
    { label: "PROJETOS", href: "#projects", id: "projects" },
    { label: "TECNOLOGIAS", href: "#tech", id: "tech" },
    { label: "CONTATO", href: "#contact", id: "contact" },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 lg:hidden p-2 rounded-lg glass-dark hover:border-primary/40 transition-all duration-300 hover:scale-110"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card/60 backdrop-blur-xl border-r border-border/50 shadow-2xl shadow-primary/10 transition-all duration-500 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="mb-10 pt-4 animate-fade-in space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LT
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Leandro Tenório</p>
                <p className="text-sm text-muted-foreground mt-2">Fullstack Developer</p>
                <p className="text-xs text-muted-foreground">AI Specialist</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={openMenu}
                  className="p-2 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  aria-label="Abrir atalhos (Ctrl+K)"
                  type="button"
                >
                  <Search size={18} />
                </button>
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  aria-label="Alternar tema"
                  type="button"
                >
                  {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Ctrl/Cmd + K
              </span>
            </div>
          </div>

          <nav className="flex-1 space-y-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block pl-4 text-sm font-medium transition-all relative group ${
                  activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    activeSection === item.id
                      ? "opacity-100 scale-100 shadow-[0_0_18px_rgba(138,43,226,0.65)]"
                      : "opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-100"
                  }`}
                />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-6 border-t border-border">
            {[
              { label: "GitHub", href: "https://github.com/TenorioDevfullStack", external: true },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/leandro-ten%C3%B3rio-088378310/", external: true },
              { label: "Email", href: "mailto:intelligentdevsolutions@gmail.com", external: false },
              { label: "Telefone", href: "tel:+5511989437498", external: false },
            ].map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1"
                style={{ animationDelay: `${(navItems.length + idx) * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
