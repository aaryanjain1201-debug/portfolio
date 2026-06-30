"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X } from "lucide-react";

export function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showreel" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">
            Highlight Reel
          </p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">
            Showreel
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-12 overflow-hidden rounded-2xl border border-white/[0.06] bg-card"
        >
          <div className="relative aspect-video">
            <img
              src="https://i.ytimg.com/vi/f_jFNT7AS0I/maxresdefault.jpg"
              alt="Showreel"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-accent/90 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-75 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
              >
                <Play size={32} className="ml-1" />
              </motion.button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-xs font-medium tracking-wider text-white/40 uppercase">
              2024 — Cinematic 3D + Motion Reel
            </p>
          </div>
        </motion.div>
      </div>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setIsPlaying(false)}
        >
          <div className="relative w-full max-w-5xl px-4">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-4 text-white/50 transition-colors hover:text-white"
            >
              <X size={28} />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                src="https://www.youtube.com/embed/f_jFNT7AS0I?autoplay=1&rel=0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
