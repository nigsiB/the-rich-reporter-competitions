"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress hairline pinned above the header (header is z-50).
 * Driven by Framer motion values rather than React state, so it updates via
 * direct style mutation on scroll — no re-render per scroll tick.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--champagne-soft)]/50 via-[var(--champagne)] to-[var(--champagne-soft)]/50"
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
    />
  );
}
