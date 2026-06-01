import type React from "react"
import { cn } from "@/lib/utils"

type PanelProps = {
  /** optional eyebrow label shown above the body */
  label?: string
  hover?: boolean
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}

/**
 * Light editorial card surface. Replaces the old terminal "panel".
 */
export function Panel({ label, hover = false, className, bodyClassName, children }: PanelProps) {
  return (
    <div className={cn("card-surface", hover && "card-hover", className)}>
      <div className={cn("p-5 sm:p-6 lg:p-8", bodyClassName)}>
        {label ? <p className="eyebrow mb-4">{label}</p> : null}
        {children}
      </div>
    </div>
  )
}
