"use client";

import { siteData } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-white/30">
      &copy; {new Date().getFullYear()} {siteData.name}. All Rights Reserved.
    </footer>
  );
}
