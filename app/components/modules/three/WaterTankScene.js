"use client";

/* ---------------------------------------------------------------------------
   WaterTankScene — React Three Fiber 3D glass tank with animated water.
   Props: { level (0-100), motorOn (bool) }
   --------------------------------------------------------------------------- */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, AdaptiveDpr } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ── Tank shell (glass cylinder) ────────────────────────────────────────── */
function TankShell() {
  return (
    <group>
      {/* Main glass body */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, 3, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#88ccff"
          transparent
          opacity={0.12}
          roughness={0.05}
          metalness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Wireframe edges */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, 3, 32, 1, true]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Bottom disc */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshPhysicalMaterial
          color="#88ccff"
          transparent
          opacity={0.15}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bottom wireframe */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.2, 32]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ── Water surface plane ────────────────────────────────────────────────── */
function WaterPlane({ level }) {
  const ref = useRef();
  const targetY = useMemo(() => {
    return -1.5 + (level / 100) * 3;
  }, [level]);

  useFrame((state) => {
    if (!ref.current) return;
    // Smooth lerp to target height
    ref.current.position.y += (targetY - ref.current.position.y) * 0.08;
    // Gentle wave animation
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.8) * 0.03;
    ref.current.position.z = Math.cos(t * 0.6) * 0.03;
  });

  const waterColor = useMemo(() => {
    if (level > 90) return "#ef4444";
    if (level > 70) return "#38bdf8";
    if (level > 30) return "#0ea5e9";
    return "#f59e0b";
  }, [level]);

  return (
    <mesh ref={ref} position={[0, targetY, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.18, 32]} />
      <meshPhysicalMaterial
        color={waterColor}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Level marker rings ─────────────────────────────────────────────────── */
function LevelMarkers() {
  const marks = [25, 50, 75, 100];
  return (
    <group>
      {marks.map((pct) => {
        const y = -1.5 + (pct / 100) * 3;
        return (
          <mesh key={pct} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.21, 1.24, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Inlet pipe at bottom ───────────────────────────────────────────────── */
function InletPipe({ motorOn }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = motorOn
      ? 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3
      : 0.15;
  });

  return (
    <group position={[-1.5, -1.3, 0]}>
      {/* Horizontal pipe */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshPhysicalMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Flow indicator */}
      <mesh ref={ref} position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Glow light inside tank ─────────────────────────────────────────────── */
function TankGlow({ level }) {
  const ref = useRef();
  const targetColor = useMemo(() => {
    if (level > 90) return new THREE.Color("#ef4444");
    if (level > 70) return new THREE.Color("#38bdf8");
    if (level > 30) return new THREE.Color("#0ea5e9");
    return new THREE.Color("#f59e0b");
  }, [level]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.color.lerp(targetColor, 0.05);
    ref.current.intensity = 0.4 + (level / 100) * 0.6;
  });

  return (
    <pointLight
      ref={ref}
      position={[0, -1.5 + (level / 100) * 3, 0]}
      intensity={0.5}
      distance={4}
    />
  );
}

/* ── Main scene ─────────────────────────────────────────────────────────── */
export default function WaterTankScene({ level = 50, motorOn = false }) {
  return (
    <Canvas
      camera={{ position: [3, 1.5, 3], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />

      <TankShell />
      <WaterPlane level={level} />
      <LevelMarkers />
      <InletPipe motorOn={motorOn} />
      <TankGlow level={level} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
