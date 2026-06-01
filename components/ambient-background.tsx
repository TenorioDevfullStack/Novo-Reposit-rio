/**
 * AmbientBackground — extremely subtle light backdrop.
 * A faint dot grid plus two soft indigo/amber glows. No JS, GPU-friendly.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgb(26 26 46 / 0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />
      {/* soft glows */}
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(79_70_229_/_0.08),transparent_70%)] animate-[driftA_24s_ease-in-out_infinite]" />
      <div className="absolute -right-48 top-[30%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(245_158_11_/_0.06),transparent_70%)] animate-[driftB_30s_ease-in-out_infinite]" />
    </div>
  )
}
