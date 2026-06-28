"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Box, Film, Palette, Brain, Pencil } from "lucide-react";
import { skills } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Box,
  Film,
  Palette,
  Brain,
  Pencil,
};

function SkillCard({ category, index }: { category: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[category.icon] ?? Box;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-[#111827] p-7 border border-white/5 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]"
    >
      {/* Animated background glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold/5 blur-3xl transition-all duration-700 group-hover:bg-gold/10 group-hover:scale-150" />

      <div className="relative z-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]">
          <Icon size={26} />
        </div>
        <h3 className="text-lg font-bold transition-colors group-hover:text-gold">
          {category.title}
        </h3>
        <ul className="mt-4 space-y-2">
          {category.tools.map((tool) => (
            <li key={tool} className="flex items-center gap-2 text-sm text-white/50">
              <span className="h-1 w-1 rounded-full bg-gold/50" />
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">
            Skills & Tools
          </h2>
          <div className="mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
