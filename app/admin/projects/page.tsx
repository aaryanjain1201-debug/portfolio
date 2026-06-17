"use client";

import { useState } from "react";
import { useData } from "@/app/providers";
import { Project } from "@/data/projects";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";
import Image from "next/image";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  image: "",
  link: "",
  tags: [],
};

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyProject);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateProject(editing.id, form);
    } else {
      addProject({ ...form, id: Date.now().toString() });
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyProject);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) deleteProject(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Projects</h1>
          <p className="mt-2 text-white/50">{projects.length} projects</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing ? "Edit Project" : "Add Project"}</h2>
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
                <label className="mb-1 block text-sm text-white/60">Description</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Image URL</label>
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Project Link</label>
                <input
                  required
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Tags (comma separated)</label>
                <input
                  value={form.tags.join(", ")}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
                >
                  {editing ? "Update" : "Add"} Project
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
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-neutral-900 p-4 transition hover:border-white/10"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
              <Image src={p.image} alt={p.title} fill className="object-cover" sizes="96px" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-bold">{p.title}</h3>
              <p className="mt-0.5 truncate text-sm text-white/40">{p.description}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() => openEdit(p)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-gold"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
