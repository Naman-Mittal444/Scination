/**
 * EarthScene — Enhanced 3D scene with realistic Earth, atmospheric effects,
 * glowing debris, animated trails, and star field.
 *
 * Uses procedural textures (no external image files needed) and
 * custom shader materials for the atmosphere Fresnel glow.
 */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Procedural Earth Texture ── */
function createEarthTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d");

  // Ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, "#0a1628");
  oceanGrad.addColorStop(0.3, "#0d2240");
  oceanGrad.addColorStop(0.5, "#0f2848");
  oceanGrad.addColorStop(0.7, "#0d2240");
  oceanGrad.addColorStop(1, "#0a1628");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, size, canvas.height);

  // Continents — procedural landmasses
  const continents = [
    { x: 0.15, y: 0.3, w: 0.12, h: 0.25, rot: 0.1 },   // Americas-like
    { x: 0.35, y: 0.35, w: 0.08, h: 0.15, rot: -0.05 },
    { x: 0.52, y: 0.25, w: 0.15, h: 0.3, rot: 0.08 },   // Eurasia-like
    { x: 0.55, y: 0.55, w: 0.06, h: 0.12, rot: 0.15 },   // Africa-like
    { x: 0.72, y: 0.45, w: 0.08, h: 0.1, rot: -0.1 },    // Australia-like
    { x: 0.48, y: 0.65, w: 0.04, h: 0.06, rot: 0 },      // Antarctica hint
  ];

  continents.forEach(c => {
    ctx.save();
    ctx.translate(c.x * size, c.y * canvas.height);
    ctx.rotate(c.rot);
    // Main landmass
    ctx.fillStyle = "#1a3a2a";
    ctx.beginPath();
    ctx.ellipse(0, 0, c.w * size, c.h * canvas.height, 0, 0, Math.PI * 2);
    ctx.fill();
    // Coast detail
    ctx.fillStyle = "#1e4232";
    for (let i = 0; i < 8; i++) {
      const ox = (Math.random() - 0.5) * c.w * size * 0.8;
      const oy = (Math.random() - 0.5) * c.h * canvas.height * 0.8;
      const r = Math.random() * c.w * size * 0.3 + 4;
      ctx.beginPath();
      ctx.ellipse(ox, oy, r, r * 0.7, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  // Ice caps
  ctx.fillStyle = "rgba(180,210,230,0.15)";
  ctx.fillRect(0, 0, size, canvas.height * 0.08);
  ctx.fillRect(0, canvas.height * 0.92, size, canvas.height * 0.08);

  // City lights (scattered dots on land)
  ctx.fillStyle = "rgba(255,220,150,0.4)";
  for (let i = 0; i < 300; i++) {
    const lx = Math.random() * size;
    const ly = Math.random() * canvas.height;
    // Only on "land" areas (rough check)
    const pixel = ctx.getImageData(Math.floor(lx), Math.floor(ly), 1, 1).data;
    if (pixel[1] > pixel[2] && pixel[1] > 20) {
      ctx.beginPath();
      ctx.arc(lx, ly, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Cloud layer
  ctx.fillStyle = "rgba(200,220,240,0.04)";
  for (let i = 0; i < 60; i++) {
    const cx2 = Math.random() * size;
    const cy2 = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.ellipse(cx2, cy2, 20 + Math.random() * 40, 8 + Math.random() * 15, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function createBumpMap() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, canvas.height);

  // Mountain ridges
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * size;
    const y = Math.random() * canvas.height;
    const brightness = Math.floor(30 + Math.random() * 40);
    ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
    ctx.beginPath();
    ctx.ellipse(x, y, 5 + Math.random() * 15, 3 + Math.random() * 8, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/* ── Earth with realistic look ── */
export function Earth() {
  const meshRef = useRef();
  const cloudsRef = useRef();
  const [earthTex, bumpTex] = useMemo(() => [createEarthTexture(), createBumpMap()], []);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.015;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.008;
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthTex}
          bumpMap={bumpTex}
          bumpScale={0.03}
          specular={new THREE.Color("#1a3a5a")}
          shininess={15}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[2.01, 2.01, 2.01]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhongMaterial
          color="#aaccee"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh scale={[2.03, 2.03, 2.03]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4488cc" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#37e2d5" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Fresnel atmosphere rim */}
      <AtmosphereGlow />
    </group>
  );
}

/* ── Fresnel Atmosphere Shader ── */
function AtmosphereGlow() {
  const ref = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        glowColor: { value: new THREE.Color("#37e2d5") },
        viewVector: { value: new THREE.Vector3(0, 0, 6) },
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.7 - dot(vNormal, vNormel), 2.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          gl_FragColor = vec4(glowColor, intensity * 0.6);
        }
      `,
    });
  }, []);

  useFrame(({ camera }) => {
    if (material.uniforms) {
      material.uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(0, 0, 0));
    }
  });

  return (
    <mesh ref={ref} scale={[2.12, 2.12, 2.12]} material={material}>
      <sphereGeometry args={[1, 48, 48]} />
    </mesh>
  );
}

/* ── Star Field ── */
export function StarField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(2400);
    for (let i = 0; i < 2400; i += 3) {
      const r = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i] = r * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(800);
    for (let i = 0; i < 800; i++) s[i] = 0.3 + Math.random() * 1.2;
    return s;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={800} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={800} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.08} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Debris with glow sprite, animated trail, and large invisible hitbox ── */
export function DebrisObject({ obj, isSelected, onClick }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const glowRef = useRef();
  const hitboxRef = useRef();
  const ringRef = useRef();
  const trailPositions = useRef([]);
  const trailGeo2 = useMemo(() => new THREE.BufferGeometry(), []);

  // Pre-compute current position each frame and update all sub-objects
  useFrame(() => {
    const x = Math.cos(obj.angle) * obj.radius;
    const z = Math.sin(obj.angle) * obj.radius;
    const y = Math.sin(obj.angle * 0.5) * obj.inclination * obj.radius * 0.3;

    if (groupRef.current) groupRef.current.position.set(x, y, z);

    // Trail (attached to world, so we push world coords)
    trailPositions.current.push(new THREE.Vector3(x, y, z));
    if (trailPositions.current.length > 40) trailPositions.current.shift();
    if (trailPositions.current.length > 2) {
      trailGeo2.setFromPoints(trailPositions.current);
    }

    // Pulse the selection ring
    if (ringRef.current && isSelected) {
      const s = 1 + Math.sin(Date.now() * 0.005) * 0.15;
      ringRef.current.scale.set(s, s, s);
    }
  });

  const col = isSelected ? "#ffffff" : obj.sourceColor;
  const size = obj.riskLevel === "high" ? 0.12 : obj.riskLevel === "medium" ? 0.09 : 0.065;

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(obj.id);
  };

  return (
    <>
      {/* Trail line — in world space */}
      <line geometry={trailGeo2}>
        <lineBasicMaterial color={col} transparent opacity={0.25} linewidth={1} />
      </line>

      {/* Main group — positioned by useFrame */}
      <group ref={groupRef}>
        {/* Invisible hitbox — large sphere for easy clicking */}
        <mesh ref={hitboxRef} onClick={handleClick}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        {/* Visible debris core */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={col} />
        </mesh>

        {/* Glow sprite */}
        <sprite ref={glowRef} scale={[size * 5, size * 5, 1]}>
          <spriteMaterial
            color={col}
            transparent
            opacity={isSelected ? 0.7 : 0.3}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* Selection ring — pulses when selected */}
        {isSelected && (
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 2.5, size * 3, 32]} />
            <meshBasicMaterial color={col} transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </>
  );
}

/* ── Orbit Ring with dashed style ── */
export function OrbitRing({ radius, color, inclination = 0 }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 256;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 0.5) * inclination * radius * 0.3;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, inclination]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line geometry={geo}>
      <lineDashedMaterial color={color} transparent opacity={0.08} dashSize={0.1} gapSize={0.05} linewidth={1} />
    </line>
  );
}

/* ── Collision Risk Flashes ── */
export function CollisionFlash({ position, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 0.5 + Math.sin(clock.elapsedTime * 4) * 0.3;
      ref.current.scale.set(s, s, s);
      ref.current.material.opacity = 0.3 + Math.sin(clock.elapsedTime * 6) * 0.2;
    }
  });

  return (
    <sprite ref={ref} position={position} scale={[0.3, 0.3, 1]}>
      <spriteMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  );
}

/* ── Proximity Alert — pulsing ring between two close objects ── */
export function ProximityAlert({ objA, objB }) {
  const ref = useRef();

  const posA = useMemo(() => {
    const x = Math.cos(objA.angle) * objA.radius;
    const z = Math.sin(objA.angle) * objA.radius;
    const y = Math.sin(objA.angle * 0.5) * objA.inclination * objA.radius * 0.3;
    return new THREE.Vector3(x, y, z);
  }, [objA.angle, objA.radius, objA.inclination]);

  const posB = useMemo(() => {
    const x = Math.cos(objB.angle) * objB.radius;
    const z = Math.sin(objB.angle) * objB.radius;
    const y = Math.sin(objB.angle * 0.5) * objB.inclination * objB.radius * 0.3;
    return new THREE.Vector3(x, y, z);
  }, [objB.angle, objB.radius, objB.inclination]);

  const mid = useMemo(() => posA.clone().add(posB).multiplyScalar(0.5), [posA, posB]);
  const dist = useMemo(() => posA.distanceTo(posB), [posA, posB]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 0.6 + Math.sin(clock.elapsedTime * 8) * 0.4;
    ref.current.material.opacity = pulse * 0.5;
    const s = 0.08 + dist * 0.15;
    ref.current.scale.set(s, s, 1);
  });

  return (
    <group>
      {/* Alert ring at midpoint */}
      <sprite ref={ref} position={mid}>
        <spriteMaterial color="#ff4d4d" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* Warning line between objects */}
      <line geometry={new THREE.BufferGeometry().setFromPoints([posA, posB])}>
        <lineBasicMaterial color="#ff4d4d" transparent opacity={0.15} linewidth={1} />
      </line>
    </group>
  );
}

/**
 * Detect proximity pairs from object list.
 * Returns pairs where distance < threshold.
 */
export function detectProximityPairs(objects, threshold = 0.3) {
  const pairs = [];
  const positions = objects.map(obj => {
    const x = Math.cos(obj.angle) * obj.radius;
    const z = Math.sin(obj.angle) * obj.radius;
    const y = Math.sin(obj.angle * 0.5) * obj.inclination * obj.radius * 0.3;
    return { id: obj.id, x, y, z };
  });

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dz = positions[i].z - positions[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < threshold) {
        pairs.push({ idA: positions[i].id, idB: positions[j].id, dist });
      }
    }
  }
  return pairs;
}
