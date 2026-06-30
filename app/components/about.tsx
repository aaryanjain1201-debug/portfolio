"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteData } from "@/data/site";
import { RadarChart } from "./radar-chart";
import { Award, Globe, Users, Zap } from "lucide-react";

const socialProof = [
  { icon: Award, label: "Awards", value: "5+", description: "Industry Recognitions" },
  { icon: Globe, label: "Countries", value: "12+", description: "Global Clients" },
  { icon: Users, label: "Team", value: "3+", description: "Creative Professionals" },
  { icon: Zap, label: "Projects", value: "50+", description: "Delivered Successfully" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">The Artist</p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">About Me</h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group lg:col-span-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.06]">
              <Image
                src="https://cdnb.artstation.com/p/assets/images/images/099/825/317/smaller_square/arihant-jain-high-poly-bg-with-texture.jpg?1781082062"
                alt={siteData.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-accent/20" />
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border border-accent/20" />
            <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <h3 className="font-heading text-3xl font-light tracking-[0.05em]">{siteData.name}</h3>
            <p className="mt-2 font-heading text-lg tracking-[0.1em] text-gradient-violet">{siteData.title}</p>
            <p className="mt-6 text-base leading-relaxed text-white/50">
              I am an AI Content Creator, 3D Artist and Motion Designer
              specializing in cinematic animation, AI commercials, visual
              storytelling and brand content. I blend cutting-edge AI tools with
              traditional 3D and motion design to create compelling visuals that
              help brands stand out.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              From photorealistic product renders to stylized environments and
              dynamic motion graphics, I bring ideas to life through digital
              artistry.
            </p>
            <div className="mt-8"><RadarChart /></div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {socialProof.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="group rounded-2xl border border-white/[0.06] bg-card/50 p-6 text-center transition-all duration-500 hover:border-accent/25"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent-400 transition-all duration-500 group-hover:bg-accent/20 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <div className="font-heading text-3xl font-bold text-highlight">{item.value}</div>
                <div className="mt-1 text-sm font-medium text-white/60">{item.label}</div>
                <div className="mt-0.5 text-xs text-white/25">{item.description}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
