"use client";

import { useEffect, useState, type ReactNode } from "react";

type FloatingNavShellProps = {
  logo: ReactNode;
  desktopNav: ReactNode;
  mobileNav: ReactNode;
  utilities: ReactNode;
  menuLabel: string;
};

export default function FloatingNavShell({
  logo,
  desktopNav,
  mobileNav,
  utilities,
  menuLabel,
}: FloatingNavShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // "wipe" plays the champagne hairline in once, then parks on "settled" so
  // small scroll jitters around the threshold don't re-trigger the animation.
  const [edge, setEdge] = useState<"hidden" | "wipe" | "settled">("hidden");

  useEffect(() => {
    let past = false;
    let settleTimer = 0;

    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === past) return;
      past = next;

      setScrolled(next);
      window.clearTimeout(settleTimer);

      if (next) {
        setEdge("wipe");
        settleTimer = window.setTimeout(() => setEdge("settled"), 700);
      } else {
        setEdge("hidden");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-[var(--bg-deep)]/90 shadow-[0_8px_28px_rgba(0,0,0,0.28)]"
            : "bg-[var(--bg-deep)]/60"
        }`}
      >
        {edge === "hidden" ? null : (
          <span className={`nav-edge nav-edge--${edge}`} aria-hidden="true">
            <span className="nav-edge__line" />
          </span>
        )}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:gap-6 md:px-10 md:py-4">
          <div className="min-w-0 shrink-0">{logo}</div>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-8">
            {desktopNav}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
            {utilities}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--champagne)]/50 hover:text-[var(--champagne)] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuLabel}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuLabel}</span>
              <span className="flex w-4 flex-col gap-1" aria-hidden="true">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`grid overflow-hidden border-t border-[var(--border)] transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <nav
              aria-label="Primary"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 md:px-10"
              onClick={() => setMenuOpen(false)}
            >
              {mobileNav}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
