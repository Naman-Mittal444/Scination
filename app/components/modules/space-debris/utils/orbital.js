/**
 * Orbital mechanics utilities for space debris simulation.
 *
 * Real-world context: Space agencies like ESA and NASA use TLE (Two-Line Element)
 * sets to track orbital objects. We simplify the orbital math to Keplerian elements
 * for visualization purposes. In production systems, SGP4/SDP4 propagators are used.
 *
 * Smart City analogy: This is similar to how IoT gateways track asset positions
 * in a smart city — each node has orbital parameters (position, velocity, altitude)
 * that determine its path and collision risk.
 */

export const EARTH_RADIUS = 2;

export const ORBIT_BANDS = {
  LEO: { min: 2.1, max: 2.8, label: "Low Earth Orbit (200–2,000 km)", color: "#37e2d5" },
  MEO: { min: 2.8, max: 4.0, label: "Medium Earth Orbit (2,000–35,786 km)", color: "#ffd93d" },
  GEO: { min: 4.0, max: 4.5, label: "Geostationary Orbit (35,786 km)", color: "#ff8a3d" },
};

/**
 * Real historical debris events with full metadata.
 * Sources: ESA Space Debris Office, NASA Orbital Debris Program Office.
 */
export const DEBRIS_SOURCES = [
  {
    name: "COSMOS 1408",
    country: "Russia",
    countryFlag: "\u{1F1F7}\u{1F1FA}",
    mission: "Tselina-D electronic intelligence satellite",
    missionType: "Military reconnaissance",
    eventDescription: "Destroyed by Nudol ASAT missile test on 15 Nov 2021",
    eventYear: 2021,
    launchYear: 1982,
    altitude: 485,
    color: "#ff4d4d",
    // Weighted distribution: mostly fragments, some payload, some rocket body
    types: [
      { type: "Fragment", weight: 0.7, massRange: [0.1, 12], sizeRange: [1, 10] },
      { type: "Payload", weight: 0.15, massRange: [80, 250], sizeRange: [15, 40] },
      { type: "Rocket Body", weight: 0.15, massRange: [150, 600], sizeRange: [20, 50] },
    ],
  },
  {
    name: "FENGYUN 1C",
    country: "China",
    countryFlag: "\u{1F1E8}\u{1F1F3}",
    mission: "FY-1C polar-orbiting weather satellite",
    missionType: "Weather observation",
    eventDescription: "Destroyed by SC-19 ASAT missile on 11 Jan 2007",
    eventYear: 2007,
    launchYear: 1999,
    altitude: 850,
    color: "#ff8a3d",
    types: [
      { type: "Fragment", weight: 0.65, massRange: [0.2, 15], sizeRange: [1, 12] },
      { type: "Payload", weight: 0.2, massRange: [100, 300], sizeRange: [18, 45] },
      { type: "Rocket Body", weight: 0.15, massRange: [200, 700], sizeRange: [25, 55] },
    ],
  },
  {
    name: "IRIDIUM 33",
    country: "USA",
    countryFlag: "\u{1F1FA}\u{1F1F8}",
    mission: "Iridium constellation communications satellite",
    missionType: "Global telecommunications",
    eventDescription: "Collided with Cosmos 2251 on 10 Feb 2009 at 789 km altitude",
    eventYear: 2009,
    launchYear: 1997,
    altitude: 780,
    color: "#ffd93d",
    types: [
      { type: "Fragment", weight: 0.6, massRange: [0.1, 10], sizeRange: [1, 8] },
      { type: "Payload", weight: 0.25, massRange: [60, 200], sizeRange: [12, 35] },
      { type: "Rocket Body", weight: 0.15, massRange: [100, 500], sizeRange: [18, 45] },
    ],
  },
  {
    name: "COSMOS 2251",
    country: "Russia",
    countryFlag: "\u{1F1F7}\u{1F1FA}",
    mission: "Strela-2M military communications satellite",
    missionType: "Military communications",
    eventDescription: "Collided with Iridium 33 on 10 Feb 2009 at 789 km altitude",
    eventYear: 2009,
    launchYear: 1993,
    altitude: 790,
    color: "#a855f7",
    types: [
      { type: "Fragment", weight: 0.55, massRange: [0.2, 14], sizeRange: [1, 11] },
      { type: "Payload", weight: 0.2, massRange: [80, 280], sizeRange: [14, 38] },
      { type: "Rocket Body", weight: 0.25, massRange: [180, 650], sizeRange: [22, 52] },
    ],
  },
];

export function altitudeToRadius(altitudeKm) {
  const minAlt = 200, maxAlt = 36000;
  const minR = 2.1, maxR = 4.5;
  const t = Math.log(altitudeKm - minAlt + 1) / Math.log(maxAlt - minAlt + 1);
  return minR + t * (maxR - minR);
}

export function orbitalPeriod(altitudeKm) {
  const a = 6371 + altitudeKm;
  return Math.sqrt(a * a * a) * 0.0001;
}

/**
 * Estimate atmospheric drag lifetime in years based on altitude.
 * Below ~600 km, debris re-enters within years/decades.
 * Above ~1000 km, debris can persist for centuries.
 */
function estimateLifetime(altitudeKm) {
  if (altitudeKm < 400) return +(0.5 + Math.random() * 2).toFixed(1);
  if (altitudeKm < 500) return +(2 + Math.random() * 8).toFixed(1);
  if (altitudeKm < 600) return +(5 + Math.random() * 20).toFixed(1);
  if (altitudeKm < 700) return +(15 + Math.random() * 50).toFixed(1);
  if (altitudeKm < 800) return +(50 + Math.random() * 100).toFixed(1);
  if (altitudeKm < 1000) return +(100 + Math.random() * 300).toFixed(1);
  return +(200 + Math.random() * 800).toFixed(0); // centuries
}

/**
 * Pick a random type from the weighted pool.
 */
function pickType(types) {
  const roll = Math.random();
  let cumulative = 0;
  for (const t of types) {
    cumulative += t.weight;
    if (roll <= cumulative) return t;
  }
  return types[types.length - 1];
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Generate a single debris object with full metadata.
 */
export function generateDebrisObject(id, sourceIdx) {
  const source = DEBRIS_SOURCES[sourceIdx % DEBRIS_SOURCES.length];
  const altitude = source.altitude + (Math.random() - 0.5) * 150;
  const radius = altitudeToRadius(altitude);
  const chosenType = pickType(source.types);
  const massKg = +randRange(chosenType.massRange[0], chosenType.massRange[1]).toFixed(1);
  const sizeCm = +randRange(chosenType.sizeRange[0], chosenType.sizeRange[1]).toFixed(1);
  const lifetimeYears = estimateLifetime(altitude);
  const orbitBand = altitude < 2000 ? "LEO" : altitude < 35786 ? "MEO" : "GEO";

  return {
    id,
    name: `${source.name}-${String(id).padStart(3, "0")}`,
    source: source.name,
    sourceColor: source.color,
    // Identity metadata
    country: source.country,
    countryFlag: source.countryFlag,
    objectType: chosenType.type,
    mission: source.mission,
    missionType: source.missionType,
    eventDescription: source.eventDescription,
    eventYear: source.eventYear,
    launchYear: source.launchYear,
    massKg,
    sizeCm,
    lifetimeYears,
    orbitBand,
    // Orbital parameters
    altitude,
    radius,
    inclination: (Math.random() * 1.5 - 0.75),
    eccentricity: Math.random() * 0.02,
    raan: Math.random() * Math.PI * 2,
    argPerigee: Math.random() * Math.PI * 2,
    meanAnomaly: Math.random() * Math.PI * 2,
    // Animation
    angularSpeed: (2 * Math.PI) / (orbitalPeriod(altitude) * 60),
    angle: Math.random() * Math.PI * 2,
    // Risk
    riskLevel: altitude < 600 ? "high" : altitude < 1000 ? "medium" : "low",
    riskScore: altitude < 600 ? 0.7 + Math.random() * 0.3 : altitude < 1000 ? 0.3 + Math.random() * 0.4 : Math.random() * 0.3,
  };
}

export function generateCatalog(count = 80) {
  const objects = [];
  for (let i = 0; i < count; i++) {
    const sourceIdx = Math.floor(Math.random() * DEBRIS_SOURCES.length);
    objects.push(generateDebrisObject(i, sourceIdx));
  }
  return objects;
}

export function collisionRisk(objA, objB) {
  const altDiff = Math.abs(objA.altitude - objB.altitude);
  if (altDiff > 100) return 0;
  return Math.max(0, 1 - altDiff / 100) * 0.5;
}
