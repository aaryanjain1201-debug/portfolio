"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cinematic loading screen.
 * - Animated monogram with stroke-draw
 * - Live percentage counter
 * - Two-panel curtain reveal on exit
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Drive the counter from real progress-ish timing, easing out near 100.
    let p = 0;
    const tick = () => {
      // As we approach 100, slow down
      const step = p < 70 ? Math.random() * 12 + 4 : Math.random() * 4 + 1;
      p = Math.min(100, p + step);
      setProgress(Math.floor(p));
      if (p < 100) {
        setTimeout(tick, Math.random() * 160 + 80);
      } else {
        setTimeout(() => setDone(true), 450);
      }
    };
    const startTimer = setTimeout(tick, 250);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Two-panel curtain reveal */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#050816]"
            initial={{ x: 0 }}
            animate={done ? { x: "-100%" } : {}}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#050816]"
            initial={{ x: 0 }}
            animate={done ? { x: "100%" } : {}}
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Monogram with stroke draw */}
            <svg
              width="84"
              height="84"
              viewBox="0 0 100 100"
              fill="none"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#00F5FF" />
                </linearGradient>
              </defs>
              {/* Hex ring */}
              <motion.polygon
                points="50,4 91,27 91,73 50,96 9,73 9,27"
                stroke="url(#loader-grad)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              {/* AJ monogram */}
              <motion.path
                d="M34 68 L34 32 L52 32 M34 50 L46 50 M58 32 L58 68 L72 68"
                stroke="url(#loader-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 font-heading text-xs uppercase tracking-[0.5em] text-white/40"
            >
              Arihant Jain
            </motion.div>

            {/* Progress bar */}
            <div className="mt-6 h-px w-44 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-highlight"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Counter */}
            <div className="mt-3 font-mono text-[10px] tracking-[0.3em] text-white/30">
              {progress.toString().padStart(3, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
