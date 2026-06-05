"use client"

import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { ArrowRight, Download, Mail } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { scrollToSection } from "@/lib/scroll-to-section"
import { cvPaths } from "@/lib/nav"

const ROTATING_WORDS = ["decisões.", "modelos.", "previsões.", "insights."]

/** Palavra que troca suavemente (sobe/entra). Pausa com prefers-reduced-motion. */
function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  const n = ROTATING_WORDS.length
  return (
    <span className="relative inline-grid align-bottom">
      {/* leitura por leitores de tela — sem repetir as variações visuais */}
      <span className="sr-only">decisões, modelos, previsões e insights.</span>
      {ROTATING_WORDS.map((word, i) => {
        const state = i === index ? "on" : i === (index - 1 + n) % n ? "out" : "idle"
        const style: CSSProperties = {
          gridArea: "1 / 1",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: state === "on" ? 1 : 0,
          transform:
            state === "on" ? "translateY(0)" : state === "out" ? "translateY(-0.45em)" : "translateY(0.45em)",
        }
        return (
          <span key={word} aria-hidden="true" className="gradient-text" style={style}>
            {word}
          </span>
        )
      })}
    </span>
  )
}

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()

  const go = (id: string) => scrollToSection(id, { offset: 80 })

  return (
    <section ref={ref} id="home" className="relative scroll-mt-20 px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`space-y-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="space-y-5">
            <p className="eyebrow">Leandro Tenório · Dados &amp; ML</p>

            <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Transformo{" "}
              <span className="relative inline-block">
                dados
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[rgb(245_158_11)] transition-transform duration-700 ease-out"
                  style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
                />
              </span>{" "}
              em
              <br />
              <RotatingWord />
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Olá, sou <span className="font-medium text-foreground">Leandro Tenório</span>. Ciência de Dados,
              estatística, Python e Machine Learning — do dado bruto ao que importa para o negócio.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => go("projects")} className="btn-primary group">
              Ver projetos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href={cvPaths.pdf} download className="btn-ghost">
              <Download size={16} />
              Baixar currículo
            </a>
            <button type="button" onClick={() => go("contact")} className="btn-ghost">
              <Mail size={16} />
              Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
