"use client";

/* ---------------------------------------------------------------------------
   Water Tank — educational content (edit this file to change the lesson text).
   Kept separate from the simulation logic in WaterTank.js for easy editing.
   --------------------------------------------------------------------------- */

import { useState } from "react";

export const WATER_TANK_YT = null;

export function WaterTankHowItWorks() {
  const [mode, setMode] = useState("simple");
  return (
    <div>
      <h4 style={{ fontSize: 15, marginBottom: 12, color: "var(--ink)" }}>1. Ultrasonic Sensing</h4>
      <div className="flow-row">
        <span className="flow-node">HC-SR04 trigger</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Sound wave (40 kHz)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Echo bounce</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Time-of-flight</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> A tiny speaker fires a sound pulse you
        can&apos;t hear. It bounces off the water surface and comes back. The longer it takes,
        the farther the water is from the sensor.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Technical:</b> The HC-SR04 emits a 40 kHz
        ultrasonic burst via its transmitter (T). The receiver (R) captures the echo. Distance
        is calculated as{" "}
        <code style={{ color: "var(--accent)" }}>d = (t × 343) / 2</code> where 343 m/s is the
        speed of sound at 20°C. The factor of 2 accounts for the round trip.
      </p>

      <h4 style={{ fontSize: 15, marginBottom: 12, marginTop: 24, color: "var(--ink)" }}>2. Water Level Calculation</h4>
      <div className="flow-row">
        <span className="flow-node">Distance d (cm)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">H − d</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">(H − d) / H</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Level %</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> We know how tall the tank is (H).
        We measure how far the water surface is from the top (d). The water fills H minus d,
        so we divide by H to get a percentage.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Technical:</b>{" "}
        <code style={{ color: "var(--accent)" }}>Level% = ((H − d) / H) × 100</code>.
        For a 30 cm tank with d = 9 cm: ((30 − 9) / 30) × 100 = 70%. The Arduino
        runs this calculation and sends the percentage to the Node.js bridge.
      </p>

      <h4 style={{ fontSize: 15, marginBottom: 12, marginTop: 24, color: "var(--ink)" }}>3. Real-Time Streaming</h4>
      <div className="flow-row">
        <span className="flow-node">Arduino (Serial)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Node.js Bridge</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">POST /api/water</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Dashboard (poll 1.5s)</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> A small program on your computer reads
        the sensor value from the Arduino every 1.5 seconds and tells this dashboard.
        The 3D tank updates live.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Technical:</b> The <code style={{ color: "var(--accent)" }}>serialport</code> npm
        package opens the COM3 port at 9600 baud. A readline parser splits incoming bytes on
        newlines. Each line is parsed as a float (0–100) and POSTed to{" "}
        <code style={{ color: "var(--accent)" }}>/api/water</code>. The Next.js API route stores
        the reading in memory (last 50 data points). The frontend polls{" "}
        <code style={{ color: "var(--accent)" }}>GET /api/water</code> every 1.5 seconds to
        update the 3D scene and graph.
      </p>

      <h4 style={{ fontSize: 15, marginBottom: 12, marginTop: 24, color: "var(--ink)" }}>4. Motor Control</h4>
      <div className="flow-row">
        <span className="flow-node">Dashboard toggle</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">POST /api/water/motor</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Bridge polls status</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Arduino HIGH/LOW pin</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> You can turn a water pump on or off from
        the dashboard. The pump is connected to the Arduino via a relay module.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Technical:</b> Motor state is stored server-side in
        the API. The bridge script polls <code style={{ color: "var(--accent)" }}>GET /api/water/motor</code>{" "}
        and sends a serial command to the Arduino. The Arduino drives a digital pin HIGH/LOW
        to switch a relay, which controls the 12V pump. When the water reaches 95%, the system
        auto-stops the motor to prevent overflow.
      </p>

      <h4 style={{ fontSize: 15, marginBottom: 12, marginTop: 24, color: "var(--ink)" }}>5. Alerts &amp; Thresholds</h4>
      <div className="flow-row">
        <span className="flow-node">Level reading</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">&lt; 20% ?</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Low water alert</span>
      </div>
      <div className="flow-row" style={{ marginTop: 8 }}>
        <span className="flow-node">Level reading</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">&gt; 90% ?</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Overflow warning</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
        The dashboard checks every reading against safe thresholds. Below 20% triggers a low-water
        alert (pump should refill). Above 90% triggers an overflow warning (pump should stop).
        At 95%, the motor auto-shutoff engages as a safety net.
      </p>

      <h4 style={{ fontSize: 15, marginBottom: 12, marginTop: 24, color: "var(--ink)" }}>Demo vs Live Mode</h4>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Demo:</b> The module generates a simulated sine wave
        that fills and empties the tank automatically. No hardware needed — perfect for testing
        the UI and understanding the concept.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Live:</b> Connect the Arduino + HC-SR04 sensor via USB.
        Run <code style={{ color: "var(--accent)" }}>node scripts/arduino-bridge.js</code> in a
        terminal. The dashboard reads real sensor data from your physical tank.
      </p>
    </div>
  );
}
