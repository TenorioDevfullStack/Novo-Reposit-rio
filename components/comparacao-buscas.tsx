"use client"

import { useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import report from "@/lib/emporio-avaliacao.json"

const methods = [
  { key: "bm25", label: "BM25" },
  { key: "pgvector", label: "MiniLM + pgvector" },
] as const

// Snapshot do experimento publicado. Os índices apontam para as perguntas originais.
const source = "https://github.com/TenorioDevfullStack/emporio-musica-ai/tree/c4851d6c4c91ebf939d1ab34f71d0bbdd560805a/evaluation"
const featured = [
  { index: 7, label: "Troca de cor" },
  { index: 2, label: "Razão social" },
  { index: 8, label: "Troca de boquilha" },
]
const sectionTitles: Record<string, string> = report.titles
const remaining = report.results.map((row, index) => ({ row, index }))
  .filter(({ index }) => !featured.some(example => example.index === index))

function sectionName(id: string) {
  return id === "cover" ? sectionTitles[id] : `${id} · ${sectionTitles[id]}`
}

export function ComparacaoBuscas() {
  const [exploring, setExploring] = useState(false)
  const [index, setIndex] = useState(featured[0].index)
  const row = report.results[index]

  return (
    <section id="comparacao-buscas" aria-labelledby="titulo-comparacao" className="min-w-0 scroll-mt-24 rounded-3xl border border-border bg-card p-5 shadow-[0_24px_70px_-25px_rgb(79_70_229_/_0.22)] sm:p-7">
      <p className="text-sm font-semibold text-primary">Empório da Música AI · avaliação de busca</p>
      <h2 id="titulo-comparacao" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">O agente encontrou a seção certa do manual?</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Duas buscas receberam as mesmas {report.questions} perguntas. Cada uma podia indicar até três seções do manual da loja.</p>
      <div className="my-5 inline-flex flex-wrap gap-1 rounded-xl border border-border bg-muted p-1" role="group" aria-label="Visualização dos resultados">
        {[{ label: "Resumo", active: false }, { label: "Por pergunta", active: true }].map(view => (
          <button key={view.label} type="button" aria-pressed={exploring === view.active} onClick={() => setExploring(view.active)}
            className="min-h-10 rounded-lg px-3 text-sm font-semibold text-muted-foreground aria-pressed:bg-card aria-pressed:text-primary aria-pressed:shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
            {view.label}
          </button>
        ))}
      </div>
      {exploring ? (
        <div className="space-y-4">
          <label className="block text-sm font-medium">Escolha uma pergunta
            <select value={index} onChange={e => setIndex(Number(e.target.value))}
              className="mt-2 block min-h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary">
              <optgroup label="Três casos para comparar">
                {featured.map(item => <option key={item.index} value={item.index}>{item.label}</option>)}
              </optgroup>
              <optgroup label="Outras perguntas do teste">
                {remaining.map(({ row, index }) => <option key={index} value={index}>{sectionTitles[row.expected]}</option>)}
              </optgroup>
            </select>
          </label>
          <div className="space-y-3" aria-live="polite" aria-atomic="true">
            <blockquote className="text-base font-semibold">“{row.question}”</blockquote>
            <p className="text-sm"><strong>Seção esperada</strong> · {sectionName(row.expected)}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map(({ key, label }) => {
                const ids = row[key]
                const rank = ids.indexOf(row.expected) + 1
                return (
                  <div key={key} className="rounded-xl border border-border p-3">
                    <h3 className="font-semibold">{label}</h3>
                    <p className={`mt-1 text-xs font-medium ${rank ? "text-primary" : "text-muted-foreground"}`}>
                      {rank ? `Acertou na ${rank}ª posição` : ids.length ? "Seção esperada ausente" : "Nenhuma seção retornada"}
                    </p>
                    {ids.length > 0 && <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-xs leading-relaxed">
                      {ids.map(id => <li key={id} className={id === row.expected ? "font-semibold text-primary" : "text-muted-foreground"}>
                        {sectionName(id)} {id === row.expected && <Check size={13} className="inline" aria-hidden="true" />}
                      </li>)}
                    </ol>}
                  </div>
                )
              })}
            </div>
          </div>
          <a href={source} className="text-xs font-semibold text-primary underline underline-offset-4">Conferir o experimento no GitHub</a>
        </div>
      ) : (
        <div>
          <dl className="space-y-4">
            {methods.map(({ key, label }) => (
              <div key={key}>
                <div className="mb-2 flex justify-between gap-3 text-sm"><dt>{label}</dt><dd className="font-semibold">{report.hits_at_3[key]} de {report.questions}</dd></div>
                <div aria-hidden="true" className="h-2 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${100 * report.hits_at_3[key] / report.questions}%` }} /></div>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Acerto quando a seção de referência aparece entre os três primeiros resultados.</p>
        </div>
      )}
      <a href="#demo-emporio" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Ver demonstração do agente <ArrowUpRight size={15} /></a>
    </section>
  )
}
