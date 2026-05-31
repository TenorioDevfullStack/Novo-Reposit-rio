"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CheckCircle2, ChevronRight } from "lucide-react"

import { Panel } from "@/components/panel"
import { SectionHead } from "@/components/section-head"

const experiences = [
  {
    role: "Transição para Dados & IA",
    company: "FIAP — Tecnólogo em Inteligência Artificial",
    period: "2026 — atual",
    statusColor: "green" as const,
    statusText: "em formação",
    summary:
      "Aplico o perfil analítico da área técnica a projetos de dados e IA, com base em Ciência de Dados, estatística, Python e Machine Learning.",
    skills: [
      "Análise exploratória e preditiva de dados",
      "Coleta, integração e tratamento de dados em bases",
      "Fundamentos de ML (regressão e árvores de decisão)",
      "Projetos hands-on com empresas parceiras",
    ],
    approachLabel: "como atuo",
    approach: ["Metodologias ágeis (Scrum)", "Entregas versionadas no GitHub", "Discovery do problema de negócio", "Prototipação e PoC"],
    tags: ["Ciência de Dados", "Machine Learning", "Estatística", "Python"],
  },
  {
    role: "Profissional de Elétrica e Eletrônica",
    company: "Setor técnico",
    period: "2021 — atual",
    statusColor: "cyan" as const,
    statusText: "experiência",
    summary:
      "Atuação em diagnóstico, manutenção e resolução de problemas — fortalecendo raciocínio lógico, método e atenção a detalhes que levo para projetos de dados.",
    skills: ["Diagnóstico e resolução de problemas técnicos", "Manutenção com método e precisão", "Raciocínio lógico aplicado"],
    approachLabel: "o que levo p/ dados",
    approach: ["Perfil analítico e orientado a problemas", "Método e disciplina", "Atenção a detalhes e qualidade"],
    tags: ["Resolução de problemas", "Raciocínio lógico", "Método"],
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-5xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="02"
          label="LOG"
          title={
            <>
              Experiência e <span className="gradient-text">transição de carreira</span>
            </>
          }
          subtitle="Da elétrica/eletrônica para Dados e IA: perfil analítico de uma carreira técnica somado à formação em Ciência de Dados e ML na FIAP."
        />

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <Panel
              key={exp.role}
              label={`process[${idx}]`}
              status={exp.statusText}
              statusColor={exp.statusColor}
              hover
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-sans text-xl font-bold text-foreground sm:text-2xl">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                      <span className="text-secondary">{exp.company}</span>
                      <span className="text-muted-foreground">· {exp.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[rgb(var(--rgb-green)/0.2)] bg-black/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-mono text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

                <div className="grid gap-6 border-t border-[rgb(var(--rgb-green)/0.12)] pt-5 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">// competências</h4>
                    <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                      {exp.skills.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">// {exp.approachLabel}</h4>
                    <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                      {exp.approach.map((item) => (
                        <li key={item} className="flex gap-2">
                          <ChevronRight size={14} className="mt-0.5 shrink-0 text-secondary/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  )
}
