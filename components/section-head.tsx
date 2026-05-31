import type React from "react"

type SectionHeadProps = {
  index: string
  label: string
  title: React.ReactNode
  subtitle?: React.ReactNode
}

export function SectionHead({ index, label, title, subtitle }: SectionHeadProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        <span className="border border-[rgb(var(--rgb-green)/0.4)] px-2 py-0.5 tabular-nums">{index}</span>
        <span className="text-muted-foreground">//</span>
        <span>{label}</span>
        <span className="h-px flex-1 bg-[rgb(var(--rgb-green)/0.2)]" />
      </div>
      <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
