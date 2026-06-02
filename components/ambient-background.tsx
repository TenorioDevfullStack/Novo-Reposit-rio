/**
 * AmbientBackground — a faint graph-paper grid in a low-opacity indigo tint,
 * on-theme and monochrome. Fades out toward the edges. No JS, GPU-friendly.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* faint graph-paper grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(79 70 229 / 0.045) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgb(79 70 229 / 0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 75% at 50% 30%, black, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 30%, black, transparent 85%)",
        }}
      />
    </div>
  )
}
