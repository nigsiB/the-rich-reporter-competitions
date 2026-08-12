"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { MAGAZINE_URL, magazineCovers } from "@/data/magazineCovers";

/**
 * A single horizontal strip of covers you can pan left and right — newest
 * first — with each thumbnail opening full size.
 *
 * Panning is deliberately native overflow scrolling with snap points, so
 * trackpads, touch and shift+wheel all work for free; the pointer handlers
 * only add click-and-drag for mouse users, which native scrolling lacks.
 */
export default function WhoWeAre() {
  const strip = useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();

  const syncArrows = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    syncArrows();
    const el = strip.current;
    if (!el) return;
    el.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const page = (dir: -1 | 1) => {
    const el = strip.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: "smooth" });
  };

  // Click-and-drag panning for mouse users.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !strip.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: strip.current.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = strip.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + magazineCovers.length) % magazineCovers.length));
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % magazineCovers.length));
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close]);

  const open = openIndex === null ? null : magazineCovers[openIndex];

  return (
    <section id="who-we-are" className="scroll-mt-28" aria-labelledby="who-we-are-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">
            Who We Are
          </p>
          <h2
            id="who-we-are-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)] md:text-5xl"
          >
            The Rich Reporter
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            A print and digital magazine covering business, culture and the people
            reshaping them — stocked nationwide in Barnes &amp; Noble. These
            competitions are run by the same team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={MAGAZINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link focus-ring text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
          >
            Visit the magazine
          </a>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={!canLeft}
              aria-label="Scroll covers left"
              className="focus-ring flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--champagne)]/50 hover:text-[var(--champagne)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={!canRight}
              aria-label="Scroll covers right"
              className="focus-ring flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--champagne)]/50 hover:text-[var(--champagne)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={strip}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="cover-strip flex snap-x snap-mandatory select-none gap-5 overflow-x-auto pb-2"
      >
        {magazineCovers.map((cover, i) => (
          <li key={cover.thumb} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => {
                if (drag.current.moved) return; // a pan, not a click
                setOpenIndex(i);
              }}
              className="focus-ring group block w-[150px] text-left sm:w-[180px]"
              aria-label={`${cover.title} — view full size`}
            >
              <span className="relative block aspect-[768/960] overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)]">
                <Image
                  src={cover.thumb}
                  alt={cover.title}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  draggable={false}
                />
              </span>
              <span className="mt-3 block text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors group-hover:text-[var(--champagne)]">
                {cover.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-deep)]/92 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={close}
        >
          <p id={labelId} className="sr-only">
            {open.title} — cover {(openIndex ?? 0) + 1} of {magazineCovers.length}
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="focus-ring absolute right-5 top-5 z-[2] text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
          >
            Close
          </button>

          <div
            className="relative flex max-h-[88vh] flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.full}
              alt={open.title}
              className="max-h-[78vh] max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              onError={(e) => {
                // Fall back to the WordPress derivative if the original 404s.
                const el = e.currentTarget;
                if (el.src !== open.thumb) el.src = open.thumb;
              }}
            />
            <a
              href={open.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link focus-ring text-[10px] uppercase tracking-[0.24em] text-[var(--champagne)]"
            >
              Read {open.title}
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
