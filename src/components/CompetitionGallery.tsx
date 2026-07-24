"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

type CompetitionGalleryProps = {
  title: string;
  mainUrl: string;
  galleryUrls?: string[];
};

export default function CompetitionGallery({
  title,
  mainUrl,
  galleryUrls = [],
}: CompetitionGalleryProps) {
  const images = [mainUrl, ...galleryUrls.filter((u) => u && u !== mainUrl)].filter(Boolean);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  if (!images.length) return null;

  const thumbs = images.length > 1 ? images : [];

  return (
    <div>
      <button
        type="button"
        onClick={() => openAt(0)}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-[var(--bg-elevated)] text-left"
        aria-label={`View ${title} image`}
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.02] group-hover:brightness-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        {images.length > 1 ? (
          <span className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.22em] text-[var(--fg)]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View gallery
          </span>
        ) : null}
      </button>

      {thumbs.length > 0 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {thumbs.map((url, i) => (
            <li key={`${url}-${i}`}>
              <button
                type="button"
                onClick={() => openAt(i)}
                className={[
                  "relative aspect-square w-full overflow-hidden border bg-[var(--bg-elevated)] transition-colors",
                  i === 0
                    ? "border-[var(--champagne)]/60"
                    : "border-[var(--border)] hover:border-[var(--champagne)]/40",
                ].join(" ")}
                aria-label={`${title} image ${i + 1}`}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-deep)]/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={close}
        >
          <p id={labelId} className="sr-only">
            {title} — image {index + 1} of {images.length}
          </p>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-5 top-5 z-[2] text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
          >
            Close
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 px-3 py-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)] md:left-8"
                aria-label="Previous image"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 px-3 py-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)] md:right-8"
                aria-label="Next image"
              >
                Next
              </button>
            </>
          ) : null}

          <div
            className="relative mx-auto flex max-h-[88vh] w-[min(92vw,1100px)] items-center justify-center px-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${title} — ${index + 1}`}
              className="max-h-[88vh] max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            />
          </div>

          {images.length > 1 ? (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
              {index + 1} / {images.length}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
