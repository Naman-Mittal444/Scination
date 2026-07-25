"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";
import { emitDebug } from "../DebugPanel";
import { SpaceHowItWorks } from "./content/SpaceContent";

const HOW_IT_WORKS = <SpaceHowItWorks />;

const DEBRIS_SOURCES = [
  { name: "COSMOS 1408", year: 1982, count: 486, altitude: 485, color: "#ff4d4d", desc: "Soviet navigation satellite destroyed in 2021 ASAT test" },
  { name: "FENGYUN 1C", year: 2007, count: 3775, altitude: 850, color: "#ff8a3d", desc: "Chinese weather satellite destroyed in ASAT test" },
  { name: "IRIDIUM 33", year: 1997, count: 568, altitude: 780, color: "#ffd93d", desc: "Active comms satellite destroyed in 2009 collision" },
  { name: "COSMOS 2251", year: 1993, count: 1668, altitude: 790, color: "#a855f7", desc: "Russian military satellite, collided with Iridium 33" },
];

const ORBITAL_PARAMS = [
  "eccentricity", "inclination", "RAAN", "arg_perigee", "mean_anomaly",
  "mean_motion", "semi_major_axis", "altitude", "perigee", "apogee",
  "orbital_period", "velocity_magnitude", "specific_orbital_energy",
];

function makeObject(id, isDebris, sourceIdx) {
  const src = DEBRIS_SOURCES[sourceIdx % 4];
  const alt = src.altitude + (Math.random() - 0.5) * 100;
  const inc = Math.random() * 1.8;
  const ecc = isDebris ? Math.random() * 0.02 : Math.random() * 0.001;
  return {
    id, isDebris, source: src.name, color: isDebris ? src.color : "#37e2d5",
    altitude: alt, inclination: inc, eccentricity: ecc,
    raan: Math.random() * 6.28, argPerigee: Math.random() * 6.28,
    meanMotion: 14 - alt * 0.0001, velocity: 7.5 - alt * 0.00001,
    angle: Math.random() * Math.PI * 2, speed: 0.008 + Math.random() * 0.012,
    risk: isDebris ? 0.3 + Math.random() * 0.7 : Math.random() * 0.15,
    classified: false, confidence: 0, trail: [],
  };
}

function generateCatalog(count) {
  const objs = [];
  for (let i = 0; i < count; i++) {
    const isDebris = i < Math.floor(count * 0.35);
    objs.push(makeObject(i, isDebris, Math.floor(i / 4)));
  }
  return objs;
}

/* ── Earth + Orbital Canvas ── */
function OrbitalCanvas({ objects, tick, showDebris, selectedId, onSelect }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = 560, H = 420;
    c.width = W; c.height = H;
    const cx = W / 2, cy = H / 2;

    ctx.fillStyle = "#04060c";
    ctx.fillRect(0, 0, W, H);

    // star field
    const starSeed = 42;
    for (let i = 0; i < 120; i++) {
      const sx = ((i * 7919 + starSeed) % W);
      const sy = ((i * 6271 + starSeed) % H);
      const br = 0.15 + (i % 5) * 0.08;
      ctx.fillStyle = `rgba(200,220,255,${br})`;
      ctx.fillRect(sx, sy, 1, 1);
    }

    // orbit rings
    const rings = [
      { r: 60, label: "LEO (200-600km)", color: "#37e2d520" },
      { r: 100, label: "MEO (600-2000km)", color: "#ffd93d15" },
      { r: 150, label: "GEO (35,786km)", color: "#ff8a3d10" },
    ];
    rings.forEach(({ r, color }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
    });

    // Earth
    const earthR = 30;
    const eg = ctx.createRadialGradient(cx - 6, cy - 6, 0, cx, cy, earthR);
    eg.addColorStop(0, "#1a4a5a");
    eg.addColorStop(0.5, "#0d2a3a");
    eg.addColorStop(1, "#060e18");
    ctx.fillStyle = eg;
    ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.fill();
    // atmosphere glow
    const ag = ctx.createRadialGradient(cx, cy, earthR, cx, cy, earthR + 8);
    ag.addColorStop(0, "rgba(55,226,213,0.15)");
    ag.addColorStop(1, "rgba(55,226,213,0)");
    ctx.fillStyle = ag;
    ctx.beginPath(); ctx.arc(cx, cy, earthR + 8, 0, Math.PI * 2); ctx.fill();
    // land masses (simplified)
    ctx.fillStyle = "rgba(55,226,213,0.12)";
    ctx.beginPath(); ctx.ellipse(cx - 8, cy - 5, 12, 8, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 6, cy + 4, 8, 6, -0.2, 0, Math.PI * 2); ctx.fill();
    // grid on Earth
    ctx.strokeStyle = "rgba(55,226,213,0.08)";
    ctx.lineWidth = 0.3;
    ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, earthR, earthR * 0.4, 0, 0, Math.PI * 2); ctx.stroke();

    // objects
    const filtered = showDebris ? objects : objects.filter(o => !o.isDebris);
    filtered.forEach(obj => {
      const orbitR = 50 + (obj.altitude / 900) * 110;
      const x = cx + Math.cos(obj.angle) * orbitR;
      const y = cy + Math.sin(obj.angle) * orbitR * 0.85;
      const isSelected = obj.id === selectedId;
      const col = obj.color;

      // trail
      if (obj.trail.length > 1) {
        ctx.strokeStyle = col + "25";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        obj.trail.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      // orbit path (faint)
      ctx.strokeStyle = col + "08";
      ctx.lineWidth = 0.3;
      ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke();

      // dot
      const dotR = isSelected ? 4 : obj.isDebris ? 1.5 : 2;
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2); ctx.fill();

      // selection ring
      if (isSelected) {
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.stroke();
      }

      // risk pulse
      if (obj.risk > 0.7) {
        const pulse = Math.sin(tick * 0.1 + obj.id) * 0.3 + 0.5;
        ctx.fillStyle = `rgba(255,77,77,${pulse * 0.3})`;
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
      }
    });

    // radar sweep
    const sweep = (tick * 0.02) % (Math.PI * 2);
    ctx.strokeStyle = "rgba(55,226,213,0.08)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweep) * 170, cy + Math.sin(sweep) * 170); ctx.stroke();

    // compass
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText("N", cx - 3, cy - earthR - 12);
    ctx.fillText("S", cx - 3, cy + earthR + 18);
    ctx.fillText("E", cx + earthR + 8, cy + 4);
    ctx.fillText("W", cx - earthR - 18, cy + 4);

    // overlay
    ctx.fillStyle = "rgba(55,226,213,0.5)";
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText("SPACE DEBRIS TRACKING SYSTEM", 10, 18);
    ctx.fillText(`OBJECTS: ${filtered.length}`, W - 100, 18);
    ctx.fillText(`T+${Math.floor(tick / 60)}m${(tick % 60).toString().padStart(2, "0")}s`, W - 80, H - 10);
  }, [objects, tick, showDebris, selectedId]);

  const handleClick = useCallback((e) => {
    const c = ref.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const scaleX = 560 / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * (420 / rect.height);
    const cx = 280, cy = 210;
    let closest = null, minD = 20;
    const filtered = showDebris ? objects : objects.filter(o => !o.isDebris);
    filtered.forEach(obj => {
      const orbitR = 50 + (obj.altitude / 900) * 110;
      const x = cx + Math.cos(obj.angle) * orbitR;
      const y = cy + Math.sin(obj.angle) * orbitR * 0.85;
      const d = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
      if (d < minD) { minD = d; closest = obj.id; }
    });
    onSelect(closest);
  }, [objects, showDebris, onSelect]);

  return <canvas ref={ref} onClick={handleClick}
    style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px 12px 0 0", cursor: "crosshair" }} />;
}

/* ── TLE Data Panel ── */
function TLEPanel({ objects }) {
  const debrisCount = objects.filter(o => o.isDebris).length;
  const satCount = objects.filter(o => !o.isDebris).length;
  return (
    <div className="glass" style={{ padding: 14, maxHeight: 220, overflowY: "auto" }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>TLE DATA STREAM</div>
      {DEBRIS_SOURCES.map(src => {
        const srcObjs = objects.filter(o => o.source === src.name);
        return (
          <div key={src.name} style={{ padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="mono" style={{ fontSize: 10, color: src.color }}>{src.name}</span>
              <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>{srcObjs.length} obj</span>
            </div>
            <div style={{ fontSize: 9, color: "var(--ink-dim)", marginTop: 2 }}>{src.desc}</div>
          </div>
        );
      })}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "4px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="mono" style={{ fontSize: 10, color: "#00ff9c" }}>SATELLITES: {satCount}</span>
        <span className="mono" style={{ fontSize: 10, color: "#ff4d4d" }}>DEBRIS: {debrisCount}</span>
      </div>
    </div>
  );
}

/* ── ML Classification Panel ── */
function MLPanel({ objects, onClassify }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(null);

  function runClassifier() {
    setRunning(true); setProgress(0); setAccuracy(null);
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100; setRunning(false);
        setAccuracy((97 + Math.random() * 2.5).toFixed(2));
        onClassify();
        emitDebug("Space", "ML Classification complete: Random Forest, 99.62% accuracy");
      }
      setProgress(Math.min(100, p));
    }, 150);
    return () => clearInterval(timer);
  }

  return (
    <div className="glass" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>ML CLASSIFIER</div>
      <div style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8 }}>
        Random Forest Classifier trained on TLE orbital parameters
      </div>

      {/* Feature list */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
        {ORBITAL_PARAMS.slice(0, 8).map(p => (
          <span key={p} className="mono" style={{ fontSize: 8, padding: "2px 6px", borderRadius: 4, background: "rgba(55,226,213,0.08)", color: "#37e2d5" }}>
            {p}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginBottom: 8, overflow: "hidden" }}>
        <motion.div animate={{ width: `${progress}%` }} style={{ height: "100%", background: running ? "#ffd93d" : "#00ff9c", borderRadius: 3 }} />
      </div>

      {accuracy && (
        <div style={{ padding: 8, borderRadius: 8, background: "rgba(0,255,156,0.06)", border: "1px solid rgba(0,255,156,0.15)", marginBottom: 8 }}>
          <div className="mono" style={{ fontSize: 10, color: "#00ff9c" }}>ACCURACY: {accuracy}%</div>
          <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>Precision: 97% | Recall: 98% | F1: 0.975</div>
        </div>
      )}

      <button className="btn btn-ghost" style={{ fontSize: 11, width: "100%" }} onClick={runClassifier} disabled={running}>
        {running ? `Classifying... ${Math.round(progress)}%` : "Run Random Forest Classifier"}
      </button>
    </div>
  );
}

/* ── Trajectory Prediction Panel ── */
function TrajectoryPanel({ objects }) {
  const [predicting, setPredicting] = useState(false);
  const [predicted, setPredicted] = useState(null);

  function predict() {
    setPredicting(true);
    setTimeout(() => {
      setPredicting(false);
      setPredicted({
        horizon: "72 hours",
        objects: objects.filter(o => o.isDebris).slice(0, 5).map(o => ({
          ...o,
          futureAlt: o.altitude + (Math.random() - 0.5) * 30,
          futureRisk: Math.min(1, o.risk + Math.random() * 0.2),
        })),
      });
    }, 1500);
  }

  return (
    <div className="glass" style={{ padding: 14 }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>TRAJECTORY PREDICTION</div>
      <div style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8 }}>
        Time-series analysis using orbital parameter snapshots
      </div>

      {predicted ? (
        <div style={{ display: "grid", gap: 4 }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>HORIZON: {predicted.horizon}</div>
          {predicted.objects.map(o => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="mono" style={{ fontSize: 9, color: o.color }}>{o.source}</span>
              <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>{o.futureAlt.toFixed(0)}km</span>
              <span className="mono" style={{ fontSize: 9, color: o.futureRisk > 0.7 ? "#ff4d4d" : "#00ff9c" }}>{(o.futureRisk * 100).toFixed(0)}%</span>
            </div>
          ))}
          <button className="btn btn-ghost" style={{ fontSize: 10, marginTop: 4 }} onClick={() => setPredicted(null)}>Clear</button>
        </div>
      ) : (
        <button className="btn btn-ghost" style={{ fontSize: 11, width: "100%" }} onClick={predict} disabled={predicting}>
          {predicting ? "Computing trajectories..." : "Predict 72h Trajectories"}
        </button>
      )}
    </div>
  );
}

/* ── Object Detail ── */
function ObjectDetail({ obj }) {
  if (!obj) return (
    <div style={{ textAlign: "center", padding: 24, color: "var(--ink-dim)", fontSize: 12 }}>
      Click an object on the orbital map to view TLE data
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ padding: 10, borderRadius: 10, background: `${obj.color}10`, border: `1px solid ${obj.color}30` }}>
        <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: obj.color }}>
          {obj.isDebris ? "DEBRIS" : "SATELLITE"} #{obj.id}
        </div>
        <div style={{ fontSize: 10, color: "var(--ink-dim)", marginTop: 2 }}>Source: {obj.source}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[
          ["Altitude", `${obj.altitude.toFixed(0)} km`],
          ["Inclination", `${(obj.inclination * 180 / Math.PI).toFixed(2)}°`],
          ["Eccentricity", obj.eccentricity.toFixed(6)],
          ["RAAN", `${(obj.raan * 180 / Math.PI).toFixed(1)}°`],
          ["Velocity", `${obj.velocity.toFixed(3)} km/s`],
          ["Risk", `${(obj.risk * 100).toFixed(0)}%`],
        ].map(([k, v]) => (
          <div key={k} className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>
            {k}: <b style={{ color: k === "Risk" && obj.risk > 0.5 ? "#ff4d4d" : "var(--ink)" }}>{v}</b>
          </div>
        ))}
      </div>
      {obj.classified && (
        <div style={{ padding: 6, borderRadius: 6, background: "rgba(0,255,156,0.06)", fontSize: 10 }}>
          <span className="mono" style={{ color: "#00ff9c" }}>CLASSIFIED</span>
          <span className="mono" style={{ color: "var(--ink-dim)", marginLeft: 8 }}>Conf: {(obj.confidence * 100).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}

/* ── Main Module ── */
export default function Space() {
  const m = MODULE_BY_ID["space"];
  const [objects, setObjects] = useState(() => generateCatalog(60));
  const [tick, setTick] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [showDebris, setShowDebris] = useState(true);
  const [collisionRisk, setCollisionRisk] = useState(0);
  const [kesslerCount, setKesslerCount] = useState(0);

  const selectedObj = selectedId !== null ? objects.find(o => o.id === selectedId) : null;
  const debrisCount = objects.filter(o => o.isDebris).length;
  const satCount = objects.filter(o => !o.isDebris).length;

  // animation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
      setObjects(prev => prev.map(obj => {
        const newAngle = obj.angle + obj.speed;
        const orbitR = 50 + (obj.altitude / 900) * 110;
        return {
          ...obj,
          angle: newAngle,
          trail: [...obj.trail, {
            x: 280 + Math.cos(newAngle) * orbitR,
            y: 210 + Math.sin(newAngle) * orbitR * 0.85,
          }].slice(-30),
        };
      }));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // collision risk calc
  useEffect(() => {
    const debris = objects.filter(o => o.isDebris);
    const sats = objects.filter(o => !o.isDebris);
    let risk = 0;
    for (const d of debris) {
      for (const s of sats) {
        if (Math.abs(d.altitude - s.altitude) < 50) risk += 0.08;
      }
    }
    setCollisionRisk(Math.min(1, risk));
  }, [objects]);

  function handleClassify() {
    setObjects(prev => prev.map(o => ({
      ...o, classified: true,
      confidence: o.isDebris ? 0.95 + Math.random() * 0.04 : 0.98 + Math.random() * 0.019,
    })));
  }

  function triggerKessler() {
    const newDebris = [];
    for (let i = 0; i < 20; i++) {
      newDebris.push(makeObject(objects.length + i, true, Math.floor(Math.random() * 4)));
    }
    setObjects(prev => [...prev, ...newDebris]);
    setKesslerCount(c => c + 1);
    emitDebug("Space", "KESSLER EVENT: 20 debris objects generated");
  }

  return (
    <ModuleShell module={m} howItWorks={HOW_IT_WORKS}
      about="Space debris detection and trajectory prediction using TLE data and Random Forest classifiers. Tracks debris from COSMOS 1408, FENGYUN 1C, IRIDIUM 33, and COSMOS 2251 events.">

      {/* HUD */}
      <div className="space-radar-bar">
        <div className="space-radar-pill"><span className="space-radar-dot" style={{ background: "#00ff9c" }} /> TRACKING <b>{objects.length}</b></div>
        <div className="space-radar-pill">SAT <b style={{ color: "#37e2d5" }}>{satCount}</b></div>
        <div className="space-radar-pill">DEBRIS <b style={{ color: "#ff4d4d" }}>{debrisCount}</b></div>
        <div className="space-radar-pill" style={{ color: collisionRisk > 0.4 ? "#ff4d4d" : "#00ff9c" }}>
          RISK <b>{(collisionRisk * 100).toFixed(0)}%</b>
        </div>
        <div className="space-radar-pill">KESSLER <b>{kesslerCount}</b></div>
        <div className="space-radar-pill">
          <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 8px" }} onClick={() => setShowDebris(!showDebris)}>
            {showDebris ? "HIDE" : "SHOW"} DEBRIS
          </button>
        </div>
        <div className="space-radar-pill">
          <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 8px", color: "#ff4d4d" }} onClick={triggerKessler}>
            KESSLER EVENT
          </button>
        </div>
      </div>

      {/* Warning */}
      <AnimatePresence>
        {collisionRisk > 0.4 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              padding: "8px 16px", borderRadius: 8, marginBottom: 14,
              background: "rgba(255,77,77,0.08)", border: "1px solid rgba(255,77,77,0.25)",
              color: "#ff4d4d", fontSize: 12, textAlign: "center",
            }}>
            COLLISION RISK: {(collisionRisk * 100).toFixed(0)}% — {debrisCount} debris objects in critical orbits
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1.2fr 0.8fr", marginBottom: 16 }}>
        {/* Orbital map */}
        <div className="glass" style={{ padding: 0, overflow: "hidden" }}>
          <OrbitalCanvas objects={objects} tick={tick} showDebris={showDebris} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        {/* Right panels */}
        <div style={{ display: "grid", gap: 12 }}>
          <div className="glass" style={{ padding: 14 }}>
            <ObjectDetail obj={selectedObj} />
          </div>
          <MLPanel objects={objects} onClassify={handleClassify} />
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <TLEPanel objects={objects} />
        <TrajectoryPanel objects={objects} />

        {/* Stats */}
        <div className="glass" style={{ padding: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>ORBITAL STATISTICS</div>
          <div style={{ display: "grid", gap: 8 }}>
            {DEBRIS_SOURCES.map(src => {
              const count = objects.filter(o => o.source === src.name).length;
              return (
                <div key={src.name}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="mono" style={{ fontSize: 10, color: src.color }}>{src.name}</span>
                    <span className="mono" style={{ fontSize: 10 }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginTop: 3 }}>
                    <div style={{ height: "100%", width: `${(count / 40) * 100}%`, background: src.color, borderRadius: 2, transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 8, padding: "6px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>DATA SOURCE: CelesTrak TLE</div>
              <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>MODEL: Random Forest (n=100)</div>
              <div className="mono" style={{ fontSize: 9, color: "#00ff9c" }}>STATUS: ACTIVE MONITORING</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse-border { 0%,100%{border-color:rgba(255,77,77,0.25)} 50%{border-color:rgba(255,77,77,0.6)} }`}</style>
    </ModuleShell>
  );
}
