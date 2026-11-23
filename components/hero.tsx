"use client"

import { ArrowRight } from "lucide-react"
import { ComparacaoBuscas } from "@/components/comparacao-buscas"
import { scrollToSection } from "@/lib/scroll-to-section"

export function Hero() {
  const go = (id: string) => scrollToSection(id, { offset: 80 })

  return (
    <section id="home" className="portfolio-hero relative scroll-mt-20 px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="min-w-0 space-y-7">
          <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Leandro Tenório · Dados &amp; IA</p>
          <h1 className="text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[3.65rem]">
            Desenvolvo agentes de IA e aplicações de <span className="text-primary">machine learning.</span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Estudo Inteligência Artificial na FIAP e aplico Python, APIs e bancos de dados em projetos de atendimento, energia e automação.
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => go("projects")} className="btn-primary group">
              Explorar projetos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => go("contact")} className="btn-ghost">Conversar sobre um projeto</button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-5 text-xs font-medium text-muted-foreground">
            <span>IA generativa</span><span aria-hidden="true" className="text-primary/40">/</span>
            <span>Machine Learning</span><span aria-hidden="true" className="text-primary/40">/</span><span>Integração de sistemas</span>
          </div>
        </div>
        <ComparacaoBuscas />
      </div>
    </section>
  )
}
