"use client";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <Logo size="sm" animated={false} className="opacity-40" />
        <div className="flex flex-col items-center gap-2">
          <p className="font-heading text-xs font-light tracking-[0.3em] uppercase text-white/25">
            Arihant Jain
          </p>
          <p className="text-[10px] tracking-[0.15em] text-white/15">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
