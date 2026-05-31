import type React from "react"
import { cn } from "@/lib/utils"

type StatusColor = "green" | "cyan" | "amber" | "red"

const ledClass: Record<StatusColor, string> = {
  green: "led",
  cyan: "led led-cyan",
  amber: "led led-amber",
  red: "led led-red",
}

type PanelProps = {
  /** mono label shown in the title bar, e.g. "01 // SYSTEM" */
  label?: string
  /** short text shown on the right of the title bar */
  status?: string
  statusColor?: StatusColor
  /** show animated LED next to status */
  led?: boolean
  hover?: boolean
  ticks?: boolean
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}

export function Panel({
  label,
  status,
  statusColor = "green",
  led = true,
  hover = false,
  ticks = false,
  className,
  bodyClassName,
  children,
}: PanelProps) {
  return (
    <div
      className={cn(
        "panel rounded-sm",
        hover && "panel-hover",
        ticks && "corner-ticks",
        className,
      )}
    >
      {(label || status) && (
        <div className="flex items-center justify-between gap-3 border-b border-[rgb(var(--rgb-green)/0.18)] bg-[rgb(var(--rgb-green)/0.04)] px-3 py-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--rgb-red)/0.7)]" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--rgb-amber)/0.7)]" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--rgb-green)/0.7)]" />
            </span>
            {label && (
              <span className="truncate font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {label}
              </span>
            )}
          </div>
          {status && (
            <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {led && <span className={ledClass[statusColor]} />}
              {status}
            </span>
          )}
        </div>
      )}
      <div className={cn("p-5 sm:p-6 lg:p-8", bodyClassName)}>{children}</div>
    </div>
  )
}
