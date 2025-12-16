"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase, Calendar, CheckCircle2, Sparkles } from "lucide-react"

const experiences = [
  {
    role: "Desenvolvedor Full Stack Freelancer",
    company: "Autônomo",
    period: "2023 - Presente",
    summary:
      "Atuo como desenvolvedor freelancer, construindo aplicações web do front ao back — com foco em clareza, performance, boas práticas e evolução contínua do produto.",
    deliveries: [
      "Aplicações Full Stack (UI + API + dados)",
      "Integrações com serviços e APIs externas",
      "Autenticação, autorização e boas práticas de segurança",
      "Banco de dados PostgreSQL com Prisma",
      "Containers com Docker e deploy na Vercel",
      "Manutenção e melhorias contínuas",
    ],
    approach: ["Alinhamento de escopo e prioridades", "Entregas incrementais com Git", "Comunicação clara e prazos", "Documentação e handoff"],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "Vercel", "Tailwind CSS"],
  },
]

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="experience" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
      <div className="max-w-4xl w-full space-y-12">
        <div
          className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-balance">Experiência</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
          <p className="text-muted-foreground leading-relaxed pt-5 max-w-2xl">
            Minha experiência profissional é como desenvolvedor freelancer desde 2023, atuando no desenvolvimento de soluções web completas.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`card-interactive p-8 lg:p-10 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } group`}
              style={{ transitionDelay: isVisible ? `${idx * 150}ms` : "0ms" }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              </div>

              <div className="relative space-y-7">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-primary/80">
                      <Briefcase size={14} className="text-primary/80" />
                      Freelancer
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="text-primary font-medium">{exp.company}</span>
                      <span className="inline-flex items-center gap-2">
                        <Calendar size={14} className="text-primary/70" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/30 text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{exp.summary}</p>

                <div className="grid md:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">O que eu entrego</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.deliveries.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 size={16} className="mt-0.5 text-primary/80 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Como eu trabalho</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.approach.map((item) => (
                        <li key={item} className="flex gap-2">
                          <Sparkles size={16} className="mt-0.5 text-accent/80 shrink-0" />
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
