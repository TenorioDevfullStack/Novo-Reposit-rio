import type React from "react"

type SectionHeadProps = {
  index: string
  label: string
  title: React.ReactNode
  subtitle?: React.ReactNode
}

export function SectionHead({ index, label, title, subtitle }: SectionHeadProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="eyebrow">
        <span className="tabular-nums text-accent">{index}</span>
        <span className="h-px w-6 bg-primary/40" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
