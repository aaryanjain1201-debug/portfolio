"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const categories = ["All", ...new Set(projects.flatMap((p) => p.tags))];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(124,58,237,0.10)]"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) scale(1.02)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
      }}
    >
      {/* Cursor radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(124, 58, 237, 0.06), transparent 40%)`,
        }}
      />

      <Link href={`/projects/${project.id}`} className="block" data-cursor="view">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <span className="flex items-center gap-1.5 rounded-full bg-accent/90 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">
              View <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-accent/20" />
        </div>

        <div className="p-5">
          <h3 className="font-bold transition-colors group-hover:text-highlight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-white/40 line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50 transition-colors group-hover:bg-accent/10 group-hover:text-accent-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeCategory));

  return (
    <section id="projects" className="relative px-6 py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">
            Selected Work
          </p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-xl text-sm text-white/40">
            A curated collection of 3D animations, motion graphics, and AI-powered visuals crafted for brands worldwide.
          </p>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <div key={project.id} className="mb-6 break-inside-avoid">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
