"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "./magnetic-button";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
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

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gold/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Let&apos;s Create
            <br />
            <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/50">
            Available for freelance projects, collaborations and studio
            opportunities.
          </p>

          <MagneticButton
            href={`mailto:${siteData.email}`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-base font-bold text-black transition-all hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          >
            <Mail size={20} />
            Get In Touch
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </MagneticButton>

          <div className="mt-12 flex items-center justify-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold/50 hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  title={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
