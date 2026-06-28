"use client";

import { useState, useRef } from "react";
import { useData } from "@/app/providers";
import { Plus, Pencil, Trash2, X, Play, LinkIcon, HardDrive, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import {
  isYouTubeLink,
  extractYouTubeId,
  isGoogleDriveLink,
  extractDriveFileId,
  getYouTubeThumbnail,
  getDriveThumbnail,
} from "@/lib/video-utils";

export default function AdminVideos() {
  const { videos, addVideo, updateVideo, deleteVideo, moveVideo, reorderVideos } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const parseVideoUrl = (url: string) => {
    const trimmed = url.trim();

    if (isYouTubeLink(trimmed)) {
      const ytId = extractYouTubeId(trimmed);
      if (ytId) {
        return { id: ytId, source: "youtube" as const, thumbnail: getYouTubeThumbnail(ytId) };
      }
    }

    if (isGoogleDriveLink(trimmed)) {
      const driveId = extractDriveFileId(trimmed);
      if (driveId) {
        return { id: driveId, source: "drive" as const, thumbnail: getDriveThumbnail(driveId) };
      }
    }

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return { id: trimmed, source: "youtube" as const, thumbnail: getYouTubeThumbnail(trimmed) };
    }

    return null;
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
    setVideoUrl(v.source === "drive" ? `https://drive.google.com/file/d/${v.id}/view` : v.id);
    setCategory(v.category);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseVideoUrl(videoUrl);
    if (!parsed) {
      alert("Invalid URL. Paste a YouTube or Google Drive link.");
      return;
    }
    const data = {
      id: parsed.id,
      title,
      category,
      thumbnail: parsed.thumbnail,
      source: parsed.source,
    };
    if (editing) {
      updateVideo(editing, data);
    } else {
      addVideo(data);
    }
    setSaved(false);
    setShowForm(false);
    setEditing(null);
    setTitle("");
    setVideoUrl("");
    setCategory("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this video?")) {
      deleteVideo(id);
      setSaved(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: JSON.parse(localStorage.getItem("admin_projects") || "[]"),
          videos,
          skills: JSON.parse(localStorage.getItem("admin_skills") || "[]"),
          site: JSON.parse(localStorage.getItem("admin_site") || "{}"),
        }),
      });
      localStorage.setItem("admin_videos", JSON.stringify(videos));
      setSaved(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (e) {
      alert("Save failed. Try again.");
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex !== null && dragIndex !== index) {
      reorderVideos(dragIndex, index);
      setSaved(false);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    moveVideo(index, direction);
    setSaved(false);
  };

  const previewParsed = videoUrl ? parseVideoUrl(videoUrl) : null;

  return (
    <div>
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[200] rounded-lg bg-green-500/90 px-4 py-2.5 text-sm font-bold text-white shadow-lg">
          Saved successfully!
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Videos</h1>
          <p className="mt-2 text-white/50">{videos.length} videos — drag to reorder</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium ${saved ? "text-green-400" : "text-yellow-400"}`}>
            {saved ? "Saved" : "Unsaved changes"}
          </span>
          <button
            onClick={handleSave}
            disabled={saved}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
          >
            <Plus size={16} /> Add Video
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing ? "Edit Video" : "Add Video"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 rounded-lg bg-white/5 p-3">
              <p className="text-xs font-bold text-white/60">Supported Sources:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] text-red-400">
                  <Play size={10} /> YouTube URL
                </span>
                <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] text-blue-400">
                  <HardDrive size={10} /> Google Drive Link
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                <label className="mb-1 block text-sm text-white/60">Video Link</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-gold">
                  <LinkIcon size={16} className="shrink-0 text-white/30" />
                  <input
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="YouTube or Google Drive link"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
                <div className="mt-1.5 flex gap-2 text-[10px] text-white/30">
                  <span>YouTube: <span className="text-gold/50">youtube.com/watch?v=...</span></span>
                  <span>|</span>
                  <span>Drive: <span className="text-gold/50">drive.google.com/file/d/...</span></span>
                </div>
              </div>

              {previewParsed && (
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/40">Preview:</p>
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={previewParsed.thumbnail}
                      alt="Preview"
                      className="h-16 w-28 rounded object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${previewParsed.id}/hqdefault.jpg`;
                      }}
                    />
                    <div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          previewParsed.source === "youtube"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {previewParsed.source === "youtube" ? "YouTube" : "Google Drive"}
                      </span>
                      <p className="mt-1 text-xs text-white/50">ID: {previewParsed.id}</p>
                    </div>
                  </div>
                </div>
              )}

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

      <div className="mt-8 space-y-3">
        {videos.map((v, index) => (
          <div
            key={v.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`group flex items-center gap-4 rounded-xl border bg-neutral-900 p-3 transition ${
              dragIndex === index
                ? "border-gold/50 opacity-50"
                : dragOverIndex === index
                ? "border-gold"
                : "border-white/5 hover:border-white/10"
            }`}
          >
            {/* Drag Handle */}
            <div className="flex shrink-0 flex-col items-center gap-1">
              <GripVertical size={16} className="cursor-grab text-white/20 active:text-gold" />
              <span className="text-[10px] font-bold text-white/30">#{index + 1}</span>
            </div>

            {/* Move Up/Down */}
            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
                className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => handleMove(index, "down")}
                disabled={index === videos.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
              <img
                src={v.thumbnail}
                alt={v.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  if (v.source === "drive") {
                    (e.target as HTMLImageElement).src = getDriveThumbnail(v.id);
                  } else {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <Play size={20} className="text-gold" />
              </div>
              <span
                className={`absolute top-1 right-1 rounded px-1 py-0.5 text-[8px] font-bold ${
                  v.source === "drive"
                    ? "bg-blue-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                {v.source === "drive" ? "Drive" : "YT"}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <span className="mb-1 inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase text-gold">
                {v.category}
              </span>
              <h3 className="mt-1 truncate font-bold text-sm">{v.title}</h3>
              <p className="mt-0.5 truncate text-[11px] text-white/30">{v.id}</p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-2">
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
        ))}
      </div>
    </div>
  );
}
