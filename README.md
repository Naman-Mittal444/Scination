# AI FUTURE LAB — Naman Mittal

A hyper-immersive, fully 3D **interactive** science platform for **SciNaTiON 6.0**, built with **Next.js**, **Three.js** (via **React Three Fiber** + **drei**), and **Framer Motion**.

Created by **Naman Mittal**, Class 10ᵗʰ A, **Happy English School**, Sharad Vihar, Delhi.

Every module is a *working* simulation — not a mockup. Each one runs the real mathematics live, shows a step-by-step **"How It Works"** breakdown, links to a related **YouTube** explainer, and streams internal state to a floating **debug console** so you can watch the logic fire in real time.

## The five modules

| # | Module | Core idea | Math |
|---|--------|-----------|------|
| 01 | **Smart Home** | Adaptive lighting, **voice control (microphone)** + audio cues, security interlock | `L_out = max(0, μ × (I_L − E_x))` |
| 02 | **Cybersecurity** | Password entropy + Caesar **and** XOR cipher pipeline, brute-force search space | `E = L × (log R / log 2)` |
| 03 | **Traffic Control** | Self-cycling priority-scored signals with live sensor ripples | `P_n = (α·Q_n) + (β·(1/V_avg))` |
| 04 | **Space & Orbits** | 3D orbits, live telemetry, launchable satellites + Kessler debris cascade | `X = a·cos(ωt), Y = b·sin(ωt)·cos(θ)` |
| 05 | **Quantum Lab** | Qubit superposition, Bloch sphere, true-random measurement, **Shor's algorithm** + parallelism viz | `|ψ⟩ = α|0⟩ + β|1⟩,  |α|²+|β|² = 1` |

### Cross-module interlock
Fail the Smart Home smart-lock more than 3 times and the system detects a brute-force attempt and **auto-routes you to the Cybersecurity module** to re-authenticate — a live demonstration of defence-in-depth.

## What each module actually does

- **Smart Home** — Live light-attenuation formula; click-to-play embedded audio cues (door chime, alert beep, alarm — generated in-browser as WAV, no external files); **microphone voice control** via the Web Speech API on phone + desktop, with a live Web Audio waveform. No mic/device? Commands are parsed and shown in the log instead of being dropped.
- **Cybersecurity** — Password-entropy meter with a live brute-force search-space bar, plus a two-stage cipher pipeline showing both a Caesar shift and an XOR cipher on your own input.
- **Traffic Control** — A junction that cycles itself on a timer, recomputing lane priority each cycle (with a real yellow-transition), animated sensor ripples, and running cycle-count / average-wait stats.
- **Space & Orbits** — A 3D Earth (procedurally textured, no image assets), orbit-speed slider, a "Launch Satellite" button feeding live telemetry (altitude, period `T = 2π/ω`, x/y/z), and a Kessler-cascade mode that spawns debris chains. Zoom/rotate with the mouse.
- **Quantum Lab** — A Bloch-sphere qubit you drive with Pauli-X/Z/S and Hadamard gates (with a circuit history), **true-random** measurement via `crypto.getRandomValues`, a working classical simulation of **Shor's algorithm** (e.g. 15 = 3 × 5), and a side-by-side classical-vs-quantum parallelism visualization.

## Features

- 🌌 Persistent 3D **particle field** background with mouse-inertia drift.
- 🎨 **Context-aware color** — the whole scene + page mood shift to each module's accent on hover/launch.
- 🚀 Hover-expanding **launch capsules**; full-screen module launch state with **Return to Hub**.
- 🧮 Every module shows its **real formula**, an **"About the Tech"** explainer, and a collapsible **"How It Works"** step-by-step panel (Simple / Advanced where relevant).
- 🎤 **Microphone + audio** in Smart Home (Web Speech API + Web Audio waveform + in-browser generated tones).
- ▶️ A related **YouTube** explainer embedded in each module.
- 🐞 Floating **debug console** (bottom-right) that logs live internal events from every module.
- 🎓 Glassmorphic **Happy English School** badge + **Naman Mittal** innovator credit.
- ♿ All Framer Motion animations use `transform`/`opacity` only and honor `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.js                Root layout, fonts, metadata
  globals.css              Palette + glass + HUD, How-It-Works, traffic light,
                           waveform, debug panel, tooltip & parallel-grid styles
  page.js                  Hub: hero, capsule grid, launch state, interlock, DebugPanel
  lib/
    modules.js             Single source of truth for the 5 modules + accents + math
  components/
    Scene3D.js             R3F particle field (accent-driven, mouse inertia)
    ModuleCapsule.js       Hover-expanding hub launch capsule
    CreditsBadge.js        Fixed Naman Mittal / Happy English School credit
    LogoPlaceholder.js     Fixed Happy English School badge (top-left)
    Reveal.js              Reusable scroll-reveal wrapper
    DebugPanel.js          Floating live event console + emitDebug() event bus
    modules/
      ModuleShell.js       Shared header + formula + About + How-It-Works panel
      SmartHome.js         Attenuation + voice/mic + audio + brute-force interlock
      Cybersecurity.js     Entropy analyzer + Caesar/XOR cipher pipeline
      Traffic.js           Self-cycling priority-scored junction sim
      Space.js             3D Earth, parametric orbits, telemetry, debris cascade
      Quantum.js           Qubit + Bloch sphere + gates + Shor's + measurement
      content/             Lesson text kept separate from simulation logic
        SmartHomeContent.js   How-It-Works + YouTube link (Smart Home)
        CyberContent.js       How-It-Works + YouTube link (Cybersecurity)
        TrafficContent.js     How-It-Works + YouTube link (Traffic)
        SpaceContent.js       How-It-Works + YouTube link (Space)
        QuantumContent.js     How-It-Works + parallelism viz + YouTube (Quantum)
```

> **Editing tip:** each module's *explanatory content* (the "How It Works" text and its YouTube link) lives in `app/components/modules/content/`, kept separate from the simulation logic in the module file itself — so you can reword a lesson without touching the code that powers it.

## Swapping the school logo

In `app/components/LogoPlaceholder.js`, replace the 🎓 emoji block with:

```jsx
<img src="/hes-logo.png" alt="Happy English School" style={{ width: 40, height: 40, borderRadius: "50%" }} />
```

and drop `hes-logo.png` into the `public/` folder.

## Browser notes

- **Microphone** voice control uses the Web Speech API — best supported in Chrome/Edge and on Android Chrome; iOS Safari support is partial. The page asks for mic permission on demand and falls back to a text log if the device or permission isn't available.
- **Audio cues** are generated in-browser (base64 WAV) — no files to host — and need a user click to start (browser autoplay policy).

## Performance notes

- The `<Canvas>` auto-resizes to its parent (ResizeObserver) — no manual window listeners for sizing.
- DPR is clamped and lowered under load via drei's `PerformanceMonitor` + `AdaptiveDpr`.
- The particle field uses additive-blended `THREE.Points` (one draw call) and eases color/rotation with frame-rate-independent lerps.
- The background canvas is `pointer-events:none`; mouse inertia is fed from a single window `pointermove` listener so UI stays fully clickable.
