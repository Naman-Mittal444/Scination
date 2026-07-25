/**
 * SpaceDebris — Main module with fullscreen, proximity alerts, dossier panel.
 */
"use client";

import { Suspense, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Earth, DebrisObject, OrbitRing, StarField, ProximityAlert, detectProximityPairs } from "./scenes/EarthScene";
import { Dashboard } from "./components/Dashboard";
import { Controls } from "./components/Controls";
import { useSimulation } from "./hooks/useSimulation";
import { ORBIT_BANDS } from "./utils/orbital";
import ModuleShell from "../ModuleShell";
import { MODULE_BY_ID } from "../../../lib/modules";
import { SpaceHowItWorks } from "../content/SpaceContent";

const HOW_IT_WORKS = <SpaceHowItWorks />;

export default function SpaceDebris() {
  const m = MODULE_BY_ID["space"];
  const sim = useSimulation(80);
  const canvasWrapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Proximity detection — check every 20 ticks
  const [proximityPairs, setProximityPairs] = useState([]);
  useEffect(() => {
    if (sim.tick % 20 === 0) {
      const pairs = detectProximityPairs(sim.objects, 0.35);
      setProximityPairs(pairs);
    }
  }, [sim.tick, sim.objects]);

  const proximityIds = useMemo(() => {
    const set = new Set();
    proximityPairs.forEach(p => { set.add(p.idA); set.add(p.idB); });
    return set;
  }, [proximityPairs]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!canvasWrapRef.current) return;
    if (!document.fullscreenElement) {
      canvasWrapRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <ModuleShell
      module={m}
      howItWorks={HOW_IT_WORKS}
      about="Space debris tracking using TLE-derived orbital parameters and 3D visualization. Inspired by ESA's Space Situational Awareness program."
    >
      {/* HUD Bar */}
      <div className="sd-hud">
        <div className="sd-hud-pill">
          <span className="sd-dot" style={{ background: "#00ff9c" }} />
          <span>ACTIVE DEBRIS TRACKING</span>
        </div>
        <div className="sd-hud-pill">
          OBJECTS <b style={{ color: "#37e2d5" }}>{sim.objects.length}</b>
        </div>
        <div className="sd-hud-pill">
          STATUS <b style={{ color: sim.densityColor }}>{sim.density.toUpperCase()}</b>
        </div>
        {proximityPairs.length > 0 && (
          <div className="sd-hud-pill" style={{ background: "rgba(255,77,77,0.1)", borderColor: "rgba(255,77,77,0.25)" }}>
            <span className="sd-dot" style={{ background: "#ff4d4d", animation: "blink 0.8s infinite" }} />
            <span style={{ color: "#ff4d4d", fontWeight: 600 }}>
              {proximityPairs.length} PROXIM ALERT{proximityPairs.length > 1 ? "S" : ""}
            </span>
          </div>
        )}
        <div className="sd-hud-pill">ORBITAL MONITORING SYSTEM</div>
        <div className="sd-hud-pill">
          {sim.isRunning ? (
            <><span className="sd-dot" style={{ background: "#00ff9c", animation: "blink 1.5s infinite" }} /> <span style={{ color: "#00ff9c" }}>LIVE</span></>
          ) : (
            <><span className="sd-dot" style={{ background: "#ffd93d" }} /> <span style={{ color: "#ffd93d" }}>PAUSED</span></>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className={`sd-main ${isFullscreen ? "sd-main-fullscreen" : ""}`}>
        <div className={`sd-canvas-wrap ${isFullscreen ? "sd-canvas-fullscreen" : ""}`} ref={canvasWrapRef}>
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
            style={{ background: "#020408" }}
          >
            <ambientLight intensity={0.2} />
            <directionalLight position={[8, 4, 6]} intensity={1.8} color="#ffffff" />
            <directionalLight position={[-4, -2, -4]} intensity={0.15} color="#37e2d5" />
            <pointLight position={[0, 0, 0]} intensity={0.3} color="#ff8844" distance={4} />

            <Suspense fallback={null}>
              <StarField />
              <Earth />

              {Object.entries(ORBIT_BANDS).map(([key, band]) => (
                <OrbitRing key={key} radius={(band.min + band.max) / 2} color={band.color} />
              ))}

              {sim.objects.map(obj => (
                <DebrisObject
                  key={obj.id}
                  obj={obj}
                  isSelected={sim.selectedId === obj.id}
                  onClick={sim.selectObject}
                />
              ))}

              {proximityPairs.map((pair, i) => {
                const objA = sim.objects.find(o => o.id === pair.idA);
                const objB = sim.objects.find(o => o.id === pair.idB);
                if (!objA || !objB) return null;
                return <ProximityAlert key={`prox-${i}`} objA={objA} objB={objB} />;
              })}
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={12}
              autoRotate={!sim.isRunning}
              autoRotateSpeed={0.3}
              enableDamping
              dampingFactor={0.05}
              maxPolarAngle={Math.PI * 0.85}
              minPolarAngle={Math.PI * 0.15}
            />
          </Canvas>

          {/* Fullscreen button */}
          <button className="sd-fullscreen-btn" onClick={toggleFullscreen} title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 1v3H1M11 1v3h4M1 11h3v4M15 11h-3v4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4" />
              </svg>
            )}
          </button>

          {/* HUD overlays */}
          <div className="sd-canvas-label sd-canvas-label-tl">
            <span style={{ color: "#ff4d4d", animation: "blink 1.5s infinite" }}>&#9679;</span> REC
          </div>
          <div className="sd-canvas-label sd-canvas-label-tl" style={{ top: 28 }}>
            SPACE DEBRIS TRACKING SYSTEM
          </div>
          <div className="sd-canvas-label sd-canvas-label-tr">
            T+{Math.floor(sim.tick / 1200)}h {String(Math.floor((sim.tick % 1200) / 20)).padStart(2, "0")}m
          </div>
          <div className="sd-canvas-label sd-canvas-label-tr" style={{ top: 28 }}>
            {new Date().toLocaleTimeString()}
          </div>
          <div className="sd-canvas-label sd-canvas-label-bl">
            CLICK TO INSPECT &#8226; SCROLL TO ZOOM &#8226; DRAG TO ROTATE
          </div>
          <div className="sd-canvas-label sd-canvas-label-br">
            ALT: LEO 200–2000km &#8226; MEO 2000–35786km &#8226; GEO 35786km
          </div>

          <div className="sd-corner sd-corner-tl" />
          <div className="sd-corner sd-corner-tr" />
          <div className="sd-corner sd-corner-bl" />
          <div className="sd-corner sd-corner-br" />
        </div>

        {!isFullscreen && (
          <div className="sd-panels">
            <Dashboard
              objects={sim.objects}
              density={sim.density}
              densityColor={sim.densityColor}
              tick={sim.tick}
              proximityCount={proximityPairs.length}
              proximityIds={proximityIds}
            />
            <Controls
              speed={sim.speed}
              setSpeed={sim.setSpeed}
              isRunning={sim.isRunning}
              setIsRunning={sim.setIsRunning}
              objects={sim.objects}
              setDebrisCount={sim.setDebrisCount}
              addDebris={sim.addDebris}
              selectedObject={sim.selectedObject}
              selectObject={sim.selectObject}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .sd-fullscreen-btn {
          position: absolute; top: 10px; right: 10px; z-index: 10;
          width: 32px; height: 32px; border-radius: 6px;
          background: rgba(0,0,0,0.5); border: 1px solid rgba(55,226,213,0.25);
          color: rgba(55,226,213,0.7); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px); transition: all 0.2s;
        }
        .sd-fullscreen-btn:hover {
          background: rgba(55,226,213,0.15); color: #37e2d5;
          border-color: rgba(55,226,213,0.5);
        }
        .sd-main-fullscreen {
          position: fixed !important; inset: 0; z-index: 9999;
          grid-template-columns: 1fr !important; background: #020408;
        }
        .sd-canvas-fullscreen {
          min-height: 100vh !important; border-radius: 0 !important;
          border: none !important;
        }
      `}</style>
    </ModuleShell>
  );
}
