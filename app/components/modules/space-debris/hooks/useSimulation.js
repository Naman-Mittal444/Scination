/**
 * useSimulation hook — manages the debris simulation state.
 *
 * Real-world context: Space surveillance networks (like ESA's Space Situational
 * Awareness) continuously update object positions. Our simulation mirrors this
 * with a tick-based update loop.
 *
 * Smart City analogy: This is like a real-time asset tracking dashboard for
 * IoT devices in a smart city — each device has a position, status, and
 * risk assessment that updates on a schedule.
 */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { generateCatalog, generateDebrisObject } from "../utils/orbital";

export function useSimulation(initialCount = 80) {
  const [objects, setObjects] = useState(() => generateCatalog(initialCount));
  const [tick, setTick] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const timerRef = useRef(null);

  // Main simulation loop — updates object positions each frame
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTick(t => t + 1);
      setObjects(prev => prev.map(obj => ({
        ...obj,
        angle: obj.angle + obj.angularSpeed * speed,
      })));
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, speed]);

  // Add new debris objects (simulates a Kessler event or new tracking detection)
  const addDebris = useCallback((count = 10, sourceIdx) => {
    setObjects(prev => {
      const newObjs = [];
      for (let i = 0; i < count; i++) {
        const idx = sourceIdx !== undefined ? sourceIdx : Math.floor(Math.random() * 4);
        newObjs.push(generateDebrisObject(prev.length + i, idx));
      }
      return [...prev, ...newObjs];
    });
  }, []);

  // Remove objects to adjust count
  const setDebrisCount = useCallback((targetCount) => {
    setObjects(prev => {
      if (prev.length < targetCount) {
        const newObjs = [];
        for (let i = prev.length; i < targetCount; i++) {
          newObjs.push(generateDebrisObject(i, Math.floor(Math.random() * 4)));
        }
        return [...prev, ...newObjs];
      }
      return prev.slice(0, targetCount);
    });
  }, []);

  // Select object by ID
  const selectObject = useCallback((id) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  // Compute density status
  const density = objects.length < 50 ? "Low" : objects.length < 150 ? "Medium" : "High";
  const densityColor = objects.length < 50 ? "#00ff9c" : objects.length < 150 ? "#ffd93d" : "#ff4d4d";

  // Find selected object
  const selectedObject = selectedId !== null ? objects.find(o => o.id === selectedId) : null;

  return {
    objects, tick, speed, setSpeed,
    isRunning, setIsRunning,
    selectedId, selectedObject, selectObject,
    addDebris, setDebrisCount,
    density, densityColor,
  };
}
