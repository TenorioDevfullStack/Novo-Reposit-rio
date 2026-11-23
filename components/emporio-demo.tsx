"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

const runs = [
  {
    label: "Catálogo", question: "Tem Ohana CK-20 por até 500 reais?",
    tool: "search_offers", source: "SQLite · produto 121",
    result: "R$ 439,20 sem frete",
    detail: "Ohana CK-20 Concert Natural. O desconto de 20% sobre R$ 549,00 colocou o instrumento dentro do orçamento. O catálogo do desafio registrava 6 unidades.",
    file: "01_catalogo.md",
  },
  {
    label: "Devolução", question: "Posso devolver uma compra online? Qual o prazo e quem paga o frete de devolução?",
    tool: "search_policies", source: "Manual da loja fictícia · seção 4.1, página 4",
    result: "Até 7 dias após o recebimento",
    detail: "O agente recuperou o trecho que atribui à loja o custo do frete e informa as condições para a devolução.",
    file: "02_devolucao.md",
  },
  {
    label: "Frete", question: "Meu pedido totaliza 500 reais sem frete, para entrega na região metropolitana de Campo Grande/MS. Quanto fica o frete?",
    tool: "quote_shipping", source: "Manual da loja fictícia · seção 5.1, página 4",
    result: "Confirmar a taxa com a equipe",
    detail: "O manual só define valores abaixo e acima de R$ 500. O agente deixou o frete em aberto e encaminhou a dúvida.",
    file: "04_frete_limite.md",
  },
]

export function EmporioDemo() {
  const [index, select] = useState(0)
  const run = runs[index]
  return (
    <section id="demo-emporio" aria-label="Demonstração do Empório da Música AI" className="min-w-0 scroll-mt-24 rounded-2xl bg-slate-950 p-5 text-slate-100 sm:p-7">
      <p className="mb-4 text-sm font-semibold">Demonstração com execuções registradas</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Escolher consulta">
        {runs.map((item, i) => (
          <button type="button" key={item.label} aria-pressed={i === index} onClick={() => select(i)}
            className="rounded-full border border-slate-600 px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-white aria-pressed:border-indigo-200 aria-pressed:bg-indigo-100 aria-pressed:text-indigo-950">
            {item.label}
          </button>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-5">
        <blockquote className="text-lg font-semibold leading-snug">“{run.question}”</blockquote>
        <div className="my-4 border-y border-white/15 py-3">
          <code className="text-sm text-indigo-200">{run.tool}</code>
          <p className="mt-1 text-xs text-slate-300">{run.source}</p>
        </div>
        <p className="text-xl font-semibold tracking-tight">{run.result}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{run.detail}</p>
        <a href={`https://github.com/TenorioDevfullStack/emporio-musica-ai/blob/main/examples/${run.file}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-200 underline underline-offset-4">Ler registro original <ArrowUpRight size={14} /></a>
      </div>
    </section>
  )
}
