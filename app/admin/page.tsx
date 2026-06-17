"use client";

import { useData } from "@/app/providers";
import { FolderOpen, Video, Wrench, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { projects, videos, skills } = useData();

  const cards = [
    {
      label: "Projects",
      count: projects.length,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      label: "Videos",
      count: videos.length,
      icon: Video,
      href: "/admin/videos",
      color: "from-purple-500/20 to-purple-600/5",
    },
    {
      label: "Skills",
      count: skills.length,
      icon: Wrench,
      href: "/admin/skills",
      color: "from-green-500/20 to-green-600/5",
    },
    {
      label: "Site Settings",
      count: null,
      icon: Settings,
      href: "/admin/settings",
      color: "from-orange-500/20 to-orange-600/5",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="mt-2 text-white/50">Manage your portfolio content</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-white/5 bg-neutral-900 p-6 transition-all hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}>
                <Icon size={22} className="text-white/80" />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-gold">
                {card.count ?? "—"}
              </div>
              <div className="mt-1 text-sm text-white/50">{card.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-white/5 bg-neutral-900 p-6">
        <h2 className="text-lg font-bold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-black transition hover:bg-gold/90"
          >
            + Add Project
          </Link>
          <Link
            href="/admin/videos"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            + Add Video
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Edit Site Info
          </Link>
        </div>
      </div>
    </div>
  );
}
