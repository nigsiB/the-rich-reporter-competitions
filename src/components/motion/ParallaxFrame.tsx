"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type ParallaxFrameProps = {
  children: ReactNode;
  /** Peak vertical travel in px, applied symmetrically (±range). Keep it small. */
  range?: number;
};

/**
 * Fills its nearest positioned ancestor and drifts the contents vertically as
 * the frame crosses the viewport. The ref sits on the *static* outer element —
 * measuring the element we also translate would feed the transform back into
 * its own scroll calculation.
 *
 * The moving layer is oversized by `pad` top and bottom so travel can never
 * expose a gap inside the frame.
 */
export default function ParallaxFrame({ children, range = 20 }: ParallaxFrameProps) {
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
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  const active = enabled && !reduce;
  const pad = range + 8;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0"
        style={
          active
            ? { y, willChange: "transform", top: -pad, height: `calc(100% + ${pad * 2}px)` }
            : { top: 0, height: "100%" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
