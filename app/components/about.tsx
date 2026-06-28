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
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">About Me</h2>
          <div className="mb-12 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-3">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group lg:col-span-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5">
              <Image
                src="https://cdnb.artstation.com/p/assets/images/images/099/825/317/smaller_square/arihant-jain-high-poly-bg-with-texture.jpg?1781082062"
                alt={siteData.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border border-gold/20" />
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border border-gold/20" />
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
          </motion.div>

          {/* Bio + Radar */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <h3 className="font-heading text-3xl font-light tracking-[0.05em]">{siteData.name}</h3>
            <p className="mt-2 font-heading text-lg tracking-[0.1em] text-gradient">
              {siteData.title}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              I am an AI Content Creator, 3D Artist and Motion Designer
              specializing in cinematic animation, AI commercials, visual
              storytelling and brand content. I blend cutting-edge AI tools with
              traditional 3D and motion design to create compelling visuals that
              help brands stand out.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/50">
              From photorealistic product renders to stylized environments and
              dynamic motion graphics, I bring ideas to life through digital
              artistry.
            </p>

            {/* Radar Chart */}
            <div className="mt-8">
              <RadarChart />
            </div>
          </motion.div>
        </div>

        {/* Social Proof Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {socialProof.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-white/5 bg-[#111827]/50 p-6 text-center transition-all duration-500 hover:border-gold/30"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold/20 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <div className="font-heading text-3xl font-bold text-gold">{item.value}</div>
                <div className="mt-1 text-sm font-medium text-white/70">{item.label}</div>
                <div className="mt-0.5 text-xs text-white/30">{item.description}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
