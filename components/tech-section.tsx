"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Code2, Server, Brain, Zap } from "lucide-react"

const technologies = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"],
    icon: Code2,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    icon: Server,
    color: "from-green-500/20 to-green-500/5",
  },
  {
    category: "IA & ML",
    items: ["OpenAI", "Claude", "LangChain", "TensorFlow", "Prompting"],
    icon: Brain,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    category: "DevOps",
    items: ["Docker", "AWS", "GitHub Actions", "Vercel", "CI/CD"],
    icon: Zap,
    color: "from-yellow-500/20 to-yellow-500/5",
  },
]

export function TechSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} id="tech" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
      <div className="max-w-6xl w-full space-y-12">
        <div
          className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-balance">Tecnologias</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.category}
                className={`group relative bg-gradient-to-br ${tech.color} border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer ${
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${idx * 100}ms` : "0ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Icon className="text-primary w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tech.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {tech.items.map((item) => (
                      <li
                        key={item}
                        className="text-muted-foreground text-sm hover:text-foreground hover:translate-x-1 transition-all duration-300 cursor-pointer"
                      >
                        ▸ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
