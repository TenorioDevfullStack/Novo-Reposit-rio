"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { scrollToSection } from "@/lib/scroll-to-section"

export function Hero() {
  const go = (id: string) => scrollToSection(id, { offset: 80 })

  return (
    <section id="home" className="portfolio-hero relative scroll-mt-20 px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="min-w-0 space-y-7">
          <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Leandro Tenório · Dados &amp; IA</p>
          <h1 className="text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[3.65rem]">
            Análise de dados para entender problemas e <span className="text-primary">orientar decisões.</span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Desenvolvo análises, modelos e aplicações que ajudam a explorar informações e apoiar decisões de negócio.
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => go("projects")} className="btn-primary group">
              Explorar projetos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => go("contact")} className="btn-ghost">Conversar sobre um projeto</button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-5 text-xs font-medium text-muted-foreground">
            <span>Análise de dados</span><span aria-hidden="true" className="text-primary/40">/</span>
            <span>Machine Learning</span><span aria-hidden="true" className="text-primary/40">/</span><span>Aplicações web</span>
          </div>
        </div>
        <figure className="hero-project min-w-0 rounded-3xl border border-border bg-card p-2.5 shadow-[0_24px_70px_-25px_rgb(79_70_229_/_0.22)] sm:p-3">
          <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-1.5 text-[11px] text-muted-foreground">
            <span className="inline-flex gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-primary/30" /><span className="h-2 w-2 rounded-full bg-primary/15" /><span className="h-2 w-2 rounded-full bg-primary/10" /></span>
            <span>DO DADO À VISUALIZAÇÃO</span>
          </div>
          <div className="relative aspect-[1.2] overflow-hidden rounded-2xl bg-[#0d1915]">
            <Image src="/images/projects/energy.webp" alt="Dashboard Energy Intelligence AI com indicadores de potência e curva de carga observada versus prevista, usando dados sintéticos." fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 90vw, 95vw" className="hero-dashboard object-cover" priority />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
            <div><p className="text-sm font-semibold">Energy Intelligence AI</p><p className="mt-1 text-xs text-muted-foreground">Projeto de portfólio · Dados sintéticos</p></div>
            <a href="https://energy-intelligence-leandro.streamlit.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">Explorar demo <ArrowUpRight size={15} /><span className="sr-only"> (abre em nova aba)</span></a>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
