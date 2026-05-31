"use client"

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* fine console grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(64, 245, 161, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 245, 161, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      {/* coarse grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96, 218, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 218, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "176px 176px",
        }}
      />
      {/* slow scanning beam */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(64,245,161,0.5),transparent)] scan-beam" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_40%,rgba(8,12,11,0.7))]" />
    </div>
  )
}
