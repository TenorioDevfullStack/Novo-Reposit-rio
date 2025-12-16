"use client"

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(138, 43, 226, 0.08) 25%, rgba(138, 43, 226, 0.08) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, 0.08) 75%, rgba(138, 43, 226, 0.08) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(138, 43, 226, 0.08) 25%, rgba(138, 43, 226, 0.08) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, 0.08) 75%, rgba(138, 43, 226, 0.08) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-float" />
      <div
        className="absolute -bottom-8 -right-4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
