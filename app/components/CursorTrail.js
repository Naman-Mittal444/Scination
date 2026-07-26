"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   CURSOR TRAIL — Neon particle trail that follows the mouse.
   Spawns small glowing dots at the cursor position that fade out.
   Max 30 particles alive at once for performance.
   --------------------------------------------------------------------------- */

const MAX_PARTICLES = 30;
const SPAWN_INTERVAL = 16; // ms between spawns (~60fps)

export default function CursorTrail({ accent = "#a855f7" }) {
  const containerRef = useRef(null);
  const particles = useRef([]);
  const lastSpawn = useRef(0);
  const accentRef = useRef(accent);
  const idCounter = useRef(0);

  accentRef.current = accent;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let alive = true;

    function onMove(e) {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL) return;
      lastSpawn.current = now;

      if (!alive) return;

      // Remove oldest if at max
      if (particles.current.length >= MAX_PARTICLES) {
        const oldest = particles.current.shift();
        if (oldest && oldest.parentNode) oldest.parentNode.removeChild(oldest);
      }

      const el = document.createElement("div");
      const size = 3 + Math.random() * 5;
      const offsetX = (Math.random() - 0.5) * 8;
      const offsetY = (Math.random() - 0.5) * 8;

      el.style.cssText = `
        position: fixed;
        left: ${e.clientX + offsetX}px;
        top: ${e.clientY + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${accentRef.current};
        box-shadow: 0 0 ${size * 2}px ${accentRef.current}, 0 0 ${size * 4}px ${accentRef.current}44;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: screen;
        will-change: transform, opacity;
        animation: cursor-trail-fade 600ms ease-out forwards;
      `;

      container.appendChild(el);
      particles.current.push(el);

      // Auto-remove after animation
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
        const idx = particles.current.indexOf(el);
        if (idx !== -1) particles.current.splice(idx, 1);
      }, 620);
    }

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      alive = false;
      window.removeEventListener("pointermove", onMove);
      // Clean up all particles
      particles.current.forEach((el) => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
      particles.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
