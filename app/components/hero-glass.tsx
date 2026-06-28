"use client";

import { motion } from "framer-motion";

export function HeroGlass() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Main glass blob */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          width: "min(600px, 80vw)",
          height: "min(380px, 50vh)",
          background: "rgba(0, 217, 255, 0.02)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          border: "1px solid rgba(0, 217, 255, 0.06)",
          boxShadow: "0 0 60px rgba(0, 217, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          animation: "blob-morph 14s ease-in-out infinite",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Ambient light - electric blue */}
      <motion.div
        className="absolute h-48 w-48 rounded-full blur-[80px]"
        style={{ background: "rgba(0, 217, 255, 0.03)" }}
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ambient light - gold accent */}
      <motion.div
        className="absolute h-40 w-40 rounded-full blur-[70px]"
        style={{ background: "rgba(255, 184, 0, 0.02)" }}
        animate={{
          x: [0, -18, 0],
          y: [0, 12, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
