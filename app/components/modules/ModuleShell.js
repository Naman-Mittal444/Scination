"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ModuleShell({ module, children, about, howItWorks }) {
  const m = module;
  const [howOpen, setHowOpen] = useState(false);

  return (
    <div style={{ display: "grid", gap: 26 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <span className="mono accent-text" style={{ fontSize: 15, opacity: 0.8 }}>MODULE {m.index}</span>
        <h2 className="accent-glow" style={{ fontSize: "clamp(30px, 6vw, 58px)", fontWeight: 800 }}>{m.title}</h2>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: "clamp(15px,2vw,19px)", maxWidth: 720, marginTop: -12 }}>{m.blurb}</p>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass-accent hud-grid" style={{ padding: "18px 22px" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-dim)", marginBottom: 8 }}>{m.math.title}</div>
        <div className="mono accent-text" style={{ fontSize: "clamp(16px,2.4vw,24px)", fontWeight: 700 }}>{m.math.formula}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 22px", marginTop: 12 }}>
          {m.math.where.map(([sym, desc]) => (
            <span key={sym} className="mono" style={{ fontSize: 13, color: "var(--ink-dim)" }}>
              <b className="accent-text">{sym}</b> — {desc}
            </span>
          ))}
        </div>
      </motion.div>

      {howItWorks && (
        <div className="glass how-it-works">
          <button className="how-it-works-toggle" onClick={() => setHowOpen(v => !v)}>
            <span>⚙ How It Works</span>
            <span style={{ fontSize: 18 }}>{howOpen ? "▲" : "▼"}</span>
          </button>
          {howOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "0 22px 22px" }}>
              {howItWorks}
            </motion.div>
          )}
        </div>
      )}

      <div>{children}</div>

      {about && (
        <div className="glass" style={{ padding: "18px 22px" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-dim)", marginBottom: 8 }}>About the tech</div>
          <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.6 }}>{about}</p>
        </div>
      )}
    </div>
  );
}
