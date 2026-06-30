"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.06] bg-card/50 p-8 transition-all duration-500 hover:border-accent/20">
      <Quote size={40} className="mb-4 text-accent/15 transition-colors group-hover:text-accent/30" />
      <p className="text-sm leading-relaxed text-white/55">&ldquo;{testimonial.content}&rdquo;</p>
      <div className="mt-6 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-highlight text-highlight" />
        ))}
      </div>
      <div className="mt-4 border-t border-white/5 pt-4">
        <div className="font-bold">{testimonial.name}</div>
        <div className="text-sm text-white/35">{testimonial.role} — {testimonial.company}</div>
      </div>
    </div>
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
      <div className="relative mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">Testimonials</p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">Client Reviews</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/40">What clients say about working with me</p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((testimonial) => (
              <motion.div key={testimonial.name} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-accent/30 hover:text-accent-400"><ChevronLeft size={16} /></button>
            <span className="text-sm text-white/35">{page + 1} / {totalPages}</span>
            <button onClick={() => setPage((p) => (p + 1) % totalPages)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-accent/30 hover:text-accent-400"><ChevronRight size={16} /></button>
          </div>
        )}
      </div>
    </section>
  );
}
