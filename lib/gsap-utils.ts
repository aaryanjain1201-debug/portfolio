"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins once on the client.
 * Safe to call from multiple components — registration is idempotent.
 */
export function registerGSAP() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

/** Scroll-reveal a heading by splitting it into word spans and rising them. */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-reveal-word]");
      if (words.length) {
        gsap.from(words, {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      } else {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Parallax: translate Y of an element based on scroll progress through viewport. */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.2
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/** Horizontal-pinned scroll section: children move horizontally as user scrolls. */
export function useHorizontalPin<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    const section = ref.current;
    if (!section) return;

    const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
    if (!track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Section-spy hook: returns the id of the section currently in view.
 * Used by the navbar to highlight the active link.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}
