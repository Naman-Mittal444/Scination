"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";
import { emitDebug } from "../DebugPanel";
import { TrafficHowItWorks } from "./content/TrafficContent";

const HOW_IT_WORKS = <TrafficHowItWorks />;
const LANES = ["N", "E", "S", "W"];
const LANE_COLORS = { N: "#37e2d5", E: "#ffd93d", S: "#ff8a3d", W: "#a855f7" };
const LANE_ANGLES = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI };
const STOP_LINE_PROGRESS = 0.42;

function makeVehicle(id, lane) {
  const cols = ["#37e2d5", "#ffd93d", "#ff8a3d", "#a855f7", "#ff4d9d", "#4d7cff"];
  const types = ["sedan", "sedan", "sedan", "suv", "suv", "truck"];
  return {
    id, lane, progress: 0, maxSpeed: 0.5 + Math.random() * 0.5,
    color: cols[id % cols.length], type: types[id % types.length],
    stopped: false, detected: false, size: 0.7 + Math.random() * 0.35,
  };
}

/* ── CCTV Camera Canvas ── */
function CCTVCanvas({ vehicles, laneLights, greenLane, tick }) {
  const ref = useRef(null);
  const noiseRef = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = 560, H = 360;
    c.width = W; c.height = H;
    const cx = W / 2, cy = H / 2;

    // generate noise pattern once
    if (!noiseRef.current) {
      const nc = document.createElement("canvas");
      nc.width = W; nc.height = H;
      const nctx = nc.getContext("2d");
      const id = nctx.createImageData(W, H);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = Math.random() * 255;
        id.data[i] = v; id.data[i + 1] = v; id.data[i + 2] = v; id.data[i + 3] = 12;
      }
      nctx.putImageData(id, 0, 0);
      noiseRef.current = nc;
    }

    // background
    ctx.fillStyle = "#080c14";
    ctx.fillRect(0, 0, W, H);

    // asphalt texture
    ctx.fillStyle = "#0c1018";
    ctx.fillRect(0, 0, W, H);

    // road surfaces
    ctx.fillStyle = "#141820";
    ctx.fillRect(cx - 42, 0, 84, H);
    ctx.fillRect(0, cy - 42, W, 84);

    // lane markings — white dashed center lines
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.setLineDash([]);

    // double yellow center lines
    ctx.strokeStyle = "rgba(255,200,50,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 2, 0); ctx.lineTo(cx - 2, cy - 44); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 2, 0); ctx.lineTo(cx + 2, cy - 44); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 2, cy + 44); ctx.lineTo(cx - 2, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 2, cy + 44); ctx.lineTo(cx + 2, H); ctx.stroke();

    // intersection
    ctx.fillStyle = "#181c24";
    ctx.fillRect(cx - 42, cy - 42, 84, 84);

    // crosswalk stripes
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    for (let i = -36; i < 36; i += 8) {
      ctx.fillRect(cx - 42, cy + i, 6, 5);
      ctx.fillRect(cx + 36, cy + i, 6, 5);
      ctx.fillRect(cx + i, cy - 42, 5, 6);
      ctx.fillRect(cx + i, cy + 36, 5, 6);
    }

    // stop lines — thick white
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 3;
    // North approach
    ctx.beginPath(); ctx.moveTo(cx + 2, cy - 42); ctx.lineTo(cx + 40, cy - 42); ctx.stroke();
    // South approach
    ctx.beginPath(); ctx.moveTo(cx - 40, cy + 42); ctx.lineTo(cx - 2, cy + 42); ctx.stroke();
    // East approach
    ctx.beginPath(); ctx.moveTo(cx + 42, cy + 2); ctx.lineTo(cx + 42, cy + 40); ctx.stroke();
    // West approach
    ctx.beginPath(); ctx.moveTo(cx - 42, cy - 40); ctx.lineTo(cx - 42, cy - 2); ctx.stroke();

    // traffic light posts — realistic 3-light housing
    const posts = [
      { lane: "N", x: cx + 48, y: cy - 52 },
      { lane: "S", x: cx - 48, y: cy + 52 },
      { lane: "E", x: cx + 52, y: cy + 48 },
      { lane: "W", x: cx - 52, y: cy - 48 },
    ];
    posts.forEach(({ lane, x, y }) => {
      const ls = laneLights[lane];
      // pole
      ctx.fillStyle = "#222";
      ctx.fillRect(x - 1.5, y + 8, 3, 14);
      // housing
      ctx.fillStyle = "#1a1a1a";
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 0.5;
      const hw = 6, hh = 16;
      ctx.fillRect(x - hw, y - hh, hw * 2, hh * 2);
      ctx.strokeRect(x - hw, y - hh, hw * 2, hh * 2);
      // three bulbs
      const bulbs = [
        { color: "#ff4d4d", active: ls === "red", oy: -10 },
        { color: "#ffd93d", active: ls === "yellow", oy: 0 },
        { color: "#00ff9c", active: ls === "green", oy: 10 },
      ];
      bulbs.forEach(({ color, active, oy }) => {
        const bc = active ? color : color + "18";
        ctx.fillStyle = bc;
        ctx.beginPath(); ctx.arc(x, y + oy, 3.5, 0, Math.PI * 2); ctx.fill();
        if (active) {
          const g = ctx.createRadialGradient(x, y + oy, 0, x, y + oy, 16);
          g.addColorStop(0, color + "50");
          g.addColorStop(1, color + "00");
          ctx.fillStyle = g;
          ctx.fillRect(x - 16, y + oy - 16, 32, 32);
        }
      });
    });

    // vehicles
    vehicles.forEach(v => {
      if (v.progress < 0.02 || v.progress > 0.98) return;
      const p = v.progress;
      let vx, vy, rot;
      switch (v.lane) {
        case "N": vx = cx + 12; vy = (1 - p) * H * 0.44 + 8; rot = 0; break;
        case "S": vx = cx - 12; vy = p * H * 0.44 + cy + 36; rot = Math.PI; break;
        case "E": vx = p * W * 0.44 + cx + 36; vy = cy + 12; rot = Math.PI / 2; break;
        case "W": vx = (1 - p) * W * 0.44 + 8; vy = cy - 12; rot = -Math.PI / 2; break;
        default: return;
      }

      ctx.save();
      ctx.translate(vx, vy);
      ctx.rotate(rot);

      const bw = 20 * v.size, bh = 10 * v.size;

      // car body (filled)
      ctx.fillStyle = v.color + "cc";
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);

      // windshield
      ctx.fillStyle = "rgba(100,180,255,0.25)";
      ctx.fillRect(bw / 2 - 5, -bh / 2 + 1.5, 4, bh - 3);

      // headlight
      ctx.fillStyle = "#ffffcc";
      ctx.beginPath(); ctx.arc(bw / 2, -bh / 2 + 2, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(bw / 2, bh / 2 - 2, 1.5, 0, Math.PI * 2); ctx.fill();

      // brake lights if stopped
      if (v.stopped) {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath(); ctx.arc(-bw / 2, -bh / 2 + 2, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-bw / 2, bh / 2 - 2, 2, 0, Math.PI * 2); ctx.fill();
        // brake glow
        const bg = ctx.createRadialGradient(-bw / 2, 0, 0, -bw / 2, 0, 10);
        bg.addColorStop(0, "rgba(255,0,0,0.3)");
        bg.addColorStop(1, "rgba(255,0,0,0)");
        ctx.fillStyle = bg;
        ctx.fillRect(-bw / 2 - 10, -10, 10, 20);
      }

      // 3D bounding box wireframe (CCTV style)
      if (v.detected) {
        const d = 6 * v.size;
        ctx.strokeStyle = v.color;
        ctx.lineWidth = 1;
        // front
        ctx.strokeRect(-bw / 2 - 1, -bh / 2 - 1, bw + 2, bh + 2);
        // top face
        ctx.beginPath();
        ctx.moveTo(-bw / 2, -bh / 2);
        ctx.lineTo(-bw / 2 + d, -bh / 2 - d);
        ctx.lineTo(bw / 2 + d, -bh / 2 - d);
        ctx.lineTo(bw / 2, -bh / 2);
        ctx.closePath(); ctx.stroke();
        // side
        ctx.beginPath();
        ctx.moveTo(bw / 2, -bh / 2);
        ctx.lineTo(bw / 2 + d, -bh / 2 - d);
        ctx.lineTo(bw / 2 + d, bh / 2 - d);
        ctx.lineTo(bw / 2, bh / 2);
        ctx.closePath(); ctx.stroke();
      }

      ctx.restore();

      // detection label
      if (v.detected) {
        ctx.fillStyle = v.color + "40";
        const lbl = `${v.type.toUpperCase()} #${v.id}`;
        ctx.font = "9px ui-monospace, monospace";
        const tw = ctx.measureText(lbl).width + 6;
        ctx.fillRect(vx - tw / 2, vy - 22 * v.size, tw, 13);
        ctx.fillStyle = v.color;
        ctx.fillText(lbl, vx - tw / 2 + 3, vy - 22 * v.size + 10);
        // speed
        const spd = v.stopped ? "0" : (v.maxSpeed * 40).toFixed(0);
        ctx.fillStyle = v.stopped ? "#ff4d4d" : "#00ff9c";
        ctx.font = "8px ui-monospace, monospace";
        ctx.fillText(`${spd}km/h`, vx - 10, vy + 18 * v.size);
      }
    });

    // ── CCTV camera effects ──
    // scanlines
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    for (let y = 0; y < H; y += 3) {
      ctx.fillRect(0, y, W, 1);
    }

    // noise overlay
    ctx.globalAlpha = 0.06;
    ctx.drawImage(noiseRef.current, 0, 0);
    ctx.globalAlpha = 1;

    // vignette
    const vg = ctx.createRadialGradient(cx, cy, W * 0.25, cx, cy, W * 0.6);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // slight green tint
    ctx.fillStyle = "rgba(0,255,100,0.015)";
    ctx.fillRect(0, 0, W, H);

    // ── HUD overlay ──
    ctx.fillStyle = "rgba(0,255,156,0.6)";
    ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("CAM-01  REC \u25cf", 12, 20);
    ctx.fillStyle = "rgba(0,255,156,0.4)";
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText(new Date().toLocaleTimeString(), W - 82, 20);
    ctx.fillText("INTELLIGENT TRAFFIC MONITORING", 12, H - 12);

    // active lane indicator
    const gCol = LANE_COLORS[greenLane];
    ctx.fillStyle = gCol + "50";
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText(`GREEN: ${greenLane}`, W - 90, H - 12);

    // crosshair
    ctx.strokeStyle = "rgba(0,255,156,0.12)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 30, cy); ctx.lineTo(cx + 30, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 30); ctx.lineTo(cx, cy + 30); ctx.stroke();
  }, [vehicles, laneLights, greenLane, tick]);

  return <canvas ref={ref} style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px 12px 0 0" }} />;
}

/* ── Satellite / Top-Down Canvas ── */
function SatCanvas({ vehicles, laneLights, greenLane, tick }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = 560, H = 360;
    c.width = W; c.height = H;
    const cx = W / 2, cy = H / 2;

    ctx.fillStyle = "#06080e";
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(168,85,247,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < W; i += 28) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let i = 0; i < H; i += 28) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

    // roads
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(cx - 34, 0, 68, H);
    ctx.fillRect(0, cy - 34, W, 68);

    // lane dividers
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(cx - 17, 0); ctx.lineTo(cx - 17, cy - 36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 17, 0); ctx.lineTo(cx + 17, cy - 36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 17, cy + 36); ctx.lineTo(cx - 17, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 17, cy + 36); ctx.lineTo(cx + 17, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy - 17); ctx.lineTo(cx - 36, cy - 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy + 17); ctx.lineTo(cx - 36, cy + 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 36, cy - 17); ctx.lineTo(W, cy - 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 36, cy + 17); ctx.lineTo(W, cy + 17); ctx.stroke();
    ctx.setLineDash([]);

    // intersection
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    ctx.fillRect(cx - 34, cy - 34, 68, 68);

    // stop lines
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx - 34, cy - 34); ctx.lineTo(cx + 34, cy - 34); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 34, cy + 34); ctx.lineTo(cx + 34, cy + 34); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 34, cy - 34); ctx.lineTo(cx - 34, cy + 34); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 34, cy - 34); ctx.lineTo(cx + 34, cy + 34); ctx.stroke();

    // traffic light indicators
    const indicators = [
      { lane: "N", x: cx + 22, y: cy - 38 },
      { lane: "S", x: cx - 22, y: cy + 38 },
      { lane: "E", x: cx + 38, y: cy + 22 },
      { lane: "W", x: cx - 38, y: cy - 22 },
    ];
    indicators.forEach(({ lane, x, y }) => {
      const ls = laneLights[lane];
      const col = ls === "green" ? "#00ff9c" : ls === "yellow" ? "#ffd93d" : "#ff4d4d";
      // pulsing glow for green
      if (ls === "green") {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, col + "50");
        g.addColorStop(1, col + "00");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#000";
      ctx.font = "7px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(lane, x, y + 3);
      ctx.textAlign = "start";
    });

    // vehicles
    vehicles.forEach(v => {
      if (v.progress < 0.02 || v.progress > 0.98) return;
      const p = v.progress;
      let vx, vy, dirX = 0, dirY = 0;
      switch (v.lane) {
        case "N": vx = cx + 8; vy = (1 - p) * H * 0.44 + 10; dirY = -1; break;
        case "S": vx = cx - 8; vy = p * H * 0.44 + cy + 30; dirY = 1; break;
        case "E": vx = p * W * 0.44 + cx + 30; vy = cy + 8; dirX = 1; break;
        case "W": vx = (1 - p) * W * 0.44 + 10; vy = cy - 8; dirX = -1; break;
        default: return;
      }

      const bw = 12 * v.size, bh = 7 * v.size;
      const col = v.stopped ? "#ff4d4d" : v.color;

      // shadow
      ctx.fillStyle = col + "10";
      ctx.fillRect(vx - bw / 2 + 1, vy - bh / 2 + 1, bw, bh);
      // body
      ctx.strokeStyle = v.detected ? col : "rgba(255,255,255,0.06)";
      ctx.lineWidth = v.detected ? 1.5 : 0.5;
      ctx.strokeRect(vx - bw / 2, vy - bh / 2, bw, bh);
      ctx.fillStyle = col + "40";
      ctx.fillRect(vx - bw / 2, vy - bh / 2, bw, bh);

      // speed vector
      if (v.detected && !v.stopped) {
        const vl = v.maxSpeed * 22;
        ctx.strokeStyle = col + "70";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(vx, vy);
        ctx.lineTo(vx + dirX * vl, vy + dirY * vl); ctx.stroke();
        const a = Math.atan2(dirY, dirX);
        ctx.beginPath();
        ctx.moveTo(vx + dirX * vl, vy + dirY * vl);
        ctx.lineTo(vx + dirX * vl - 4 * Math.cos(a - 0.4), vy + dirY * vl - 4 * Math.sin(a - 0.4));
        ctx.moveTo(vx + dirX * vl, vy + dirY * vl);
        ctx.lineTo(vx + dirX * vl - 4 * Math.cos(a + 0.4), vy + dirY * vl - 4 * Math.sin(a + 0.4));
        ctx.stroke();
      }

      // speed label
      if (v.detected) {
        ctx.fillStyle = v.stopped ? "#ff4d4d" : "#00ff9c";
        ctx.font = "8px ui-monospace, monospace";
        const spd = v.stopped ? "STOPPED" : `${(v.maxSpeed * 40).toFixed(0)} km/h`;
        ctx.fillText(spd, vx - 14, vy - bh / 2 - 4);
      }
    });

    // overlay
    ctx.fillStyle = "rgba(168,85,247,0.5)";
    ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("SAT RECON  ALT:408km", 12, 20);
    ctx.fillStyle = "rgba(168,85,247,0.3)";
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText("TRACKING", W - 72, 20);

    // north arrow
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillText("\u25b2 N", W - 36, H - 12);
    // radar sweep
    const sweepAngle = (tick * 0.03) % (Math.PI * 2);
    ctx.strokeStyle = "rgba(168,85,247,0.1)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * 160, cy + Math.sin(sweepAngle) * 160); ctx.stroke();
    // radar rings
    [50, 100, 150].forEach(r => {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    });
  }, [vehicles, laneLights, greenLane, tick]);

  return <canvas ref={ref} style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px 12px 0 0" }} />;
}

/* ── Main Traffic Module ── */
export default function Traffic() {
  const m = MODULE_BY_ID["traffic"];
  const [q, setQ] = useState({ N: 6, E: 4, S: 5, W: 3 });
  const [vehicles, setVehicles] = useState([]);
  const [greenLane, setGreenLane] = useState("N");
  const [laneLights, setLaneLights] = useState({ N: "green", E: "red", S: "red", W: "red" });
  const [tick, setTick] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [detections, setDetections] = useState([]);
  const [history, setHistory] = useState([]);
  const [totalAIClear, setTotalAIClear] = useState(0);
  const [totalFixedClear, setTotalFixedClear] = useState(0);

  const vidRef = useRef(0);
  const greenRef = useRef("N");
  const laneLightsRef = useRef(laneLights);
  const vehiclesRef = useRef([]);
  const qRef = useRef(q);

  useEffect(() => { greenRef.current = greenLane; }, [greenLane]);
  useEffect(() => { laneLightsRef.current = laneLights; }, [laneLights]);
  useEffect(() => { vehiclesRef.current = vehicles; }, [vehicles]);
  useEffect(() => { qRef.current = q; }, [q]);

  const totalQ = q.N + q.E + q.S + q.W;

  // AI efficiency calculation
  const aiEfficiency = useMemo(() => {
    if (cycleCount < 2) return 0;
    const aiAvg = cycleCount > 0 ? totalAIClear / cycleCount : 0;
    const fixedAvg = cycleCount > 0 ? totalFixedClear / cycleCount : 0;
    if (fixedAvg === 0) return 0;
    return Math.round(((aiAvg - fixedAvg) / Math.max(0.1, fixedAvg)) * 100);
  }, [cycleCount, totalAIClear, totalFixedClear]);

  // ── Vehicle physics tick ──
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);

      setVehicles(prev => {
        const lights = laneLightsRef.current;
        let updated = prev.map(v => {
          const myLight = lights[v.lane];
          const shouldStop = myLight !== "green";
          const atStop = v.progress >= STOP_LINE_PROGRESS - 0.05 && v.progress <= STOP_LINE_PROGRESS + 0.01;
          const pastStop = v.progress > STOP_LINE_PROGRESS + 0.01;

          let prog = v.progress;
          let stopped = false;

          if (shouldStop && !pastStop) {
            if (atStop) {
              stopped = true;
            } else if (prog < STOP_LINE_PROGRESS - 0.05) {
              const dist = STOP_LINE_PROGRESS - prog;
              const slow = dist < 0.1 ? 0.1 : dist < 0.2 ? 0.4 : 1;
              prog += v.maxSpeed * 0.014 * slow;
            } else {
              prog += v.maxSpeed * 0.014 * 0.3;
            }
          } else {
            prog += v.maxSpeed * 0.014;
          }

          return { ...v, progress: prog, stopped, detected: v.progress > 0.08 && v.progress < 0.92 };
        }).filter(v => v.progress < 1.08);

        // spawn
        LANES.forEach(lane => {
          const count = updated.filter(v => v.lane === lane).length;
          const target = Math.ceil(q[lane] / 2);
          if (count < target) {
            const tooClose = updated.some(v => v.lane === lane && v.progress < 0.06);
            if (!tooClose && Math.random() > 0.3) {
              updated.push(makeVehicle(vidRef.current++, lane));
            }
          }
        });

        return updated;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [q]);

  // ── Traffic light adaptive cycle (stable — no state deps) ──
  useEffect(() => {
    const CYCLE_MS = 5000;
    const YELLOW_MS = 1200;

    const timer = setInterval(() => {
      const currentGreen = greenRef.current;
      const currentQ = qRef.current;
      const currentVehicles = vehiclesRef.current;
      const tQ = currentQ.N + currentQ.E + currentQ.S + currentQ.W;

      const scores = {};
      LANES.forEach(l => { scores[l] = currentQ[l] * 1.0 + (1 / Math.max(1, 20 + Math.random() * 20)) * 20; });
      const nextGreen = LANES.reduce((a, b) => (scores[b] > scores[a] ? b : a), currentGreen);

      if (nextGreen !== currentGreen) {
        setLaneLights({ N: "red", E: "red", S: "red", W: "red", [currentGreen]: "yellow" });
        setTimeout(() => {
          setGreenLane(nextGreen);
          setLaneLights({ N: "red", E: "red", S: "red", W: "red", [nextGreen]: "green" });
          emitDebug("Traffic", `\u2192 GREEN: ${nextGreen} (score=${scores[nextGreen].toFixed(1)})`);
        }, YELLOW_MS);
      } else {
        setLaneLights({ N: "red", E: "red", S: "red", W: "red", [currentGreen]: "green" });
      }

      setCycleCount(c => {
        setTotalAIClear(t => t + Math.ceil(currentQ[nextGreen] * 0.8));
        setTotalFixedClear(t => t + Math.ceil(tQ * 0.2));
        return c + 1;
      });

      setHistory(h => [...h, { green: nextGreen, ts: Date.now() }].slice(-30));

      const v = currentVehicles.find(vv => vv.lane === nextGreen && vv.detected);
      if (v) {
        setDetections(d => [...d, {
          id: vidRef.current++, ts: new Date().toLocaleTimeString().slice(0, 8),
          type: v.type, lane: v.lane, speed: Math.round(v.maxSpeed * 40), color: v.color, stopped: false,
        }].slice(-15));
      }
      const sv = currentVehicles.find(vv => vv.stopped);
      if (sv) {
        setDetections(d => [...d, {
          id: vidRef.current++, ts: new Date().toLocaleTimeString().slice(0, 8),
          type: sv.type, lane: sv.lane, speed: 0, color: sv.color, stopped: true,
        }].slice(-15));
      }
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  function randomize() {
    const r = () => Math.floor(Math.random() * 14) + 1;
    setQ({ N: r(), E: r(), S: r(), W: r() });
  }

  return (
    <ModuleShell module={m} howItWorks={HOW_IT_WORKS}
      about="Fixed-timer traffic lights waste green time on empty lanes. This adaptive controller scores each lane every cycle, granting green to whoever needs it most. Vehicles stop at red, proceed at green.">

      {/* HUD bar */}
      <div className="traffic-hud-bar">
        <div className="traffic-hud-pill"><span className="traffic-hud-dot" style={{ background: "#00ff9c" }} /> NODE <b>ONLINE</b></div>
        <div className="traffic-hud-pill">CYCLE <b>{cycleCount}</b></div>
        <div className="traffic-hud-pill">VEHICLES <b style={{ color: "var(--pop-cyan)" }}>{vehicles.length}</b></div>
        <div className="traffic-hud-pill">ACTIVE <b style={{ color: LANE_COLORS[greenLane] }}>{greenLane}</b></div>
        <div className="traffic-hud-pill" style={{ color: aiEfficiency > 0 ? "#00ff9c" : "var(--ink-dim)" }}>
          AI EFFICIENCY <b>+{aiEfficiency}%</b>
        </div>
        <div className="traffic-hud-pill">TOTAL <b>{totalQ}</b></div>
      </div>

      {/* Per-lane light status */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        {LANES.map(l => {
          const ls = laneLights[l];
          const c = ls === "green" ? "#00ff9c" : ls === "yellow" ? "#ffd93d" : "#ff4d4d";
          return (
            <div key={l} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8,
              background: c + "10", border: `1px solid ${c}30`,
              transition: "all 0.3s",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 10px ${c}80`, transition: "all 0.3s" }} />
              <span className="mono" style={{ fontSize: 12, color: c, fontWeight: 600 }}>{l}</span>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>{ls.toUpperCase()}</span>
            </div>
          );
        })}
      </div>

      {/* CCTV + Satellite side by side */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
        <div className="glass" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 10, zIndex: 2, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff4d4d", animation: "blink 1s infinite" }} />
            <span className="mono" style={{ fontSize: 11, color: "#ff4d4d" }}>LIVE</span>
          </div>
          <CCTVCanvas vehicles={vehicles} laneLights={laneLights} greenLane={greenLane} tick={tick} />
        </div>
        <div className="glass" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 10, zIndex: 2, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7" }} />
            <span className="mono" style={{ fontSize: 11, color: "#a855f7" }}>SAT</span>
          </div>
          <SatCanvas vehicles={vehicles} laneLights={laneLights} greenLane={greenLane} tick={tick} />
        </div>
      </div>

      {/* Bottom row: Detection log + Controls + Stats */}
      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr 1fr" }}>
        {/* Detection Log */}
        <div className="glass" style={{ padding: 14, maxHeight: 220, overflowY: "auto" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>DETECTION LOG</div>
          {detections.slice(-8).reverse().map((d) => (
            <div key={d.id + d.ts} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: d.stopped ? "#ff4d4d" : d.color }} />
              <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", width: 56 }}>{d.ts}</span>
              <span className="mono" style={{ fontSize: 9, color: d.color, width: 54 }}>{d.type} #{d.id}</span>
              <span className="mono" style={{ fontSize: 9, width: 14 }}>{d.lane}</span>
              <span className="mono" style={{ fontSize: 9, marginLeft: "auto", color: d.stopped ? "#ff4d4d" : "#00ff9c" }}>
                {d.stopped ? "STOP" : `${d.speed}`}
              </span>
            </div>
          ))}
        </div>

        {/* Lane Control */}
        <div className="glass" style={{ padding: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>LANE QUEUE</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {LANES.map(lane => (
              <div key={lane} style={{
                padding: 8, borderRadius: 8,
                background: greenLane === lane ? "rgba(0,255,156,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${greenLane === lane ? "rgba(0,255,156,0.15)" : "rgba(255,255,255,0.04)"}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: LANE_COLORS[lane] }} />
                    <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: LANE_COLORS[lane] }}>{lane}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)" }}>Q={q[lane]}</span>
                </div>
                <input type="range" className="accent-range" min="0" max="20" value={q[lane]}
                  style={{ "--fill": `${(q[lane] / 20) * 100}%`, marginTop: 4 }}
                  onChange={(e) => setQ({ ...q, [lane]: parseInt(e.target.value) })} />
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 11, marginTop: 8, width: "100%" }} onClick={randomize}>Randomize Traffic</button>
        </div>

        {/* Stats */}
        <div className="glass" style={{ padding: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>PERFORMANCE</div>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>AI Efficiency</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: aiEfficiency > 0 ? "#00ff9c" : "var(--ink-dim)" }}>+{aiEfficiency}%</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>Total Cycles</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700 }}>{cycleCount}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>Vehicles Online</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--pop-cyan)" }}>{vehicles.length}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>Vehicles Stopped</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "#ff4d4d" }}>{vehicles.filter(v => v.stopped).length}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)" }}>Throughput</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--pop-yellow)" }}>{cycleCount > 0 ? Math.round(totalAIClear / cycleCount) : 0}/cycle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cycle history */}
      {history.length > 3 && (
        <div className="glass" style={{ padding: 14, marginTop: 18 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginBottom: 8, letterSpacing: 1 }}>CYCLE HISTORY</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 40 }}>
            {history.slice(-24).map((h, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: 2, height: 30 + Math.random() * 10,
                background: LANE_COLORS[h.green], opacity: 0.6,
              }} />
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </ModuleShell>
  );
}
