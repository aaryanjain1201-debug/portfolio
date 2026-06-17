"use client";

import { useState } from "react";
import { useData } from "@/app/providers";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptySkill = { title: "", icon: "Box", tools: [] as string[] };
const iconOptions = ["Box", "Film", "Palette", "Brain", "Pencil", "Camera", "Monitor", "Layers"];

export default function AdminSkills() {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptySkill);
  const [toolsInput, setToolsInput] = useState("");

  const openAdd = () => {
    setEditing(null);
    setForm(emptySkill);
    setToolsInput("");
    setShowForm(true);
  };

  const openEdit = (s: typeof skills[0]) => {
    setEditing(s.title);
    setForm({ ...s });
    setToolsInput(s.tools.join(", "));
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tools = toolsInput.split(",").map((t) => t.trim()).filter(Boolean);
    if (editing) {
      updateSkill(editing, { ...form, tools });
    } else {
      addSkill({ ...form, tools });
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptySkill);
    setToolsInput("");
  };

  const handleDelete = (title: string) => {
    if (confirm(`Delete "${title}" skill category?`)) deleteSkill(title);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Skills</h1>
          <p className="mt-2 text-white/50">{skills.length} categories</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{editing ? "Edit Skill" : "Add Skill"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-white/60">Category Name</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  disabled={!!editing}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold disabled:opacity-50"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon} className="bg-[#111]">
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Tools (comma separated)</label>
                <input
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="e.g. Blender, Maya, Substance Painter"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-black transition hover:bg-gold/90"
                >
                  {editing ? "Update" : "Add"} Skill
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
        {skills.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-white/5 bg-neutral-900 p-5 transition hover:border-white/10"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{s.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-gold"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(s.title)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-white/30">Icon: {s.icon}</p>
            <ul className="mt-3 space-y-1.5">
              {s.tools.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/50">
                  <span className="h-1 w-1 rounded-full bg-gold/50" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
