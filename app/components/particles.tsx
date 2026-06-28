"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = canvas.width;
    let h = canvas.height;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    type ParticleData = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      vx: number;
      vy: number;
    };

    const createParticle = (): ParticleData => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.75 ? 45 : 190,
        vx: 0,
        vy: 0,
      };
    };

    const updateParticle = (p: ParticleData) => {
      // Mouse interaction - repel particles
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * 2;
        p.vy += Math.sin(angle) * force * 2;
      }

      // Apply velocity with friction
      p.vx *= 0.95;
      p.vy *= 0.95;

      p.x += p.speedX + p.vx;
      p.y += p.speedY + p.vy;

      // Wrap around edges
      if (p.x > w + 10) p.x = -10;
      if (p.x < -10) p.x = w + 10;
      if (p.y > h + 10) p.y = -10;
      if (p.y < -10) p.y = h + 10;
    };

    const drawParticle = (p: ParticleData) => {
      if (p.hue === 45) {
        ctx.fillStyle = `rgba(255, 184, 0, ${p.opacity})`;
      } else {
        ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const particles: ParticleData[] = [];
    const init = () => {
      particles.length = 0;
      const count = Math.min(100, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = 0.04 * (1 - dist / 120);
            if (particles[i].hue === 45 || particles[j].hue === 45) {
              ctx.strokeStyle = `rgba(255, 184, 0, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
