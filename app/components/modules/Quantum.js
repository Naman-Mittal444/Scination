"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ModuleShell from "./ModuleShell";
import { MODULE_BY_ID } from "../../lib/modules";

const SIMULATOR_URL = "/bloch-sphere/simulator.html";
const STANDALONE_SIMULATOR = "file:///C:/Users/taniy/pop-portfolio%20-%20Copy/bloch-sphere-simulator/simulator.html";
const STANDALONE_LEARNING = "file:///C:/Users/taniy/pop-portfolio%20-%20Copy/bloch-sphere-simulator/index.html";

const GATES_INFO = [
  { name: "Pauli-X", symbol: "X", axis: "X-axis", angle: "180°", effect: "Bit flip — swaps |0⟩ and |1⟩", matrix: "[[0,1],[1,0]]" },
  { name: "Pauli-Y", symbol: "Y", axis: "Y-axis", angle: "180°", effect: "Bit + phase flip — introduces complex phase", matrix: "[[0,-i],[i,0]]" },
  { name: "Pauli-Z", symbol: "Z", axis: "Z-axis", angle: "180°", effect: "Phase flip — flips sign of |1⟩ component", matrix: "[[1,0],[0,-1]]" },
  { name: "Hadamard", symbol: "H", axis: "X+Z diagonal", angle: "180°", effect: "Creates equal superposition from |0⟩ or |1⟩", matrix: "1/√2 [[1,1],[1,-1]]" },
  { name: "S Gate", symbol: "S", axis: "Z-axis", angle: "90°", effect: "Quarter-turn phase rotation — |+⟩ → |i⟩", matrix: "[[1,0],[0,i]]" },
  { name: "T Gate", symbol: "T", axis: "Z-axis", angle: "45°", effect: "Eighth-turn phase rotation — π/8 gate", matrix: "[[1,0],[0,e^(iπ/4)]]" },
];

const KEY_STATES = [
  { name: "|0⟩", theta: "0°", location: "North pole", desc: "100% chance of measuring 0" },
  { name: "|1⟩", theta: "180°", location: "South pole", desc: "100% chance of measuring 1" },
  { name: "|+⟩", theta: "90°, φ=0°", location: "+X axis equator", desc: "(|0⟩+|1⟩)/√2 — equal superposition" },
  { name: "|−⟩", theta: "90°, φ=180°", location: "−X axis equator", desc: "(|0⟩−|1⟩)/√2 — negative phase" },
  { name: "|i⟩", theta: "90°, φ=90°", location: "+Y axis equator", desc: "(|0⟩+i|1⟩)/√2 — imaginary phase" },
  { name: "|−i⟩", theta: "90°, φ=270°", location: "−Y axis equator", desc: "(|0⟩−i|1⟩)/√2 — negative imaginary" },
];

export default function Quantum() {
  const m = MODULE_BY_ID["quantum"];
  const [activeTab, setActiveTab] = useState("simulator");

  return (
    <ModuleShell module={m} howItWorks={null} about={null}>
      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { id: "simulator", label: "3D Simulator" },
          { id: "learning", label: "Learning Hub" },
          { id: "gates", label: "Quantum Gates" },
          { id: "states", label: "Key States" },
          { id: "math", label: "Mathematics" },
        ].map(tab => (
          <button key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: activeTab === tab.id ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${activeTab === tab.id ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)"}`,
              color: activeTab === tab.id ? "#a855f7" : "var(--ink-dim)",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Simulator Tab */}
      {activeTab === "simulator" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(168,85,247,0.15)" }}>
          <iframe
            src={SIMULATOR_URL}
            title="Bloch Sphere Simulator"
            style={{ width: "100%", height: "70vh", minHeight: 500, border: "none", background: "#0d1117" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />
          <div style={{ padding: "10px 14px", background: "rgba(168,85,247,0.05)", borderTop: "1px solid rgba(168,85,247,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--ink-dim)" }}>
            <span>Powered by             <a href="/bloch-sphere/index.html" target="_blank" rel="noopener noreferrer"
              style={{ color: "#a855f7", textDecoration: "none" }}>Bloch Sphere Simulator</a> (MIT License)</span>
            <a href={STANDALONE_SIMULATOR} target="_blank" rel="noopener noreferrer"
              style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", fontWeight: 600, textDecoration: "none", fontSize: 11, whiteSpace: "nowrap" }}>
              Launch Standalone ↗
            </a>
          </div>
        </motion.div>
      )}

      {/* Learning Hub Tab */}
      {activeTab === "learning" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(168,85,247,0.15)" }}>
          <iframe
            src="/bloch-sphere/index.html"
            title="Quantum Computing Learning Hub"
            style={{ width: "100%", height: "75vh", minHeight: 600, border: "none", background: "#0a0e1a" }}
          />
          <div style={{ padding: "10px 14px", background: "rgba(168,85,247,0.05)", borderTop: "1px solid rgba(168,85,247,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--ink-dim)" }}>
            <span>Interactive learning — qubit fundamentals, circuits, quantum games, history</span>
            <a href={STANDALONE_LEARNING} target="_blank" rel="noopener noreferrer"
              style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", fontWeight: 600, textDecoration: "none", fontSize: 11, whiteSpace: "nowrap" }}>
              Launch Standalone ↗
            </a>
          </div>
        </motion.div>
      )}

      {/* Gates Tab */}
      {activeTab === "gates" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 16 }}>
            Every single-qubit gate is a rotation on the Bloch sphere. The sphere makes abstract quantum operations geometrically intuitive.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
            {GATES_INFO.map(g => (
              <div key={g.symbol} style={{
                padding: 14, borderRadius: 10,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(168,85,247,0.15)", color: "#a855f7", fontFamily: "ui-monospace", fontWeight: 700, fontSize: 14,
                  }}>{g.symbol}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-dim)" }}>Rotation: {g.angle} around {g.axis}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-dim)", marginBottom: 6 }}>{g.effect}</div>
                <div style={{ fontFamily: "ui-monospace", fontSize: 11, color: "#a855f7", opacity: 0.7 }}>{g.matrix}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* States Tab */}
      {activeTab === "states" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 16 }}>
            Key points on the Bloch sphere and their quantum meaning.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
            {KEY_STATES.map(s => (
              <div key={s.name} style={{
                padding: 12, borderRadius: 10,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ fontFamily: "ui-monospace", fontWeight: 700, fontSize: 15, color: "#a855f7", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-dim)", marginBottom: 2 }}>Location: {s.location}</div>
                <div style={{ fontSize: 12, color: "var(--ink-dim)", marginBottom: 2 }}>Angles: θ={s.theta}</div>
                <div style={{ fontSize: 12 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Math Tab */}
      {activeTab === "math" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
            {/* Bloch Sphere Representation */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#a855f7", marginBottom: 10 }}>Bloch Sphere Representation</h4>
              <div style={{ fontFamily: "ui-monospace", fontSize: 13, lineHeight: 2, color: "var(--ink)" }}>
                |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 8, lineHeight: 1.6 }}>
                A qubit state is mapped to a point on the unit sphere using polar angle θ (0° to 180°) and azimuthal angle φ (0° to 360°). The north pole is |0⟩, south pole is |1⟩, and the equator holds equal superpositions.
              </div>
            </div>

            {/* Rotation Operators */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#a855f7", marginBottom: 10 }}>Rotation Operators</h4>
              <div style={{ fontFamily: "ui-monospace", fontSize: 12, lineHeight: 2, color: "var(--ink)" }}>
                <div>Rx(φ) = cos(φ/2)·I − i·sin(φ/2)·σx</div>
                <div>Ry(φ) = cos(φ/2)·I − i·sin(φ/2)·σy</div>
                <div>Rz(φ) = cos(φ/2)·I − i·sin(φ/2)·σz</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 8, lineHeight: 1.6 }}>
                Where σx, σy, σz are the Pauli matrices. Any unitary gate on a single qubit can be decomposed into rotations around the three Cartesian axes.
              </div>
            </div>

            {/* Pauli Matrices */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#a855f7", marginBottom: 10 }}>Pauli Matrices</h4>
              <div style={{ fontFamily: "ui-monospace", fontSize: 12, lineHeight: 2, color: "var(--ink)" }}>
                <div>σx = [[0,1],[1,0]] (bit flip)</div>
                <div>σy = [[0,-i],[i,0]] (bit+phase)</div>
                <div>σz = [[1,0],[0,-1]] (phase flip)</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 8, lineHeight: 1.6 }}>
                The three Pauli matrices are the generators of rotations around the X, Y, and Z axes respectively. They are Hermitian, unitary, and satisfy σi² = I.
              </div>
            </div>

            {/* Bloch Vector */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#a855f7", marginBottom: 10 }}>Bloch Vector Coordinates</h4>
              <div style={{ fontFamily: "ui-monospace", fontSize: 12, lineHeight: 2, color: "var(--ink)" }}>
                <div>x = sin(θ)·cos(φ)</div>
                <div>y = sin(θ)·sin(φ)</div>
                <div>z = cos(θ)</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 8, lineHeight: 1.6 }}>
                The Bloch vector (x, y, z) always has unit length for pure states. Points inside the sphere represent mixed states from decoherence or entanglement.
              </div>
            </div>

            {/* Limitations */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ff4d9d", marginBottom: 10 }}>Limitations</h4>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.6 }}>
                The Bloch sphere only represents single-qubit states. Multi-qubit systems live in higher-dimensional Hilbert spaces with no simple geometric analog. Entangled states cannot be represented on a Bloch sphere — each qubit in an entangled pair lacks a definite individual state. This is why circuit simulators show full state vectors alongside Bloch visualizations.
              </div>
            </div>

            {/* Historical Note */}
            <div style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ffd93d", marginBottom: 10 }}>Named After</h4>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.6 }}>
                The Bloch sphere is named after <strong style={{ color: "var(--ink)" }}>Felix Bloch</strong> (1905–1983), a Swiss-American physicist who pioneered Nuclear Magnetic Resonance (NMR) and shared the 1952 Nobel Prize in Physics. He introduced this geometric representation to depict quantum states of two-level systems in the SU(2) Hilbert space.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </ModuleShell>
  );
}
