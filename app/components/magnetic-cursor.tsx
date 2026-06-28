"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Premium magnetic cursor.
 * - Inner dot tracks 1:1
 * - Outer ring lags with spring easing
 * - Grows + changes label when hovering interactive elements
 * - Hides on touch devices
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "view" | "text">(
    "default"
  );
  const [label, setLabel] = useState("");

  const move = useCallback((e: MouseEvent) => {
    if (!dotRef.current || !ringRef.current) return;
    const { clientX: x, clientY: y } = e;
    dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    // Ring follows with a slight lag via transition
    ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      window.matchMedia("(hover: none)").matches ||
      window.innerWidth < 1024;
    if (isTouch) return;

    window.addEventListener("mousemove", move, { passive: true });
    setVisible(true);

    // Detect interactive hover targets
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      if (!target) {
        setVariant("default");
        setLabel("");
        return;
      }
      const cursorAttr = target.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        setVariant("view");
        setLabel("View");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setVariant("text");
        setLabel("");
      } else {
        setVariant("hover");
        setLabel("");
      }
    };
    document.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [move]);

  // Click pulse
  useEffect(() => {
    if (!visible) return;
    const handleDown = () => {
      ringRef.current?.classList.add("cursor-pulse");
      setTimeout(() => ringRef.current?.classList.remove("cursor-pulse"), 300);
    };
    window.addEventListener("mousedown", handleDown);
    return () => window.removeEventListener("mousedown", handleDown);
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cursor-pulse { animation: cursorPulse 0.3s ease-out; }
        @keyframes cursorPulse {
          0% { width: 40px; height: 40px; opacity: 1; }
          100% { width: 70px; height: 70px; opacity: 0.3; }
        }
      `}</style>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center rounded-full mix-blend-difference transition-[width,height,background-color,border-color] duration-200 lg:flex"
        style={{
          width: variant === "view" ? 72 : variant === "hover" ? 48 : 32,
          height: variant === "view" ? 72 : variant === "hover" ? 48 : 32,
          border:
            variant === "view"
              ? "none"
              : `1px solid ${
                  variant === "hover" ? "rgba(0,245,255,0.9)" : "rgba(255,255,255,0.5)"
                }`,
          background:
            variant === "view" ? "rgba(124,58,237,0.9)" : "transparent",
          willChange: "transform",
        }}
      >
        {variant === "view" && (
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-white">
            {label}
          </span>
        )}
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-highlight lg:block"
        style={{
          width: variant === "text" ? 2 : variant === "view" ? 0 : 5,
          height: variant === "text" ? 20 : variant === "view" ? 0 : 5,
          willChange: "transform",
        }}
      />
    </>
  );
}
