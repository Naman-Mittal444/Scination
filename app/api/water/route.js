/**
 * /api/water — Water Tank System endpoint.
 *
 * POST /api/water       → receive water level { level: number }
 * GET  /api/water       → return latest level + history
 * POST /api/water/motor → toggle motor { on: boolean }
 * GET  /api/water/motor → return motor status
 *
 * In-memory store (resets on serverless function restart).
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_HISTORY = 50;

const store = {
  level: 0,
  motorOn: false,
  history: [],
  lastUpdate: null,
};

export async function POST(request) {
  try {
    const url = new URL(request.url);

    // Motor control endpoint
    if (url.pathname.endsWith("/motor")) {
      const { on } = await request.json();
      store.motorOn = !!on;
      return NextResponse.json({ motorOn: store.motorOn });
    }

    // Water level endpoint
    const { level } = await request.json();
    if (typeof level !== "number" || isNaN(level)) {
      return NextResponse.json({ error: "Invalid level" }, { status: 400 });
    }

    const clamped = Math.max(0, Math.min(100, level));
    store.level = clamped;
    store.lastUpdate = Date.now();

    store.history.push({ level: clamped, ts: Date.now() });
    if (store.history.length > MAX_HISTORY) {
      store.history = store.history.slice(-MAX_HISTORY);
    }

    return NextResponse.json({ ok: true, level: clamped, motorOn: store.motorOn });
  } catch (err) {
    console.error("[water] POST error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  const url = new URL(request.url);

  // Motor status endpoint
  if (url.pathname.endsWith("/motor")) {
    return NextResponse.json({ motorOn: store.motorOn });
  }

  return NextResponse.json({
    level: store.level,
    motorOn: store.motorOn,
    history: store.history,
    lastUpdate: store.lastUpdate,
  });
}
