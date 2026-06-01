"use client"

import { ArrowRight, Download, Mail, Sparkles } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { scrollToSection } from "@/lib/scroll-to-section"
import { cvPaths } from "@/lib/nav"
import { CountUp } from "@/components/ui/count-up"
import { SkillBar } from "@/components/ui/skill-bar"
import { Sparkline } from "@/components/ui/sparkline"

const skills = [
  { label: "Python", value: 94, detail: "Pandas · NumPy · automação" },
  { label: "Análise de dados", value: 88, detail: "SQL · estatística · viz" },
  { label: "Machine Learning", value: 72, detail: "Scikit-learn · modelagem" },
  { label: "Desenvolvimento web", value: 80, detail: "React · Next.js · Node" },
]

const metrics = [
  { value: 5, suffix: "", label: "projetos de dados entregues" },
  { value: 97.9, suffix: "%", decimals: 1, label: "de acertos em modelo de IA que criei" },
  { value: 3, suffix: "", label: "formações técnicas" },
]

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()

  const go = (id: string) => scrollToSection(id, { offset: 80 })

  return (
    <section ref={ref} id="home" className="relative scroll-mt-20 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left — identity */}
        <div
          className={`space-y-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="eyebrow rounded-full border border-primary/20 bg-secondary px-3.5 py-1.5">
            <Sparkles size={13} />
            Estudante de IA · transição para Dados
          </span>

          <div className="space-y-5">
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Olá, sou <span className="gradient-text">Leandro Tenório</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Transformo <span className="font-medium text-foreground">dados em decisões</span>. Tenho base em
              Ciência de Dados, estatística, Python e Machine Learning — somada à prática de construir aplicações web
              de ponta a ponta.
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

          {/* metrics row */}
          <div className="grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  <CountUp value={m.value} decimals={m.decimals ?? 0} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* right — skills card */}
        <div
          className={`transition-all delay-150 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="card-surface card-hover p-6 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="eyebrow">Foco técnico</p>
                <p className="mt-1 font-display text-xl font-semibold text-foreground">Onde eu atuo</p>
              </div>
              <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 11]} className="text-primary" width={96} height={40} />
            </div>

            <div className="space-y-5">
              {skills.map((s) => (
                <SkillBar key={s.label} label={s.label} value={s.value} detail={s.detail} />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {[
                { k: "Foco", v: "Dados" },
                { k: "Formação", v: "FIAP" },
                { k: "Base", v: "Py / SQL" },
              ].map((m) => (
                <div key={m.k} className="surface-muted px-3 py-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{m.k}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
