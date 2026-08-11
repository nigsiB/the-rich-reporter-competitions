/** Slow start, long glide — the "slick" half of the feel. */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Short hops shouldn't take as long as a full-page traverse, and a traverse
 * shouldn't feel rushed. Scale with distance, then clamp both ends.
 */
function durationFor(distance: number) {
  const d = Math.abs(distance);
  return Math.round(Math.min(1100, Math.max(450, 380 + d * 0.28)));
}

/**
 * Only one eased scroll may own the viewport at a time. Two overlapping rAF
 * loops both calling `scrollTo` produce visible stutter, so a newer animation
 * simply retires the older one.
 */
let activeRun = 0;

function animateScrollTo(targetY: number, duration?: number) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const ms = duration ?? durationFor(distance);
  const startTime = performance.now();
  const run = ++activeRun;

  // A wheel/touch nudge mid-flight should hand control straight back to the
  // user rather than fighting the animation to its destination.
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });

  const done = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };

  function step(now: number) {
    if (cancelled || run !== activeRun) {
      done();
      return;
    }
    const t = Math.min((now - startTime) / ms, 1);
    // `behavior: "instant"` is deliberate: globals.css sets `scroll-behavior:
    // smooth`, which per spec also smooths programmatic scrollTo. Left alone,
    // the browser's own smoothing fights this rAF loop's per-frame jumps and
    // the scroll never settles. We supply the easing curve ourselves.
    window.scrollTo({
      top: startY + distance * easeInOutCubic(t),
      left: 0,
      behavior: "instant",
    });
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      done();
    }
  }

  requestAnimationFrame(step);
}

/** Eased in-page scroll that respects each target's `scroll-mt-*`. */
export function smoothScrollTo(target: string | Element, duration?: number) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop || "0");
  const targetY = el.getBoundingClientRect().top + window.scrollY - scrollMarginTop;

  animateScrollTo(targetY, duration);
}

export function scrollToTop(duration?: number) {
  animateScrollTo(0, duration);
}
