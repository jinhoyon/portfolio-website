"use client";

import { useEffect, useRef } from "react";
import { ChladniSimulation } from "./simulation";
import { INITIAL_PATTERN, pickNextPattern } from "./sequence";

const DESKTOP_PARTICLES = 36000;
const REDUCED_PARTICLES = 10000;

export default function ChladniBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const particleCount =
      reducedMotion || isMobile ? REDUCED_PARTICLES : DESKTOP_PARTICLES;

    const sim = new ChladniSimulation({
      container,
      canvas,
      particleCount,
      reducedMotion,
    });

    const resizeObserver = new ResizeObserver(() => {
      sim.resize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const handleMotionChange = () =>
      sim.setReducedMotion(reducedMotionQuery.matches);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    // Autonomous drift: hold each pattern a while, then glide to the
    // next. The simulation eases n/m over several seconds on its own,
    // so this loop just needs to pick where it's headed.
    let currentPattern = INITIAL_PATTERN;
    let timeoutId: number;
    const scheduleNext = () => {
      const holdMs = 8000 + Math.random() * 6000;
      timeoutId = window.setTimeout(() => {
        currentPattern = pickNextPattern(currentPattern);
        sim.setTargetHarmonics(currentPattern[0], currentPattern[1]);
        scheduleNext();
      }, holdMs);
    };
    scheduleNext();

    return () => {
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      sim.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
