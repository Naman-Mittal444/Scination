/* ---------------------------------------------------------------------------
   AURA — Intent Engine v3
   Full device control, context-aware chatbot, smart modes, suggestions.
   --------------------------------------------------------------------------- */

export const ROOMS = [
  { id: "bedroom", name: "Bedroom", icon: "\uD83D\uDCFF\uFE0F", color: "#a855f7" },
  { id: "living", name: "Living Room", icon: "\uD83D\uDECB\uFE0F", color: "#37e2d5" },
  { id: "kitchen", name: "Kitchen", icon: "\uD83C\uDF73", color: "#ffd93d" },
];

const INTENT_RULES = [
  // LIGHTS
  { patterns: [/\blights?\s*(on|up)|turn\s*on.*light|light.*bright|brighten/i], action: "lights_on", response: "Lights turned on." },
  { patterns: [/\blights?\s*off|turn\s*off.*light|darken|kill\s*lights?|all\s*lights?\s*off/i], action: "lights_off", response: "All lights off." },
  { patterns: [/\bdim\b/i], action: "dim", response: "Dimming lights." },
  { patterns: [/\bbright(er|en|er\s*than)\b/i], action: "brighten", response: "Brightening lights." },

  // TEMPERATURE / AC
  { patterns: [/\btemp(erature)?\s*(to|at|=)\s*(\d+)/i], action: "temp_set", extract: (m) => parseInt(m[3]), response: null },
  { patterns: [/\bac\s*on|air\s*condition|cool\s*(on|down)|turn.*cool/i], action: "ac_on", response: "AC turned on." },
  { patterns: [/\bac\s*off|turn.*ac.*off|warm\s*up/i], action: "ac_off", response: "AC turned off." },
  { patterns: [/\bwarmer|heat\s*up|increase\s*temp/i], action: "temp_up", response: "Temperature increased." },
  { patterns: [/\bcooler|cold|decrease\s*temp|lower\s*temp/i], action: "temp_down", response: "Temperature decreased." },

  // FAN
  { patterns: [/\bfan\s*(on|start|spin)|turn.*fan/i], action: "fan_on", response: "Fan turned on." },
  { patterns: [/\bfan\s*(off|stop|kill)/i], action: "fan_off", response: "Fan turned off." },
  { patterns: [/\bfan\s*(speed|set)\s*(to|=)?\s*(\d)/i], action: "fan_set", extract: (m) => parseInt(m[4]), response: null },
  { patterns: [/\bfan\s*(faster|higher|max|full)/i], action: "fan_up", response: "Fan speed increased." },
  { patterns: [/\bfan\s*(slower|lower|min)/i], action: "fan_down", response: "Fan speed decreased." },

  // TV
  { patterns: [/\btv\s*(on|start)|turn.*tv|television/i], action: "tv_on", response: "TV turned on." },
  { patterns: [/\btv\s*(off|stop|kill)|shut.*tv/i], action: "tv_off", response: "TV turned off." },
  { patterns: [/\bvol(ume)?\s*(up|higher|louder|increase)/i], action: "vol_up", response: "Volume up." },
  { patterns: [/\bvol(ume)?\s*(down|lower|quieter|decrease)/i], action: "vol_down", response: "Volume down." },
  { patterns: [/\bvol(ume)?\s*(to|at|=)\s*(\d+)/i], action: "vol_set", extract: (m) => parseInt(m[3]), response: null },

  // DOOR
  { patterns: [/\bdoor\s*lock|lock.*door|secure|arm\b/i], action: "lock", response: "Door locked. Security armed." },
  { patterns: [/\bdoor\s*unlock|unlock.*door|disarm|open\s*door/i], action: "unlock_request", response: "Enter PIN to unlock." },

  // SMART MODES
  { patterns: [/\b(i'?m?\s*back|welcome\s*home|home\s*again|just\s*got\s*home|return|come\s*back)\b/i], action: "mode_come_back", response: "Welcome back! Lights on, AC running, door unlocked. Make yourself comfortable." },
  { patterns: [/\b(away\s*mode|leaving|going\s*out|bye|see\s*ya|head\s*out|i'?m?\s*going|out\s*of\s*house)\b/i], action: "mode_away", response: "Away mode activated. All devices off, door locked. Stay safe!" },
  { patterns: [/\b(close\s*the\s*house|shut\s*everything|lock\s*up|secure\s*the\s*house|close\s*up)\b/i], action: "close_house", response: "House closed and secured. All systems shut down, door locked." },

  // SCENES
  { patterns: [/\b(sleepy|sleep|tired|rest|bed\s*time|good\s*night|night\s*night)\b/i], action: "scene_sleep", response: "Sleep mode: bedroom dim warm, everything else off." },
  { patterns: [/\b(movie|cinema|film|netflix|watch\s*something|relax)\b/i], action: "scene_movie", response: "Movie mode: living room ambient, everything dimmed." },
  { patterns: [/\b(good\s*morning|wake\s*up|morning|rise|start\s*day)\b/i], action: "scene_morning", response: "Good morning! All lights on, kitchen bright." },
  { patterns: [/\b(party|celebrate|fun|music|dance)\b/i], action: "scene_party", response: "Party mode! All devices lit up." },
  { patterns: [/\b(work|focus|study|concentrate)\b/i], action: "scene_work", response: "Focus mode: bright white lights, fan on." },
  { patterns: [/\b(night\s*mode|off\s*everything|shutdown|power\s*down|all\s*off)\b/i], action: "scene_off", response: "Everything off. Goodnight." },
  { patterns: [/\b(energy\s*sav|eco|power\s*sav|green)\b/i], action: "scene_eco", response: "Eco mode: minimum power usage." },

  // INFO / CHAT
  { patterns: [/\b(who\s*are\s*you|what\s*are\s*you|your\s*name|introduce)\b/i], action: "chat_intro", response: "I\u2019m AURA \u2014 your Adaptive User Response Assistant. I control your lights, AC, fan, TV, door, and more. Just talk to me naturally!" },
  { patterns: [/\b(hello|hi|hey|greetings|sup|yo|howdy)\b/i], action: "chat_greet", response: null },
  { patterns: [/\b(thanks|thank\s*you|thx|appreciate)\b/i], action: "chat_thanks", response: null },
  { patterns: [/\b(help|what\s*can\s*you|commands|options|menu)\b/i], action: "chat_help", response: null },
  { patterns: [/\b(status|report|dashboard|how.*things|what.*happening)\b/i], action: "info_status", response: null },
  { patterns: [/\b(energy|power|usage|consumption|how\s*much)\b/i], action: "info_energy", response: null },
  { patterns: [/\b(biometric|face|scan|recognize|fingerprint)\b/i], action: "biometric", response: "Biometric scanner ready. Place your face in the camera frame or press the fingerprint button." },
];

const GREETINGS = [
  "Hey! All systems online. What would you like to do?",
  "Hello! Your smart home is ready. Try 'movie time' or 'turn on the lights'.",
  "Hi there! AURA at your service. Ask me anything or say 'help' for commands.",
];
const THANKS_RESPONSES = [
  "You're welcome! Happy to help.",
  "Anytime! That's what I'm here for.",
  "My pleasure. The house is always here for you.",
];
const HELP_RESPONSE = `Here's what I can do:

\uD83D\uDCA1 Lights: "lights on", "dim", "brighten"
\u2744\uFE0F  AC: "set temperature to 22", "ac on", "cooler"
\uD83C\uDF00 Fan: "fan on", "fan speed 3", "fan faster"
\uD83D\uDCFA TV: "tv on", "volume up", "volume to 30"
\uD83D\uDD10 Door: "lock", "unlock"
\u26A1 Scenes: "movie time", "I'm sleepy", "good morning", "party mode"
\uD83C\uDFE0 Smart Modes: "I'm back", "away mode", "close the house"
\uD83D\uDCCA Info: "status", "energy usage"
\uD83D\uDD11 Biometrics: "face scan", "fingerprint"

Just talk naturally \u2014 I understand context!`;

export function parseIntent(input, deviceState = {}) {
  const text = (input || "").trim();
  if (!text) return null;
  const lower = text.toLowerCase();

  for (const rule of INTENT_RULES) {
    for (const pat of rule.patterns) {
      const match = lower.match(pat);
      if (match) {
        let response = rule.response;
        let value = rule.extract ? rule.extract(match) : undefined;

        if (rule.action === "chat_greet") response = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
        if (rule.action === "chat_thanks") response = THANKS_RESPONSES[Math.floor(Math.random() * THANKS_RESPONSES.length)];
        if (rule.action === "chat_help") response = HELP_RESPONSE;
        if (rule.action === "info_status") response = buildStatus(deviceState);
        if (rule.action === "info_energy") response = buildEnergy(deviceState);
        if (rule.action === "temp_set") response = `Temperature set to ${value}\u00B0C.`;

        return { action: rule.action, response, value, confidence: 0.82 + Math.random() * 0.18 };
      }
    }
  }

  if (/\blight/i.test(lower)) return { action: "lights_on", response: "Adjusting lights.", confidence: 0.45 };
  if (/\btemp|hot|cold/i.test(lower)) return { action: "temp_set", response: "Adjusting temperature.", value: 24, confidence: 0.4 };
  if (/\bdoor|lock|safe/i.test(lower)) return { action: "lock", response: "Securing the door.", confidence: 0.4 };
  if (/\bfan|air|wind/i.test(lower)) return { action: "fan_on", response: "Turning on fan.", confidence: 0.4 };

  return { action: "unknown", response: "I didn't catch that. Try 'lights on', 'set temperature to 22', or say 'help'.", confidence: 0.15 };
}

function buildStatus(s) {
  if (!s) return "Loading device status...";
  return `\uD83D\uDCCB System Status:
\uD83D\uDCA1 Lights: ${s.lightsOn ? "ON \u2705" : "OFF \u274C"} (${s.brightness}%)
\u2744\uFE0F  AC: ${s.acOn ? "ON \u2705" : "OFF \u274C"} (${s.temperature}\u00B0C)
\uD83C\uDF00 Fan: ${s.fanOn ? `ON (speed ${s.fanSpeed})` : "OFF"}
\uD83D\uDCFA TV: ${s.tvOn ? `ON (vol ${s.tvVolume})` : "OFF"}
\uD83D\uDD10 Door: ${s.doorLocked ? "LOCKED \uD83D\uDD12" : "UNLOCKED \uD83D\uDD13"}
\u26A1 Energy: ~${calcEnergy(s)}W
${s.customDevices?.length ? `\uD83D\uDCE1 Custom: ${s.customDevices.length} device(s)` : ""}`;
}

function buildEnergy(s) {
  if (!s) return "Calculating...";
  const watts = calcEnergy(s);
  const max = 1200;
  const pct = Math.round((watts / max) * 100);
  return `\u26A1 Energy Report:
Total draw: ~${watts}W (${pct}% capacity)
${s.lightsOn ? `\uD83D\uDCA1 Lights: ~${Math.round(s.brightness * 0.6)}W` : "\uD83D\uDCA1 Lights: 0W"}
${s.acOn ? `\u2744\uFE0F  AC: ~${calcAcW(s.temperature)}W` : "\u2744\uFE0F  AC: 0W"}
${s.fanOn ? `\uD83C\uDF00 Fan: ~${s.fanSpeed * 15}W` : "\uD83C\uDF00 Fan: 0W"}
${s.tvOn ? `\uD83D\uDCFA TV: ~${120 + s.tvVolume}W` : "\uD83D\uDCFA TV: 0W"}
Efficiency: ${pct < 30 ? "Excellent \uD83C\uDF3F" : pct < 60 ? "Good" : "High usage \u26A0\uFE0F"}`;
}

function calcAcW(temp) {
  if (temp <= 24) return Math.round(100 - (temp - 16) * 8);
  return Math.round(36 + (temp - 24) * 6);
}

function calcEnergy(s) {
  let w = 5;
  if (s.lightsOn) w += Math.round(s.brightness * 0.6);
  if (s.acOn) w += calcAcW(s.temperature);
  if (s.fanOn) w += s.fanSpeed * 15;
  if (s.tvOn) w += 120 + s.tvVolume;
  if (s.customDevices) s.customDevices.forEach((d) => { if (d.on) w += 30; });
  return w;
}
