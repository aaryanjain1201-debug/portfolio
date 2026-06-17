"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteData } from "@/data/site";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl">About Me</h2>
          <div className="mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-amber-300" />
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5">
              <Image
                src="https://cdnb.artstation.com/p/assets/images/images/099/825/317/smaller_square/arihant-jain-high-poly-bg-with-texture.jpg?1781082062"
                alt={siteData.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-gold/20" />
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border border-gold/20" />
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-3xl font-bold">{siteData.name}</h3>
            <p className="mt-2 bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
              {siteData.title}
            </p>
            <p className="mt-6 leading-relaxed text-white/50">
              I am an AI Content Creator, 3D Artist and Motion Designer
              specializing in cinematic animation, AI commercials, visual
              storytelling and brand content. I blend cutting-edge AI tools with
              traditional 3D and motion design to create compelling visuals that
              help brands stand out.
            </p>
            <p className="mt-4 leading-relaxed text-white/50">
              From photorealistic product renders to stylized environments and
              dynamic motion graphics, I bring ideas to life through digital
              artistry.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "50+", label: "Projects" },
                { value: "3+", label: "Years Exp" },
                { value: "30+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-gold sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
