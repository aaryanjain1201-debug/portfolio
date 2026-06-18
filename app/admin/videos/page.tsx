"use client";

import { useState } from "react";
import { useData } from "@/app/providers";
import { Plus, Pencil, Trash2, X, Play, LinkIcon } from "lucide-react";

export default function AdminVideos() {
  const { videos, addVideo, updateVideo, deleteVideo } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");

  const extractVideoId = (url: string): string => {
    const trimmed = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
      const m = trimmed.match(p);
      if (m) return m[1];
    }
    return trimmed;
  };

  const openAdd = () => {
    setEditing(null);
    setTitle("");
    setVideoUrl("");
    setCategory("");
    setShowForm(true);
  };

  const openEdit = (v: typeof videos[0]) => {
    setEditing(v.id);
    setTitle(v.title);
    setVideoUrl(v.id);
    setCategory(v.category);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (!videoId || videoId.length < 5) {
      alert("Please enter a valid YouTube URL or Video ID");
      return;
    }
    if (editing) {
      updateVideo(editing, { id: videoId, title, category });
    } else {
      addVideo({ id: videoId, title, category, thumbnail: "" });
    }
    setShowForm(false);
    setEditing(null);
    setTitle("");
    setVideoUrl("");
    setCategory("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this video?")) deleteVideo(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Videos</h1>
          <p className="mt-2 text-white/50">{videos.length} videos</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
        >
          <Plus size={16} /> Add Video
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing ? "Edit Video" : "Add Video"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-white/60">Video Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 3D Shoe Product Animation"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">YouTube Link or Video ID</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-gold">
                  <LinkIcon size={16} className="shrink-0 text-white/30" />
                  <input
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste YouTube URL or Video ID"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
                <p className="mt-1.5 text-xs text-white/30">
                  Paste full URL like <span className="text-gold/60">youtube.com/watch?v=ABC123</span> or just ID <span className="text-gold/60">ABC123</span>
                </p>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Category</label>
                <input
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. CGI Product, Motion Graphics, 3D Animation"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
                >
                  {editing ? "Update" : "Add"} Video
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="group overflow-hidden rounded-xl border border-white/5 bg-neutral-900 transition hover:border-white/10"
          >
            <div className="relative aspect-video">
              <img
                src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
                alt={v.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <Play size={32} className="text-gold" />
              </div>
            </div>
            <div className="p-4">
              <span className="mb-2 inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gold">
                {v.category}
              </span>
              <h3 className="mt-2 truncate font-bold">{v.title}</h3>
              <p className="mt-1 text-xs text-white/30 font-mono">{v.id}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openEdit(v)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-gold"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
