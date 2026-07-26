"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import CreditsBadge from "./components/CreditsBadge";
import DebugPanel from "./components/DebugPanel";
import LogoPlaceholder from "./components/LogoPlaceholder";
import Reveal from "./components/Reveal";
import ModuleCapsule from "./components/ModuleCapsule";
import ChatBot from "./components/ChatBot";
import HeroPlanet from "./components/HeroPlanet";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import CursorTrail from "./components/CursorTrail";
import Icon from "./components/Icon";
import { MODULES, MODULE_BY_ID, HUB_ACCENT } from "./lib/modules";

const CinematicIntro = dynamic(() => import("./components/CinematicIntro"), {
  ssr: false,
  loading: () => null,
});

const Scene3D = dynamic(() => import("./components/Scene3D"), {
  ssr: false,
  loading: () => null,
});

const MODULE_COMPONENTS = {
  "smart-home": dynamic(() => import("./components/modules/SmartHome"), { ssr: false }),
  cybersecurity: dynamic(() => import("./components/modules/Cybersecurity"), { ssr: false }),
  traffic: dynamic(() => import("./components/modules/Traffic"), { ssr: false }),
  space: dynamic(() => import("./components/modules/space-debris/SpaceDebris"), { ssr: false }),
  quantum: dynamic(() => import("./components/modules/Quantum"), { ssr: false }),
};

const container = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "0 clamp(20px, 5vw, 48px)",
};

export default function Page() {
  const heroRef = useRef(null);
  const [active, setActive] = useState(null);
  const [hoverAccent, setHoverAccent] = useState(null);
  const [reason, setReason] = useState(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [visited, setVisited] = useState([]);

  // Load visited modules from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ailab-visited");
      if (stored) setVisited(JSON.parse(stored));
    } catch {}
  }, []);

  // Mark a module as visited when launched
  const launch = useCallback((id) => {
    setReason(null);
    setActive(id);
    window.scrollTo({ top: 0, behavior: "auto" });
    setVisited((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem("ailab-visited", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const activeModule = active ? MODULE_BY_ID[active] : null;
  const accent = hoverAccent || activeModule?.accent || HUB_ACCENT;
  const accentSoft = activeModule?.accentSoft || "#2a1147";

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent-soft", accentSoft);
    if (active) document.body.setAttribute("data-accent-soft", "");
    else document.body.removeAttribute("data-accent-soft");
  }, [accent, accentSoft, active]);

  function navigate(id, why) {
    setReason(why || "Security escalation");
    setActive(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function returnToHub() {
    setActive(null);
    setReason(null);
  }

  useEffect(() => {
    function handleNavEvent(e) {
      const moduleId = e.detail?.moduleId;
      if (moduleId) launch(moduleId);
    }
    window.addEventListener("navigate-module", handleNavEvent);
    return () => window.removeEventListener("navigate-module", handleNavEvent);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ActiveComp = active ? MODULE_COMPONENTS[active] : null;

  return (
    <main>
      <LogoPlaceholder />
      <CreditsBadge />
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
      <ChatBot onNavigate={(id) => launch(id)} activeModule={active} />
      <KeyboardShortcuts onLaunch={launch} onReturn={() => { setActive(null); setReason(null); }} active={active} />
      <CursorTrail accent={accent} />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Scene3D accent={accent} />
      </div>

      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      <AnimatePresence mode="wait">
        {active ? (
          <motion.section
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 2, minHeight: "100svh", padding: "clamp(80px, 12vh, 130px) 0 100px" }}
          >
            <div style={container}>
              <motion.button onClick={returnToHub} whileHover={{ x: -4 }} className="btn btn-ghost" style={{ marginBottom: 30 }}>
                ← Return to Hub
              </motion.button>
              {ActiveComp && (
                <ActiveComp onNavigate={(id) => navigate(id, "Brute-force lockout — re-authenticate")} reason={reason} />
              )}
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="hub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <section
              ref={heroRef}
              style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}
            >
              <motion.div
                className="hero-layout"
                style={{ y: copyY, opacity: copyOpacity, willChange: "transform, opacity" }}
              >
                <div className="hero-left">
                  <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="chip">
                    SciNaTiON 6.0 · Science Exhibition
                  </motion.p>
                  <h1 className="gradient-text accent-glow" style={{ fontSize: "clamp(52px, 13vw, 172px)", fontWeight: 800, marginTop: 22 }}>
                    AI FUTURE<br />LAB
                  </h1>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 22, fontSize: "clamp(15px, 2vw, 21px)", color: "var(--ink-dim)", maxWidth: 620 }}>
                    Five interactive AI systems — smart homes, cybersecurity, traffic,
                    space and quantum computing — engineered by{" "}
                    <strong style={{ color: "var(--ink)" }}>Naman Mittal</strong>. Explore each one in 3D.
                  </motion.p>
                  <div className="hero-cta-row">
                    <button className="btn btn-hero btn-hero-primary" onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                      Explore Modules
                    </button>
                    <button className="btn btn-hero btn-hero-ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                      About the Creator
                    </button>
                  </div>
                </div>
                <div className="hero-right">
                  <HeroPlanet accent={accent} />
                </div>
              </motion.div>

              <div className="stats-row" style={{ marginTop: "clamp(32px, 5vh, 64px)" }}>
                {[
                  { icon: "element-3", val: "5", label: "Modules", isCounter: true },
                  { icon: "math", val: "Real", label: "Math" },
                  { icon: "monitor", val: "3D", label: "Interactive" },
                  { icon: "cpu", val: "Live", label: "AI Powered" },
                ].map((s) => (
                  <motion.div key={s.label} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <div className="stat-icon"><Icon name={s.icon} size={22} /></div>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-label">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                style={{ position: "absolute", bottom: 28, zIndex: 1, fontSize: 12, letterSpacing: "0.2em", color: "var(--ink-dim)", textTransform: "uppercase" }}
              >
                ↓ enter the lab
              </motion.div>
            </section>

            <section id="modules" style={{ padding: "clamp(40px, 8vh, 90px) 0 clamp(80px, 14vh, 160px)" }}>
              <div style={container}>
                <Reveal>
                  <h2 style={{ fontSize: "clamp(28px, 5vw, 54px)", marginBottom: 10 }}>
                    The <span className="gradient-text">Modules</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p style={{ color: "var(--ink-dim)", fontSize: 17, maxWidth: 560, marginBottom: 40 }}>
                    Each capsule is a working simulation with the real mathematics behind it. Launch one to explore.
                  </p>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
                  {MODULES.map((m, i) => (
                    <ModuleCapsule key={m.id} module={m} index={i} onLaunch={launch} onHover={setHoverAccent} visited={visited.includes(m.id)} />
                  ))}
                </div>
              </div>
            </section>

            <section id="about" style={{ padding: "0 0 clamp(80px, 14vh, 160px)" }}>
              <div style={container}>
                <Reveal>
                  <div className="glass" style={{ padding: "clamp(28px, 5vw, 48px)" }}>
                    <h2 style={{ fontSize: "clamp(26px, 5vw, 46px)", marginBottom: 18 }}>
                      About the <span className="gradient-text">Innovator</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 2vw, 20px)", color: "var(--ink-dim)", maxWidth: 760, lineHeight: 1.65 }}>
                      Built by <strong style={{ color: "var(--ink)" }}>Naman Mittal</strong>, Class 10ᵗʰ A at{" "}
                      <strong style={{ color: "var(--ink)" }}>Happy English School</strong>, Sharad Vihar, Delhi.
                      AI Future Lab explores how artificial intelligence will shape the systems we depend on —
                      from the homes we live in to the orbits above us — through hands-on, mathematically-grounded simulations.
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
                      {["Next.js", "Three.js / R3F", "Framer Motion", "Real math", "5 modules"].map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            <footer style={{ padding: "40px 0 120px", textAlign: "center" }}>
              <div style={container}>
                <Reveal>
                  <p style={{ color: "var(--ink-dim)", fontSize: 14 }}>
                    AI FUTURE LAB · Created by <strong style={{ color: "var(--ink)" }}>Naman Mittal</strong> · Happy English School
                  </p>
                </Reveal>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
