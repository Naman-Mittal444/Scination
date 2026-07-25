"use client";

import { useState, useEffect, useRef } from "react";

export function emitDebug(module, msg) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ai-debug", { detail: { module, msg, t: Date.now() } }));
  }
}

export default function DebugPanel() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      setLogs((l) => [e.detail, ...l].slice(0, 30));
    };
    window.addEventListener("ai-debug", handler);
    return () => window.removeEventListener("ai-debug", handler);
  }, []);

  useEffect(() => {
    if (open && bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [logs, open]);

  return (
    <div className="debug-panel">
      <button className="debug-toggle" onClick={() => setOpen((v) => !v)} title="Debug Console">
        ⚙ {open ? "Hide" : "Debug"}
      </button>
      {open && (
        <div className="debug-body">
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pop-cyan)", marginBottom: 8 }}>
            System Debug Console
          </div>
          {logs.length === 0 && <div style={{ color: "var(--ink-dim)", fontSize: 12 }}>No events yet. Interact with a module.</div>}
          {logs.map((l, i) => (
            <div key={i} className="debug-line">
              <span style={{ color: "var(--pop-cyan)", marginRight: 6 }}>[{new Date(l.t).toLocaleTimeString()}]</span>
              <span style={{ color: "var(--pop-yellow)", marginRight: 6 }}>{l.module}</span>
              <span style={{ color: "var(--ink-dim)" }}>{l.msg}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
