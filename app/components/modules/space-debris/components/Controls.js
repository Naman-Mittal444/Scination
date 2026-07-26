/**
 * Controls — Simulation controls + full debris dossier panel.
 */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ORBIT_BANDS } from "../utils/orbital";

const OBJECT_TYPE_STYLES = {
  "Fragment":      { bg: "rgba(255,77,77,0.12)",  border: "rgba(255,77,77,0.3)",   color: "#ff4d4d" },
  "Payload":       { bg: "rgba(55,226,213,0.12)", border: "rgba(55,226,213,0.3)",  color: "#37e2d5" },
  "Rocket Body":   { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)",  color: "#a855f7" },
};

const RISK_COLORS = {
  high:   "#ff4d4d",
  medium: "#ffd93d",
  low:    "#00ff9c",
};

function DetailRow({ label, value, color }) {
  return (
    <div className="sd-detail-row">
      <span className="sd-detail-label">{label}</span>
      <span className="sd-detail-value" style={{ color: color || "var(--ink)" }}>{value}</span>
    </div>
  );
}

function RiskBar({ score, level }) {
  const col = RISK_COLORS[level] || "#fff";
  return (
    <div style={{ marginTop: 2 }}>
      <div className="sd-detail-risk-track">
        <motion.div
          className="sd-detail-risk-fill"
          initial={{ width: 0 }}
          animate={{ width: `${score * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${col}80, ${col})`, boxShadow: `0 0 8px ${col}50` }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <span style={{ fontSize: 8, fontFamily: "ui-monospace, monospace", color: col, fontWeight: 700 }}>
          {(score * 100).toFixed(0)}%
        </span>
        <span style={{ fontSize: 8, fontFamily: "ui-monospace, monospace", color: col, letterSpacing: 0.5 }}>
          {level.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function LifetimeIndicator({ years }) {
  const display = years >= 100 ? `${Math.round(years)}+ yr` : `${years} yr`;
  const urgency = years < 5 ? "#ff4d4d" : years < 30 ? "#ffd93d" : "#00ff9c";
  return (
    <div className="sd-detail-lifetime">
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ opacity: 0.7 }}>
        <circle cx="7" cy="7" r="6" fill="none" stroke={urgency} strokeWidth="1" />
        <line x1="7" y1="3" x2="7" y2="7" stroke={urgency} strokeWidth="1" strokeLinecap="round" />
        <line x1="7" y1="7" x2="10" y2="9" stroke={urgency} strokeWidth="1" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 9, fontFamily: "ui-monospace, monospace", color: urgency }}>
        {display}
      </span>
    </div>
  );
}

export function Controls({
  speed, setSpeed,
  isRunning, setIsRunning,
  objects, setDebrisCount,
  addDebris,
  selectedObject, selectObject,
}) {
  const band = selectedObject ? ORBIT_BANDS[selectedObject.orbitBand] : null;
  const typeStyle = selectedObject ? OBJECT_TYPE_STYLES[selectedObject.objectType] || OBJECT_TYPE_STYLES["Fragment"] : null;

  return (
    <div className="sd-panel">
      <div className="sd-panel-header">
        <span className="sd-dot" style={{ background: "#a855f7" }} />
        <span>SIMULATION CONTROL</span>
      </div>

      {/* Play/Pause */}
      <div style={{ marginBottom: 14 }}>
        <button
          className="sd-btn"
          onClick={() => setIsRunning(!isRunning)}
          style={{
            width: "100%", padding: "10px 12px",
            background: isRunning ? "rgba(255,77,77,0.08)" : "rgba(0,255,156,0.08)",
            borderColor: isRunning ? "rgba(255,77,77,0.25)" : "rgba(0,255,156,0.25)",
            color: isRunning ? "#ff4d4d" : "#00ff9c",
          }}
        >
          <span style={{ marginRight: 6 }}>{isRunning ? "\u23F8" : "\u25B6"}</span>
          {isRunning ? "PAUSE SIMULATION" : "RESUME SIMULATION"}
        </button>
      </div>

      {/* Speed control */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", letterSpacing: 1 }}>
            SPEED
          </span>
          <span style={{
            fontSize: 12, fontFamily: "ui-monospace, monospace", color: "#ffd93d",
            background: "rgba(255,217,61,0.08)", padding: "1px 8px", borderRadius: 4,
          }}>
            {speed.toFixed(1)}x
          </span>
        </div>
        <input
          type="range" className="sd-range" min="0.1" max="5" step="0.1"
          value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace" }}>
          <span>0.1x</span><span>5.0x</span>
        </div>
      </div>

      {/* Debris count */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", letterSpacing: 1 }}>
            OBJECTS
          </span>
          <span style={{
            fontSize: 12, fontFamily: "ui-monospace, monospace", color: "#37e2d5",
            background: "rgba(55,226,213,0.08)", padding: "1px 8px", borderRadius: 4,
          }}>
            {objects.length}
          </span>
        </div>
        <input
          type="range" className="sd-range" min="10" max="300" step="10"
          value={objects.length} onChange={(e) => setDebrisCount(parseInt(e.target.value))}
        />
      </div>

      {/* Kessler event button */}
      <div style={{ marginBottom: 14 }}>
        <button
          className="sd-btn"
          onClick={() => addDebris(25)}
          style={{
            width: "100%",
            background: "rgba(255,77,77,0.06)", borderColor: "rgba(255,77,77,0.18)", color: "#ff4d4d",
          }}
        >
          <span style={{ marginRight: 4 }}>&#9889;</span>KESSLER EVENT (+25)
        </button>
        <div style={{ fontSize: 9, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", marginTop: 4, textAlign: "center" }}>
          Simulates a fragmentation event
        </div>
      </div>

      {/* ═══════ SELECTED OBJECT DOSSIER ═══════ */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            key={selectedObject.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="sd-detail-card"
            style={{ borderColor: `${selectedObject.sourceColor}30` }}
          >
            {/* Scanline overlay */}
            <div className="sd-detail-scanlines" />

            {/* Header */}
            <div className="sd-detail-header">
              <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                <span className="sd-dot" style={{ background: selectedObject.sourceColor, boxShadow: `0 0 6px ${selectedObject.sourceColor}80` }} />
                <span className="sd-detail-name" style={{ color: selectedObject.sourceColor }}>
                  {selectedObject.name}
                </span>
              </div>
              <button
                onClick={() => selectObject(null)}
                className="sd-detail-close"
                aria-label="Close details"
              >
                &times;
              </button>
            </div>

            {/* Country + Launch Year */}
            <div className="sd-detail-subtitle">
              <span>{selectedObject.countryFlag}</span>
              <span>{selectedObject.country}</span>
              <span className="sd-detail-sep">&middot;</span>
              <span>Launched {selectedObject.launchYear}</span>
            </div>

            {/* Object type badge + orbit band */}
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
              {typeStyle && (
                <span className="sd-detail-badge" style={{ background: typeStyle.bg, borderColor: typeStyle.border, color: typeStyle.color }}>
                  {selectedObject.objectType}
                </span>
              )}
              {band && (
                <span className="sd-detail-badge" style={{ background: `${band.color}15`, borderColor: `${band.color}30`, color: band.color }}>
                  {selectedObject.orbitBand}
                </span>
              )}
            </div>

            {/* Mission info */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">MISSION</div>
              <div className="sd-detail-mission">{selectedObject.mission}</div>
              <div className="sd-detail-mission-type">{selectedObject.missionType}</div>
            </div>

            {/* Event description */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">DEBRIS EVENT</div>
              <div className="sd-detail-event">{selectedObject.eventDescription}</div>
            </div>

            {/* Orbital parameters */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">ORBITAL PARAMETERS</div>
              <div className="sd-detail-grid">
                <DetailRow label="ALTITUDE" value={`${selectedObject.altitude.toFixed(0)} km`} />
                <DetailRow label="INCLINATION" value={`${(selectedObject.inclination * 180 / Math.PI).toFixed(1)}\u00B0`} />
                <DetailRow label="ECCENTRICITY" value={selectedObject.eccentricity.toFixed(4)} />
                <DetailRow label="RAAN" value={`${(selectedObject.raan * 180 / Math.PI).toFixed(1)}\u00B0`} />
              </div>
            </div>

            {/* Risk assessment */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">COLLISION RISK</div>
              <RiskBar score={selectedObject.riskScore} level={selectedObject.riskLevel} />
            </div>

            {/* Physical properties */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">PHYSICAL PROPERTIES</div>
              <div className="sd-detail-grid">
                <DetailRow label="MASS" value={`${selectedObject.massKg} kg`} />
                <DetailRow label="SIZE" value={`${selectedObject.sizeCm} cm`} />
              </div>
            </div>

            {/* Lifetime estimate */}
            <div className="sd-detail-section">
              <div className="sd-detail-section-label">ESTIMATED LIFETIME</div>
              <LifetimeIndicator years={selectedObject.lifetimeYears} />
            </div>

            {/* Footer */}
            <div className="sd-detail-footer">
              <span>{selectedObject.source}</span>
              <span className="sd-detail-sep">&middot;</span>
              <span style={{ color: selectedObject.sourceColor }}>Event {selectedObject.eventYear}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
