/**
 * Dashboard — Stats with risk sparkline, source breakdown, orbit bands, and proximity alerts.
 */
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ORBIT_BANDS } from "../utils/orbital";

export function Dashboard({ objects, density, densityColor, tick, proximityCount, proximityIds }) {
  const debrisByRisk = {
    high: objects.filter(o => o.riskLevel === "high").length,
    medium: objects.filter(o => o.riskLevel === "medium").length,
    low: objects.filter(o => o.riskLevel === "low").length,
  };

  const debrisBySource = useMemo(() => {
    const map = {};
    objects.forEach(o => { map[o.source] = (map[o.source] || 0) + 1; });
    return map;
  }, [objects]);

  const debrisByBand = useMemo(() => {
    const map = { LEO: 0, MEO: 0, GEO: 0 };
    objects.forEach(o => { map[o.orbitBand] = (map[o.orbitBand] || 0) + 1; });
    return map;
  }, [objects]);

  const debrisByType = useMemo(() => {
    const map = {};
    objects.forEach(o => { map[o.objectType] = (map[o.objectType] || 0) + 1; });
    return map;
  }, [objects]);

  const sourceColors = {
    "COSMOS 1408": "#ff4d4d",
    "FENGYUN 1C": "#ff8a3d",
    "IRIDIUM 33": "#ffd93d",
    "COSMOS 2251": "#a855f7",
  };

  const typeColors = {
    "Fragment": "#ff4d4d",
    "Payload": "#37e2d5",
    "Rocket Body": "#a855f7",
  };

  const total = Math.max(1, objects.length);

  return (
    <div className="sd-panel">
      <div className="sd-panel-header">
        <span className="sd-dot" style={{ background: "#00ff9c" }} />
        <span>ACTIVE DEBRIS TRACKING</span>
      </div>

      {/* Total count */}
      <div style={{ textAlign: "center", padding: "10px 0 8px" }}>
        <div style={{
          fontSize: 40, fontWeight: 700, fontFamily: "ui-monospace, monospace",
          color: "#fff", lineHeight: 1, letterSpacing: -1,
          textShadow: "0 0 20px rgba(55,226,213,0.3)",
        }}>
          {objects.length}
        </div>
        <div style={{ fontSize: 10, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace", letterSpacing: 1, marginTop: 4 }}>
          TRACKED OBJECTS
        </div>
      </div>

      {/* Density badge */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: "8px 16px", borderRadius: 8,
        background: `${densityColor}10`, border: `1px solid ${densityColor}30`,
        marginBottom: 14,
      }}>
        <span className="sd-dot" style={{ background: densityColor, boxShadow: `0 0 8px ${densityColor}60` }} />
        <span style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: densityColor, fontWeight: 600 }}>
          {density.toUpperCase()} DENSITY
        </span>
      </div>

      {/* Proximity alert */}
      {proximityCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "8px 16px", borderRadius: 8, marginBottom: 14,
            background: "rgba(255,77,77,0.08)", border: "1px solid rgba(255,77,77,0.25)",
          }}
        >
          <span className="sd-dot" style={{ background: "#ff4d4d", animation: "blink 0.8s infinite" }} />
          <span style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#ff4d4d", fontWeight: 600 }}>
            {proximityCount} COLLISION ALERT{proximityCount > 1 ? "S" : ""}
          </span>
        </motion.div>
      )}

      {/* Risk breakdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace", letterSpacing: 1, marginBottom: 8 }}>
          RISK ASSESSMENT
        </div>
        {[
          { label: "HIGH", count: debrisByRisk.high, color: "#ff4d4d" },
          { label: "MEDIUM", count: debrisByRisk.medium, color: "#ffd93d" },
          { label: "LOW", count: debrisByRisk.low, color: "#00ff9c" },
        ].map(r => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: r.color, boxShadow: `0 0 4px ${r.color}50` }} />
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", width: 48 }}>{r.label}</span>
            <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.count / total) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${r.color}80, ${r.color})`, boxShadow: `0 0 6px ${r.color}40` }}
              />
            </div>
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: r.color, width: 22, textAlign: "right", fontWeight: 600 }}>
              {r.count}
            </span>
          </div>
        ))}
      </div>

      {/* Orbit band breakdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace", letterSpacing: 1, marginBottom: 8 }}>
          ORBIT BANDS
        </div>
        {Object.entries(ORBIT_BANDS).map(([key, band]) => {
          const count = debrisByBand[key] || 0;
          return (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 2, background: band.color, boxShadow: `0 0 4px ${band.color}50` }} />
              <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", width: 32 }}>{key}</span>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / total) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${band.color}80, ${band.color})` }}
                />
              </div>
              <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: band.color, width: 22, textAlign: "right", fontWeight: 600 }}>
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Object type breakdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace", letterSpacing: 1, marginBottom: 8 }}>
          OBJECT TYPES
        </div>
        {Object.entries(debrisByType)
          .sort((a, b) => b[1] - a[1])
          .map(([type, count]) => (
          <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3, padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: typeColors[type] || "#fff" }}>{type}</span>
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", background: "rgba(255,255,255,0.04)", padding: "1px 6px", borderRadius: 4 }}>{count}</span>
          </div>
        ))}
      </div>

      {/* Source breakdown */}
      <div>
        <div style={{ fontSize: 9, color: "var(--ink-dim)", fontFamily: "ui-monospace, monospace", letterSpacing: 1, marginBottom: 8 }}>
          DEBRIS SOURCES
        </div>
        {Object.entries(debrisBySource)
          .sort((a, b) => b[1] - a[1])
          .map(([source, count]) => (
          <div key={source} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: sourceColors[source] || "#fff" }}>{source}</span>
            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", background: "rgba(255,255,255,0.04)", padding: "1px 6px", borderRadius: 4 }}>{count}</span>
          </div>
        ))}
      </div>

      {/* Simulation time */}
      <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <span style={{ fontSize: 9, fontFamily: "ui-monospace, monospace", color: "var(--ink-dim)", letterSpacing: 0.5 }}>
          SIM TIME: {Math.floor(tick / 1200)}h {String(Math.floor((tick % 1200) / 20)).padStart(2, "0")}m
        </span>
      </div>
    </div>
  );
}
