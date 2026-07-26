# AI FUTURE LAB

A hyper-immersive, fully 3D **interactive** science platform for **SciNaTiON 6.0**, built with **Next.js**, **Three.js** (via **React Three Fiber** + **drei**), and **Framer Motion**.

Created by **Naman Mittal**, Class 10th A, **Happy English School**, Sharad Vihar, Delhi.

Every module is a *working* simulation — not a mockup. Each one runs the real mathematics live, shows a step-by-step **"How It Works"** breakdown, links to a related **YouTube** explainer, and streams internal state to a floating **debug console** so you can watch the logic fire in real time.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [The Five Modules](#the-five-modules)
  - [Module 01 — Smart Home](#module-01--smart-home)
  - [Module 02 — Cybersecurity](#module-02--cybersecurity)
  - [Module 03 — Traffic Control](#module-03--traffic-control)
  - [Module 04 — Space & Orbits](#module-04--space--orbits)
  - [Module 05 — Quantum Lab](#module-05--quantum-lab)
- [Cross-Module Interlock](#cross-module-interlock)
- [AI Chatbot](#ai-chatbot)
  - [How It Works](#how-it-works)
  - [What the AI Knows](#what-the-ai-knows)
  - [The `enforce` Command](#the-enforce-command)
  - [Module Navigation via Chat](#module-navigation-via-chat)
- [Features](#features)
- [Browser Compatibility](#browser-compatibility)
- [Environment Variables](#environment-variables)
- [About the School — Happy English School](#happy-english-school)
- [Performance](#performance)
- [License](#license)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/namanmittal/ai-future-lab.git
cd ai-future-lab

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env.local   # then add your API keys

# 4. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint checks |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 14.2.5 |
| **UI Library** | React | 18.3.1 |
| **3D Engine** | Three.js | 0.160.0 |
| **3D React Binding** | @react-three/fiber | 8.16.8 |
| **3D Helpers** | @react-three/drei | 9.108.3 |
| **Animations** | Framer Motion | 11.3.8 |
| **AI (Primary)** | Google Gemini 2.0 Flash | Free tier |
| **AI (Fallback)** | Groq Llama 3.3 70B | Free tier |
| **Linting** | ESLint + eslint-config-next | 8.57.0 |
| **Fonts** | Space Grotesk (body) + Bricolage Grotesque (display) | Google Fonts |

---

## Project Structure

```
AI-FUTURE_LAB/
├── app/
│   ├── layout.js                     Root layout, fonts, metadata
│   ├── globals.css                   Full CSS (~2200 lines): palette, glass, HUD,
│   │                                 cyber, smart home, traffic, quantum, debug,
│   │                                 intro overlay, navigator, cursor trail, etc.
│   ├── page.js                       Hub: hero section (split layout + 3D planet),
│   │                                 capsule grid with 3D tilt, module launch state,
│   │                                 interlock, ChatBot, KeyboardShortcuts,
│   │                                 CursorTrail, visited tracking
│   ├── api/
│   │   └── chat/
│   │       └── route.js              AI chatbot API (Gemini + Groq)
│   ├── lib/
│   │   └── modules.js                Module registry (5 modules, accents, math)
│   └── components/
│       ├── Scene3D.js                Three.js particle field (2600 points)
│       ├── HeroPlanet.js             Holographic 3D planet (wireframe icosahedron,
│       │                             core sphere, 3 orbit rings, 2 satellites, dust ring)
│       ├── CinematicIntro.js         Decode-scramble intro overlay (HUD grid, scan beam,
│       │                             corner brackets, static grain, screen flash, SSR disabled)
│       ├── ModuleCapsule.js          Hover-expanding hub launch capsule (glow-edge border,
│       │                             3D mouse-tracking tilt ±8°, visited badge, accent gradient)
│       ├── CursorTrail.js            Neon particle trail following the mouse cursor
│       │                             (max 30 particles, accent synced, mix-blend-mode screen)
│       ├── KeyboardShortcuts.js      Keyboard shortcut overlay (1-5 modules, Esc, ?, /)
│       │                             + floating ? button
│       ├── CreditsBadge.js           Fixed Naman Mittal credit badge
│       ├── LogoPlaceholder.js        Fixed HES badge (links to hes.edu.in)
│       ├── Reveal.js                 Scroll-reveal animation wrapper
│       ├── DebugPanel.js             Floating live event console
│       ├── ChatBot.js                Floating AI assistant (Gemini + Groq)
│       └── modules/
│           ├── ModuleShell.js        Shared header + formula + how-it-works
│           ├── SmartHome.js          IoT dashboard + AURA AI + biometrics
│           ├── Cybersecurity.js      Entropy + cipher + brute-force + MFA
│           ├── Traffic.js            Adaptive signal junction simulation
│           ├── Space.js              3D orbits + telemetry + debris
│           ├── Quantum.js            Qubit simulator + learning hub
│           ├── smarthome/
│           │   ├── DeviceContext.js   React Context + useReducer state
│           │   └── intentEngine.js   NLP intent parser (regex-based)
│           ├── space-debris/
│           │   ├── SpaceDebris.js     Main space module with 3D canvas
│           │   ├── scenes/
│           │   │   └── EarthScene.js  Three.js Earth, orbits, debris, alerts
│           │   ├── components/
│           │   │   ├── Dashboard.js   Telemetry dashboard
│           │   │   └── Controls.js    Simulation controls
│           │   ├── hooks/
│           │   │   └── useSimulation.js  Orbital mechanics hook
│           │   └── utils/
│           │       └── orbital.js     TLE parsing, orbital calculations
│           └── content/               Lesson text (separate from logic)
│               ├── SmartHomeContent.js
│               ├── CyberContent.js
│               ├── TrafficContent.js
│               ├── SpaceContent.js
│               └── QuantumContent.js
├── public/
│   └── bloch-sphere/                  Embedded Bloch sphere simulator
│       ├── index.html                 Learning hub (qubits, circuits, games)
│       ├── src/quantum/               Quantum math (gates, states, Bloch)
│       ├── src/math/                  Complex numbers, vectors, floats
│       ├── js/learning.js             Learning hub logic
│       ├── css/                       Bootstrap + custom styles
│       └── images/                    Logo, favicons
├── bloch-sphere-simulator/            Standalone simulator files
├── .env.local                         API keys (Gemini + Groq) — do not overwrite
├── next.config.mjs                    Next.js config (R3F transpile)
├── package.json                       Dependencies and scripts
└── .eslintrc.json                     ESLint config
```

---

## The Five Modules

### Module 01 — Smart Home

**Tagline:** Adaptive lighting, voice control & a security interlock

| Feature | Description |
|---------|-------------|
| **Adaptive Lighting** | Live light-attenuation formula `L_out = max(0, μ × (I_L − E_x))` — adjusts lamp brightness based on ambient light and user preference |
| **AURA AI Chatbot** | Built-in smart home assistant that understands natural language commands ("I'm back", "Away mode", "Movie time", "Close the house") |
| **Voice Control** | Web Speech API microphone input with real-time Web Audio waveform visualization |
| **Device Dashboard** | Smart Lights, AC, Ceiling Fan, Smart TV, Smart Lock — all with toggle switches and sliders |
| **Scene Presets** | Sleep, Movie, Morning, Party, Work, Eco, All Off — one-tap multi-device automation |
| **Biometrics** | Face recognition (WebRTC camera with scanline animation) and fingerprint scanner simulation |
| **Security Interlock** | 3 failed PIN attempts trigger a lockdown that auto-routes to the Cybersecurity module |
| **Energy Monitoring** | Real-time wattage calculation, efficiency percentage, energy history bar graph |
| **Activity Log** | Timestamped log of all device actions, security events, scene changes |
| **Alert System** | Dismissable alerts with severity levels (info, warn, critical) |
| **Add Device Modal** | Add custom devices (lights, sensors, speakers, cameras, thermostats, locks) to any room |
| **Rooms** | Bedroom, Living Room, Kitchen — each with its own accent color |
| **In-Browser Audio** | WAV tones generated on-the-fly for door chimes, alerts, and feedback sounds (no external files) |

**Math:** `L_out = max(0, μ × (I_L − E_x))` where μ = user brightness (0–1), I_L = lamp max intensity, E_x = external ambient light.

---

### Module 02 — Cybersecurity

**Tagline:** Password entropy analysis & a live cipher pipeline

| Feature | Description |
|---------|-------------|
| **Password Entropy Engine** | Real-time Shannon-style entropy `E = L × (log(R) / log(2))` with charset detection (a-z, A-Z, 0-9, symbols) |
| **Entropy Meter** | Visual strength bar (Weak/Moderate/Strong/Very Strong) with estimated crack time at 1B guesses/sec |
| **Brute-Force Attack Simulator** | Live penetration test with animated terminal, attempt counter, rate display, and progress bar |
| **Encryption Pipeline** | Two-stage cipher: Caesar substitution → XOR diffusion, showing each stage with hex output |
| **Secure Login + MFA** | Password authentication with minimum entropy requirement, 4-digit OTP verification, lockout after 3 failures |
| **Threat Dashboard** | Real-time threat level, encryption status, system integrity ring (SVG), last attack result |
| **Live Terminal** | Ambient security log (firewall drops, TLS handshakes, IDS alerts) with color-coded messages |
| **Alert Banners** | Animated banners for security events (warnings, critical, ok) with auto-dismiss |

**Math:** `E = L × ( log(R) / log(2) )` where L = password length, R = charset size (26/36/68/95). E ≥ 60 bits = strong.

---

### Module 03 — Traffic Control

**Tagline:** Priority-scored adaptive signal timing

| Feature | Description |
|---------|-------------|
| **CCTV Canvas** | Canvas 2D rendering with scanlines, noise, vignette — realistic security camera look |
| **Satellite Canvas** | Top-down radar view with grid, vehicle boxes, speed vectors, radar sweep |
| **Adaptive Signals** | Self-cycling priority algorithm scores each lane by queue length and congestion |
| **Vehicle Simulation** | Animated vehicles (sedans, SUVs, trucks) with proper stopping at red lights |
| **3D Bounding Boxes** | CCTV-style wireframe detection boxes on vehicles with type/speed labels |
| **Lane Queue Control** | Adjustable sliders for each direction (N/E/S/W) with real-time vehicle spawning |
| **Per-Lane Lights** | Visual traffic light indicators for all 4 directions with glow effects |
| **Detection Log** | Timestamped vehicle detection entries with color-coded status |
| **Performance Stats** | AI efficiency %, total cycles, vehicles online/stopped, throughput per cycle |
| **Cycle History** | Bar chart showing which lane got green in each cycle |
| **Yellow Transition** | Realistic yellow light phase between signal changes |

**Math:** `P_n = (α × Q_n) + (β × (1 / V_avg))` where Q_n = vehicles queued, V_avg = average lane speed, α/β = tuning weights.

---

### Module 04 — Space & Orbits

**Tagline:** Orbital mechanics & Kessler debris clearance

| Feature | Description |
|---------|-------------|
| **3D Earth** | Three.js globe with procedural textures (no image assets required) |
| **Parametric Orbits** | Elliptical satellite orbits with real-time telemetry (altitude, period, velocity, x/y/z) |
| **TLE Data** | Real debris sources: COSMOS 1408, FENGYUN 1C, IRIDIUM 33, COSMOS 2251 |
| **Proximity Detection** | Collision warning system for objects within critical distance |
| **Orbit Bands** | Visual distinction for LEO, MEO, GEO orbital zones |
| **Debris Catalog** | 80+ tracked objects with source, altitude, inclination, risk classification |
| **Full-Screen Mode** | Toggle fullscreen for immersive 3D exploration |
| **Orbit Controls** | Mouse-based zoom, rotate, and pan for the 3D scene |
| **Dossier Panel** | Detailed telemetry readout for selected objects |
| **Star Field** | Background star particles for realistic space environment |

**Math:** `X(t) = a·cos(ωt), Y(t) = b·sin(ωt)·cos(θ)` where a/b = semi-major/minor axes, ω = angular velocity, θ = inclination.

---

### Module 05 — Quantum Lab

**Tagline:** Qubit superposition, the Bloch sphere & measurement

| Feature | Description |
|---------|-------------|
| **3D Bloch Sphere** | Embedded interactive simulator (MIT licensed from bits-and-electrons) |
| **Learning Hub** | Full interactive page with qubit fundamentals, visual explanations, and exercises |
| **Quantum Gates** | Reference cards for Pauli-X/Y/Z, Hadamard, S, T gates with matrices and effects |
| **Key States** | Visual guide to |0⟩, |1⟩, |+⟩, |−⟩, |i⟩, |−i⟩ with Bloch sphere positions |
| **Mathematics Tab** | Deep-dive into the linear algebra behind qubits |
| **Circuit Builder** | Build and simulate quantum circuits with H, X, Z, S, T, CNOT gates |
| **Quantum Games** | Maze explorer, pattern memory, quantum coin flip, entanglement lab |
| **Entanglement Deep Dive** | EPR paradox, Bell's theorem, Nobel 2022 coverage |
| **History Timeline** | Quantum computing milestones from 1980 to 2024 |
| **Shor's Algorithm** | Classical simulation of Shor's algorithm (e.g., factoring 15 = 3 × 5) |
| **Parallelism Visualization** | Side-by-side classical vs quantum computation comparison |

**Math:** `|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1` (Born rule). Hadamard gate creates equal superposition.

---

## Cross-Module Interlock

The Smart Home and Cybersecurity modules are **linked**. If you fail the Smart Home smart-lock PIN more than 3 times:

1. The Smart Home triggers a **security lockdown**
2. The system detects a brute-force attempt
3. You are **automatically routed** to the Cybersecurity module
4. A banner displays: "Routed from Smart Home: Brute-force lockout — re-authenticate"
5. This demonstrates **defence-in-depth** — layered security across systems

This interlock works both ways — the Cybersecurity module's failed login counter can also escalate.

---

## AI Chatbot

### How It Works

The floating chatbot (bottom-right) is powered by a **dual-provider AI backend**:

```
User Message → /api/chat route
                    │
                    ├── Primary: Google Gemini 2.0 Flash (free tier, ~250-500 RPD)
                    │
                    └── Fallback: Groq Llama 3.3 70B (free tier, 30 RPM)
```

1. The user types or speaks a message
2. The API route receives it and checks for the `enforce` prefix
3. It selects the appropriate system prompt (project-only or free-form)
4. It calls Gemini first; if that fails, it falls back to Groq
5. The AI response is parsed for navigation markers (`<<NAV:id>>`)
6. If a navigation marker is found, the chatbot opens the corresponding module
7. The response is displayed and optionally spoken via TTS

### Features

- **Text-to-Speech toggle** — hear AI responses spoken aloud
- **Speech-to-Text microphone** — speak your questions (Chrome/Edge)
- **Quick suggestions** — one-click question starters
- **Model indicator** — see which AI model answered (gemini-2.0-flash / llama-3.3-70b)
- **Module navigation** — the AI can open modules for you automatically

### What the AI Knows

The AI has a comprehensive system prompt containing:

**Project Knowledge:**
- All 5 module descriptions, features, and math formulas
- The tech stack (Next.js, Three.js, R3F, Framer Motion)
- How each module works internally

**School Knowledge (Happy English School — hes.edu.in):**
- Full identity (name, address, CBSE affiliation, UDISE code, type)
- Leadership (Founder, Managing Director, Principal)
- All 3 branches with addresses
- Complete fee structure (2026-27)
- Full teaching staff list by department
- Coordinators, curriculum developers, admin staff
- Infrastructure (library, labs, sports, transport, etc.)
- Curriculum, co-curricular activities
- Career counselling, special education
- Social media accounts
- Parent dashboard and mobile app info

**Navigation Rules:**
The AI understands when to navigate to modules vs. when to just explain features:

| User Says | AI Action |
|-----------|-----------|
| "Open Smart Home" | Opens the module + shows explanation |
| "Show me cybersecurity" | Opens the module |
| "How do the smart lights work?" | Explains without opening (feature question) |
| "What is this project?" | General project description |
| "Tell me about HES fees" | School fee information |

### The `enforce` Command

Prefix any message with **`enforce`** to bypass project-only restrictions:

```
Normal mode:    "What is quantum computing?"
→ AI answers within project context (concise, project-focused)

Enforce mode:   "enforce What is quantum computing?"
→ AI answers freely as a general assistant (2-3 sentences, any topic)
```

**How it works:**

| Prefix | System Prompt | Behavior |
|--------|--------------|----------|
| *(none)* | `PROJECT_KNOWLEDGE` | Answers only about the project, modules, and HES. If the question is unrelated, gives a brief honest answer without deflecting. |
| `enforce` | `FREEFORM_KNOWLEDGE` | Answers any question freely. Briefly mentions this is a project demo if relevant. |

The `enforce` prefix is **stripped** before being sent to the AI, so the user types:
```
enforce explain how neural networks work
```
And the AI receives:
```
explain how neural networks work
```

### Module Navigation via Chat

The AI uses special markers in its responses:

```
<<NAV:smart-home>>      → Opens Smart Home
<<NAV:cybersecurity>>   → Opens Cybersecurity
<<NAV:traffic>>         → Opens Traffic Control
<<NAV:space>>           → Opens Space & Orbits
<<NAV:quantum>>         → Opens Quantum Lab
<<NAVTOUR:id>>          → Opens module in tour/guide mode
```

These markers are **invisible** to the user — they're parsed server-side and converted into navigation actions.

The system also has a **keyword-based fallback** detector in case the AI forgets to include a marker. It matches keywords like "house", "hacker", "intersection", "orbit", "qubit" to their respective modules.

---

## Features

### Visual & UX

- **Cinematic Intro** — character-decode text scramble overlay with HUD grid, scan beam, corner brackets, static grain, and screen flash (system boot-up feel). SSR-disabled, auto-plays on first load
- **Holographic 3D Planet** — Three.js wireframe icosahedron with pulsing core sphere, 3 orbit rings, orbiting satellites, dust ring, and mouse-tracking parallax rotation
- **Persistent 3D Particle Field** — 2,600 GPU-rendered points with mouse-inertia drift, additive blending, and accent-driven color transitions
- **Context-Aware Colors** — the entire scene shifts to each module's accent color on hover/launch
- **Hover-Expanding Capsules** — module cards bloom on hover with gradient washes, tag chips, glow-edge borders, accent-gradient number badges, and **3D mouse-tracking tilt** (perspective 800px, ±8° rotation)
- **Module Progress Tracking** — visited modules show a green ✓ badge, persisted in localStorage
- **Cursor Trail** — neon particle trail following the mouse cursor (max 30 particles, accent-color synced, 600ms fade, `mix-blend-mode: screen`)
- **Keyboard Shortcuts** — `1–5` launch modules, `Esc` returns to hub, `?` toggles overlay, `/` focuses chatbot. Glassmorphism overlay with spring animation. Floating `?` button at bottom-right

### Core

- **Full-Screen Module Launch** — smooth AnimatePresence transitions with "Return to Hub" navigation
- **Mathematical Formulas** — every module displays its core equation with variable explanations
- **"How It Works" Panels** — collapsible step-by-step explanations (Simple / Advanced modes)
- **YouTube Explainers** — embedded video for each module
- **Debug Console** — floating event logger (bottom-right) that streams live internal state from every module

### Design

- **Glassmorphic UI** — frosted-glass panels with backdrop-filter blur and subtle borders
- **Retro-Pop Palette** — vibrant colors (pink, orange, yellow, cyan, purple, blue) on dark backgrounds
- **Sci-Fi HUD** — monospace readouts, glowing chips, accent-bound sliders, status bars
- **Scroll-Reveal Animations** — Framer Motion `whileInView` with `transform`/`opacity` only (GPU-composited)
- **Accessibility** — honors `prefers-reduced-motion`, all animations use compositor-friendly properties
- **Responsive Design** — adapts from mobile to desktop with CSS Grid and clamp() values
- **In-Browser Audio** — WAV tones generated via Web Audio API (no external files)
- **Web Speech API** — voice control in Smart Home and ChatBot (Chrome/Edge best)

---

## Browser Compatibility

| Feature | Chrome/Edge | Firefox | Safari |
|---------|-------------|---------|--------|
| Core UI | ✅ Full | ✅ Full | ✅ Full |
| 3D (WebGL) | ✅ Full | ✅ Full | ✅ Full |
| Voice Control (Mic) | ✅ Full | ⚠️ Partial | ⚠️ Partial |
| Text-to-Speech | ✅ Full | ✅ Full | ✅ Full |
| Camera (Biometrics) | ✅ Full | ✅ Full | ✅ Full |
| Audio Generation | ✅ Full | ✅ Full | ✅ Full |

**Notes:**
- **Microphone** voice control uses the Web Speech API — best supported in Chrome/Edge and Android Chrome; iOS Safari support is partial
- **Audio cues** are generated in-browser as base64 WAV and need a user click to start (browser autoplay policy)
- The page asks for mic/camera permission on demand and falls back gracefully if unavailable

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Gemini 2.0 Flash (free tier: ~250-500 requests/day)
GEMINI_API_KEY=your_gemini_api_key_here

# Groq Llama 3.3 70B (free tier: 30 RPM, 6000 TPM)
GROQ_API_KEY=your_groq_api_key_here
```

**How to get free API keys:**
- **Gemini:** Go to [Google AI Studio](https://aistudio.google.com/apikey) → Create API key
- **Groq:** Go to [console.groq.com](https://console.groq.com) → Create API key

Both providers offer generous free tiers. If neither key is set, the chatbot returns a static fallback message.

---

## Performance

- **Canvas Auto-Resize** — `<Canvas>` uses ResizeObserver to fit its parent; no manual window listeners
- **Adaptive DPR** — drei's `PerformanceMonitor` + `AdaptiveDpr` automatically lowers pixel ratio under load
- **Single Draw Call** — particle field uses `THREE.Points` with additive blending (one draw call for all 2,600 particles)
- **Frame-Rate Independent** — color/rotation easing uses `delta`-based lerps
- **Pointer-Events None** — background canvas is non-interactive; mouse tracking via a single window listener
- **Dynamic Imports** — all module components are `next/dynamic` with `ssr: false` to avoid server-side WebGL
- **GPU-Composited Animations** — all Framer Motion animations use only `transform` and `opacity` (no layout thrash)

---

## Happy English School

This project was built at **Happy English School (HES)**, Sharad Vihar, Karkardooma, East Delhi.

### Overview

| Detail | Info |
|--------|------|
| **Full Name** | Happy English School |
| **Address** | Sharad Vihar, Karkardooma, East Delhi, Delhi — 110092 |
| **Website** | [www.hes.edu.in](https://hes.edu.in) |
| **Phone** | 011-43076630, 7838206059 |
| **Email** | info@hes.edu.in |
| **CBSE Affiliation No** | 2730735 |
| **UDISE Code** | 07040322513 |
| **Type** | Co-educational, English-medium, Private Unaided |
| **Board** | CBSE (Central Board of Secondary Education) |
| **Classes** | Nursery to Class 12 |
| **Established** | 1989 |
| **Campus Area** | 1.01 Acres |

### Leadership

| Role | Name |
|------|------|
| Founder Chairman (late) | Lt. S. S. Khungar |
| Managing Director | Mr. Kanwaljeet Khungar (M.A., B.Ed) |
| Principal | Ms. Arti Khungar (M.A. English, B.Ed) |

### Branches

1. **Karkardooma (Main)** — Sharad Vihar, Karkardooma, Delhi-110092 — Nursery to Class 12
2. **Geeta Colony (No. II)** — 11/294 Geeta Colony, Delhi-110031 — Classes 1 to 8 (est. 1954)
3. **Krishna Nagar** — Krishna Nagar, Delhi-110051 — Nursery to Class 8

### Fee Structure (2026-27, Annual)

| Class | Annual Fee |
|-------|-----------|
| Nursery | ₹89,025 |
| KG | ₹86,575 |
| Class 1 | ₹82,575 |
| Class 2 | ₹76,275 |
| Class 3 | ₹68,515 |
| Class 4 | ₹71,635 |
| Class 5 | ₹73,195 |
| Class 6 | ₹74,515 |
| Class 7 | ₹74,875 |
| Class 8 | ₹76,195 |
| Class 9 | ₹77,515 |
| Class 10 | ₹79,075 |
| Class 11 | ₹90,550 |

### Infrastructure

- Library with 9,000+ books
- Science laboratory with full apparatus
- Computer laboratory with latest technology
- Swimming pool with 5 coaches
- Sports ground (volleyball, cricket, football)
- Skating rink
- Dance/music room with instruments
- Theatre room with props
- Art and clay modelling rooms
- CCTV surveillance + 24/7 power backup
- GPS-tracked school transport fleet
- Subsidized canteen

### Social Media

- **Facebook:** [hesgeetacolony](https://facebook.com/hesgeetacolony), [hessharadvihar](https://facebook.com/hessharadvihar)
- **Instagram:** [@hesgeetacolony](https://instagram.com/hesgeetacolony), [@hessharadvihar](https://instagram.com/hessharadvihar)
- **YouTube:** [@hessharadvihar2006](https://youtube.com/@hessharadvihar2006)

### Parent Dashboard

Available at [hes.edu.in](https://hes.edu.in). Parents can view notices, circulars, homework, assignments, lesson plans, and results. Mobile app **"HES Application"** available on Play Store. Uses Google Classroom for assignments.

---

## License

Built with ❤️ by **Naman Mittal** for SciNaTiON 6.0 at Happy English School.

The embedded Bloch sphere simulator is under MIT License from [bits-and-electrons](https://github.com/nicholasgasior/bloch-sphere-simulator).
