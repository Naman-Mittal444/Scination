"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/* Shared pointer, updated from a window listener so the field can react to the
   mouse even though its canvas wrapper is pointer-events:none (so UI stays
   clickable). Normalized to -1..1. */
const pointer = { x: 0, y: 0 };
function usePointerTracking() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

/* ---------------------------------------------------------------------------
   Infinite particle field.
   - Thousands of GPU points drifting through space (depth via z-spread).
   - The whole field eases toward the "accent" color of the active module.
   - Mouse inertia: the field lags the pointer with a lerp, so it feels like
     you're nudging a volume of stars rather than snapping a camera.
   --------------------------------------------------------------------------- */
function ParticleField({ accent }) {
  const points = useRef();
  const target = useMemo(() => new THREE.Color(accent), []);
  const current = useMemo(() => new THREE.Color(accent), []);
  const drift = useRef({ x: 0, y: 0 });

  const COUNT = 2600;

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Distribute in a wide slab: broad x/y, deep z for parallax.
      positions[i * 3 + 0] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
      sizes[i] = 0.02 + Math.random() * 0.09;
    }
    return { positions, sizes };
  }, []);

  // Soft round sprite so points read as glowing motes, not squares.
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;

    // Ease color toward the requested accent (context-aware mood).
    target.set(accent);
    current.lerp(target, Math.min(1, delta * 1.8));
    points.current.material.color.copy(current);

    // Mouse inertia — the field trails the pointer (from window listener).
    const { x, y } = pointer;
    drift.current.x = THREE.MathUtils.lerp(drift.current.x, x * 1.6, 0.03);
    drift.current.y = THREE.MathUtils.lerp(drift.current.y, y * 1.0, 0.03);

    const t = state.clock.elapsedTime;
    points.current.rotation.y = drift.current.x * 0.12 + t * 0.012;
    points.current.rotation.x = -drift.current.y * 0.1;
    points.current.position.x = drift.current.x * 0.6;
    points.current.position.y = drift.current.y * 0.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color={accent}
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* A slow-turning wireframe core keeps the empty hub from feeling flat and
   gives the accent color a solid anchor to bloom around. */
function CoreHalo({ accent }) {
  const ring = useRef();
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: accent,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    []
  );
  const target = useMemo(() => new THREE.Color(accent), []);

  useFrame((state, delta) => {
    if (!ring.current) return;
    target.set(accent);
    mat.color.lerp(target, Math.min(1, delta * 1.8));
    ring.current.rotation.x += delta * 0.05;
    ring.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={ring} material={mat} position={[0, 0, -4]}>
      <icosahedronGeometry args={[7, 1]} />
    </mesh>
  );
}

export default function Scene3D({ accent = "#a855f7" }) {
  const [dpr, setDpr] = useState(1.5);
  usePointerTracking();

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12], fov: 50 }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <ParticleField accent={accent} />
        <CoreHalo accent={accent} />
      </Suspense>
    </Canvas>
  );
}
