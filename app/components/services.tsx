"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon as React.ComponentType<{ size?: number }>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-8 transition-all duration-500 hover:border-accent/25 hover:bg-secondary/80"
    >
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-accent/10" />
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent-400 transition-all duration-500 group-hover:scale-110">
          <Icon size={26} />
        </div>
        <h3 className="text-xl font-bold transition-colors group-hover:text-highlight">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/40">{service.description}</p>
        <ul className="mt-5 space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-white/50">
              <span className="h-1 w-1 rounded-full bg-accent-400/60" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">What I Offer</p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">Services</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/40">
            Premium 2D & 3D Animation, CGI, and Visual Storytelling for Brands and Businesses.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
