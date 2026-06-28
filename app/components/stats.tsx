"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";

const stats = [
  { target: 50, suffix: "+", label: "Projects Completed" },
  { target: 30, suffix: "+", label: "Global Clients" },
  { target: 3, suffix: "+", label: "Years Experience" },
  { target: 1000000, suffix: "+", label: "Seconds of Animation" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 px-6 py-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative"
            >
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
