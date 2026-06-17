"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 p-8 border border-white/5 transition-all duration-500 hover:border-gold/30 hover:bg-neutral-900"
    >
      {/* Background glow */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gold/5 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-gold/10" />

      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold transition-all duration-500 group-hover:scale-110">
          <Icon size={26} />
        </div>

        <h3 className="text-xl font-bold transition-colors group-hover:text-gold">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/50">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-white/60"
            >
              <span className="h-1 w-1 rounded-full bg-gold/60" />
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
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl">
            Services
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-amber-300" />
          <p className="mx-auto max-w-2xl text-white/50">
            Premium 2D & 3D Animation, CGI, and Visual Storytelling for Brands and Businesses.
          </p>
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
