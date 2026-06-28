"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Clock, Play } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { getDriveVideoEmbed } from "@/lib/video-utils";

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#111827] transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_60px_rgba(0,217,255,0.1)]"
    >
      {/* Thumbnail with video overlay */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={study.thumbnail}
          alt={study.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Play size={24} className="ml-1" />
          </motion.div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm">
            {study.category}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] text-white/70 backdrop-blur-sm">
          <Clock size={10} />
          {study.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-gold">
          {study.title}
        </h3>
        <p className="mt-1 text-xs text-white/40">Client: {study.client}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/50 line-clamp-3">
          {study.overview}
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {study.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/[0.02] px-3 py-2">
              <div className="text-[10px] text-white/30">{stat.label}</div>
              <div className="mt-0.5 text-sm font-bold text-gold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
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
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="mb-3 font-heading text-3xl font-light tracking-[0.1em] sm:text-4xl">
            Case Studies
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-accent" />
          <p className="mx-auto max-w-2xl text-white/50">
            Deep dives into our most impactful projects — the challenges, solutions, and results.
          </p>
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
