"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";

/* ---------------------------------------------------------------------------
   KEYBOARD SHORTCUTS — overlay + global key handler.
   Shortcuts:
     1-5  → Launch module by index
     Esc  → Return to hub
     ?    → Toggle shortcuts overlay
     /    → Focus chatbot input
   --------------------------------------------------------------------------- */

const SHORTCUTS = [
  { keys: ["1", "2", "3", "4", "5"], label: "Launch module" },
  { keys: ["Esc"], label: "Return to hub" },
  { keys: ["?"], label: "Show shortcuts" },
  { keys: ["/"], label: "Focus AI chat" },
];

export default function KeyboardShortcuts({ onLaunch, onReturn, active }) {
  const [open, setOpen] = useState(false);
  const shortcutsRef = useRef(null);

  // Anime.js stagger animation for shortcut items
  useEffect(() => {
    if (!open || !shortcutsRef.current) return;
    const items = shortcutsRef.current.querySelectorAll(".shortcut-item");
    if (items.length === 0) return;
    animate(items, {
      translateX: [-20, 0],
      opacity: [0, 1],
    }, {
      delay: stagger(40, { start: 100 }),
      duration: 400,
      ease: "spring(.6, 100, 2, 8)",
    });
  }, [open]);

  const handleKey = useCallback((e) => {
    // Ignore if typing in an input/textarea
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;

    const key = e.key;

    // ? → toggle overlay
    if (key === "?") {
      e.preventDefault();
      setOpen((v) => !v);
      return;
    }

    // Escape → return to hub
    if (key === "Escape") {
      if (open) { setOpen(false); return; }
      if (active) { onReturn(); return; }
    }

    // / → focus chatbot
    if (key === "/") {
      e.preventDefault();
      const chatInput = document.querySelector(".chatbot-input, [data-chatbot-input]");
      if (chatInput) chatInput.focus();
      return;
    }

    // 1-5 → launch module
    if (["1", "2", "3", "4", "5"].includes(key) && !active && !open) {
      const moduleIds = ["smart-home", "cybersecurity", "traffic", "space", "quantum"];
      const idx = parseInt(key) - 1;
      if (idx < moduleIds.length) {
        onLaunch(moduleIds[idx]);
      }
    }
  }, [active, open, onLaunch, onReturn]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      {/* Shortcut hint — bottom-right corner */}
      {!active && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 999,
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--ink-dim)",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            transition: "all 0.2s",
          }}
          whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.1)" }}
          title="Keyboard shortcuts"
        >
          ?
        </motion.button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10001,
                width: "min(420px, 90vw)",
                background: "rgba(13, 17, 28, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "32px 28px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.03em" }}>Keyboard Shortcuts</h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close shortcuts"
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--ink-dim)", fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              <div ref={shortcutsRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SHORTCUTS.map((s) => (
                  <div key={s.label} className="shortcut-item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0 }}>
                    <span style={{ color: "var(--ink-dim)", fontSize: 14 }}>{s.label}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {s.keys.map((k) => (
                        <span
                          key={k}
                          style={{
                            padding: "3px 10px",
                            borderRadius: 6,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "ui-monospace, monospace",
                            color: "#a855f7",
                            minWidth: 28,
                            textAlign: "center",
                          }}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 20, fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                Press <span style={{ color: "#a855f7", fontWeight: 700 }}>?</span> or <span style={{ color: "#a855f7", fontWeight: 700 }}>Esc</span> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
