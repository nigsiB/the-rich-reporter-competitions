"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1697636979792-fb057f6cbe8d?auto=format&fit=crop&q=80&w=1600";

/** Max downward travel in px as the hero scrolls away. */
const RANGE = 140;

/**
 * Hero atmosphere: slow parallax drift on the photograph with the tint and
 * gradient scrims held still on top, so the copy keeps its contrast while the
 * image moves. Desktop only — on mobile the layer just fills the section.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 641px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Start slightly up so the first pixels of scroll already show movement.
  const y = useTransform(scrollYProgress, [0, 1], [RANGE * -0.15, RANGE]);

  const parallax = enabled && !reduce;
  // Oversize and pull up so downward travel never reveals a gap at the top.
  const pad = Math.ceil(RANGE * 1.25);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0"
        style={
          parallax
            ? { y, willChange: "transform", top: -pad, height: `calc(100% + ${pad * 2}px)` }
            : { top: 0, height: "100%" }
        }
      >
        <div
          className="hero-drift h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[var(--bg-deep)]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/88 to-[var(--bg-deep)]/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/70 via-transparent to-[var(--bg-deep)]/30" />
    </div>
  );
}
