export type MagazineCover = {
  title: string;
  /** Issue date, ISO. Used only for ordering and the caption. */
  date: string;
  /** Thumbnail served in the strip (768px wide from WordPress). */
  thumb: string;
  /** Full-resolution original, shown in the lightbox. */
  full: string;
  /** The issue's page on the magazine site. */
  href: string;
};

const BASE = "https://therichreporter.com";

/**
 * Covers from therichreporter.com/category/digital-magazine, newest first.
 * WordPress serves a `-768x960` style derivative; stripping that suffix gives
 * the original upload for the lightbox.
 */
export const magazineCovers: MagazineCover[] = [
  {
    title: "Summer Issue 2026",
    date: "2026-05-04",
    thumb: `${BASE}/wp-content/uploads/2026/05/Gene-Simmons-Cover-1-768x989.jpg`,
    full: `${BASE}/wp-content/uploads/2026/05/Gene-Simmons-Cover-1.jpg`,
    href: `${BASE}/summer-issue-2026/`,
  },
  {
    title: "Spring Issue 2026",
    date: "2026-01-20",
    thumb: `${BASE}/wp-content/uploads/2026/01/1-Magazine-cover-post-768x960.jpeg`,
    full: `${BASE}/wp-content/uploads/2026/01/1-Magazine-cover-post.jpeg`,
    href: `${BASE}/spring-issue-2026/`,
  },
  {
    title: "Summer / Fall Issue 2025",
    date: "2025-08-17",
    thumb: `${BASE}/wp-content/uploads/2025/08/SUMMER-FALL-ISSUE-2025-768x960.jpeg`,
    full: `${BASE}/wp-content/uploads/2025/08/SUMMER-FALL-ISSUE-2025.jpeg`,
    href: `${BASE}/summer-fall-issue-2025/`,
  },
  {
    title: "Tito Ortiz — April Cover Issue",
    date: "2025-04-28",
    thumb: `${BASE}/wp-content/uploads/2025/04/Cover-Options-2Small-768x960.jpeg`,
    full: `${BASE}/wp-content/uploads/2025/04/Cover-Options-2Small.jpeg`,
    href: `${BASE}/tito-ortiz-from-the-streets-to-ufc-legend-hall-of-famer-turned-entrepreneur-april-cover-issue/`,
  },
  {
    title: "Martin Kove — March Cover Issue",
    date: "2025-02-24",
    thumb: `${BASE}/wp-content/uploads/2025/02/1350-MARTIN-KOVE-RED-768x960.png`,
    full: `${BASE}/wp-content/uploads/2025/02/1350-MARTIN-KOVE-RED.png`,
    href: `${BASE}/martin-kove-from-the-karate-kid-to-cobra-kai-march-cover-issue/`,
  },
  {
    title: "Chazz Palminteri — February Cover Issue",
    date: "2025-01-30",
    thumb: `${BASE}/wp-content/uploads/2025/01/1-768x960.png`,
    full: `${BASE}/wp-content/uploads/2025/01/1.png`,
    href: `${BASE}/chazz-palminteri-a-bronx-tale-february-cover-issue/`,
  },
  {
    title: "Hofit Golan & Alvaro Nunez — November Cover Issue",
    date: "2024-11-01",
    thumb: `${BASE}/wp-content/uploads/2024/11/e72ad271-3308-477f-b96c-2066fb17c203-768x960.jpg`,
    full: `${BASE}/wp-content/uploads/2024/11/e72ad271-3308-477f-b96c-2066fb17c203.jpg`,
    href: `${BASE}/`,
  },
];

export const MAGAZINE_URL = BASE;
