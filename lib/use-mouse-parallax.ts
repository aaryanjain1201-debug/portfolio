"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useCallback } from "react";

export function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 0.8 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const layer1X = useTransform(smoothX, (v) => v * 30);
  const layer1Y = useTransform(smoothY, (v) => v * 22);
  const layer2X = useTransform(smoothX, (v) => v * 15);
  const layer2Y = useTransform(smoothY, (v) => v * 11);
  const layer3X = useTransform(smoothX, (v) => v * 7);
  const layer3Y = useTransform(smoothY, (v) => v * 5);
  const textX = useTransform(smoothX, (v) => v * 2);
  const textY = useTransform(smoothY, (v) => v * 1.5);
  const rotateX = useTransform(smoothY, (v) => v * -2);
  const rotateY = useTransform(smoothX, (v) => v * 2);

  return {
    smoothX,
    smoothY,
    layer1X,
    layer1Y,
    layer2X,
    layer2Y,
    layer3X,
    layer3Y,
    textX,
    textY,
    rotateX,
    rotateY,
  };
}
