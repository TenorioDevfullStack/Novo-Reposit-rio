"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BarChart3, Boxes, CheckCircle2, Cpu, GraduationCap } from "lucide-react"

import { Panel } from "@/components/panel"
import { SectionHead } from "@/components/section-head"

const capabilities = [
  {
    title: "Ciência de Dados & ML",
    icon: BarChart3,
    desc: "Exploro, trato e analiso dados para gerar insights e modelos, aplicando estatística e fundamentos de Machine Learning.",
    items: ["Análise exploratória e preditiva", "Python (Pandas, NumPy), R e SQL", "Modelagem com Scikit-learn"],
  },
  {
    title: "Desenvolvimento de Aplicações",
    icon: Boxes,
    desc: "Construo aplicações web completas que dão suporte à coleta, integração e visualização de dados em soluções reais.",
    items: ["Full Stack (React/Next.js, Node.js)", "Modelagem e integração de bancos", "Aprendizado contínuo em IA"],
  },
]

const education = [
  {
    title: "Tecnólogo em Inteligência Artificial",
    institution: "FIAP",
    status: "2026 — 2028 · em andamento",
    topics: ["Machine Learning & Modelling", "Ciência de Dados e estatística", "IA Generativa e NLP", "Python aplicado"],
    icon: GraduationCap,
  },
  {
    title: "Dev Full Stack",
    institution: "OneBitCode",
    status: "concluído",
    topics: ["Front-end com React/Next.js", "Back-end com Node.js", "APIs, dados e integrações", "Git, deploy e manutenção"],
    icon: GraduationCap,
  },
  {
    title: "Técnico em Eletrônica",
    institution: "Etec Zona Sul",
    status: "2017 — 2019",
    topics: ["Raciocínio lógico e troubleshooting", "Resolução de problemas com método", "Atenção a detalhes e qualidade"],
    icon: Cpu,
  },
]

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="about" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-5xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="01"
          label="PROFILE"
          title={
            <>
              Resumo <span className="gradient-text">profissional</span>
            </>
          }
        />

        <Panel label="cat ~/perfil.md" status="read-only" statusColor="cyan" hover>
          <div className="space-y-4 font-mono text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="text-primary">{"// "}</span>
              Olá! Sou Leandro Tenório, estudante de Inteligência Artificial na FIAP e em transição de carreira da área de
              elétrica e eletrônica para a área de <span className="text-foreground">Dados</span>. Combino base sólida em
              Ciência de Dados, estatística, Python e Machine Learning com vivência prática na construção de aplicações
              web — do front ao back, incluindo modelagem e integração de bancos de dados.
            </p>
            <p>
              <span className="text-primary">{"// "}</span>
              Tenho perfil orientado à resolução de problemas reais, com projetos hands-on para empresas parceiras
              (Challenges e Global Solution da FIAP). Busco oportunidades em{" "}
              <span className="text-secondary">Dados — análise, engenharia ou ciência de dados</span>.
            </p>
          </div>
        </Panel>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <Panel key={cap.title} label={cap.title} hover>
                <div className="space-y-4">
                  <Icon size={22} className="text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                  <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                    {cap.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            )
          })}
        </div>

        <div className="space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">// formação</p>
          <div className="grid gap-5 md:grid-cols-3">
            {education.map((edu) => {
              const Icon = edu.icon
              return (
                <Panel key={edu.title} hover className="h-full">
                  <div className="flex h-full flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <Icon size={20} className="text-primary" />
                      <span className="border border-[rgb(var(--rgb-green)/0.2)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                        {edu.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans text-base font-semibold leading-snug text-foreground">{edu.title}</h4>
                      <p className="font-mono text-xs text-secondary">{edu.institution}</p>
                    </div>
                    <ul className="mt-1 space-y-1.5 font-mono text-[11px] text-muted-foreground">
                      {edu.topics.map((topic) => (
                        <li key={topic} className="flex gap-2">
                          <span className="text-primary">›</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Panel>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
