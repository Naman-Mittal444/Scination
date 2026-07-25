"use client";

import { motion } from "framer-motion";

/* Hover-expanding launch capsule for the hub grid.
   Reports hover up to the parent (to drive the 3D field's accent) and calls
   onLaunch when clicked. Transform/opacity only → composited, no layout thrash. */
export default function ModuleCapsule({ module, onLaunch, onHover, index }) {
  const m = module;
  return (
    <motion.button
      onClick={() => onLaunch(m.id)}
      onMouseEnter={() => onHover(m.accent)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(m.accent)}
      onBlur={() => onHover(null)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="glass hud-grid"
      style={{
        position: "relative",
        textAlign: "left",
        padding: 24,
        border: "1px solid var(--glass-border)",
        cursor: "pointer",
        overflow: "hidden",
        willChange: "transform",
        // bind this card's own accent for its inner accent-* elements
        "--accent": m.accent,
        "--accent-soft": m.accentSoft,
      }}
    >
      {/* accent wash that blooms on hover (CSS-driven) */}
      <span
        aria-hidden
        className="capsule-bloom"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 90% at 100% 0%, ${m.accent}22, transparent 60%)`,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 300ms ease",
        }}
      />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="mono" style={{ fontSize: 13, color: m.accent, opacity: 0.9 }}>{m.index}</span>
        <span
          aria-hidden
          style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${m.accent}, ${m.accentSoft})`,
            boxShadow: `0 8px 22px ${m.accent}55`,
          }}
        />
      </div>
      <h3 style={{ position: "relative", fontSize: 24, marginTop: 18, marginBottom: 8 }}>{m.title}</h3>
      <p style={{ position: "relative", color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.5, minHeight: 42 }}>
        {m.tagline}
      </p>
      <div style={{ position: "relative", display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {m.tags.map((t) => (
          <span key={t} className="chip" style={{ "--accent": m.accent }}>{t}</span>
        ))}
      </div>
      <div
        style={{
          position: "relative", marginTop: 18, display: "flex", alignItems: "center", gap: 8,
          fontSize: 13, fontWeight: 600, color: m.accent,
        }}
      >
        Launch module →
      </div>
    </motion.button>
  );
}
