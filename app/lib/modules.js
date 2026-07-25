/* ---------------------------------------------------------------------------
   AI FUTURE LAB — module registry
   Single source of truth for the 5 science modules from the project report.
   Each module owns an accent color that drives the 3D particle field and the
   context-aware background shift when the module is hovered / launched.
   --------------------------------------------------------------------------- */

export const MODULES = [
  {
    id: "smart-home",
    index: "01",
    title: "Smart Home",
    tagline: "Adaptive lighting, voice control & a security interlock",
    blurb:
      "A responsive home that dims its lights against ambient sunlight, obeys spoken commands, and locks itself down after repeated break-in attempts — handing you to the Cybersecurity module to re-authenticate.",
    // accent is [primary, glow] — fed into the WebGL field + CSS vars.
    accent: "#37e2d5",
    accentSoft: "#0e3b3a",
    icon: "home",
    tags: ["IoT", "Voice NLP", "Automation"],
    math: {
      title: "Light attenuation model",
      formula: "L_out = max(0, μ × (I_L − E_x))",
      where: [
        ["μ", "user brightness preference (0–1)"],
        ["I_L", "lamp's max intensity"],
        ["E_x", "external ambient light"],
      ],
    },
  },
  {
    id: "cybersecurity",
    index: "02",
    title: "Cybersecurity",
    tagline: "Password entropy analysis & a live cipher pipeline",
    blurb:
      "Measure the true strength of a password in bits of entropy, watch the search space explode with every character class, then run text through a symmetric encrypt / decrypt pipeline.",
    accent: "#ff4d9d",
    accentSoft: "#3d1226",
    icon: "shield",
    tags: ["Entropy", "Cryptography", "Auth"],
    math: {
      title: "Shannon-style entropy",
      formula: "E = L × ( log(R) / log(2) )",
      where: [
        ["L", "password length"],
        ["R", "charset size — 26 / 36 / 68"],
        ["E ≥ 60", "considered strong"],
      ],
    },
  },
  {
    id: "traffic",
    index: "03",
    title: "Traffic Control",
    tagline: "Priority-scored adaptive signal timing",
    blurb:
      "A four-way junction that scores every lane by queue length and congestion, then extends the green light for whichever lane needs it most — clearing gridlock in real time.",
    accent: "#ffd93d",
    accentSoft: "#3d3208",
    icon: "traffic",
    tags: ["Optimization", "Queues", "Sim"],
    math: {
      title: "Lane priority score",
      formula: "P_n = (α × Q_n) + (β × (1 / V_avg))",
      where: [
        ["Q_n", "vehicles queued in lane n"],
        ["V_avg", "average lane speed"],
        ["α, β", "tuning weights"],
      ],
    },
  },
  {
    id: "space",
    index: "04",
    title: "Space & Orbits",
    tagline: "Orbital mechanics & Kessler debris clearance",
    blurb:
      "Plot satellites on parametric elliptical orbits around a 3D Earth, then fire a laser to sweep away drifting debris before a cascade of collisions — the Kessler Syndrome — takes hold.",
    accent: "#4d7cff",
    accentSoft: "#0f2047",
    icon: "orbit",
    tags: ["Orbital", "3D", "Physics"],
    math: {
      title: "Parametric orbit",
      formula: "X(t) = a·cos(ωt),  Y(t) = b·sin(ωt)·cos(θ)",
      where: [
        ["a, b", "semi-major / minor axes"],
        ["ω", "angular velocity"],
        ["θ", "orbital inclination"],
      ],
    },
  },
  {
    id: "quantum",
    index: "05",
    title: "Quantum Lab",
    tagline: "Qubit superposition, the Bloch sphere & measurement",
    blurb:
      "Build a qubit as a superposition of |0⟩ and |1⟩, visualise it on the Bloch sphere, apply a Hadamard gate to reach the equator, then collapse it with a measurement and watch probability become certainty.",
    accent: "#a855f7",
    accentSoft: "#2a1147",
    icon: "quantum",
    tags: ["Qubits", "Superposition", "Bloch"],
    math: {
      title: "Qubit state & Born rule",
      formula: "|ψ⟩ = α|0⟩ + β|1⟩,   |α|² + |β|² = 1",
      where: [
        ["|α|²", "probability of measuring 0"],
        ["|β|²", "probability of measuring 1"],
        ["H", "Hadamard → equal superposition"],
      ],
    },
  },
];

export const MODULE_BY_ID = Object.fromEntries(MODULES.map((m) => [m.id, m]));

// Neutral hub accent used when nothing is hovered / launched.
export const HUB_ACCENT = "#a855f7";
