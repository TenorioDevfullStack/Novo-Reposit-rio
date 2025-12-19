"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowDown, Sparkles, Code2, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-[100svh] lg:min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 relative overflow-hidden pt-16 lg:pt-0"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"
          style={{
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="space-y-6 sm:space-y-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <Sparkles className="text-primary group-hover:rotate-45 transition-transform duration-300" size={18} />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-primary/80 group-hover:text-primary transition-colors">
                fullstack developer & ai specialist
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance space-y-2">
              <div>Construindo</div>
              <div className="gradient-text animate-glow">soluções inteligentes</div>
              <div className="flex items-center gap-3">
                com{" "}
                <span className="inline-flex items-center gap-2 text-primary">
                  IA <Zap className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 animate-pulse" />
                </span>
              </div>
            </h1>
          </div>

          <p
            className={`text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Desenvolvedor fullstack com especialidade em IA. Crio aplicações web e mobile que combinam design elegante
            com tecnologia de ponta. Transformo ideias em produtos reais que fazem diferença.
          </p>

          <div
            className={`flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8 transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <a
              href="#projects"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                <Code2 size={18} />
                Explorar Projetos
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </span>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 glass-dark rounded-lg font-semibold transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 text-center"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:flex">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll para explorar</span>
          <ArrowDown size={20} className="text-primary/50" />
        </div>
      </div>
    </section>
  )
}
