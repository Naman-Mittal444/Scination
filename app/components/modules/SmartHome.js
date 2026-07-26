"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";
import { DeviceProvider, useDevices, calcEnergyW } from "./smarthome/DeviceContext";
import { parseIntent, ROOMS } from "./smarthome/intentEngine";
import { SmartHomeHowItWorks } from "./content/SmartHomeContent";
import Icon from "../Icon";

const HOW_IT_WORKS = <SmartHomeHowItWorks />;

function makeTone(freq, dur) {
  if (typeof AudioContext === "undefined") return "";
  const sr = 8000, n = Math.floor(sr * dur / 1000);
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true);
  w(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data");
  v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.min(1, t * 20) * Math.max(0, 1 - t / (dur / 1000));
    v.setInt16(44 + i * 2, Math.round(env * 0.5 * 32767 * Math.sin(2 * Math.PI * freq * t)), true);
  }
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return "data:audio/wav;base64," + btoa(bin);
}
const play = (freq, dur) => { try { new Audio(makeTone(freq, dur)).play(); } catch {} };

function DeviceCard({ icon, name, active, accent, children }) {
  return (
    <motion.div className="sh-device-card" whileHover={{ scale: 1.02, y: -3 }} style={{ "--dev-accent": accent }}>
      <div className="sh-device-header">
        <span className="sh-device-icon" style={{ display: "flex", alignItems: "center" }}>
          {typeof icon === "string" ? icon : icon}
        </span>
        <span className="sh-device-name">{name}</span>
        <span className={`sh-device-status ${active ? "on" : "off"}`}><span className="sh-status-dot" /> {active ? "ON" : "OFF"}</span>
      </div>
      <div className="sh-device-body">{children}</div>
      {active && <div className="sh-device-glow" />}
    </motion.div>
  );
}

/* ── Biometrics with real WebRTC camera ── */
function Biometrics({ exec }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [scanLine, setScanLine] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [fingerprintScanning, setFingerprintScanning] = useState(false);
  const [fingerprintResult, setFingerprintResult] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 240, height: 180 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  function startFaceScan() {
    setScanning(true); setResult(null); play(440, 200);
    if (!cameraActive) startCamera();
    let line = 0;
    const id = setInterval(() => {
      line += 2; setScanLine(line);
      if (line >= 100) {
        clearInterval(id); setScanning(false);
        const conf = 88 + Math.floor(Math.random() * 12);
        setResult({ match: conf > 90, confidence: conf });
        exec("face_scan", conf);
        play(conf > 90 ? 880 : 330, 400);
      }
    }, 30);
  }

  function startFingerprint() {
    setFingerprintScanning(true); setFingerprintResult(null); play(520, 300);
    setTimeout(() => {
      const matched = Math.random() > 0.15;
      setFingerprintScanning(false);
      setFingerprintResult({ matched, confidence: matched ? 95 + Math.floor(Math.random() * 5) : 0 });
      exec("fingerprint_scan", matched ? "matched" : "no match");
      play(matched ? 780 : 300, 500);
    }, 1500);
  }

  return (
    <motion.div className="sh-biometric glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sh-bio-header">
        <span style={{ fontSize: 22 }}>&#x1f510;</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Biometric Scanner</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>Face Recognition + Fingerprint</div>
        </div>
      </div>

      {/* Camera viewport */}
      <div className="sh-bio-viewport">
        <div className="sh-bio-frame">
          <div className="sh-bio-corner tl" /><div className="sh-bio-corner tr" />
          <div className="sh-bio-corner bl" /><div className="sh-bio-corner br" />
          {scanning && <motion.div className="sh-bio-scanline" style={{ top: `${scanLine}%` }} />}
          <video
            ref={videoRef}
            className="sh-bio-video"
            style={{ display: cameraActive ? "block" : "none", width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
            muted
            playsInline
          />
          {!cameraActive && (
            <div className="sh-bio-face-silhouette">
              {scanning ? "..." : result ? (result.match ? "OK" : "X") : "?"}
            </div>
          )}
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`sh-bio-result ${result.match ? "pass" : "fail"}`}>
          {result.match ? "IDENTITY VERIFIED" : "ACCESS DENIED"} - {result.confidence}% confidence
        </motion.div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="btn" style={{ flex: 1 }} onClick={startFaceScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Scan Face"}
        </button>
        <button className="btn" style={{ flex: 1, background: fingerprintScanning ? "rgba(168,85,247,0.3)" : undefined }} onClick={startFingerprint} disabled={fingerprintScanning}>
          {fingerprintScanning ? "Reading..." : "Fingerprint"}
        </button>
      </div>

      {fingerprintResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`sh-bio-result ${fingerprintResult.matched ? "pass" : "fail"}`} style={{ marginTop: 8 }}>
          {fingerprintResult.matched ? `FINGERPRINT MATCHED (${fingerprintResult.confidence}%)` : "FINGERPRINT NOT RECOGNIZED"}
        </motion.div>
      )}
    </motion.div>
  );
}

function Waveform({ stream }) {
  const ref = useRef(); const raf = useRef();
  useEffect(() => {
    if (!stream) return;
    const ctx = new AudioContext(); const src = ctx.createMediaStreamSource(stream);
    const a = ctx.createAnalyser(); a.fftSize = 256; src.connect(a);
    const d = new Uint8Array(a.frequencyBinCount);
    function draw() {
      raf.current = requestAnimationFrame(draw);
      const c = ref.current; if (!c) return;
      const g = c.getContext("2d"); a.getByteTimeDomainData(d);
      g.clearRect(0, 0, c.width, c.height);
      g.strokeStyle = "var(--accent, #37e2d5)"; g.lineWidth = 2; g.beginPath();
      const sl = c.width / d.length;
      d.forEach((v, i) => { const x = i * sl, y = (v / 128) * (c.height / 2); i === 0 ? g.moveTo(x, y) : g.lineTo(x, y); });
      g.stroke();
    }
    draw();
    return () => { cancelAnimationFrame(raf.current); ctx.close(); };
  }, [stream]);
  return <canvas ref={ref} className="waveform-canvas" width={400} height={50} />;
}

function AuraChat({ exec, state }) {
  const [msgs, setMsgs] = useState([
    { from: "aura", text: "Hello! I'm AURA, your smart home AI. I control lights, AC, fan, TV, door lock and more. Try 'help' for commands! Say 'I'm back' or 'away mode' for smart modes." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, typing]);

  const send = useCallback((text) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]); setInput(""); setTyping(true);
    exec("log_command", { cmd: text, ts: Date.now() });
    setTimeout(() => {
      const r = parseIntent(text, state);
      if (r?.action && r.action !== "unknown") exec(r.action, r.value);
      setMsgs((m) => [...m, { from: "aura", text: r?.response || "I didn't understand that. Try 'help'." }]);
      setTyping(false);
    }, 300 + Math.random() * 500);
  }, [exec, state]);

  return (
    <div className="sh-chatbot">
      <div className="sh-chat-header">
        <span className="sh-chat-pulse" /><span style={{ fontWeight: 700 }}>AURA</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginLeft: "auto" }}>AI Assistant v3</span>
      </div>
      <div className="sh-chat-messages" ref={scrollRef}>
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`sh-chat-msg ${m.from}`}>
            {m.from === "aura" && <span className="sh-chat-avatar">AI</span>}
            <div className="sh-chat-bubble">{m.text}</div>
          </motion.div>
        ))}
        {typing && <div className="sh-chat-msg aura"><span className="sh-chat-avatar">AI</span><div className="sh-chat-bubble sh-typing"><span /><span /><span /></div></div>}
      </div>
      <div className="sh-chat-suggestions">
        {["I'm back", "Away mode", "Close the house", "Movie time", "Energy saving", "Status"].map((q) => (
          <button key={q} className="sh-suggestion-btn" onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <form className="sh-chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask AURA anything..." />
        <button type="submit" className="btn" style={{ padding: "0.5em 1.2em" }}>Send</button>
      </form>
    </div>
  );
}

function VoicePanel({ exec, state }) {
  const [listening, setListening] = useState(false);
  const [micStream, setMicStream] = useState(null);
  const [lastIntent, setLastIntent] = useState(null);
  const recogRef = useRef(null);

  function startMic() {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) { alert("Use Chrome for speech recognition."); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setMicStream(stream);
      const r = new SR(); r.continuous = false; r.interimResults = false; r.lang = "en-US";
      r.onresult = (e) => {
        const text = e.results[0][0].transcript;
        const result = parseIntent(text, state); setLastIntent(result);
        if (result?.action) exec(result.action, result.value);
      };
      r.onend = () => { setListening(false); stream.getTracks().forEach((t) => t.stop()); setMicStream(null); };
      r.start(); recogRef.current = r; setListening(true);
    }).catch(() => alert("Microphone access denied."));
  }
  function stopMic() { recogRef.current?.stop(); setListening(false); }

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <button className={`btn ${listening ? "" : "btn-ghost"}`} onClick={listening ? stopMic : startMic}
          style={listening ? { background: "rgba(255,77,157,0.2)" } : {}}>
          {listening ? "Listening..." : "Voice Control"}
        </button>
        <AnimatePresence>
          {lastIntent && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>
              Intent: {lastIntent.action} ({Math.round(lastIntent.confidence * 100)}%)
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {micStream && <Waveform stream={micStream} />}
    </div>
  );
}

const SCENES = [
  { id: "scene_sleep", icon: "Zzz", label: "Sleep", color: "#a855f7" },
  { id: "scene_movie", icon: "MV", label: "Movie", color: "#4d7cff" },
  { id: "scene_morning", icon: "AM", label: "Morning", color: "#ffd93d" },
  { id: "scene_party", icon: "!!", label: "Party", color: "#ff4d9d" },
  { id: "scene_work", icon: "WK", label: "Work", color: "#37e2d5" },
  { id: "scene_eco", icon: "EC", label: "Eco", color: "#00ff9c" },
  { id: "scene_off", icon: "OFF", label: "All Off", color: "#ff1744" },
];

function SceneBar({ exec, activeScene }) {
  return (
    <div className="sh-scenes">
      {SCENES.map((s) => (
        <motion.button key={s.id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          className={`sh-scene-btn ${activeScene === s.id ? "active" : ""}`}
          style={{ "--scene-color": s.color }}
          onClick={() => { exec(s.id); play(660, 200); }}>
          <span className="sh-scene-icon">{s.icon}</span>
          <span>{s.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

/* ── Add Device Modal ── */
function AddDeviceModal({ onClose, exec }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("light");
  const [room, setRoom] = useState("bedroom");

  const types = [
    { id: "light", icon: "\uD83D\uDCA1", label: "Light" },
    { id: "sensor", icon: "\uD83D\uDCE1", label: "Sensor" },
    { id: "speaker", icon: "\uD83D\uDD0A", label: "Speaker" },
    { id: "camera", icon: "\uD83D\uDCF7", label: "Camera" },
    { id: "thermostat", icon: "\uD83C\uDF21\uFE0F", label: "Thermostat" },
    { id: "lock", icon: "\uD83D\uDD10", label: "Smart Lock" },
  ];

  function handleAdd() {
    if (!name.trim()) return;
    exec("add_device", { name: name.trim(), type, room });
    play(700, 200);
    onClose();
  }

  return (
    <motion.div className="sh-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="sh-modal glass" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Add New Device</div>

        <label className="cyber-field-label">Device Name</label>
        <input className="cyber-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kitchen Light" autoFocus />

        <label className="cyber-field-label" style={{ marginTop: 12 }}>Device Type</label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {types.map((t) => (
            <button key={t.id} className={`sh-modal-chip ${type === t.id ? "active" : ""}`} onClick={() => setType(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <label className="cyber-field-label" style={{ marginTop: 12 }}>Room</label>
        <div style={{ display: "flex", gap: 6 }}>
          {ROOMS.map((r) => (
            <button key={r.id} className={`sh-modal-chip ${room === r.id ? "active" : ""}`} onClick={() => setRoom(r.id)}>
              {r.icon} {r.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button className="btn" style={{ flex: 1 }} onClick={handleAdd}>Add Device</button>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Energy Graph (simple bar chart) ── */
function EnergyGraph({ history }) {
  if (!history || history.length < 2) return null;
  const maxW = Math.max(...history.map((h) => h.w), 1);
  return (
    <div className="sh-energy-graph glass">
      <div className="sh-section-title" style={{ marginBottom: 10 }}><span><Icon name="flash-1" size={18} /></span> Energy History</div>
      <div className="sh-energy-bars">
        {history.map((h, i) => (
          <div key={i} className="sh-energy-bar-col">
            <div className="sh-energy-bar-wrap">
              <motion.div
                className="sh-energy-bar"
                initial={{ height: 0 }}
                animate={{ height: `${(h.w / maxW) * 100}%` }}
                style={{ background: h.w > 400 ? "var(--pop-pink)" : h.w > 200 ? "var(--pop-yellow)" : "var(--pop-cyan)" }}
              />
            </div>
            <span className="sh-energy-bar-label">{h.w}W</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Activity Log ── */
function ActivityLog({ logs }) {
  if (!logs || logs.length === 0) return (
    <div className="sh-activity-log glass">
      <div className="sh-section-title"><span><Icon name="element-3" size={18} /></span> Activity Log</div>
      <div className="sh-log-empty">No activity yet</div>
    </div>
  );

  return (
    <div className="sh-activity-log glass">
      <div className="sh-section-title"><span><Icon name="element-3" size={18} /></span> Activity Log</div>
      <div className="sh-log-list">
        {logs.slice(0, 12).map((l, i) => (
          <div key={i} className={`sh-log-entry sh-log-${l.type}`}>
            <span className="sh-log-dot" />
            <span className="sh-log-msg">{l.msg}</span>
            <span className="sh-log-time">{new Date(l.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Alerts Panel ── */
function AlertsPanel({ alerts, onDismiss, onClear }) {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="sh-alerts-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div className="sh-section-title" style={{ marginBottom: 0 }}><span>&#x1F6A8;</span> Alerts ({alerts.length})</div>
        <button className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={onClear}>Clear All</button>
      </div>
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className={`sh-alert sh-alert-${a.severity}`}>
            <span className="sh-alert-text">{a.msg}</span>
            <button className="sh-alert-dismiss" onClick={() => onDismiss(a.id)} aria-label="Dismiss alert">&#x2715;</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Custom Device Card ── */
function CustomDeviceCard({ device, exec }) {
  const typeIcons = { light: "\uD83D\uDCA1", sensor: "\uD83D\uDCE1", speaker: "\uD83D\uDD0A", camera: "\uD83D\uDCF7", thermostat: "\uD83C\uDF21\uFE0F", lock: "\uD83D\uDD10" };
  const room = ROOMS.find((r) => r.id === device.room);
  return (
    <DeviceCard icon={typeIcons[device.type] || "\u2699\uFE0F"} name={device.name} active={device.on} accent={room?.color || "#37e2d5"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 11 }}>{room?.icon} {room?.name || device.room}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="sh-toggle" onClick={() => exec("toggle_device", device.id)} aria-label={`Toggle ${device.name}`}>
            <motion.div animate={{ x: device.on ? 20 : 0 }} className="sh-toggle-knob" />
          </button>
          <button className="sh-mini-btn" onClick={() => exec("remove_device", device.id)} aria-label={`Remove ${device.name}`} style={{ color: "var(--pop-pink)", fontSize: 12, padding: "4px 8px" }}>&#x2715;</button>
        </div>
      </div>
    </DeviceCard>
  );
}

/* ── Lockdown Banner ── */
function LockdownBanner({ lockdown, reason, onClear }) {
  if (!lockdown) return null;
  return (
    <motion.div className="sh-lockdown-banner" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}>
      <span style={{ fontSize: 22 }}>&#x26D4;</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: "var(--pop-pink)" }}>SECURITY LOCKDOWN</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>{reason}</div>
      </div>
      <button className="btn" style={{ fontSize: 12, padding: "6px 14px" }} onClick={onClear}>Clear Lockdown</button>
    </motion.div>
  );
}

/* ── Main Component ── */
function SmartHomeInner({ onNavigate }) {
  const m = MODULE_BY_ID["smart-home"];
  const { state, exec } = useDevices();
  const energy = useMemo(() => calcEnergyW(state), [state]);
  const activeDevices = useMemo(() => {
    let count = [state.lightsOn, state.acOn, state.fanOn, state.tvOn].filter(Boolean).length;
    count += state.customDevices.filter((d) => d.on).length;
    return count;
  }, [state]);
  const totalDevices = 4 + state.customDevices.length;
  const maxEnergy = 1200;
  const energyPct = Math.min(100, Math.round((energy / maxEnergy) * 100));
  const efficiency = Math.max(0, 100 - energyPct);

  const [showAddDevice, setShowAddDevice] = useState(false);

  // Energy snapshots
  useEffect(() => {
    const id = setInterval(() => { exec("energy_snapshot", energy); }, 3000);
    return () => clearInterval(id);
  }, [energy, exec]);

  return (
    <ModuleShell module={m} howItWorks={HOW_IT_WORKS}
      about={"AURA blends IoT sensors with intent-based NLP. The light model L_out = max(0, mu x (I_L - E_x)) minimises energy waste. Voice commands map to device actions via regex intent classification. Smart modes ('I'm back', 'Away mode') automate multi-device scenes. Defence-in-depth: 3 failed PINs escalate to the Cybersecurity module via lockdown interlock."}>

      <AnimatePresence>
        {state.lockdown && (
          <LockdownBanner lockdown={state.lockdown} reason={state.lockdownReason}
            onClear={() => {
              exec("clear_lockdown");
              if (onNavigate) onNavigate("cybersecurity", state.lockdownReason);
            }} />
        )}
      </AnimatePresence>

      <AlertsPanel alerts={state.alerts} onDismiss={(id) => exec("dismiss_alert", id)} onClear={() => exec("clear_alerts")} />

      {/* Dashboard Stats */}
      <div className="sh-stats-row">
        <div className="sh-stat-card">
          <div className="sh-stat-icon" style={{ color: energyPct > 60 ? "var(--pop-pink)" : "var(--pop-cyan)" }}><Icon name="flash-1" size={20} /></div>
          <div className="sh-stat-val mono">{Math.round(energy)}W</div>
          <div className="sh-stat-label">Energy</div>
        </div>
        <div className="sh-stat-card">
          <div className="sh-stat-icon"><Icon name="monitor" size={20} /></div>
          <div className="sh-stat-val mono">{activeDevices}/{totalDevices}</div>
          <div className="sh-stat-label">Active</div>
        </div>
        <div className="sh-stat-card">
          <div className="sh-stat-icon"><Icon name="flash" size={20} /></div>
          <div className="sh-stat-val mono">{efficiency}%</div>
          <div className="sh-stat-label">Efficiency</div>
        </div>
        <div className="sh-stat-card">
          <div className="sh-stat-icon"><Icon name={state.doorLocked ? "lock-1" : "unlock"} size={20} /></div>
          <div className="sh-stat-val mono">{state.doorLocked ? "Armed" : "Open"}</div>
          <div className="sh-stat-label">Security</div>
        </div>
      </div>

      {/* Scene Presets */}
      <div className="sh-section-title"><span><Icon name="flash-1" size={18} /></span> Quick Scenes</div>
      <SceneBar exec={exec} activeScene={state.activeScene} />

      {/* Voice */}
      <div style={{ marginTop: 18 }}>
        <div className="sh-section-title"><span><Icon name="microphone" size={18} /></span> Voice Control</div>
        <VoicePanel exec={exec} state={state} />
      </div>

      {/* Main Grid */}
      <div className="sh-main-grid">
        <div className="sh-devices-col">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div className="sh-section-title" style={{ marginBottom: 0 }}><span><Icon name="home-wifi" size={18} /></span> Device Control</div>
            <button className="btn" style={{ fontSize: 12, padding: "6px 14px" }} onClick={() => setShowAddDevice(true)}>+ Add Device</button>
          </div>

          <DeviceCard icon={<Icon name="lamp-1" size={20} />} name="Smart Lights" active={state.lightsOn} accent="#ffd93d">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 12 }}>Brightness: {state.brightness}%</span>
              <button className="sh-toggle" onClick={() => exec(state.lightsOn ? "lights_off" : "lights_on")} aria-label={state.lightsOn ? "Turn off lights" : "Turn on lights"}>
                <motion.div animate={{ x: state.lightsOn ? 20 : 0 }} className="sh-toggle-knob" />
              </button>
            </div>
            <input type="range" className="accent-range" min="0" max="100" value={state.brightness}
              style={{ "--fill": `${state.brightness}%` }}
              onChange={(e) => exec("brightness_set", parseInt(e.target.value))} />
          </DeviceCard>

          <DeviceCard icon={<Icon name="temperature" size={20} />} name="Air Conditioner" active={state.acOn} accent="#37e2d5">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 12 }}>Temp: {state.temperature}&#xB0;C</span>
              <button className="sh-toggle" onClick={() => exec(state.acOn ? "ac_off" : "ac_on")} aria-label={state.acOn ? "Turn off AC" : "Turn on AC"}>
                <motion.div animate={{ x: state.acOn ? 20 : 0 }} className="sh-toggle-knob" />
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="sh-mini-btn" onClick={() => exec("temp_down")} aria-label="Decrease temperature">-</button>
              <div className="sh-temp-display mono">{state.temperature}&#xB0;</div>
              <button className="sh-mini-btn" onClick={() => exec("temp_up")} aria-label="Increase temperature">+</button>
            </div>
          </DeviceCard>

          <DeviceCard icon={<Icon name="rotate-right" size={20} />} name="Ceiling Fan" active={state.fanOn} accent="#a855f7">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 12 }}>Speed: {state.fanSpeed}/5</span>
              <button className="sh-toggle" onClick={() => exec(state.fanOn ? "fan_off" : "fan_on")} aria-label={state.fanOn ? "Turn off fan" : "Turn on fan"}>
                <motion.div animate={{ x: state.fanOn ? 20 : 0 }} className="sh-toggle-knob" />
              </button>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} className={`sh-speed-btn ${state.fanOn && state.fanSpeed === s ? "active" : ""}`}
                  onClick={() => exec("fan_set", s)}>{s}</button>
              ))}
            </div>
          </DeviceCard>

          <DeviceCard icon={<Icon name="monitor" size={20} />} name="Smart TV" active={state.tvOn} accent="#4d7cff">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 12 }}>Volume: {state.tvVolume}%</span>
              <button className="sh-toggle" onClick={() => exec(state.tvOn ? "tv_off" : "tv_on")} aria-label={state.tvOn ? "Turn off TV" : "Turn on TV"}>
                <motion.div animate={{ x: state.tvOn ? 20 : 0 }} className="sh-toggle-knob" />
              </button>
            </div>
            <input type="range" className="accent-range" min="0" max="100" value={state.tvVolume}
              style={{ "--fill": `${state.tvVolume}%` }}
              onChange={(e) => exec("vol_set", parseInt(e.target.value))} />
          </DeviceCard>

          <DeviceCard icon={<Icon name="lock-1" size={20} />} name="Smart Lock" active={state.doorLocked} accent="#ff4d9d">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 12 }}>{state.doorLocked ? "Secured" : "Unlocked"}</span>
              <button className="sh-toggle" onClick={() => exec(state.doorLocked ? "unlock" : "lock")} aria-label={state.doorLocked ? "Unlock door" : "Lock door"}>
                <motion.div animate={{ x: state.doorLocked ? 20 : 0 }} className="sh-toggle-knob" />
              </button>
            </div>
          </DeviceCard>

          {/* Custom Devices */}
          {state.customDevices.map((d) => (
            <CustomDeviceCard key={d.id} device={d} exec={exec} />
          ))}
        </div>

        <div className="sh-right-col">
          <div className="sh-section-title"><span><Icon name="cpu" size={18} /></span> AURA AI</div>
          <AuraChat exec={exec} state={state} />
          <div style={{ marginTop: 18 }}>
            <div className="sh-section-title"><span><Icon name="lock-1" size={18} /></span> Biometrics</div>
            <Biometrics exec={exec} />
          </div>
        </div>
      </div>

      {/* Energy Graph + Activity Log row */}
      <div className="sh-bottom-grid">
        <EnergyGraph history={state.energyHistory} />
        <ActivityLog logs={state.activityLog} />
      </div>

      <AnimatePresence>
        {showAddDevice && <AddDeviceModal exec={exec} onClose={() => setShowAddDevice(false)} />}
      </AnimatePresence>
    </ModuleShell>
  );
}

export default function SmartHome(props) {
  return (
    <DeviceProvider>
      <SmartHomeInner {...props} />
    </DeviceProvider>
  );
}
