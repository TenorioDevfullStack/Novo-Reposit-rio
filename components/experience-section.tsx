"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CheckCircle2, ChevronRight } from "lucide-react"

import { SectionHead } from "@/components/section-head"

const experiences = [
  {
    role: "Transição para Dados & IA",
    company: "FIAP — Tecnólogo em Inteligência Artificial",
    period: "2026 — atual",
    statusText: "em formação",
    summary:
      "Aplico o perfil analítico da área técnica a projetos de dados e IA, com base em Ciência de Dados, estatística, Python e Machine Learning.",
    skills: [
      "Análise exploratória e preditiva de dados",
      "Coleta, integração e tratamento de dados em bases",
      "Fundamentos de ML (regressão e árvores de decisão)",
      "Projetos hands-on com empresas parceiras",
    ],
    approachLabel: "Como atuo",
    approach: ["Metodologias ágeis (Scrum)", "Entregas versionadas no GitHub", "Discovery do problema de negócio", "Prototipação e PoC"],
    tags: ["Ciência de Dados", "Machine Learning", "Estatística", "Python"],
  },
  {
    role: "Profissional de Elétrica e Eletrônica",
    company: "Setor técnico",
    period: "2021 — atual",
    statusText: "experiência",
    summary:
      "Atuação em diagnóstico, manutenção e resolução de problemas — fortalecendo raciocínio lógico, método e atenção a detalhes que levo para projetos de dados.",
    skills: ["Diagnóstico e resolução de problemas técnicos", "Manutenção com método e precisão", "Raciocínio lógico aplicado"],
    approachLabel: "O que levo p/ dados",
    approach: ["Perfil analítico e orientado a problemas", "Método e disciplina", "Atenção a detalhes e qualidade"],
    tags: ["Resolução de problemas", "Raciocínio lógico", "Método"],
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        className={`mx-auto max-w-6xl space-y-12 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="02"
          label="Trajetória"
          title={
            <>
              Experiência e <span className="gradient-text">transição de carreira</span>
            </>
          }
          subtitle="Da elétrica/eletrônica para Dados e IA: o perfil analítico de uma carreira técnica somado à formação em Ciência de Dados e ML na FIAP."
        />

        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:hidden before:h-[calc(100%-1rem)] before:w-px before:bg-border md:before:block md:pl-10">
          {experiences.map((exp) => (
            <div key={exp.role} className="relative">
              <span
                className="absolute -left-10 top-2 hidden h-3.5 w-3.5 rounded-full border-2 border-primary bg-background md:block"
                aria-hidden="true"
              />
              <div className="card-surface card-hover p-6 sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-1.5">
                    <span className="chip">{exp.statusText}</span>
                    <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{exp.company}</span>
                      <span>· {exp.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{exp.summary}</p>

                <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="eyebrow">Competências</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.skills.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="eyebrow text-accent-foreground">{exp.approachLabel}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.approach.map((item) => (
                        <li key={item} className="flex gap-2">
                          <ChevronRight size={16} className="mt-0.5 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
