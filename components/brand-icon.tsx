/**
 * Renderiza um logo de marca a partir do pacote `simple-icons` como SVG inline.
 * Inline (não <img> via CDN) para respeitar o CSP do site (img-src 'self').
 * Passe `mono` para usar a cor atual (currentColor) em vez da cor oficial da marca.
 */
type BrandIconData = { title: string; hex: string; path: string }

export function BrandIcon({
  icon,
  size = 16,
  mono = false,
  className,
}: {
  icon: BrandIconData
  size?: number
  mono?: boolean
  className?: string
}) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={mono ? "currentColor" : `#${icon.hex}`}
      className={className}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}
