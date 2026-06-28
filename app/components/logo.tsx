"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { width: 32, height: 32, fontSize: 14, letterSpacing: 2 },
  md: { width: 44, height: 44, fontSize: 18, letterSpacing: 3 },
  lg: { width: 64, height: 64, fontSize: 26, letterSpacing: 4 },
  xl: { width: 120, height: 120, fontSize: 48, letterSpacing: 6 },
};

export function Logo({ size = "md", animated = true, className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: s.width, height: s.height }}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Outer ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          stroke="url(#logoGradient)"
          strokeWidth="0.8"
          opacity="0.4"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Inner decorative ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke="url(#logoGradient)"
          strokeWidth="0.3"
          opacity="0.2"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* A letter - left side */}
        <motion.path
          d="M28 72 L42 28 L44 28 L58 72"
          stroke="url(#logoGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* A crossbar */}
        <motion.line
          x1="34"
          y1="54"
          x2="52"
          y2="54"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* J letter - right side */}
        <motion.path
          d="M56 28 L56 58 C56 64 52 68 48 68"
          stroke="url(#logoGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* J serif top */}
        <motion.line
          x1="50"
          y1="28"
          x2="64"
          y2="28"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Decorative dot */}
        <motion.circle
          cx="50"
          cy="80"
          r="1.5"
          fill="url(#logoGradient)"
          initial={animated ? { scale: 0, opacity: 0 } : undefined}
          animate={animated ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

/* Minimal text logo for navbar */
export function TextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-baseline gap-0.5 ${className}`}>
      <span className="font-heading text-xl font-light tracking-[0.2em] text-white/90">
        A
      </span>
      <span className="text-[10px] text-accent/60">.</span>
      <span className="font-heading text-xl font-light tracking-[0.2em] text-white/90">
        J
      </span>
      <span className="text-[10px] text-accent/60">.</span>
    </div>
  );
}

/* Animated logo for loading screen */
export function LoadingLogo() {
  return (
    <div className="relative flex flex-col items-center gap-4">
      <Logo size="xl" animated={true} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="font-heading text-sm font-light tracking-[0.35em] uppercase text-white/50">
          Arihant Jain
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
      </motion.div>
    </div>
  );
}
