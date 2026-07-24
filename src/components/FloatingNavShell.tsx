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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`pointer-events-auto mx-auto max-w-7xl border border-[var(--border)] backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-[var(--border-strong)] bg-[var(--bg-deep)]/88 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            : "bg-[var(--bg-deep)]/55 shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 md:gap-6 md:px-6 md:py-3.5">
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
              className="flex flex-col gap-1 px-4 py-4 sm:px-5"
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
