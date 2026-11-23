"use client"

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
        <figure className="min-w-0 rounded-3xl border border-border bg-card p-4 shadow-[0_24px_70px_-25px_rgb(79_70_229_/_0.22)] sm:p-6">
          <figcaption className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold">Empório da Música AI</span>
            <span className="text-xs text-muted-foreground">Execução registrada · 31 out. 2026</span>
          </figcaption>
          <div className="rounded-2xl bg-slate-950 p-5 text-slate-100 sm:p-7">
            <p className="text-xs font-medium text-slate-300">Pergunta do cliente</p>
            <blockquote className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">“Tem Ohana CK-20 por até 500 reais?”</blockquote>
            <div className="my-5 border-y border-white/15 py-4">
              <p className="text-xs text-slate-300">Ferramenta consultada</p>
              <code className="text-sm text-indigo-200">search_offers</code>
            </div>
            <p className="text-sm">Ohana CK-20 Concert Natural</p>
            <p className="mt-1 text-3xl font-semibold">R$ 439,20 <span className="text-xs font-normal text-slate-300">sem frete</span></p>
          </div>
          <a href="https://github.com/TenorioDevfullStack/emporio-musica-ai/blob/main/examples/01_catalogo.md" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Ver registro da execução <ArrowUpRight size={15} /><span className="sr-only"> (abre em nova aba)</span></a>
        </figure>
      </div>
    </section>
  )
}
