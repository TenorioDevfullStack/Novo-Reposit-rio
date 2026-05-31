"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Download, Mail } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { scrollToSection } from "@/lib/scroll-to-section"
import { Panel } from "@/components/panel"

const signals = [
  { label: "DADOS", detail: "Python · SQL · Pandas", value: 88 },
  { label: "ML", detail: "Scikit-learn · modelagem", value: 72 },
  { label: "PYTHON", detail: "análise · automação", value: 94 },
  { label: "DEV WEB", detail: "React · Next · Node", value: 80 },
]

const bootLines = [
  { prompt: "whoami", out: "leandro_tenorio" },
  { prompt: "cat role.txt", out: "estudante de IA · transição p/ Dados" },
  { prompt: "loc --short", out: "são paulo · br" },
]

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()
  const [scan, setScan] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setScan((c) => (c + 1) % signals.length), 1600)
    return () => window.clearInterval(id)
  }, [])

  const go = (id: string) => scrollToSection(id, { offset: 64 })

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[calc(100svh-4.5rem)] scroll-mt-16 items-center px-4 py-12 sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left — boot / identity */}
        <div
          className={`space-y-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="hud-chip">
            <span className="led" />
            system online — perfil carregado
          </div>

          <div className="space-y-3">
            <h1 className="font-sans text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              LEANDRO
              <br />
              <span className="text-glow text-primary">TENÓRIO</span>
            </h1>
            <p className="gradient-text font-mono text-sm uppercase tracking-[0.28em] sm:text-base">
              {">"} estudante_de_IA // transição_para_dados
            </p>
          </div>

          {/* terminal readout */}
          <div className="border border-[rgb(var(--rgb-green)/0.2)] bg-black/30 p-4 font-mono text-sm">
            {bootLines.map((line) => (
              <div key={line.prompt} className="flex flex-wrap gap-x-2 leading-relaxed">
                <span className="text-primary">leandro@dados</span>
                <span className="text-muted-foreground">:~$</span>
                <span className="text-foreground">{line.prompt}</span>
                <span className="w-full pl-0 text-secondary sm:w-auto sm:pl-2">→ {line.out}</span>
              </div>
            ))}
            <p className="cursor-blink mt-2 max-w-xl leading-relaxed text-muted-foreground">
              Base em Ciência de Dados, estatística, Python e ML somada à vivência em aplicações web. Transformo dados em
              decisões e soluções inteligentes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => go("projects")} className="term-btn group">
              ./ver_projetos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => go("cv")} className="term-btn term-btn-amber">
              <Download size={16} />
              ./baixar_cv
            </button>
            <button type="button" onClick={() => go("contact")} className="term-btn">
              <Mail size={16} />
              ./contato
            </button>
          </div>
        </div>

        {/* right — telemetry */}
        <div
          className={`transition-all delay-150 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Panel label="TELEMETRY // skills" status="live" statusColor="cyan" hover ticks>
            <div className="space-y-4">
              {signals.map((signal, i) => {
                const activeRow = scan === i
                return (
                  <div
                    key={signal.label}
                    className={`border p-3 transition-colors duration-500 ${
                      activeRow
                        ? "border-[rgb(var(--rgb-green)/0.5)] bg-[rgb(var(--rgb-green)/0.06)]"
                        : "border-[rgb(var(--rgb-green)/0.12)] bg-black/20"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between font-mono text-xs">
                      <span className="tracking-[0.18em] text-foreground">{signal.label}</span>
                      <span className="tabular-nums text-primary">{signal.value}%</span>
                    </div>
                    <div className="hud-bar">
                      <span style={{ width: isVisible ? `${signal.value}%` : "0%" }} className="transition-[width] duration-1000" />
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {signal.detail}
                    </p>
                  </div>
                )
              })}

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { k: "foco", v: "DADOS" },
                  { k: "form.", v: "FIAP" },
                  { k: "base", v: "PY/SQL" },
                ].map((m) => (
                  <div key={m.k} className="border border-[rgb(var(--rgb-green)/0.12)] bg-black/20 p-2.5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{m.k}</p>
                    <p className="pt-1 font-mono text-sm font-bold text-foreground">{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  )
}
