"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { Logo } from "./logo";
import { useActiveSection } from "@/lib/gsap-utils";
import { scrollToSection } from "@/lib/smooth-scroll";

const navLinks = [
  { label: "Work", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollToSection(`#${id}`);
  };

  return (
    <>
      {/* Floating glass pill navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed left-1/2 top-5 z-50 -translate-x-1/2 px-4"
      >
        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-[#0F172A]/70 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
              : "border-white/5 bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#top")}
            className="flex items-center gap-2.5 rounded-full px-2 py-1 transition-colors hover:bg-white/5"
            aria-label="Home"
          >
            <Logo size="sm" animated={false} />
            <span className="hidden font-heading text-sm font-medium tracking-wide text-white/80 sm:block">
              Arihant<span className="text-accent">.</span>
            </span>
          </button>

          {/* Divider */}
          <div className="mx-1 hidden h-5 w-px bg-white/10 md:block" />

          {/* Desktop Nav links with active indicator */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    active === link.id
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + admin */}
          <div className="hidden items-center gap-1 md:flex">
            <div className="mx-1 h-5 w-px bg-white/10" />
            <button
              onClick={() => handleNav("contact")}
              className="rounded-full bg-gradient-to-r from-accent to-accent-dark px-4 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
            >
              Let&apos;s Talk
            </button>
            <a
              href="/admin"
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
              title="Admin Panel"
            >
              <Settings size={13} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white/70 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050816]/98 backdrop-blur-2xl md:hidden"
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <ul className="relative flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNav(link.id)}
                    className="font-heading text-4xl font-light tracking-wide text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="/admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative mt-12 text-xs uppercase tracking-[0.3em] text-white/30"
            >
              Admin
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
