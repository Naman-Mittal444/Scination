"use client";

/* Quantum — educational content + parallel-computation visual. Edit freely. */

import { useState } from "react";

export const QUANTUM_YT = "https://www.youtube.com/embed/JhHMJCUmq28";

// Parallel computation visualization: classical (one at a time) vs quantum (all at once)
export function ParallelViz() {
  const [classicalStep, setClassicalStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const combos = ["000", "001", "010", "011", "100", "101", "110", "111"];

  function run() {
    setRunning(true);
    setClassicalStep(0);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      if (i >= 8) { clearInterval(timer); setRunning(false); }
      setClassicalStep(i);
    }, 400);
  }

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Classical: 1 at a time</div>
          <div className="parallel-grid">
            {combos.map((c, i) => (
              <div key={c} className={`pbit ${i === classicalStep ? "active" : "inactive"}`}>{c}</div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 12, marginTop: 6 }} onClick={run} disabled={running}>
            {running ? "Computing…" : "▶ Run sequentially"}
          </button>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Quantum: all at once</div>
          <div className="parallel-grid">
            {combos.map((c) => (<div key={c} className="pbit active">{c}</div>))}
          </div>
          <div style={{ fontSize: 12, color: "var(--pop-cyan)", marginTop: 10 }}>
            3 qubits = 2³ = 8 states in superposition simultaneously
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuantumHowItWorks() {
  return (
    <div>
      <div className="flow-row">
        <span className="flow-node">Superposition</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Entanglement</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Interference</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Measurement</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> A normal bit is either 0 or 1. A qubit can be both at the same
        time (superposition). This lets quantum computers try many answers at once — like checking every path through a
        maze simultaneously instead of one by one.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Advanced:</b> A qubit state |ψ⟩ = α|0⟩ + β|1⟩ with |α|²+|β|²=1 lives on the
        Bloch sphere. Gates are rotations: Hadamard (H) creates superposition, Pauli-X flips, Pauli-Z adds phase.
        Measurement collapses the state per the Born rule (probability |α|² or |β|²). Shor&apos;s algorithm exploits this
        parallelism to factor large numbers exponentially faster than classical computers — threatening RSA encryption.
      </p>
      <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-dim)" }}>
        🌍 Real-world: IBM Quantum, Google Sycamore, drug discovery, cryptography, optimization.
      </p>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-dim)", marginBottom: 6 }}>📺 Quantum computing explained:</p>
        <div className="youtube-embed">
          <iframe src={QUANTUM_YT} loading="lazy" allowFullScreen title="Quantum Computing" />
        </div>
      </div>
    </div>
  );
}
