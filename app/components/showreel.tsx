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
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">Showreel</h2>
          <div className="mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111827]"
        >
          <div className="relative aspect-video">
            <img
              src="https://i.ytimg.com/vi/f_jFNT7AS0I/maxresdefault.jpg"
              alt="Showreel"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gold/90 text-black opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-75 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)]"
              >
                <Play size={32} className="ml-1" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsPlaying(false)}
        >
          <div className="relative w-full max-w-4xl px-4">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-12 right-0 text-white/60 transition-colors hover:text-white"
            >
              <X size={28} />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl">
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
