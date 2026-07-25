"use client";

import { motion } from "framer-motion";

/* Happy English School badge — top-left, glowing glassmorphic circular mark.
   Swap the emoji/initials block for <img src="/hes-logo.png" .../> when a real
   logo asset is dropped into /public. */
export default function LogoPlaceholder() {
  return (
    <motion.a
      href="https://hes.edu.in"
      target="_blank"
      rel="noopener noreferrer"
      className="glass"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 22 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "fixed",
        top: "clamp(14px, 2.4vw, 30px)",
        left: "clamp(14px, 2.4vw, 30px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px 10px 10px",
        willChange: "transform",
      }}
      aria-label="Happy English School"
    >
      <span
        aria-hidden
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          fontSize: 20,
          background:
            "conic-gradient(from 0deg, var(--pop-cyan), var(--pop-pink), var(--pop-yellow), var(--pop-cyan))",
          boxShadow: "0 0 18px rgba(255,77,157,0.45)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
      >
        🎓
      </span>
      <span style={{ lineHeight: 1.2 }}>
        <span style={{ display: "block", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
          Happy English School
        </span>
        <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>
          Sharad Vihar, Delhi
        </span>
      </span>
    </motion.a>
  );
}
