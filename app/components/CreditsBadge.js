"use client";

import { motion } from "framer-motion";

/* Permanent glassmorphic credits badge — fixed to a corner.
   Animated with transform/opacity only (compositor-friendly). */
export default function CreditsBadge() {
  return (
    <motion.aside
      className="glass"
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.04, rotate: -1 }}
      style={{
        position: "fixed",
        right: "clamp(14px, 2.4vw, 30px)",
        bottom: "clamp(14px, 2.4vw, 30px)",
        zIndex: 50,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        willChange: "transform",
        pointerEvents: "auto",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          background:
            "linear-gradient(135deg, var(--pop-yellow), var(--pop-pink) 55%, var(--pop-purple))",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 20,
          color: "#1a0b2e",
          boxShadow: "0 6px 18px rgba(255,77,157,0.4)",
        }}
      >
        NM
      </span>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-dim)", textTransform: "uppercase" }}>
          Innovator
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>
          Naman Mittal
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-dim)", marginTop: 2 }}>
          Class 10ᵗʰ A · Happy English School
        </div>
      </div>
    </motion.aside>
  );
}
