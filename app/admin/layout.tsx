"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Video,
  Wrench,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Videos", href: "/admin/videos", icon: Video },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "#0A0E27" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#111827" }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
            <Link href="/admin" className="text-xl font-extrabold tracking-wider">
              AJ<span className="text-gold">.</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/50 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to site */}
          <div className="border-t border-white/5 px-3 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-all"
            >
              <ArrowLeft size={18} />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center gap-4 border-b border-white/5 px-4 py-3 lg:hidden" style={{ background: "#111827" }}>
        <button onClick={() => setSidebarOpen(true)} className="text-white/70">
          <Menu size={24} />
        </button>
        <span className="text-sm font-bold">Admin Panel</span>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="px-6 py-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
