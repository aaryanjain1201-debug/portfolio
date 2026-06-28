"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "./magnetic-button";
import { HeroGlass } from "./hero-glass";
import { HeroCards } from "./hero-cards";
import { useMouseParallax } from "@/lib/use-mouse-parallax";
import { useState, useEffect, useCallback } from "react";

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
    <span className="font-heading text-gradient">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-0.5 inline-block w-[2px] align-middle bg-gold"
        style={{ height: "1em" }}
      />
    </span>
  );
}

export function Hero() {
  const { textX, textY } = useMouseParallax();
  const textTransform = useMotionTemplate`translate(${textX}px, ${textY}px)`;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-15"
          poster="https://i.ytimg.com/vi/f_jFNT7AS0I/maxresdefault.jpg"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-abstract-digital-animation/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/70 via-[#0A0E27]/90 to-[#0A0E27]" />
      </div>

      {/* 3D Floating Project Cards */}
      <HeroCards />

      {/* Liquid Glass Shape */}
      <HeroGlass />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        style={{ transform: textTransform }}
      >
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
                textShadow: "0 0 100px rgba(0, 217, 255, 0.15)",
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
          className="mx-auto mt-4 h-px w-48 origin-left bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:w-64"
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
          className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base"
        >
          {siteData.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <MagneticButton
            href="#showreel"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-black transition-all hover:shadow-[0_0_40px_rgba(0,217,255,0.3)]"
          >
            View Showreel
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-1"
            />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-4 text-sm font-bold text-gold transition-all hover:border-gold hover:bg-gold/5 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
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
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/20"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-gold/30 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
