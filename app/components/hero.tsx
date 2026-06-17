"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "./magnetic-button";

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const name = siteData.name.split("");

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-amber-500/5 blur-[100px] delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Animated name */}
        <h1 className="overflow-hidden text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
          {name.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{
                textShadow: "0 0 80px rgba(212, 175, 55, 0.3)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Glowing subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative mt-6 text-lg font-medium sm:text-xl"
        >
          <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
            {siteData.title}
          </span>
          <span className="absolute -bottom-2 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl leading-relaxed text-white/50"
        >
          {siteData.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <MagneticButton
            href="#showreel"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-black transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            View Showreel
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-1"
            />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-sm font-bold text-gold transition-all hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            Hire Me
            <ExternalLink
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
