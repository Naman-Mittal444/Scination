"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";
import { emitDebug } from "../DebugPanel";
import { CyberHowItWorks } from "./content/CyberContent";

/* ── helpers ──────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fmt = (n) => n.toLocaleString("en-US");

function analyze(pw) {
  const L = pw.length;
  let R = 0;
  const has = { lower: false, upper: false, num: false, sym: false };
  if (/[a-z]/.test(pw)) { R += 26; has.lower = true; }
  if (/[A-Z]/.test(pw)) { R += 26; has.upper = true; }
  if (/[0-9]/.test(pw)) { R += 10; has.num = true; }
  if (/[^a-zA-Z0-9]/.test(pw)) { R += 33; has.sym = true; }
  const E = L > 0 && R > 0 ? L * (Math.log(R) / Math.log(2)) : 0;
  return { L, R, E, has };
}

function strengthOf(E) {
  if (E < 28) return { label: "WEAK", color: "var(--pop-pink)", pct: (E / 28) * 25 };
  if (E < 36) return { label: "MODERATE", color: "var(--pop-yellow)", pct: 25 + ((E - 28) / 8) * 25 };
  if (E < 60) return { label: "STRONG", color: "var(--pop-cyan)", pct: 50 + ((E - 36) / 24) * 30 };
  return { label: "VERY STRONG", color: "#00ff9c", pct: clamp(80 + ((E - 60) / 40) * 20, 80, 100) };
}

function crackTimeStr(E) {
  if (E <= 0) return "instant";
  const seconds = Math.pow(2, E) / 2 / 1e9;
  if (seconds < 1e-3) return "instant";
  if (seconds > 31557600 * 1e6) return `10^${Math.floor(Math.log10(seconds / 31557600))} years`;
  const units = [["seconds", 1], ["minutes", 60], ["hours", 3600], ["days", 86400], ["years", 31557600]];
  let out = "instant";
  for (const [name, s] of units) {
    if (seconds >= s) out = (seconds / s).toFixed(seconds / s > 100 ? 0 : 1) + " " + name;
  }
  return out;
}

function spaceStr(E) {
  if (E <= 0) return "0";
  if (E > 60) return `2^${Math.round(E)} ≈ 10^${Math.round(E * 0.301)}`;
  return Math.pow(2, E).toExponential(2);
}

function caesar(str, shift) {
  return str.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
  });
}

function xorCipher(str, key) {
  const k = key.charCodeAt(0) || 75;
  return [...str].map((c) => String.fromCharCode(c.charCodeAt(0) ^ k)).join("");
}

function toHex(str) {
  return [...str].map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");
}

const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
function randGuess(len) {
  let s = "";
  for (let i = 0; i < len; i++) s += CHARSET[(Math.random() * CHARSET.length) | 0];
  return s;
}

const HOW_IT_WORKS = <CyberHowItWorks />;

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function Cybersecurity({ reason }) {
  const m = MODULE_BY_ID["cybersecurity"];

  /* ── shared system state ── */
  const [threat, setThreat] = useState("low");
  const [integrity, setIntegrity] = useState(100);
  const [lastAttack, setLastAttack] = useState("NONE");
  const [lastAttackColor, setLastAttackColor] = useState("var(--ink-dim)");
  const [alertMsg, setAlertMsg] = useState(null);
  const alertTimer = useRef(null);

  const showAlert = useCallback((text, type = "warn", dur = 3200) => {
    setAlertMsg({ text, type });
    clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlertMsg(null), dur);
  }, []);

  /* ── MODULE 1: PASSWORD ENTROPY ── */
  const [pw, setPw] = useState("skynet");
  const analysis = useMemo(() => analyze(pw), [pw]);
  const strength = useMemo(() => strengthOf(analysis.E), [analysis.E]);

  /* ── MODULE 2: BRUTE-FORCE ATTACK ── */
  const [attackRunning, setAttackRunning] = useState(false);
  const [attackCount, setAttackCount] = useState(0);
  const [attackRate, setAttackRate] = useState(0);
  const [attackProgress, setAttackProgress] = useState(0);
  const [verdict, setVerdict] = useState(null); // "breached" | "failed" | null
  const [terminalLines, setTerminalLines] = useState([]);
  const attackRef = useRef({ raf: null, startTime: 0, count: 0, rateWindow: [], lastLog: 0, crackAtMs: 0, targetE: 0 });
  const termRef = useRef(null);

  const addTermLine = useCallback((text, cls = "") => {
    const t = new Date().toTimeString().slice(0, 8);
    setTerminalLines((prev) => {
      const next = [...prev, { t, text, cls, id: Date.now() + Math.random() }];
      return next.length > 220 ? next.slice(-220) : next;
    });
  }, []);

  const stopAttack = useCallback(() => {
    const a = attackRef.current;
    a.running = false;
    cancelAnimationFrame(a.raf);
    setAttackRunning(false);
  }, []);

  const startAttack = useCallback(() => {
    if (attackRef.current.running) return;
    if (!pw) { showAlert("No target password set", "warn"); return; }

    const a = analyze(pw);
    const ref = attackRef.current;
    ref.running = true;
    ref.count = 0;
    ref.startTime = performance.now();
    ref.rateWindow = [];
    ref.lastLog = 0;
    ref.targetE = a.E;
    ref.crackAtMs = a.E >= 60 ? Infinity : 1200 + Math.pow(clamp(a.E, 1, 60), 1.9) * 5;

    setAttackRunning(true);
    setAttackCount(0);
    setAttackRate(0);
    setAttackProgress(0);
    setVerdict(null);
    setThreat(a.E >= 60 ? "medium" : "critical");
    setIntegrity(100);
    setLastAttack("IN PROGRESS…");
    setLastAttackColor("var(--pop-yellow)");

    addTermLine("━━━ INITIATING BRUTE-FORCE SEQUENCE ━━━", "t-crit");
    addTermLine(`target="${pw}"  entropy=${a.E.toFixed(1)}bits  charset=${a.R}`, "t-info");
    addTermLine("spawning parallel guess workers…", "t-warn");
    showAlert("Active attack simulation running", "crit", 2000);

    const loop = () => {
      if (!ref.running) return;
      const now = performance.now();
      const elapsed = now - ref.startTime;
      const burst = 40 + ((Math.random() * 60) | 0);
      ref.count += burst;

      if (now - ref.lastLog > 55) {
        ref.lastLog = now;
        const g = randGuess(Math.max(4, pw.length));
        const near = Math.random() < 0.04;
        addTermLine(`try #${fmt(ref.count)}  → "${g}"${near ? "  ~partial match" : ""}`, near ? "t-warn" : "");
      }

      ref.rateWindow.push({ t: now, c: ref.count });
      while (ref.rateWindow.length && now - ref.rateWindow[0].t > 1000) ref.rateWindow.shift();
      const w = ref.rateWindow;
      const rate = w.length > 1 ? Math.round((w[w.length - 1].c - w[0].c) / ((w[w.length - 1].t - w[0].t) / 1000)) : 0;
      const displayRate = rate * 8500;

      setAttackCount(ref.count * 8500);
      setAttackRate(displayRate);

      const prog = ref.crackAtMs === Infinity
        ? clamp(elapsed / 15000 * 62, 0, 62)
        : clamp(elapsed / ref.crackAtMs * 100, 0, 100);
      setAttackProgress(Math.floor(prog));
      setIntegrity(100 - prog * (ref.crackAtMs === Infinity ? 0.25 : 0.9));

      if (ref.crackAtMs !== Infinity && elapsed >= ref.crackAtMs) {
        stopAttack();
        setAttackProgress(100);
        addTermLine("*** PASSWORD RECOVERED ***", "t-crit");
        addTermLine(`plaintext = "${pw}"`, "t-crit");
        addTermLine("access granted to attacker. session hijacked.", "t-crit");
        setVerdict("breached");
        setThreat("critical");
        setIntegrity(8);
        setLastAttack("BREACHED");
        setLastAttackColor("var(--pop-pink)");
        showAlert("SYSTEM BREACHED — password cracked", "crit", 5000);
        return;
      }
      if (ref.crackAtMs === Infinity && elapsed >= 15000) {
        stopAttack();
        addTermLine("search space exhausted budget. no match found.", "t-ok");
        addTermLine("*** ATTACK FAILED — target resisted brute-force ***", "t-ok");
        setVerdict("failed");
        setThreat("low");
        setIntegrity(100);
        setLastAttack("DEFENDED");
        setLastAttackColor("#00ff9c");
        showAlert("Attack repelled — password held", "ok", 4000);
        return;
      }
      ref.raf = requestAnimationFrame(loop);
    };
    ref.raf = requestAnimationFrame(loop);
  }, [pw, showAlert, addTermLine, stopAttack]);

  const abortAttack = useCallback(() => {
    if (!attackRef.current.running) return;
    stopAttack();
    addTermLine("operator aborted attack sequence.", "t-warn");
    setThreat("low");
    setIntegrity(100);
    setLastAttack("ABORTED");
    setLastAttackColor("var(--ink-dim)");
  }, [stopAttack, addTermLine]);

  const clearTerminal = useCallback(() => {
    setTerminalLines([]);
    addTermLine("log cleared.", "t-info");
  }, [addTermLine]);

  /* ambient terminal noise */
  const ambientRef = useRef(null);
  useEffect(() => {
    const msgs = [
      ["firewall: dropped inbound scan from 10.0.44.2", "t-info"],
      ["ids: signature db up to date", "t-ok"],
      ["tls: handshake completed · cipher=AES-256-GCM", "t-ok"],
      ["dns: resolver cache flushed", "t-info"],
      ["authd: session heartbeat ok", "t-ok"],
      ["port-scan blocked · 22,80,443 filtered", "t-warn"],
    ];
    ambientRef.current = setInterval(() => {
      if (!attackRef.current.running && Math.random() < 0.55) {
        const [msg, cls] = msgs[(Math.random() * msgs.length) | 0];
        addTermLine(msg, cls);
      }
    }, 2600);
    return () => clearInterval(ambientRef.current);
  }, [addTermLine]);

  /* boot message */
  useEffect(() => {
    addTermLine("CIPHER//LAB kernel online. all systems nominal.", "t-ok");
    addTermLine("awaiting operator input…", "t-info");
  }, [addTermLine]);

  /* auto-scroll terminal */
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [terminalLines]);

  /* ── MODULE 3: ENCRYPTION PIPELINE ── */
  const [encInput, setEncInput] = useState("ATTACK AT DAWN");
  const [shift, setShift] = useState(7);
  const [xorKey, setXorKey] = useState("K");

  const caesarResult = useMemo(() => caesar(encInput, shift), [encInput, shift]);
  const xorResult = useMemo(() => xorCipher(caesarResult, xorKey), [caesarResult, xorKey]);
  const xorHex = useMemo(() => toHex(xorResult), [xorResult]);

  /* ── MODULE 4: SECURE LOGIN + MFA ── */
  const [loginPw, setLoginPw] = useState("");
  const [loginStage, setLoginStage] = useState("password"); // "password" | "otp"
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [otpExpected, setOtpExpected] = useState(null);
  const [loginFails, setLoginFails] = useState(0);
  const [loginLocked, setLoginLocked] = useState(false);
  const [loginMsg, setLoginMsg] = useState({ text: "Awaiting credentials. Min entropy: 36 bits.", type: "info" });
  const [loginBtnText, setLoginBtnText] = useState("Authenticate");
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const lockTimerRef = useRef(null);
  const otpRefs = useRef([]);

  const MAX_FAILS = 3;
  const MIN_ENTROPY = 36;
  const LOCK_MS = 12000;

  const handleLogin = useCallback(() => {
    if (loginLocked) return;

    if (loginStage === "password") {
      const a = analyze(loginPw);
      if (!loginPw) { setLoginMsg({ text: "Enter a password to authenticate.", type: "warn" }); return; }
      if (a.E < MIN_ENTROPY) {
        const newFails = loginFails + 1;
        setLoginFails(newFails);
        showAlert("Login rejected — password entropy too low", "warn");
        setLoginMsg({ text: `✖ Rejected: entropy ${a.E.toFixed(1)} bits < required ${MIN_ENTROPY} bits.`, type: "crit" });
        if (newFails >= MAX_FAILS) {
          setLoginLocked(true);
          setLoginBtnDisabled(true);
          setThreat("critical");
          setIntegrity(20);
          showAlert("SECURITY LOCKDOWN — too many failed logins", "crit", 5000);
          let remain = LOCK_MS / 1000;
          setLoginMsg({ text: `🔒 SYSTEM LOCKED for ${remain}s after ${MAX_FAILS} failed attempts.`, type: "crit" });
          lockTimerRef.current = setInterval(() => {
            remain--;
            if (remain <= 0) {
              clearInterval(lockTimerRef.current);
              setLoginLocked(false);
              setLoginFails(0);
              setLoginBtnDisabled(false);
              setThreat("low");
              setIntegrity(100);
              setLoginMsg({ text: "Lockout lifted. You may retry.", type: "info" });
            } else {
              setLoginMsg({ text: `🔒 SYSTEM LOCKED — ${remain}s remaining…`, type: "crit" });
            }
          }, 1000);
        }
        return;
      }
      const otp = String(Math.floor(1000 + Math.random() * 9000));
      setOtpExpected(otp);
      setLoginStage("otp");
      setLoginBtnText("Verify OTP");
      setLoginMsg({ text: "✔ Password accepted. Enter the one-time code.", type: "ok" });
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
      return;
    }

    if (loginStage === "otp") {
      const digits = otpDigits.join("");
      if (digits.length < 4) { setLoginMsg({ text: "Enter the full 4-digit code.", type: "warn" }); return; }
      if (digits === otpExpected) {
        setLoginMsg({ text: "✔ ACCESS GRANTED — welcome, operator.", type: "ok" });
        showAlert("Authentication successful — MFA verified", "ok", 4000);
        setThreat("low");
        setIntegrity(100);
        setLoginBtnText("Authenticated ✓");
        setLoginBtnDisabled(true);
      } else {
        const newFails = loginFails + 1;
        setLoginFails(newFails);
        setLoginMsg({ text: "✖ Invalid OTP. Verification failed.", type: "crit" });
        showAlert("MFA failure — wrong one-time code", "warn");
        if (newFails >= MAX_FAILS) {
          setLoginLocked(true);
          setLoginBtnDisabled(true);
          setThreat("critical");
          setIntegrity(20);
          showAlert("SECURITY LOCKDOWN — too many failed logins", "crit", 5000);
          let remain = LOCK_MS / 1000;
          setLoginMsg({ text: `🔒 SYSTEM LOCKED for ${remain}s after ${MAX_FAILS} failed attempts.`, type: "crit" });
          lockTimerRef.current = setInterval(() => {
            remain--;
            if (remain <= 0) {
              clearInterval(lockTimerRef.current);
              setLoginLocked(false);
              setLoginFails(0);
              setLoginBtnDisabled(false);
              setThreat("low");
              setIntegrity(100);
              setLoginMsg({ text: "Lockout lifted. You may retry.", type: "info" });
            } else {
              setLoginMsg({ text: `🔒 SYSTEM LOCKED — ${remain}s remaining…`, type: "crit" });
            }
          }, 1000);
        }
      }
    }
  }, [loginPw, loginStage, otpDigits, otpExpected, loginFails, loginLocked, showAlert]);

  const handleOtpInput = useCallback((idx, val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[idx] = cleaned;
      return next;
    });
    if (cleaned && idx < 3) otpRefs.current[idx + 1]?.focus();
  }, []);

  const handleOtpKeydown = useCallback((idx, e) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
    if (e.key === "Enter") handleLogin();
  }, [otpDigits, handleLogin]);

  useEffect(() => () => clearInterval(lockTimerRef.current), []);

  /* ── clock ── */
  const [clock, setClock] = useState("--:--:--");
  const [uptime, setUptime] = useState("00:00:00");
  const bootAt = useRef(Date.now());
  useEffect(() => {
    const tick = () => {
      setClock(new Date().toTimeString().slice(0, 8));
      const up = Math.floor((Date.now() - bootAt.current) / 1000);
      const hh = String(Math.floor(up / 3600)).padStart(2, "0");
      const mm = String(Math.floor((up % 3600) / 60)).padStart(2, "0");
      const ss = String(up % 60).padStart(2, "0");
      setUptime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── integrity ring geometry ── */
  const RING_R = 62;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C * (1 - integrity / 100);
  const ringColor = integrity > 66 ? "#00ff9c" : integrity > 33 ? "var(--pop-yellow)" : "var(--pop-pink)";

  /* ── threat colors ── */
  const threatColor = threat === "critical" ? "var(--pop-pink)" : threat === "medium" ? "var(--pop-yellow)" : "#00ff9c";

  return (
    <ModuleShell module={m} howItWorks={HOW_IT_WORKS}
      about="Password entropy quantifies how many guesses an attacker needs: each extra character multiplies the search space by R. Below ~60 bits a password is brute-forceable; above it, infeasible. The cipher pipeline shows symmetric encryption — the same key both scrambles and restores the message. The MFA login enforces minimum entropy plus a one-time code, with lockout after 3 failures — layered defenses real systems use.">

      {/* Alert Banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className={`cyber-alert cyber-alert-${alertMsg.type}`}
          >
            <span>{alertMsg.type === "crit" ? "☠" : alertMsg.type === "ok" ? "✔" : "⚠"}</span>
            <span>{alertMsg.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {reason && (
        <div className="glass-accent" style={{ padding: "12px 18px", marginBottom: 4 }}>
          <span className="mono accent-text" style={{ fontSize: 13 }}>⚠ Routed from Smart Home: {reason}</span>
        </div>
      )}

      {/* Top Status Bar */}
      <div className="cyber-topbar">
        <div className="cyber-brand">
          <div className="cyber-brand-logo">🛡️</div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.5px" }}>CIPHER<span className="accent-text">{"//"}</span>LAB</h3>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "1.5px" }}>CYBERSECURITY · DATA PRIVACY CONTROL CENTER</div>
          </div>
        </div>
        <div className="cyber-pills">
          <div className="cyber-pill"><span className="cyber-dot" style={{ background: "#00ff9c", boxShadow: "0 0 8px #00ff9c" }} /> NODE <b>ONLINE</b></div>
          <div className="cyber-pill"><span className="cyber-dot" style={{ background: threatColor, boxShadow: `0 0 8px ${threatColor}` }} /> THREAT <b style={{ color: threatColor }}>{threat.toUpperCase()}</b></div>
          <div className="cyber-pill">UPTIME <b>{uptime}</b></div>
          <div className="cyber-pill mono" style={{ color: "var(--pop-cyan)" }}>{clock}</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="cyber-grid">

        {/* ── PASSWORD ENTROPY ENGINE ── */}
        <div className="cyber-panel cyber-col-4">
          <div className="cyber-panel-head">
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.8px" }}>🔑 Password Entropy Engine</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "1.5px" }}>E = L · log₂(R)</span>
          </div>
          <label className="cyber-field-label">Test password</label>
          <input className="cyber-input" type="text" value={pw}
            onChange={(e) => { setPw(e.target.value); emitDebug("Cyber", `Password len ${e.target.value.length}`); }}
            placeholder="type a password…" autoComplete="off" spellCheck="false" />
          <div className="cyber-chips">
            {[
              ["lower", "a–z"], ["upper", "A–Z"], ["num", "0–9"], ["sym", "!@#$"]
            ].map(([k, label]) => (
              <span key={k} className={`cyber-chip ${analysis.has[k] ? "on" : ""}`}>{label}</span>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <MetricRow label="Length · L" val={analysis.L} />
            <MetricRow label="Charset · R" val={analysis.R} />
            <MetricRow label="Search space" val={spaceStr(analysis.E)} />
          </div>
          <div className="cyber-entropy-val" style={{ color: strength.color }}>{analysis.E.toFixed(1)} bits</div>
          <div className="cyber-entropy-bar-wrap">
            <div className="cyber-entropy-bar" style={{ width: `${clamp(strength.pct, 0, 100)}%`, background: strength.color }} />
          </div>
          <div className="cyber-strength-label" style={{ color: strength.color }}>
            {analysis.E > 0 ? strength.label : "—"}
          </div>
          <div className="cyber-crack-time">
            Est. crack time @1B guesses/s: <b>{crackTimeStr(analysis.E)}</b>
          </div>
        </div>

        {/* ── BRUTE-FORCE ATTACK SIMULATION ── */}
        <div className="cyber-panel cyber-col-8">
          <div className="cyber-panel-head">
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.8px" }}>💥 Brute-Force Attack Simulation</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "1.5px" }}>LIVE PENETRATION TEST</span>
          </div>
          <div className="cyber-readout-row">
            <ReadoutBox label="Target" val={pw || "(empty)"} big />
            <ReadoutBox label="Attempts" val={fmt(attackCount)} />
            <ReadoutBox label="Guesses / sec" val={fmt(attackRate)} />
            <ReadoutBox label="Progress" val={`${attackProgress}%`} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <button className="cyber-btn cyber-btn-danger" onClick={startAttack} disabled={attackRunning}>▶ Start Attack</button>
            <button className="cyber-btn" onClick={abortAttack} disabled={!attackRunning}>■ Abort</button>
            <button className="cyber-btn cyber-btn-green" onClick={clearTerminal}>⟲ Clear Log</button>
          </div>
          <div className="cyber-terminal" ref={termRef}>
            {terminalLines.map((l) => (
              <div key={l.id} className="cyber-term-line">
                <span className="t-time">[{l.t}]</span> <span className={l.cls}>{l.text}</span>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {verdict && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`cyber-verdict ${verdict === "breached" ? "breached" : "failed"}`}
              >
                {verdict === "breached" ? "⚠ BREACHED" : "✔ ATTACK FAILED"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── ENCRYPTION PIPELINE ── */}
        <div className="cyber-panel cyber-col-6">
          <div className="cyber-panel-head">
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.8px" }}>🔐 Encryption Pipeline</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "1.5px" }}>CAESAR → XOR</span>
          </div>
          <label className="cyber-field-label">Plaintext</label>
          <input className="cyber-input" type="text" value={encInput} onChange={(e) => setEncInput(e.target.value)}
            placeholder="secret message…" autoComplete="off" />
          <div style={{ display: "flex", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <label className="cyber-field-label">Caesar shift · <span className="accent-text">{shift}</span></label>
              <input className="cyber-range" type="range" min="1" max="25" value={shift}
                style={{ "--fill": `${(shift / 25) * 100}%` }}
                onChange={(e) => setShift(parseInt(e.target.value))} />
            </div>
            <div style={{ width: 90 }}>
              <label className="cyber-field-label">XOR key</label>
              <input className="cyber-input" type="text" value={xorKey} maxLength={1}
                onChange={(e) => setXorKey(e.target.value.slice(0, 1) || "K")}
                style={{ textAlign: "center" }} />
            </div>
          </div>
          <div className="cyber-pipe-stages">
            <PipeStage num="1" name="Substitution — Caesar shift" desc="rotate each letter by key" color="var(--pop-cyan)" data={caesarResult || "—"} />
            <div className="cyber-data-flow"><span className="cyber-arrow">▼</span></div>
            <PipeStage num="2" name="Diffusion — XOR transform" desc="byte-level XOR with key" color="var(--pop-purple)" data={xorHex || "—"} />
            <div className="cyber-data-flow"><span className="cyber-arrow">▼</span></div>
            <PipeStage num="✓" name="Ciphertext output (hex)" desc="encrypted payload" color="#00ff9c" data={xorHex || "—"} out />
          </div>
        </div>

        {/* ── SECURE LOGIN + MFA ── */}
        <div className="cyber-panel cyber-col-3">
          <div className="cyber-panel-head">
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.8px" }}>🔓 Secure Login · MFA</span>
          </div>
          <label className="cyber-field-label">Password</label>
          <input className="cyber-input" type="password" value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="enter password" autoComplete="off" />

          <AnimatePresence>
            {loginStage === "otp" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="cyber-field-label" style={{ marginTop: 14 }}>One-Time Code</label>
                <div className="cyber-otp-box">
                  {otpDigits.map((d, i) => (
                    <input key={i} className="cyber-otp-digit" maxLength={1} inputMode="numeric"
                      ref={(el) => { otpRefs.current[i] = el; }}
                      value={d}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeydown(i, e)} />
                  ))}
                </div>
                <div className="cyber-otp-hint">Simulated code sent to device: <b>{otpExpected || "----"}</b></div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className={`cyber-btn cyber-btn-green`} style={{ width: "100%", marginTop: 16 }}
            onClick={handleLogin} disabled={loginBtnDisabled}>
            {loginBtnText}
          </button>

          <div className="cyber-attempts">
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginRight: 4 }}>FAILED:</span>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`cyber-att-dot ${i < loginFails ? "used" : ""}`} />
            ))}
          </div>

          <div className={`cyber-login-msg cyber-login-${loginMsg.type}`}>{loginMsg.text}</div>
        </div>

        {/* ── THREAT DASHBOARD ── */}
        <div className="cyber-panel cyber-col-3">
          <div className="cyber-panel-head">
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.8px" }}>📡 Threat Dashboard</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "1.5px" }}>REAL-TIME</span>
          </div>
          <div className="cyber-dash-grid">
            <div className="cyber-dash-card">
              <div className="cyber-dc-label">Threat Level</div>
              <div className={`cyber-dc-val threat-${threat}`}>{threat.toUpperCase()}</div>
            </div>
            <div className="cyber-dash-card">
              <div className="cyber-dc-label">Encryption</div>
              <div className="cyber-dc-val" style={{ color: "#00ff9c", fontSize: 20 }}>
                {encInput ? "SECURED" : "IDLE"}
              </div>
            </div>
          </div>
          <div className="cyber-dash-card" style={{ marginTop: 14 }}>
            <div className="cyber-dc-label" style={{ textAlign: "center" }}>System Integrity</div>
            <div className="cyber-integrity-ring">
              <svg className="cyber-ring-svg" width="150" height="150" viewBox="0 0 150 150">
                <circle className="cyber-ring-bg" cx="75" cy="75" r={RING_R} strokeWidth={11} />
                <circle className="cyber-ring-fg" cx="75" cy="75" r={RING_R} strokeWidth={11}
                  strokeDasharray={RING_C} strokeDashoffset={ringOffset}
                  style={{ stroke: ringColor, transition: "stroke-dashoffset 0.6s cubic-bezier(.2,.8,.2,1), stroke 0.4s" }} />
              </svg>
              <div className="cyber-ring-label">
                <div className="cyber-rl-pct" style={{ color: ringColor }}>{integrity}%</div>
                <div className="cyber-rl-txt">INTEGRITY</div>
              </div>
            </div>
          </div>
          <div className="cyber-dash-card" style={{ marginTop: 14 }}>
            <div className="cyber-dc-label">Last Attack Result</div>
            <div className="cyber-dc-val" style={{ color: lastAttackColor, fontSize: 15 }}>{lastAttack}</div>
          </div>
        </div>
      </div>

      {/* About note */}
      <div className="cyber-about-note">
        <b className="accent-text">How this lab works.</b> Password <b>entropy</b> — <span className="mono">E = L × log₂(R)</span> — measures the number of guesses an attacker needs; each bit doubles the search space, and below ~60 bits a password is realistically brute-forceable. The <b>attack simulator</b> models a guessing engine whose success depends on that entropy. The <b>encryption pipeline</b> demonstrates symmetric ciphers: a Caesar substitution followed by an XOR diffusion, both reversible with the same key. The <b>login + MFA</b> flow enforces a minimum entropy, a one-time code, and a lockout after 3 failures — the layered defenses real systems use. Everything runs client-side; no data leaves your browser.
      </div>
    </ModuleShell>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function MetricRow({ label, val }) {
  return (
    <div className="cyber-metric-row">
      <span>{label}</span>
      <b className="accent-text">{val}</b>
    </div>
  );
}

function ReadoutBox({ label, val, big }) {
  return (
    <div className="cyber-readout-box">
      <div className="cyber-rb-label">{label}</div>
      <div className="cyber-rb-val" style={big ? { fontSize: 16 } : undefined}>{val}</div>
    </div>
  );
}

function PipeStage({ num, name, desc, color, data, out }) {
  return (
    <div className={`cyber-stage ${out ? "cyber-stage-out" : ""}`}>
      <div className="cyber-stage-head">
        <div className="cyber-stage-num" style={{ background: `${color}22`, color, border: `1px solid ${color}` }}>{num}</div>
        <div>
          <div className="cyber-stage-name">{name}</div>
          <div className="cyber-stage-desc">{desc}</div>
        </div>
      </div>
      <div className="cyber-stage-data" style={{ color }}>{data}</div>
    </div>
  );
}
