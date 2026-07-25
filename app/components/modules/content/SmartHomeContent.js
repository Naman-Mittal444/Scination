"use client";

/* ---------------------------------------------------------------------------
   SmartHome — educational content (edit this file to change the lesson text).
   Kept separate from the simulation logic in SmartHome.js for easy editing.
   --------------------------------------------------------------------------- */

import { useState } from "react";

export const SMART_HOME_YT = "https://www.youtube.com/embed/Vr8U4beyZp4";

export function SmartHomeHowItWorks() {
  const [mode, setMode] = useState("simple");
  return (
    <div>
      <h4 style={{ fontSize: 15, marginBottom: 12, color: "var(--ink)" }}>1. Adaptive Lighting</h4>
      <div className="flow-row">
        <span className="flow-node">Sensor (Eₓ)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">μ preference</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">L_out = μ(I_L − Eₓ)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Lamp output</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> The house reads how bright it is outside and adjusts your
        lamp so you get exactly the light you need — no more, no less. Saving energy automatically.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Advanced:</b> The light attenuation model L_out = max(0, μ × (I_L − E_x))
        ensures the lamp only outputs what ambient conditions require. Each room has independent brightness control,
        and preset scenes (Sleep, Movie, Morning, Party) adjust all rooms at once.
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>2. Voice + AI Intent Engine</h4>
      <div className="flow-row">
        <span className="flow-node">Voice / Text</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Intent Parser</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Action</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Device Response</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        AURA (Adaptive User Response Assistant) parses natural language into intents. Saying &quot;I&apos;m sleepy&quot;
        triggers a sleep scene; &quot;movie time&quot; dims the living room. The regex-based intent classifier maps
        phrases to device commands with confidence scoring.
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>3. Security System</h4>
      <div className="flow-row">
        <span className="flow-node">PIN Entry</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Validate</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">3 failures</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Escalate to Cybersecurity</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        Defence-in-depth: the smart lock validates a 4-digit PIN. After 3 failed attempts, an intruder alarm triggers
        and the system escalates to the Cybersecurity module for stronger authentication — exactly how real security
        systems layer their defences.
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>4. AI Dashboard + AURA Chatbot</h4>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        The dashboard shows real-time energy usage, active devices, command history, and an efficiency score.
        AURA is a conversational chatbot that responds to natural questions about your home status, energy usage,
        and available commands.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 16, marginBottom: 8 }}>
        <button className={`btn ${mode === "simple" ? "" : "btn-ghost"}`} style={{ fontSize: 12 }} onClick={() => setMode("simple")}>Simple</button>
        <button className={`btn ${mode === "advanced" ? "" : "btn-ghost"}`} style={{ fontSize: 12 }} onClick={() => setMode("advanced")}>Advanced</button>
      </div>

      {mode === "advanced" && (
        <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
          The voice pipeline uses the Web Speech API for ASR (Automatic Speech Recognition), feeding transcribed text
          into a regex/NLP intent classifier. Room states are managed as a React context, with Framer Motion handling
          smooth light transitions. The security interlock uses a state machine: ARMED → PIN_VALIDATING → LOCKED_OUT
          → ESCALATED, each state triggering appropriate UI feedback and audio cues.
        </p>
      )}

      <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-dim)" }}>
        Real-world: Google Nest, Amazon Echo, Apple HomeKit all use the same sensor → NLP → actuator pipeline.
      </p>

      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-dim)", marginBottom: 6 }}>See a real smart home AI in action:</p>
        <div className="youtube-embed">
          <iframe src={SMART_HOME_YT} loading="lazy" allowFullScreen title="Smart Home AI" />
        </div>
      </div>
    </div>
  );
}
