"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BarChart3, Boxes, CheckCircle2, Cpu, GraduationCap } from "lucide-react"

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
    <section ref={ref} id="about" className="relative scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        className={`mx-auto max-w-6xl space-y-12 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead index="01" label="Perfil" title={<>Resumo profissional</>} />

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Sou Leandro Tenório, estudante de Inteligência Artificial na FIAP e em transição de carreira da área de
              elétrica e eletrônica para a área de <span className="font-medium text-foreground">Dados</span>. Combino
              base sólida em Ciência de Dados, estatística, Python e Machine Learning com vivência prática na construção
              de aplicações web — do front ao back, incluindo modelagem e integração de bancos de dados.
            </p>
            <p>
              Tenho perfil orientado à resolução de problemas reais, com projetos hands-on para empresas parceiras
              (Challenges e Global Solution da FIAP). Busco oportunidades em{" "}
              <span className="font-medium text-primary">Dados — análise, engenharia ou ciência de dados</span>.
            </p>
          </div>

          <div className="grid gap-5">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <div key={cap.title} className="card-surface card-hover p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">{cap.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {cap.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-5">
          <p className="eyebrow">Formação</p>
          <div className="grid gap-5 md:grid-cols-3">
            {education.map((edu) => {
              const Icon = edu.icon
              return (
                <div key={edu.title} className="card-surface card-hover flex h-full flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {edu.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold leading-snug text-foreground">{edu.title}</h4>
                    <p className="text-sm font-medium text-primary">{edu.institution}</p>
                  </div>
                  <ul className="mt-1 space-y-1.5 text-sm text-muted-foreground">
                    {edu.topics.map((topic) => (
                      <li key={topic} className="flex gap-2">
                        <span className="text-accent">›</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
