"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in seconds */
  delay?: number;
  /** Travel distance in px */
  y?: number;
};

/**
 * Scroll/entrance reveal that stays visible without JS.
 *
 * The hidden state is applied imperatively to the DOM node rather than held in
 * React state: the SSR HTML must never ship `opacity: 0`, or a missed
 * intersection callback would leave the page blank. Driving the style directly
 * also keeps this out of React's render path entirely — no re-render per reveal.
 */
export default function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    const el = ref.current;
    if (!el) return;

    // Above the fold on first paint: leave it alone, already visible.
    const vh = window.innerHeight || 0;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > vh * 0.05) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;

    // Attach the transition a frame later so the initial hide doesn't animate.
    const raf = requestAnimationFrame(() => {
      el.style.transition =
        `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, ` +
        `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;
    });

    const reveal = () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);

    // Safety net — never leave copy stuck invisible.
    const fallback = window.setTimeout(reveal, 1200);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduce, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
