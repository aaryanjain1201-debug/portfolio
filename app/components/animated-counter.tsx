"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

export function AnimatedCounter({ target, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Wider margin so it reliably triggers before scrolling past
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2200;
    const startTime = performance.now();

    // ease-out cubic for a premium settle
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    const raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="bg-gradient-to-br from-white via-white to-accent/60 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="mt-2 text-sm tracking-wide text-white/40">{label}</div>
    </motion.div>
  );
}
