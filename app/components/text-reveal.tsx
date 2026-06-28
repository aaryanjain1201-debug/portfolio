"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealWordProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextRevealWord({ children, className = "", delay = 0, once = true }: TextRevealWordProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const words = children.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-[0.28em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextRevealChar({ children, className = "", delay = 0, once = true }: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const chars = children.split("");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0, rotateX: -80 }}
            animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{
              delay: delay + i * 0.025,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
}

export function SlideReveal({ children, className = "", direction = "up", delay = 0, duration = 0.8 }: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionMap = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, ...directionMap[direction], filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleReveal({ children, className = "", delay = 0 }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
