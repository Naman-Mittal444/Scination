#!/usr/bin/env node

/**
 * Arduino → Next.js bridge for the Water Tank module.
 *
 * Reads water level (0-100) from Arduino serial (HC-SR04 sensor)
 * and POSTs it to the Next.js API every 1.5 seconds.
 *
 * Usage:
 *   node scripts/arduino-bridge.js
 *
 * Environment variables:
 *   SERIAL_PORT  — COM port (default: COM3)
 *   BAUD_RATE    — Serial baud rate (default: 9600)
 *   API_URL      — Next.js API URL (default: http://localhost:3000)
 */

const PORT = process.env.SERIAL_PORT || "COM3";
const BAUD = parseInt(process.env.BAUD_RATE || "9600", 10);
const API_URL = process.env.API_URL || "http://localhost:3000";
const POST_INTERVAL = 1500;

let SerialPort, ReadlineParser;

try {
  SerialPort = (await import("serialport")).SerialPort;
  ReadlineParser = (await import("@serialport/parser-readline")).ReadlineParser;
} catch (err) {
  console.error("[bridge] serialport not installed. Run: npm install serialport @serialport/parser-readline");
  process.exit(1);
}

console.log(`[bridge] Opening ${PORT} @ ${BAUD} baud...`);

const sp = new SerialPort({ path: PORT, baudRate: BAUD });
const parser = sp.pipe(new ReadlineParser({ delimiter: "\n" }));

sp.on("open", () => {
  console.log(`[bridge] Serial port ${PORT} opened. Reading sensor data...`);
});

sp.on("error", (err) => {
  console.error(`[bridge] Serial error: ${err.message}`);
  console.error(`[bridge] Make sure Arduino is connected to ${PORT} and no other program is using the port.`);
});

let lastLevel = null;

parser.on("data", async (line) => {
  const trimmed = line.trim();
  const level = parseFloat(trimmed);

  if (isNaN(level)) {
    console.log(`[bridge] Non-numeric line ignored: "${trimmed}"`);
    return;
  }

  const clamped = Math.max(0, Math.min(100, level));
  lastLevel = clamped;

  try {
    const res = await fetch(`${API_URL}/api/water`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: clamped }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`[bridge] Level: ${clamped.toFixed(1)}% | Motor: ${data.motorOn ? "ON" : "OFF"}`);

      // If motor is off and level is low, or motor is on and level is high,
      // send motor toggle command to Arduino
      if (data.motorOn !== undefined) {
        // TODO: Send serial command to Arduino to control relay
        // sp.write(data.motorOn ? "MOTOR_ON\n" : "MOTOR_OFF\n");
      }
    } else {
      console.error(`[bridge] API returned ${res.status}`);
    }
  } catch (err) {
    console.error(`[bridge] POST failed: ${err.message}`);
    console.error(`[bridge] Is the Next.js dev server running at ${API_URL}?`);
  }
});

sp.on("close", () => {
  console.log("[bridge] Serial port closed.");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n[bridge] Shutting down...");
  sp.close();
  process.exit(0);
});

console.log(`[bridge] Waiting for serial data...`);
console.log(`[bridge] Tip: If you see "Non-numeric line ignored", your Arduino should send plain numbers (e.g., "75.32") followed by a newline.`);
