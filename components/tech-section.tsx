"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BarChart3, Database, Terminal, Wrench } from "lucide-react"

import { Panel } from "@/components/panel"
import { SectionHead } from "@/components/section-head"

const technologies = [
  {
    category: "Linguagens & Dados",
    icon: Database,
    items: ["Python (Pandas, NumPy)", "R", "SQL", "JavaScript/TypeScript"],
  },
  {
    category: "Ciência de Dados & ML",
    icon: BarChart3,
    items: ["Estatística e probabilidade", "Análise exploratória e preditiva", "Scikit-learn", "Regressão e árvores"],
  },
  {
    category: "Bancos de Dados",
    icon: Terminal,
    items: ["PostgreSQL", "MongoDB", "Prisma (ORM)", "Modelagem e coleta"],
  },
  {
    category: "Ferramentas & DevOps",
    icon: Wrench,
    items: ["Git/GitHub", "Docker", "Vercel", "Node.js, React/Next.js", "Scrum"],
  },
]

export function TechSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="tech" className="relative scroll-mt-16 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        className={`mx-auto max-w-5xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="04"
          label="STACK"
          title={
            <>
              Módulos e <span className="gradient-text">capacidades técnicas</span>
            </>
          }
          subtitle="Ferramentas e conhecimentos que uso e continuo estudando, com foco em Dados e Machine Learning."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <Panel key={tech.category} label={`mod.${idx}`} hover ticks className="h-full">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center border border-[rgb(var(--rgb-green)/0.3)] bg-[rgb(var(--rgb-green)/0.08)] text-primary">
                      <Icon size={17} />
                    </span>
                    <span className="led ml-auto" />
                  </div>
                  <h3 className="font-sans text-base font-semibold leading-snug text-foreground">{tech.category}</h3>
                  <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                    {tech.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 transition-colors hover:text-foreground"
                      >
                        <span className="text-primary">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            )
          })}
        </div>
      </div>
    </section>
  )
}
