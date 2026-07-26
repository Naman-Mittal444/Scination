"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "AI FUTURE LAB";
const SUBTITLE = "Five interactive AI systems — engineered by Naman Mittal";
const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]|/\\";
const SCRAMBLE_SPEED = 35;
const SETTLE_SPEED = 90;

function randomChar() {
  return DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
}

function HudGrid({ visible }) {
  return (
    <motion.div
      className="intro-hud-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.12 : 0 }}
      transition={{ duration: 1.2 }}
    />
  );
}

function CornerBrackets({ visible }) {
  return (
    <>
      {["tl", "tr", "bl", "br"].map((pos) => (
        <motion.div
          key={pos}
          className={`intro-corner intro-corner-${pos}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: visible ? 0.5 : 0, scale: visible ? 1 : 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      ))}
    </>
  );
}

function ScanBeam({ active }) {
  if (!active) return null;
  return (
    <div className="intro-scan-beam">
      <div className="intro-scan-core" />
      <div className="intro-scan-trail" />
    </div>
  );
}

function StaticGrain({ opacity }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;

    function draw() {
      const img = ctx.createImageData(256, 256);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      frameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} className="intro-grain" style={{ opacity }} />
  );
}

function ScreenFlash({ active }) {
  return (
    <motion.div
      className="intro-flash"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? [0, 0.85, 0] : 0 }}
      transition={{ duration: 0.35, times: [0, 0.15, 1] }}
    />
  );
}

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [titleState, setTitleState] = useState(() =>
    TITLE.split("").map((ch) => ({
      target: ch,
      current: ch === " " ? " " : randomChar(),
      locked: false,
    }))
  );
  const [flashActive, setFlashActive] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    const full = "> INITIALIZING SYSTEM";
    let i = 0;
    const id = setInterval(() => {
      if (!mountedRef.current) return clearInterval(id);
      i++;
      setStatusText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setTimeout(() => setPhase(2), 400);
      }
    }, 30);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;
    const intervals = [];
    let lockCount = 0;
    const totalLetters = TITLE.replace(/\s/g, "").length;

    TITLE.split("").forEach((targetChar, idx) => {
      if (targetChar === " ") return;
      const startDelay = idx * 60;

      const scrambleId = setTimeout(() => {
        if (!mountedRef.current) return;
        const fastId = setInterval(() => {
          if (!mountedRef.current) return clearInterval(fastId);
          setTitleState((prev) =>
            prev.map((c, j) => (j === idx && !c.locked ? { ...c, current: randomChar() } : c))
          );
        }, SCRAMBLE_SPEED);
        intervals.push(fastId);

        const settleDelay = 300 + Math.random() * 400;
        const settleId = setTimeout(() => {
          if (!mountedRef.current) return;
          clearInterval(fastId);
          let settleCount = 0;
          const maxSettle = 3 + Math.floor(Math.random() * 3);
          const slowId = setInterval(() => {
            if (!mountedRef.current) return clearInterval(slowId);
            settleCount++;
            if (settleCount >= maxSettle) {
              clearInterval(slowId);
              setTitleState((prev) =>
                prev.map((c, j) => (j === idx ? { ...c, current: targetChar, locked: true } : c))
              );
              lockCount++;
              if (lockCount >= totalLetters) {
                setTimeout(() => setPhase(3), 150);
              }
            } else {
              setTitleState((prev) =>
                prev.map((c, j) => (j === idx && !c.locked ? { ...c, current: randomChar() } : c))
              );
            }
          }, SETTLE_SPEED);
          intervals.push(slowId);
        }, settleDelay);
        intervals.push(settleId);
      }, startDelay);
      intervals.push(scrambleId);
    });

    return () => intervals.forEach(clearInterval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) return;
    setFlashActive(true);
    const t = setTimeout(() => { setFlashActive(false); setPhase(4); }, 400);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 4) return;
    setSubtitleVisible(true);
    const t = setTimeout(() => setPhase(5), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 5) return;
    setExiting(true);
    const t = setTimeout(() => { setGone(true); onComplete?.(); }, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const hudVisible = phase >= 1 && phase <= 4;
  const grainOpacity = phase <= 2 ? 0.06 : phase === 3 ? 0.12 : 0.03;

  if (gone) return null;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.06 : 1, filter: exiting ? "blur(8px)" : "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <StaticGrain opacity={grainOpacity} />
          <HudGrid visible={hudVisible} />
          <CornerBrackets visible={hudVisible} />
          <ScanBeam active={phase === 0} />

          <motion.div
            className="intro-status"
            style={{ minHeight: "1.5em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 && phase <= 4 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {statusText}
            {phase >= 1 && phase < 3 && statusText.length < 22 && <span className="intro-cursor" />}
          </motion.div>

          <h1 className="intro-title" aria-label={TITLE}>
            {titleState.map((c, i) => (
              <motion.span
                key={i}
                className={`intro-char ${c.locked ? "intro-char-locked" : "intro-char-scramble"}`}
                animate={c.locked ? { opacity: 1, y: 0 } : { opacity: [0.4, 0.8, 0.5], y: [0, -1, 1, 0] }}
                transition={c.locked ? { duration: 0.15 } : { duration: 0.15, repeat: Infinity }}
                style={{ color: c.locked ? "#fff" : "var(--accent)" }}
              >
                {c.current === " " ? "\u00A0" : c.current}
              </motion.span>
            ))}
            {phase >= 2 && phase < 3 && titleState.some((c) => !c.locked) && (
              <span className="intro-cursor" style={{ marginLeft: 2 }} />
            )}
          </h1>

          <motion.p
            className="intro-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={subtitleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {SUBTITLE}
          </motion.p>

          <ScreenFlash active={flashActive} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
