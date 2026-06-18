"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Project Not Found</h1>
          <Link href="/" className="mt-6 inline-block text-gold underline">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-black/70"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-gold/90"
            >
              View on ArtStation
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>

        {/* Full image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/5"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 grid gap-8 rounded-2xl border border-white/5 bg-neutral-900/50 p-8 sm:grid-cols-2"
        >
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
              Project Details
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Calendar size={16} className="text-white/30" />
                <span>ArtStation Project</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Tag size={16} className="text-white/30" />
                <span>{project.tags.join(", ")}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
              Software Used
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-extrabold">More Projects</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group overflow-hidden rounded-xl border border-white/5 bg-neutral-900 transition-all hover:border-gold/30"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </div>
  );
}
