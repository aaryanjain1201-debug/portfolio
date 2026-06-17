"use client";

import { useState } from "react";
import { useData } from "@/app/providers";
import { Save, RotateCcw } from "lucide-react";

export default function AdminSettings() {
  const { site, updateSite, resetToDefaults } = useData();
  const [form, setForm] = useState({ ...site });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSite(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all data to defaults? This cannot be undone.")) {
      resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Site Settings</h1>
          <p className="mt-2 text-white/50">Update your profile info</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
        >
          <RotateCcw size={14} /> Reset All Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        <div className="rounded-2xl border border-white/5 bg-neutral-900 p-6">
          <h2 className="text-lg font-bold">Basic Info</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/60">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Short Name (Logo)</label>
              <input
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Title / Tagline</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-neutral-900 p-6">
          <h2 className="text-lg font-bold">Social Links</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/60">ArtStation</label>
              <input
                value={form.social.artstation}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, artstation: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Instagram</label>
              <input
                value={form.social.instagram}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, instagram: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">YouTube</label>
              <input
                value={form.social.youtube}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, youtube: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">LinkedIn</label>
              <input
                value={form.social.linkedin}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">Twitter / X</label>
              <input
                value={form.social.twitter}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, twitter: e.target.value } })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-gold/90"
        >
          <Save size={16} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
