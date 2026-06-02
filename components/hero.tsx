"use client"

import { ArrowRight, Download, Mail } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { scrollToSection } from "@/lib/scroll-to-section"
import { cvPaths } from "@/lib/nav"

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()

  const go = (id: string) => scrollToSection(id, { offset: 80 })

  return (
    <section ref={ref} id="home" className="relative scroll-mt-20 px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* identity */}
        <div
          className={`space-y-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="space-y-5">
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Olá, sou <span className="gradient-text">Leandro Tenório</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Transformo <span className="font-medium text-foreground">dados em decisões</span>, com base em Ciência
              de Dados, estatística, Python e Machine Learning.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => go("projects")} className="btn-primary group">
              Ver projetos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href={cvPaths.pdf} download className="btn-ghost">
              <Download size={16} />
              Baixar currículo
            </a>
            <button type="button" onClick={() => go("contact")} className="btn-ghost">
              <Mail size={16} />
              Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
