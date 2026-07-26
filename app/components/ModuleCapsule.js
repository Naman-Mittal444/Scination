"use client";

import { useRef, useCallback, useEffect } from "react";
import { animate, stagger } from "animejs";
import Icon from "./Icon";

/* Hover-expanding launch capsule for the hub grid.
   Reports hover up to the parent (to drive the 3D field's accent) and calls
   onLaunch when clicked. Transform/opacity only → composited, no layout thrash.
   3D mouse-tracking tilt + iconsax SVG icons + anime.js spring stagger. */

const MODULE_ICONS = {
  "smart-home": "home-wifi",
  cybersecurity: "shield-security",
  traffic: "smart-car",
  space: "rocket",
  quantum: "cpu",
};

export default function ModuleCapsule({ module, onLaunch, onHover, index, visited }) {
  const m = module;
  const cardRef = useRef(null);

  // Anime.js spring stagger entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    animate(el, {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.92, 1],
    }, {
      delay: index * 80,
      duration: 800,
      ease: "spring(.7, 100, 2, 8)",
    });
  }, [index]);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  }, []);

  const iconName = MODULE_ICONS[m.id] || "flash";

  return (
    <button
      ref={cardRef}
      onClick={() => onLaunch(m.id)}
      onMouseEnter={() => onHover(m.accent)}
      onMouseLeave={(e) => { onHover(null); handleMouseLeave(e); }}
      onMouseMove={handleMouseMove}
      onFocus={() => onHover(m.accent)}
      onBlur={() => onHover(null)}
      className="glass hud-grid capsule-glow-edge"
      style={{
        position: "relative",
        textAlign: "left",
        padding: 28,
        border: "1px solid var(--glass-border)",
        borderRadius: 20,
        cursor: "pointer",
        overflow: "hidden",
        willChange: "transform, opacity",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "transform 0.15s ease-out, box-shadow 0.35s ease, border-color 0.35s ease",
        "--accent": m.accent,
        "--accent-soft": m.accentSoft,
        opacity: 0,
      }}
    >
      {/* visited badge */}
      {visited && (
        <span
          aria-label="Module visited"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00ff9c, #37e2d5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#000",
            zIndex: 2,
            boxShadow: "0 0 10px rgba(0,255,156,0.4)",
          }}
        >
          ✓
        </span>
      )}

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
      {/* top accent glow line */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
        <span
          aria-hidden
          style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${m.accent}, ${m.accentSoft})`,
            boxShadow: `0 8px 28px ${m.accent}66, 0 0 20px ${m.accent}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Icon name={iconName} size={24} color="#fff" />
        </span>
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
          fontSize: 13, fontWeight: 700, color: m.accent,
          letterSpacing: "0.03em",
        }}
      >
        Launch module
        <span style={{ transition: "transform 0.3s ease", display: "inline-block" }}>→</span>
      </div>
    </button>
  );
}
