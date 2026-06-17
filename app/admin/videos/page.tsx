"use client";

import { useState } from "react";
import { useData } from "@/app/providers";
import { Plus, Pencil, Trash2, X, Play } from "lucide-react";

const emptyVideo = {
  id: "",
  title: "",
  thumbnail: "",
  category: "",
};

export default function AdminVideos() {
  const { videos, addVideo, updateVideo, deleteVideo } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyVideo);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyVideo, id: Date.now().toString() });
    setShowForm(true);
  };

  const openEdit = (v: typeof videos[0]) => {
    setEditing(v.id);
    setForm({ ...v });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateVideo(editing, form);
    } else {
      addVideo({ ...form, id: Date.now().toString() });
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyVideo);
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
                <label className="mb-1 block text-sm text-white/60">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">YouTube Video ID</label>
                <input
                  required
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                  placeholder="e.g. f_jFNT7AS0I"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
                <p className="mt-1 text-xs text-white/30">From youtube.com/watch?v=VIDEO_ID</p>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Category</label>
                <input
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. CGI Product"
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
