"use client";

import { createContext, useContext, useReducer, useCallback } from "react";

const DeviceContext = createContext(null);

const INITIAL = {
  lightsOn: true,
  brightness: 70,
  acOn: false,
  temperature: 24,
  fanOn: false,
  fanSpeed: 2,
  tvOn: false,
  tvVolume: 40,
  doorLocked: true,
  doorFails: 0,
  faceScanned: false,
  faceConfidence: 0,
  activeScene: null,
  lastCommand: null,
  commandHistory: [],

  // Cybersecurity interlock
  unlockFails: 0,
  lockdown: false,
  lockdownReason: "",

  // Activity log
  activityLog: [],

  // Alerts
  alerts: [],

  // Energy history (last 12 readings)
  energyHistory: [],

  // Custom devices
  customDevices: [],
};

function logActivity(state, msg, type = "info") {
  const entry = { msg, type, ts: Date.now() };
  return [entry, ...state.activityLog].slice(0, 50);
}

function addAlert(state, msg, severity = "warn") {
  const entry = { msg, severity, ts: Date.now(), id: Date.now() + Math.random() };
  return [entry, ...state.alerts].slice(0, 10);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case "lights_on": return { ...state, lightsOn: true, brightness: state.brightness || 70, activityLog: logActivity(state, "Lights turned ON") };
    case "lights_off": return { ...state, lightsOn: false, activityLog: logActivity(state, "Lights turned OFF") };
    case "brightness_set": return { ...state, lightsOn: payload > 0, brightness: payload };
    case "dim": return { ...state, lightsOn: true, brightness: Math.max(5, state.brightness - 25), activityLog: logActivity(state, `Dimmed to ${Math.max(5, state.brightness - 25)}%`) };
    case "brighten": return { ...state, lightsOn: true, brightness: Math.min(100, state.brightness + 25), activityLog: logActivity(state, `Brightened to ${Math.min(100, state.brightness + 25)}%`) };

    case "ac_on": return { ...state, acOn: true, activityLog: logActivity(state, "AC turned ON") };
    case "ac_off": return { ...state, acOn: false, activityLog: logActivity(state, "AC turned OFF") };
    case "temp_set": return { ...state, acOn: true, temperature: Math.max(16, Math.min(32, payload)), activityLog: logActivity(state, `Temperature set to ${payload}°C`) };
    case "temp_up": return { ...state, acOn: true, temperature: Math.min(32, state.temperature + 1), activityLog: logActivity(state, `Temperature increased to ${Math.min(32, state.temperature + 1)}°C`) };
    case "temp_down": return { ...state, acOn: true, temperature: Math.max(16, state.temperature - 1), activityLog: logActivity(state, `Temperature decreased to ${Math.max(16, state.temperature - 1)}°C`) };

    case "fan_on": return { ...state, fanOn: true, fanSpeed: state.fanSpeed || 2, activityLog: logActivity(state, "Fan turned ON") };
    case "fan_off": return { ...state, fanOn: false, activityLog: logActivity(state, "Fan turned OFF") };
    case "fan_set": return { ...state, fanOn: true, fanSpeed: Math.max(1, Math.min(5, payload)), activityLog: logActivity(state, `Fan speed set to ${payload}`) };
    case "fan_up": return { ...state, fanOn: true, fanSpeed: Math.min(5, state.fanSpeed + 1), activityLog: logActivity(state, `Fan speed up to ${Math.min(5, state.fanSpeed + 1)}`) };
    case "fan_down": return { ...state, fanSpeed: Math.max(1, state.fanSpeed - 1), fanOn: state.fanSpeed > 1, activityLog: logActivity(state, `Fan speed down to ${Math.max(1, state.fanSpeed - 1)}`) };

    case "tv_on": return { ...state, tvOn: true, activityLog: logActivity(state, "TV turned ON") };
    case "tv_off": return { ...state, tvOn: false, activityLog: logActivity(state, "TV turned OFF") };
    case "vol_set": return { ...state, tvOn: true, tvVolume: Math.max(0, Math.min(100, payload)) };
    case "vol_up": return { ...state, tvOn: true, tvVolume: Math.min(100, state.tvVolume + 10), activityLog: logActivity(state, `Volume up to ${Math.min(100, state.tvVolume + 10)}%`) };
    case "vol_down": return { ...state, tvVolume: Math.max(0, state.tvVolume - 10), tvOn: state.tvVolume > 10, activityLog: logActivity(state, `Volume down to ${Math.max(0, state.tvVolume - 10)}%`) };

    case "lock": return { ...state, doorLocked: true, doorFails: 0, activityLog: logActivity(state, "Door LOCKED", "security") };
    case "unlock": return { ...state, doorLocked: false, doorFails: 0, unlockFails: 0, activityLog: logActivity(state, "Door UNLOCKED", "security") };
    case "unlock_fail": {
      const newFails = state.unlockFails + 1;
      const isLockdown = newFails >= 3;
      return {
        ...state,
        doorFails: state.doorFails + 1,
        unlockFails: newFails,
        lockdown: isLockdown,
        lockdownReason: isLockdown ? "3 failed unlock attempts — system locked" : state.lockdownReason,
        activityLog: logActivity(state, `Unlock attempt FAILED (${newFails}/3)`, "security"),
        alerts: isLockdown ? addAlert(state, "LOCKDOWN: 3 failed door unlock attempts — redirecting to Cybersecurity", "critical") : state.alerts,
      };
    }

    case "face_scan": return { ...state, faceScanned: true, faceConfidence: payload || 94, activityLog: logActivity(state, `Face scan: ${payload || 94}% confidence`, "biometric") };

    case "fingerprint_scan": return { ...state, activityLog: logActivity(state, `Fingerprint scan: ${payload || "matched"}`, "biometric") };

    // Scenes
    case "scene_sleep": return { ...state, lightsOn: true, brightness: 10, acOn: false, fanOn: false, tvOn: false, doorLocked: true, activeScene: "sleep", activityLog: logActivity(state, "Scene: SLEEP activated", "scene") };
    case "scene_movie": return { ...state, lightsOn: true, brightness: 5, acOn: true, temperature: 23, fanOn: false, tvOn: true, tvVolume: 50, activeScene: "movie", activityLog: logActivity(state, "Scene: MOVIE activated", "scene") };
    case "scene_morning": return { ...state, lightsOn: true, brightness: 100, acOn: false, fanOn: true, fanSpeed: 2, tvOn: false, activeScene: "morning", activityLog: logActivity(state, "Scene: MORNING activated", "scene") };
    case "scene_party": return { ...state, lightsOn: true, brightness: 100, acOn: true, temperature: 22, fanOn: true, fanSpeed: 4, tvOn: true, tvVolume: 70, activeScene: "party", activityLog: logActivity(state, "Scene: PARTY activated", "scene") };
    case "scene_work": return { ...state, lightsOn: true, brightness: 90, acOn: true, temperature: 23, fanOn: true, fanSpeed: 2, tvOn: false, activeScene: "work", activityLog: logActivity(state, "Scene: WORK activated", "scene") };
    case "scene_off": return { ...INITIAL, activeScene: "off", activityLog: logActivity(state, "ALL DEVICES OFF", "scene"), energyHistory: state.energyHistory, customDevices: state.customDevices };
    case "scene_eco": return { ...state, lightsOn: true, brightness: 30, acOn: false, fanOn: false, tvOn: false, activeScene: "eco", activityLog: logActivity(state, "Scene: ECO activated", "scene") };

    // Smart modes
    case "mode_away": return {
      ...state,
      lightsOn: false, acOn: false, fanOn: false, tvOn: false,
      doorLocked: true, activeScene: "away",
      activityLog: logActivity(state, "AWAY MODE: All devices off, door locked", "mode"),
      alerts: addAlert(state, "Away mode activated — all devices secured", "info"),
    };
    case "mode_come_back": return {
      ...state,
      lightsOn: true, brightness: 70, acOn: true, temperature: 24,
      fanOn: true, fanSpeed: 2, doorLocked: false, activeScene: "back",
      activityLog: logActivity(state, "I'M BACK: Lights on, AC on, door unlocked", "mode"),
    };
    case "close_house": return {
      ...state,
      lightsOn: false, acOn: false, fanOn: false, tvOn: false,
      doorLocked: true, activeScene: "closed",
      activityLog: logActivity(state, "HOUSE CLOSED: Everything off, door locked", "mode"),
      alerts: addAlert(state, "House secured — all systems shut down", "info"),
    };

    // Energy snapshot
    case "energy_snapshot": {
      const h = [...state.energyHistory, { w: payload, ts: Date.now() }].slice(-12);
      return { ...state, energyHistory: h };
    }

    // Custom device
    case "add_device": {
      const dev = { id: `custom_${Date.now()}`, ...payload, on: false };
      return { ...state, customDevices: [...state.customDevices, dev], activityLog: logActivity(state, `Device added: ${dev.name} (${dev.room})`, "system") };
    }
    case "toggle_device": {
      const devs = state.customDevices.map((d) => d.id === payload ? { ...d, on: !d.on } : d);
      const dev = devs.find((d) => d.id === payload);
      return { ...state, customDevices: devs, activityLog: logActivity(state, `${dev?.name || "Device"} toggled ${dev?.on ? "ON" : "OFF"}`, "system") };
    }
    case "remove_device": {
      return { ...state, customDevices: state.customDevices.filter((d) => d.id !== payload), activityLog: logActivity(state, "Device removed", "system") };
    }

    // Alerts
    case "dismiss_alert": return { ...state, alerts: state.alerts.filter((a) => a.id !== payload) };
    case "clear_alerts": return { ...state, alerts: [] };

    // Lockdown control
    case "clear_lockdown": return { ...state, lockdown: false, lockdownReason: "", unlockFails: 0, activityLog: logActivity(state, "Lockdown cleared", "security") };

    case "log_command":
      return {
        ...state,
        lastCommand: payload,
        commandHistory: [payload, ...state.commandHistory].slice(0, 20),
      };

    default: return state;
  }
}

export function DeviceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const exec = useCallback((action, value) => {
    dispatch({ type: action, payload: value });
  }, []);

  const getState = useCallback(() => state, [state]);

  return (
    <DeviceContext.Provider value={{ state, dispatch, exec, getState }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevices must be inside DeviceProvider");
  return ctx;
}

export function calcEnergyW(s) {
  let w = 5; // standby
  if (s.lightsOn) w += Math.round(s.brightness * 0.6);
  if (s.acOn) {
    if (s.temperature <= 24) {
      w += Math.round(100 - (s.temperature - 16) * 8);
    } else {
      w += Math.round(36 + (s.temperature - 24) * 6);
    }
  }
  if (s.fanOn) w += s.fanSpeed * 15;
  if (s.tvOn) w += 120 + s.tvVolume;
  if (s.customDevices) {
    s.customDevices.forEach((d) => { if (d.on) w += 30; });
  }
  return w;
}
