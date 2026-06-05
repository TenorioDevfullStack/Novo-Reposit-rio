"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BarChart3, Database, Server, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  siDocker,
  siGithub,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPrisma,
  siPython,
  siR,
  siReact,
  siScikitlearn,
  siTypescript,
  siVercel,
} from "simple-icons"

import { BrandIcon } from "@/components/brand-icon"
import { SectionHead } from "@/components/section-head"

type BrandData = { title: string; hex: string; path: string }
type Tool = { label: string; brand?: BrandData; mono?: string }
type Category = { category: string; icon: LucideIcon; items: Tool[] }

const technologies: Category[] = [
  {
    category: "Linguagens & Dados",
    icon: Database,
    items: [
      { label: "Python", brand: siPython },
      { label: "Pandas", brand: siPandas },
      { label: "NumPy", brand: siNumpy },
      { label: "R", brand: siR },
      { label: "SQL", mono: "SQL" },
      { label: "JS / TS", brand: siTypescript },
    ],
  },
  {
    category: "Ciência de Dados & ML",
    icon: BarChart3,
    items: [
      { label: "Scikit-learn", brand: siScikitlearn },
      { label: "Estatística & probabilidade", mono: "σ" },
      { label: "Análise exploratória e preditiva", mono: "EDA" },
      { label: "Regressão & árvores", mono: "↗" },
    ],
  },
  {
    category: "Bancos de Dados",
    icon: Server,
    items: [
      { label: "PostgreSQL", brand: siPostgresql },
      { label: "MongoDB", brand: siMongodb },
      { label: "Prisma (ORM)", brand: siPrisma },
      { label: "Modelagem & coleta", mono: "⌗" },
    ],
  },
  {
    category: "Ferramentas & DevOps",
    icon: Wrench,
    items: [
      { label: "Git / GitHub", brand: siGithub },
      { label: "Docker", brand: siDocker },
      { label: "Vercel", brand: siVercel },
      { label: "Node.js", brand: siNodedotjs },
      { label: "React", brand: siReact },
      { label: "Next.js", brand: siNextdotjs },
      { label: "Scrum", mono: "⟳" },
    ],
  },
]

export function TechSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="tech" className="relative scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div
        className={`mx-auto max-w-6xl space-y-8 transition-all duration-700 ${
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

        <div className="grid gap-5 sm:grid-cols-2">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.category}
                className="card-surface card-hover flex h-full flex-col gap-4 p-6"
                style={{ transitionDelay: isVisible ? `${idx * 60}ms` : "0ms" }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-foreground">{tech.category}</h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-[13px] font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-secondary"
                    >
                      {item.brand ? (
                        <BrandIcon icon={item.brand} size={16} />
                      ) : (
                        <span className="inline-grid h-4 w-4 place-items-center rounded-[5px] bg-primary text-[9px] font-bold leading-none text-primary-foreground">
                          {item.mono}
                        </span>
                      )}
                      <span>{item.label}</span>
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
