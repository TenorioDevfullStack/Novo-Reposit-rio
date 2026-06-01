"use client"

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"

import { scrollToSection } from "@/lib/scroll-to-section"
import { contactInfo } from "@/lib/nav"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="font-display text-lg font-semibold text-foreground">Leandro Tenório</p>
          <p className="text-sm text-muted-foreground">Dados &amp; IA · São Paulo, BR · Disponível para oportunidades</p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { name: "Email", href: `mailto:${contactInfo.email}`, icon: Mail },
            { name: "GitHub", href: contactInfo.github, icon: Github },
            { name: "LinkedIn", href: contactInfo.linkedin, icon: Linkedin },
          ].map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
            >
              <s.icon size={18} />
            </a>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("home", { offset: 80 })}
            aria-label="Voltar ao topo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
      <div className="border-t border-border/70">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Leandro Tenório. Construído com Next.js &amp; Tailwind.
        </p>
      </div>
    </footer>
  )
}
