"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
      className="group relative rounded-2xl bg-[#111827]/50 p-8 border border-white/5 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.08)]"
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
          <Star key={i} size={14} className="fill-accent text-accent" />
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
  const [shuffled, setShuffled] = useState(testimonials);
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(shuffled.length / perPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffled((prev) => {
        const arr = [...prev];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const visible = shuffled.slice(page * perPage, page * perPage + perPage);

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
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">
            Client Reviews
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
          <p className="mx-auto max-w-2xl text-white/50">
            What clients say about working with me
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard testimonial={testimonial} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold/30 hover:text-gold"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-white/40">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold/30 hover:text-gold"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
