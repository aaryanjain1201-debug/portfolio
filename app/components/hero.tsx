"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { siteData } from "@/data/site";
import { scrollToSection } from "@/lib/smooth-scroll";
import { useMouseParallax } from "@/lib/use-mouse-parallax";
import { useState, useEffect, useCallback } from "react";

// Lazy-load the heavy 3D scene — client only, never SSR'd
const HeroCanvas = dynamic(() => import("./hero-canvas"), {
  ssr: false,
  loading: () => null,
});

const name = siteData.name.split("");

const headlines = [
  "AI Content Creator",
  "3D Artist",
  "Motion Designer",
  "Visual Storyteller",
];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = headlines[index];
    if (!isDeleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % headlines.length);
        return;
      }
    }
  }, [text, isDeleting, index]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="font-heading text-gradient-violet">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-0.5 inline-block w-[2px] align-middle bg-highlight"
        style={{ height: "1em" }}
      />
    </span>
  );
}

export function Hero() {
  const { textX, textY } = useMouseParallax();
  const textTransform = useMotionTemplate`translate(${textX}px, ${textY}px)`;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-[1]">
        <HeroCanvas />
      </div>

      {/* Aurora ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-highlight/10 blur-[120px]" />
      </div>

      {/* Vignette + gradient fade to background */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-[#050816]/40 via-transparent to-[#050816]" />
      <div className="pointer-events-none absolute inset-0 z-[3] [background:radial-gradient(ellipse_at_center,transparent_30%,#050816_85%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        style={{ transform: textTransform }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-xs tracking-wide text-white/60">
            Available for freelance
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="font-heading overflow-hidden text-6xl font-light tracking-[0.05em] sm:text-8xl lg:text-[9rem]">
          {name.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 120, opacity: 0, rotateX: -60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: 0.6 + i * 0.04,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{
                textShadow: "0 0 100px rgba(124, 58, 237, 0.25)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 h-px w-64 origin-left bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />

        {/* Typewriter subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative mt-8 text-xl font-light tracking-[0.15em] sm:text-2xl"
        >
          <TypewriterText />
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
        >
          {siteData.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            data-cursor="view"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-8 py-4 text-sm font-bold text-white transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105"
          >
            <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
            View Projects
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            data-cursor="view"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition-all hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
          >
            Hire Me
            <ExternalLink
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("#projects")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
