"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BarChart3, Database, Server, Wrench } from "lucide-react"

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
    icon: Server,
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
    <section ref={ref} id="tech" className="relative scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        className={`mx-auto max-w-6xl space-y-10 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="04"
          label="Stack"
          title={
            <>
              Ferramentas e <span className="gradient-text">capacidades técnicas</span>
            </>
          }
          subtitle="O que uso e continuo estudando, com foco em Dados e Machine Learning."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div key={tech.category} className="card-surface card-hover flex h-full flex-col gap-4 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-base font-semibold leading-snug text-foreground">{tech.category}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tech.items.map((item) => (
                    <li key={item} className="flex gap-2 transition-colors hover:text-foreground">
                      <span className="text-accent">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
