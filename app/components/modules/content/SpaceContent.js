"use client";

/* Space — educational content. Edit freely. */

export const SPACE_YT = "https://www.youtube.com/embed/yS1ibDImAYU";

export function SpaceHowItWorks() {
  return (
    <div>
      <div className="flow-row">
        <span className="flow-node">Orbital Params (a, b, ω, θ)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Parametric Solver</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">3D Position (x, y, z)</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> Satellites travel in oval paths around Earth. Old broken
        satellites become &quot;space junk&quot; that can crash into working ones — creating even more junk.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Advanced:</b> Each orbit follows X(t)=a·cos(ωt), Y(t)=b·sin(ωt)·cos(θ),
        Z(t)=b·sin(ωt)·sin(θ) where θ is inclination. Kepler&apos;s laws: orbital period T = 2π/ω, and equal areas are
        swept in equal times. The <b>Kessler Syndrome</b> is a runaway chain reaction — one collision spawns thousands
        of fragments, each capable of causing more collisions, potentially making orbits unusable for generations.
      </p>
      <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-dim)" }}>
        🌍 Real-world: ESA&apos;s ClearSpace-1, Astroscale debris removal, SpaceX collision-avoidance.
      </p>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-dim)", marginBottom: 6 }}>📺 The space debris problem:</p>
        <div className="youtube-embed">
          <iframe src={SPACE_YT} loading="lazy" allowFullScreen title="Space Debris" />
        </div>
      </div>
    </div>
  );
}
