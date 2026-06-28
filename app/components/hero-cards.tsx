"use client";

import { motion } from "framer-motion";
import { useMouseParallax } from "@/lib/use-mouse-parallax";
import { projects } from "@/data/projects";

const heroCards = [
  { src: projects[0].image, alt: projects[0].title, layer: 1, x: "-32%", y: "-22%", rotate: -8 },
  { src: projects[4].image, alt: projects[4].title, layer: 2, x: "26%", y: "-28%", rotate: 6 },
  { src: projects[6].image, alt: projects[6].title, layer: 1, x: "-28%", y: "20%", rotate: 5 },
  { src: projects[2].image, alt: projects[2].title, layer: 3, x: "30%", y: "16%", rotate: -4 },
  { src: projects[3].image, alt: projects[3].title, layer: 2, x: "15%", y: "-32%", rotate: 3 },
  { src: projects[7].image, alt: projects[7].title, layer: 3, x: "-36%", y: "-2%", rotate: -5 },
];

const layerConfig: Record<number, { z: number; opacity: number; scale: number }> = {
  1: { z: -140, opacity: 0.18, scale: 0.72 },
  2: { z: -60, opacity: 0.28, scale: 0.88 },
  3: { z: 10, opacity: 0.4, scale: 1 },
};

function FloatingCard({
  card,
  index,
  layerX,
  layerY,
}: {
  card: (typeof heroCards)[0];
  index: number;
  layerX: any;
  layerY: any;
}) {
  const cfg = layerConfig[card.layer];

  return (
    <motion.div
      className="absolute overflow-hidden rounded-xl will-change-transform"
      style={{
        left: card.x,
        top: card.y,
        width: card.layer === 1 ? 140 : card.layer === 2 ? 170 : 200,
        height: card.layer === 1 ? 100 : card.layer === 2 ? 120 : 140,
        x: layerX,
        y: layerY,
        translateZ: cfg.z,
        opacity: cfg.opacity,
        scale: cfg.scale,
        rotate: card.rotate,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: cfg.opacity, scale: cfg.scale }}
      transition={{
        delay: 1.2 + index * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={card.src}
        alt={card.alt}
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute inset-0 border border-white/[0.06] rounded-xl"
      />
    </motion.div>
  );
}

export function HeroCards() {
  const { layer1X, layer1Y, layer2X, layer2Y, layer3X, layer3Y } = useMouseParallax();

  const layerMap: Record<number, { x: any; y: any }> = {
    1: { x: layer1X, y: layer1Y },
    2: { x: layer2X, y: layer2Y },
    3: { x: layer3X, y: layer3Y },
  };

  return (
    <div className="pointer-events-none absolute inset-0 perspective-1200">
      <div className="relative h-full w-full preserve-3d">
        {heroCards.map((card, i) => (
          <FloatingCard
            key={i}
            card={card}
            index={i}
            layerX={layerMap[card.layer].x}
            layerY={layerMap[card.layer].y}
          />
        ))}
      </div>
    </div>
  );
}
