"use client";

/* Traffic — educational content. Edit freely. */

export const TRAFFIC_YT = "https://www.youtube.com/embed/DP62ogEZgkI";

export function TrafficHowItWorks() {
  return (
    <div>
      <div className="flow-row">
        <span className="flow-node">🚗 Vehicle Sensor</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Priority Calculator</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Signal Controller</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">🚦 Light Actuator</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> Each lane has sensors that count waiting cars. The system gives a
        green light to the lane with the most cars waiting or moving slowest.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Advanced:</b> Priority score P_n = (α × Q_n) + (β / V_avg). Higher queue
        length Q and lower speed V increase priority. Every cycle (4s), the controller re-evaluates and switches to the
        max-priority lane. Yellow transition (500ms) provides safe clearance time. This adaptive algorithm reduces
        average wait times by 20-40% vs fixed timers in real deployments.
      </p>
      <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-dim)" }}>
        🌍 Real-world: Los Angeles ATSAC, London SCOOT, Siemens adaptive traffic systems.
      </p>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-dim)", marginBottom: 6 }}>📺 AI traffic control in action:</p>
        <div className="youtube-embed">
          <iframe src={TRAFFIC_YT} loading="lazy" allowFullScreen title="Traffic AI" />
        </div>
      </div>
    </div>
  );
}
