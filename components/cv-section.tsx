"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Download, ExternalLink, FileText, FileType2 } from "lucide-react"

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
    <section ref={ref} id="cv" className="relative scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        className={`mx-auto max-w-6xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="05"
          label="Currículo"
          title={<>Baixe meu currículo</>}
          subtitle="Disponível em PDF e Word. Escolha o formato para baixar o arquivo completo."
        />

        <div className="card-surface overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <FileText size={22} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">CV — Leandro Tenório</p>
                  <p className="text-sm text-primary">Transição de carreira para Dados</p>
                </div>
              </div>

              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {manifest.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:w-64">
              <a href={cvPaths.pdf} download className="btn-primary">
                <Download size={16} />
                Baixar PDF
              </a>
              <a href={cvPaths.docx} download className="btn-accent">
                <FileType2 size={16} />
                Baixar Word
              </a>
              <a
                href={cvPaths.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={15} />
                Visualizar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
