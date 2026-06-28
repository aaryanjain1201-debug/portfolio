"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Heart, Clock, Shield } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description:
      "Hybrid AI + traditional pipeline for cinematic, engaging, and result-oriented content.",
  },
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "Every frame is crafted with attention to detail, ensuring the highest visual standards.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Efficient workflow without compromising quality. Deadlines are always respected.",
  },
  {
    icon: Shield,
    title: "Trusted by Brands",
    description:
      "50+ global clients trust us for their animation and visual content needs.",
  },
];

export function WhyChooseMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-6 py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">
            Why Choose Me
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
          <p className="mx-auto max-w-2xl text-white/50">
            Good work comes from clear communication and steady teamwork.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl bg-[#111827]/50 p-8 text-center border border-white/5 transition-all duration-500 hover:border-gold/30"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold/20 group-hover:scale-110">
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold transition-colors group-hover:text-gold">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm text-white/50">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
