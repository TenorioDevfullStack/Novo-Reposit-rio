"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Download, ExternalLink, FileText, FileType2 } from "lucide-react"

import { Panel } from "@/components/panel"
import { SectionHead } from "@/components/section-head"
import { cvPaths } from "@/lib/nav"

const manifest = [
  "Resumo profissional e objetivo em Dados",
  "Formação em IA (FIAP) e experiências",
  "Projetos acadêmicos e de desenvolvimento",
  "Competências em Dados, ML e desenvolvimento",
]

export function CvSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="cv" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-5xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="05"
          label="EXPORT"
          title={
            <>
              Exportar <span className="gradient-text">currículo</span>
            </>
          }
          subtitle="Disponível em PDF e Word. Selecione o formato para baixar o arquivo completo."
        />

        <Panel label="export ~/cv --format" status="2 arquivos" statusColor="amber" hover>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-[rgb(var(--rgb-green)/0.3)] bg-[rgb(var(--rgb-green)/0.08)] text-primary">
                  <FileText size={20} />
                </span>
                <div>
                  <p className="font-sans text-lg font-semibold text-foreground">CV_Leandro_Tenorio_Dados</p>
                  <p className="font-mono text-xs text-secondary">transição de carreira para Dados</p>
                </div>
              </div>

              <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                {manifest.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:w-64">
              <a href={cvPaths.pdf} download className="term-btn">
                <Download size={16} />
                baixar.pdf
              </a>
              <a href={cvPaths.docx} download className="term-btn term-btn-amber">
                <FileType2 size={16} />
                baixar.docx
              </a>
              <a
                href={cvPaths.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgb(var(--rgb-green)/0.2)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-[rgb(var(--rgb-green)/0.45)] hover:text-foreground"
              >
                <ExternalLink size={14} />
                visualizar
              </a>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  )
}
