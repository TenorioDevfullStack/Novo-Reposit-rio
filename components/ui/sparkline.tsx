type SparklineProps = {
  data: number[]
  width?: number
  height?: number
  className?: string
  /** stroke color (defaults to currentColor) */
  stroke?: string
  /** fill the area under the line with a faint tint */
  fill?: boolean
}

/**
 * Tiny decorative line chart. Purely presentational SVG — no deps.
 */
export function Sparkline({
  data,
  width = 120,
  height = 36,
  className,
  stroke = "currentColor",
  fill = true,
}: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  const pad = 2

  const points = data.map((d, i) => {
    const x = i * stepX
    const y = pad + (height - pad * 2) * (1 - (d - min) / range)
    return [x, y] as const
  })

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {fill ? <path d={area} fill={stroke} opacity={0.1} /> : null}
      <path d={line} stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={2.5} fill={stroke} />
    </svg>
  )
}
