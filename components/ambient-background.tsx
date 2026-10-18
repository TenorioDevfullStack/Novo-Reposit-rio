/** Static background: no animation loop or pointer listeners. */
export function AmbientBackground() {
  return <div aria-hidden="true" className="portfolio-ambient pointer-events-none absolute inset-0 -z-10" />
}
