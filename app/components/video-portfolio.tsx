"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useData } from "@/app/providers";
import { getDriveVideoEmbed } from "@/lib/video-utils";

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: { id: string; title: string; thumbnail: string; category: string; source?: string };
  index: number;
  onPlay: (id: string, source?: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-card"
      onClick={() => onPlay(video.id, video.source)}
      data-cursor="view"
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-75 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
            <Play size={22} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="mb-1 inline-block rounded-full bg-accent/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-400 backdrop-blur-sm">
            {video.category}
          </span>
          <h3 className="text-sm font-bold">{video.title}</h3>
        </div>
        {video.source === "drive" && (
          <span className="absolute top-2 right-2 rounded-full bg-highlight/80 px-2.5 py-0.5 text-[10px] font-bold text-black">
            Drive
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function VideoPortfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { videos } = useData();
  const [playingVideo, setPlayingVideo] = useState<{ id: string; source?: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(videos.map((v) => v.category))];
  const filteredVideos =
    activeCategory === "All" ? videos : videos.filter((v) => v.category === activeCategory);

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
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">
            Motion Reel
          </p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">
            Video Portfolio
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/40">
            Animation, CGI product visuals, architectural walkthroughs, and cinematic storytelling.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              onPlay={(id, source) => setPlayingVideo({ id, source })}
            />
          ))}
        </div>
      </div>

      {playingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-5xl px-4">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-12 right-4 text-white/50 transition-colors hover:text-white"
            >
              <X size={28} />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10">
              {playingVideo.source === "drive" ? (
                <iframe
                  src={getDriveVideoEmbed(playingVideo.id)}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
