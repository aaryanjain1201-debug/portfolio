"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Logo } from "./logo";
import { scrollToSection } from "@/lib/smooth-scroll";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 py-16">
      {/* Background ambient */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8">
          {/* Animated logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Logo size="md" animated={false} className="opacity-60" />
          </motion.div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-heading text-sm font-light uppercase tracking-[0.3em] text-white/40">Arihant Jain</p>
            <p className="max-w-md text-xs leading-relaxed text-white/25">
              AI Content Creator • 3D Artist • Motion Designer — crafting cinematic visual experiences for brands worldwide.
            </p>
          </div>

          {/* Mini nav */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-wide text-white/30">
            <button onClick={() => scrollToSection("#projects")} className="transition-colors hover:text-highlight">Work</button>
            <button onClick={() => scrollToSection("#skills")} className="transition-colors hover:text-highlight">Skills</button>
            <button onClick={() => scrollToSection("#about")} className="transition-colors hover:text-highlight">About</button>
            <button onClick={() => scrollToSection("#contact")} className="transition-colors hover:text-highlight">Contact</button>
          </div>

          {/* Back to top */}
          <button
            onClick={() => scrollToSection("#top")}
            className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs tracking-wide text-white/40 transition-all hover:border-accent/30 hover:text-white"
          >
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </button>

          <div className="mt-4 text-[10px] tracking-[0.15em] text-white/15">
            © {new Date().getFullYear()} Arihant Jain. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
