"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CheckCircle2, Cpu, GraduationCap } from "lucide-react"

const education = [
  {
    title: "Dev Full Stack",
    institution: "OneBitCode",
    label: "Formação",
    status: "Em andamento",
    description:
      "Formação prática em desenvolvimento web Full Stack, com foco em construir projetos completos e evoluir boas práticas no dia a dia.",
    topics: ["Front-end com React/Next.js", "Back-end com Node.js", "APIs, dados e integrações", "Git, deploy e manutenção"],
    icon: GraduationCap,
    gradient: "from-primary/10 via-transparent to-accent/10",
  },
  {
    title: "Téc. em Eletrônica",
    institution: "",
    label: "Técnico",
    status: "Concluído",
    description: "Base técnica que fortalece raciocínio lógico, disciplina e resolução de problemas — habilidades que levo diretamente para o desenvolvimento de software.",
    topics: ["Raciocínio lógico e troubleshooting", "Resolução de problemas com método", "Atenção a detalhes e qualidade"],
    icon: Cpu,
    gradient: "from-accent/10 via-transparent to-primary/10",
  },
]

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="about" className="lg:min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-4xl w-full space-y-12">
        <div
          className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-balance">Sobre Mim</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="space-y-6">
          <p
            className={`text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            Olá! Meu nome é Leandro Tenório e sou desenvolvedor Full Stack freelancer desde 2023. Trabalho criando
            soluções web completas, do front ao back, com foco em qualidade, performance e uma experiência de uso
            agradável.
          </p>

          <p
            className={`text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            Tenho formação como Dev Full Stack pela OneBitCode e formação técnica em eletrônica — uma combinação que
            reforça meu perfil prático e orientado a resolver problemas reais com clareza e método.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-8">
            <div
              className={`space-y-4 p-5 sm:p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-primary">Desenvolvimento Full Stack</h3>
              <p className="text-muted-foreground">
                Transformo requisitos em aplicações estáveis e bem estruturadas, com interfaces modernas e backends
                robustos.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pt-2">
                {["Interfaces responsivas (React/Next.js)", "APIs e integrações (Node.js)", "Componentização e reuso"].map(
                  (item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-primary/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div
              className={`space-y-4 p-5 sm:p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-accent">Qualidade & Entrega</h3>
              <p className="text-muted-foreground">
                Busco entregas consistentes: código limpo, boa experiência de uso e um fluxo de trabalho transparente.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground pt-2">
                {["Performance e boas práticas", "Deploy e manutenção contínua", "Comunicação clara e entregas incrementais"].map(
                  (item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-accent/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div
            className={`space-y-4 pt-12 transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <h3 className="text-xl font-semibold text-foreground">Formação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {education.map((edu, idx) => {
                const Icon = edu.icon
                return (
                  <div
                    key={`${edu.title}-${idx}`}
                    className={`card-interactive p-5 sm:p-6 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      }`}
                    style={{ transitionDelay: isVisible ? `${500 + idx * 100}ms` : "0ms" }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient}`} />
                    </div>

                    <div className="relative space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs font-mono text-primary/80">{edu.label}</p>
                          <h4 className="text-base sm:text-lg font-semibold text-foreground">{edu.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {edu.institution ? <p className="text-sm text-muted-foreground">{edu.institution}</p> : null}
                            <span className="px-2 py-0.5 text-[11px] rounded-full bg-muted/40 text-muted-foreground">
                              {edu.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Icon size={18} />
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>

                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {edu.topics.map((topic) => (
                          <li key={topic} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
