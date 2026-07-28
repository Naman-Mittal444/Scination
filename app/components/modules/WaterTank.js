"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";
import { WaterTankHowItWorks } from "./content/WaterTankContent";
import Icon from "../Icon";

const WaterTankScene = dynamic(() => import("./three/WaterTankScene"), { ssr: false });

const HOW_IT_WORKS = <WaterTankHowItWorks />;

const POLL_MS = 1500;
const DEMO_STEP_MS = 1500;

/* ── Graph (canvas 2D mini line chart) ─────────────────────────────────── */
function MiniGraph({ data, width = 400, height = 100 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    c.width = width * dpr;
    c.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    const pad = { top: 8, bottom: 16, left: 4, right: 4 };
    const w = width - pad.left - pad.right;
    const h = height - pad.top - pad.bottom;

    // Grid lines
    ctx.strokeStyle = "rgba(56,189,248,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * h;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + w, y);
      ctx.stroke();
    }

    // Data line
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = pad.left + (i / (data.length - 1)) * w;
      const y = pad.top + h - (v / 100) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under
    ctx.lineTo(pad.left + w, pad.top + h);
    ctx.lineTo(pad.left, pad.top + h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + h);
    grad.addColorStop(0, "rgba(56,189,248,0.25)");
    grad.addColorStop(1, "rgba(56,189,248,0.02)");
    ctx.fillStyle = grad;
    ctx.fill();

    // Y-axis labels
    ctx.fillStyle = "rgba(148,163,184,0.5)";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("100%", pad.left, pad.top + 4);
    ctx.fillText("0%", pad.left, pad.top + h + 12);
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height, borderRadius: 8, display: "block" }}
    />
  );
}

/* ── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ label, value, accent }) {
  return (
    <div className="glass-accent" style={{ padding: "14px 18px", flex: "1 1 140px", minWidth: 120 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-dim)", marginBottom: 6 }}>{label}</div>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: accent || "var(--accent)" }}>{value}</div>
    </div>
  );
}

/* ── Main module ────────────────────────────────────────────────────────── */
export default function WaterTank({ onNavigate }) {
  const m = MODULE_BY_ID["water-tank"];

  const [mode, setMode] = useState("demo"); // "demo" | "live"
  const [level, setLevel] = useState(0);
  const [motorOn, setMotorOn] = useState(false);
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // ── Demo simulation ──
  const demoPhase = useRef(0);
  useEffect(() => {
    if (mode !== "demo") return;
    const id = setInterval(() => {
      demoPhase.current += 0.08;
      const raw = (Math.sin(demoPhase.current) + 1) / 2;
      const newLevel = Math.round(raw * 100 * 10) / 10;
      setLevel(newLevel);
      setHistory((prev) => {
        const next = [...prev, newLevel];
        return next.length > 50 ? next.slice(-50) : next;
      });
    }, DEMO_STEP_MS);
    return () => clearInterval(id);
  }, [mode]);

  // ── Live polling ──
  useEffect(() => {
    if (mode !== "live") return;
    let active = true;
    const poll = async () => {
      try {
        const r = await fetch("/api/water");
        if (!r.ok) return;
        const d = await r.json();
        if (!active) return;
        setLevel(d.level);
        setMotorOn(d.motorOn);
        setHistory(d.history.map((h) => h.level));
      } catch {}
    };
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => { active = false; clearInterval(id); };
  }, [mode]);

  // ── Alerts ──
  useEffect(() => {
    const next = [];
    if (level > 90) next.push({ id: "overflow", type: "warn", text: "Overflow risk — water above 90%. Stop the motor." });
    if (level < 20) next.push({ id: "low", type: "warn", text: "Low water — below 20%. Start the motor to refill." });
    setAlerts(next);
  }, [level]);

  // ── Motor toggle ──
  const toggleMotor = useCallback(async () => {
    const next = !motorOn;
    setMotorOn(next);
    if (mode === "live") {
      try { await fetch("/api/water/motor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ on: next }) }); } catch {}
    }
  }, [motorOn, mode]);

  // ── Mode toggle ──
  const toggleMode = useCallback(() => {
    setMode((prev) => prev === "demo" ? "live" : "demo");
  }, []);

  const levelColor = level > 90 ? "#ef4444" : level > 70 ? "#38bdf8" : level > 30 ? "#0ea5e9" : "#f59e0b";
  const graphData = useMemo(() => history.slice(-50), [history]);

  return (
    <ModuleShell module={m} howItWorks={HOW_IT_WORKS}
      about={"An HC-SR04 ultrasonic sensor fires a 40 kHz pulse, measures echo time-of-flight, and calculates water distance. A Node.js bridge streams readings over serial to this Next.js dashboard at 1.5 s intervals. The 3D glass tank visualises level in real time, with motor control via relay and automatic overflow shutoff at 95%."}>

      {/* ── HUD Bar ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="glass" style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 18px", flexWrap: "wrap", fontSize: 13 }}>
        <span className="mono" style={{ color: "#22c55e", letterSpacing: "0.1em", fontSize: 11 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", marginRight: 4 }} />
          NODE ONLINE
        </span>
        <span style={{ color: "var(--ink-dim)", fontSize: 12 }}>|</span>
        <span className="mono" style={{ letterSpacing: "0.1em", fontSize: 11, color: "var(--ink-dim)" }}>
          MODE: <span style={{ color: mode === "live" ? "#22c55e" : "#f59e0b", fontWeight: 700 }}>{mode.toUpperCase()}</span>
        </span>
        <span style={{ color: "var(--ink-dim)", fontSize: 12 }}>|</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>
          MOTOR: <span style={{ color: motorOn ? "#22c55e" : "#64748b", fontWeight: 700 }}>{motorOn ? "ON" : "OFF"}</span>
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={toggleMode}
            className="btn-ghost"
            style={{ padding: "4px 12px", borderRadius: 6, fontSize: 11, letterSpacing: "0.08em", border: "1px solid rgba(56,189,248,0.25)", color: "var(--accent)", cursor: "pointer", background: "transparent" }}
            aria-label={`Switch to ${mode === "demo" ? "live" : "demo"} mode`}>
            {mode === "demo" ? "⚡ GO LIVE" : "🎬 DEMO"}
          </button>
        </div>
      </motion.div>

      {/* ── Alerts ── */}
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div key={a.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)" }}>
            <span style={{ fontSize: 18 }}>⚠</span>
            <span style={{ color: "#f87171", fontSize: 13, fontWeight: 500 }}>{a.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Stats Row ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <StatCard label="Water Level" value={`${level.toFixed(1)}%`} accent={levelColor} />
        <StatCard label="Motor Status" value={motorOn ? "RUNNING" : "STOPPED"} accent={motorOn ? "#22c55e" : "#64748b"} />
        <StatCard label="Last Reading" value={history.length ? `${history[history.length - 1].toFixed(1)}%` : "—"} />
        <StatCard label="Data Points" value={history.length} />
      </div>

      {/* ── 3D Tank + Controls ── */}
      <div className="glass" style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 240px", gap: 18, padding: 18, minHeight: 340, alignItems: "start" }}>
        {/* 3D tank */}
        <div style={{ borderRadius: 10, overflow: "hidden", background: "rgba(0,0,0,0.25)", aspectRatio: "4/3", minHeight: 280 }}>
          <WaterTankScene level={level} motorOn={motorOn} />
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Level bar */}
          <div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 6, letterSpacing: "0.1em" }}>TANK LEVEL</div>
            <div style={{ position: "relative", height: 180, width: 48, borderRadius: 10, border: "1px solid rgba(56,189,248,0.2)", overflow: "hidden", background: "rgba(0,0,0,0.3)" }}>
              <motion.div animate={{ height: `${level}%` }} transition={{ type: "spring", stiffness: 60, damping: 14 }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: levelColor, borderRadius: "0 0 9px 9px", opacity: 0.7 }} />
              {/* Threshold lines */}
              <div style={{ position: "absolute", bottom: "20%", left: 0, right: 0, height: 1, background: "rgba(245,158,11,0.5)" }} />
              <div style={{ position: "absolute", bottom: "90%", left: 0, right: 0, height: 1, background: "rgba(239,68,68,0.5)" }} />
            </div>
          </div>

          {/* Motor button */}
          <button onClick={toggleMotor}
            className="btn-ghost"
            style={{ padding: "10px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", border: `1px solid ${motorOn ? "rgba(34,197,94,0.4)" : "rgba(100,116,139,0.3)"}`, color: motorOn ? "#22c55e" : "#64748b", background: motorOn ? "rgba(34,197,94,0.08)" : "transparent", cursor: "pointer" }}
            aria-label={motorOn ? "Turn motor off" : "Turn motor on"}>
            {motorOn ? "■ STOP MOTOR" : "▶ START MOTOR"}
          </button>

          {/* Mode label */}
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", textAlign: "center", letterSpacing: "0.12em" }}>
            {mode === "demo" ? "SIMULATED DATA" : "SENSOR FEED LIVE"}
          </div>
        </div>
      </div>

      {/* ── Graph ── */}
      <div className="glass" style={{ padding: 18 }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 10, letterSpacing: "0.14em" }}>WATER LEVEL HISTORY</div>
        <MiniGraph data={graphData} />
      </div>

      {/* ── Log ── */}
      <div className="glass" style={{ padding: 18 }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 10, letterSpacing: "0.14em" }}>RECENT READINGS</div>
        <div style={{ maxHeight: 120, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {graphData.slice(-10).reverse().map((v, i) => (
            <div key={i} className="mono" style={{ fontSize: 12, color: "var(--ink-dim)", display: "flex", justifyContent: "space-between" }}>
              <span>{new Date(Date.now() - i * POLL_MS).toLocaleTimeString()}</span>
              <span style={{ color: v > 90 ? "#ef4444" : v < 20 ? "#f59e0b" : "#38bdf8" }}>{v.toFixed(1)}%</span>
            </div>
          ))}
          {graphData.length === 0 && <div style={{ fontSize: 12, color: "var(--ink-dim)", fontStyle: "italic" }}>No readings yet...</div>}
        </div>
      </div>
    </ModuleShell>
  );
}
