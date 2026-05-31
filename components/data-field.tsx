/**
 * DataField — lightweight, GPU-friendly ambient background.
 * Pure CSS (transform/opacity only) — no canvas, no per-frame JS, no O(n²) loops.
 * Reads as "data flux" in tune with the console / data theme.
 */
const beams = [
  { left: "16%", duration: "13s", delay: "0s", cyan: false },
  { left: "38%", duration: "19s", delay: "-6s", cyan: true },
  { left: "63%", duration: "16s", delay: "-3s", cyan: false },
  { left: "82%", duration: "22s", delay: "-11s", cyan: true },
]

export function DataField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* drifting glow orbs (painted once, then composited via transform) */}
      <div
        className="data-orb -left-32 top-[12%] h-[34rem] w-[34rem] animate-[driftA_22s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(64,245,161,0.10),transparent_70%)]"
      />
      <div
        className="data-orb -right-40 top-[45%] h-[40rem] w-[40rem] animate-[driftB_28s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(96,218,255,0.08),transparent_70%)]"
      />
      <div
        className="data-orb bottom-[-10rem] left-[30%] h-[30rem] w-[30rem] animate-[driftA_25s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(255,199,92,0.05),transparent_70%)]"
      />

      {/* vertical data beams sweeping across (transform translateX only) */}
      {beams.map((beam, i) => (
        <span
          key={i}
          className={`data-beam ${beam.cyan ? "data-beam-cyan" : ""}`}
          style={{ left: beam.left, animationDuration: beam.duration, animationDelay: beam.delay }}
        />
      ))}
    </div>
  )
}
