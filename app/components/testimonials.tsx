"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonials[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative rounded-2xl bg-neutral-900/50 p-8 border border-white/5 transition-all duration-500 hover:border-gold/30"
    >
      <Quote
        size={40}
        className="mb-4 text-gold/20 transition-colors group-hover:text-gold/40"
      />

      <p className="text-sm leading-relaxed text-white/60">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      <div className="mt-4 border-t border-white/5 pt-4">
        <div className="font-bold">{testimonial.name}</div>
        <div className="text-sm text-white/40">
          {testimonial.role} — {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
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
            Client Reviews
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-amber-300" />
          <p className="mx-auto max-w-2xl text-white/50">
            What clients say about working with me
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
