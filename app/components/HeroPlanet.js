"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Planet({ accent }) {
  const mesh = useRef();
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    target.set(accent);
    mesh.current.material.color.lerp(target, Math.min(1, delta * 2));
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.03;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.8, 3]} />
      <meshStandardMaterial color={accent} wireframe transparent opacity={0.35} emissive={accent} emissiveIntensity={0.4} />
    </mesh>
  );
}

function Core({ accent }) {
  const mesh = useRef();
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    target.set(accent);
    mesh.current.material.color.lerp(target, Math.min(1, delta * 2));
    mesh.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color={accent} transparent opacity={0.12} emissive={accent} emissiveIntensity={0.6} roughness={0.8} />
    </mesh>
  );
}

function OrbitRing({ radius, speed, tilt, accent, thickness = 0.008 }) {
  const ring = useRef();
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((state, delta) => {
    if (!ring.current) return;
    target.set(accent);
    ring.current.material.color.lerp(target, Math.min(1, delta * 2));
    ring.current.rotation.z += delta * speed;
    const t = state.clock.elapsedTime;
    ring.current.rotation.x = tilt + Math.sin(t * 0.3) * 0.05;
  });

  return (
    <mesh ref={ring} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={accent} transparent opacity={0.5} />
    </mesh>
  );
}

function Satellite({ radius, speed, accent }) {
  const ref = useRef();
  const glowRef = useRef();
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    target.set(accent);
    ref.current.material.color.lerp(target, Math.min(1, delta * 2));
    if (glowRef.current) glowRef.current.material.color.lerp(target, Math.min(1, delta * 2));
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.7) * 0.3;
    if (glowRef.current) glowRef.current.position.copy(ref.current.position);
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={accent} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function DustRing({ accent }) {
  const ref = useRef();
  const COUNT = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.5 + (Math.random() - 0.5) * 1.2;
      const y = (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={accent} transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene({ accent }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={accent} />
      <pointLight position={[-3, -2, 4]} intensity={0.3} color="#4d7cff" />
      <Core accent={accent} />
      <Planet accent={accent} />
      <OrbitRing radius={2.6} speed={0.12} tilt={0.4} accent={accent} />
      <OrbitRing radius={3.1} speed={-0.08} tilt={0.8} accent={accent} thickness={0.005} />
      <OrbitRing radius={2.2} speed={0.18} tilt={1.2} accent={accent} thickness={0.004} />
      <Satellite radius={2.6} speed={0.5} accent={accent} />
      <Satellite radius={3.1} speed={-0.35} accent={accent} />
      <DustRing accent={accent} />
    </>
  );
}

export default function HeroPlanet({ accent = "#a855f7" }) {
  return (
    <div className="hero-planet-wrap">
      <div className="hero-planet-glow" />
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene accent={accent} />
      </Canvas>
    </div>
  );
}
