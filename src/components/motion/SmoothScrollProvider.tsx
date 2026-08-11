"use client";

import { useEffect } from "react";

import { scrollToTop, smoothScrollTo } from "@/lib/scroll";

/**
 * One delegated click listener gives every in-page anchor on the site the
 * eased scroll — header nav, hero CTA, footer, the back-to-collection link —
 * without each component having to opt in and without a per-link wrapper.
 *
 * Only same-page hashes are intercepted. A hash on a *different* route stays
 * a normal Next navigation, so routing, prefetch and scroll restoration keep
 * working as they do today.
 *
 * Registered in the CAPTURE phase deliberately. Next's `<Link>` attaches its
 * own click handler to the anchor and calls `preventDefault()` there, so a
 * bubble-phase listener sees every link as already-handled and can never act.
 * Running first lets us claim same-page hashes and stop the event before
 * Next's router also tries to navigate to them.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, download, etc.) behave natively.
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      // Bare "#" is the conventional back-to-top.
      if (rawHref === "#") {
        event.preventDefault();
        event.stopPropagation();
        scrollToTop();
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!url.hash) return;
      if (url.pathname !== window.location.pathname) return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      // Stop it here so Next's router doesn't also push the same hash.
      event.preventDefault();
      event.stopPropagation();
      smoothScrollTo(el);
      window.history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
