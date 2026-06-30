"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ArrowUpRight, Send } from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "./magnetic-button";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
function ArtStationIcon() {
  return <span className="text-xs font-extrabold">AS</span>;
}
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const socials: SocialLink[] = [
  { label: "Instagram", href: siteData.social.instagram, icon: InstagramIcon },
  { label: "YouTube", href: siteData.social.youtube, icon: YoutubeIcon },
  { label: "ArtStation", href: siteData.social.artstation, icon: ArtStationIcon },
  { label: "LinkedIn", href: siteData.social.linkedin, icon: LinkedinIcon },
  { label: "Twitter", href: siteData.social.twitter, icon: TwitterIcon },
].filter((s) => s.href && s.href !== "#");

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `mailto:${siteData.email}?subject=Portfolio Inquiry from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.name} (${formState.email})`,
      "_blank"
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px]" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="text-center">
            <h2 className="font-heading text-4xl font-light tracking-[0.05em] sm:text-5xl lg:text-6xl">
              Let&apos;s Create<br />
              <span className="text-gradient-violet">Something Amazing</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm text-white/40">
              Available for freelance projects, collaborations and studio opportunities.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="rounded-2xl border border-white/[0.06] bg-card/70 p-8"
            >
              <h3 className="font-heading text-lg font-bold">Send a Message</h3>
              <p className="mt-1 text-sm text-white/35">I&apos;ll get back to you within 24 hours</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-white/55">Name</label>
                  <input required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/55">Email</label>
                  <input required type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/55">Message</label>
                  <textarea required value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} rows={4} placeholder="Tell me about your project..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                  {submitted ? "Sent!" : "Send Message"}<Send size={14} />
                </button>
              </div>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.7 }} className="space-y-6">
              <div className="rounded-2xl border border-white/[0.06] bg-card/70 p-8">
                <h3 className="font-heading text-lg font-bold">Book a Call</h3>
                <p className="mt-1 text-sm text-white/35">Schedule a free 15-minute consultation</p>
                <div className="mt-4 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
                  <div className="text-center">
                    <p className="text-sm text-white/25">Calendly embed goes here</p>
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-highlight hover:underline">
                      Open Calendly <ArrowUpRight size={10} />
                    </a>
                  </div>
                </div>
              </div>

              <MagneticButton
                href={`mailto:${siteData.email}`}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-card/70 p-6 transition-all duration-500 hover:border-accent/25 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
              >
                <Mail size={20} className="text-highlight" />
                <div className="text-left">
                  <div className="text-sm font-bold">Quick Email</div>
                  <div className="text-xs text-white/35">{siteData.email}</div>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>

              <div className="flex items-center justify-center gap-4">
                {socials.map((social) => {
                  const Icon = social.icon as React.ComponentType;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-accent/50 hover:text-accent-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]" title={social.label}>
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
