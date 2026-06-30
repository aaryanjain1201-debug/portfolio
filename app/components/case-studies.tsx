"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Clock, Play } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card transition-all duration-500 hover:border-accent/25 hover:shadow-[0_0_60px_rgba(124,58,237,0.08)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={study.thumbnail}
          alt={study.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Play size={22} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-400 backdrop-blur-sm">
            {study.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] text-white/60 backdrop-blur-sm">
          <Clock size={10} />{study.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-highlight">{study.title}</h3>
        <p className="mt-1 text-xs text-white/35">Client: {study.client}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/40 line-clamp-3">{study.overview}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {study.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/[0.03] px-3 py-2">
              <div className="text-[10px] text-white/25">{stat.label}</div>
              <div className="mt-0.5 text-sm font-bold text-accent-400">{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-highlight opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          View Case Study <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="relative px-6 py-24">
      <div className="pointer-events-none absolute right-1/4 top-0 h-80 w-80 rounded-full bg-highlight/5 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">Deep Dives</p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">Case Studies</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/40">The challenges, solutions, and results behind our most impactful projects.</p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
