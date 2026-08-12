import type { Metadata } from "next";
import Link from "next/link";

import { MAGAZINE_URL } from "@/data/magazineCovers";

export const metadata: Metadata = {
  title: "Mission Statement — The Rich Reporter Competitions",
  description:
    "Why The Rich Reporter runs competitions: fixed odds, published ticket counts, a genuine free entry route, and prizes that are bought outright before the draw opens.",
};

export default function MissionPage() {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-[var(--muted)]">
      <header>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--champagne)]">About</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--fg)]">
          Mission Statement
        </h1>
      </header>

      <p className="text-base text-[var(--fg)]">
        We run competitions the way we would want to enter them: a fixed number of tickets, odds you
        can calculate before you spend anything, and a prize that already exists.
      </p>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Who we are
        </h2>
        <p>
          The Rich Reporter is a print and digital magazine covering business, culture and the
          people reshaping them, stocked nationwide in Barnes &amp; Noble. These competitions are run
          by the same team, and they exist to bring readers closer to the magazine — not to be a
          separate gambling business.{" "}
          <a
            href={MAGAZINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--champagne)] underline-offset-4 hover:underline"
          >
            Read the magazine
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          What we commit to
        </h2>
        <ul className="space-y-4">
          <li className="border-l border-[var(--border)] pl-6">
            <span className="block text-[var(--fg)]">A capped, published ticket count</span>
            Every competition states its total number of entries up front and it never rises. Each
            ticket carries its own number, is sold once, and cannot be duplicated.
          </li>
          <li className="border-l border-[var(--border)] pl-6">
            <span className="block text-[var(--fg)]">Odds you can work out yourself</span>
            Because the ticket count is fixed and published, your chance of winning is simple
            arithmetic. We will never quietly extend a draw to sell more entries.
          </li>
          <li className="border-l border-[var(--border)] pl-6">
            <span className="block text-[var(--fg)]">A genuine free entry route</span>
            Every competition carries a free postal route with exactly the same chance of winning as
            a paid entry. It is not a technicality — it is a real way in. See{" "}
            <Link href="/amoe" className="text-[var(--champagne)] underline-offset-4 hover:underline">
              free entry
            </Link>
            .
          </li>
          <li className="border-l border-[var(--border)] pl-6">
            <span className="block text-[var(--fg)]">A cash alternative, always</span>
            No winner is ever forced to take a prize they cannot use, house or insure. Every
            competition names its cash alternative before you enter.
          </li>
          <li className="border-l border-[var(--border)] pl-6">
            <span className="block text-[var(--fg)]">Entry priced to stay small</span>
            We would rather sell many low-priced entries than a few expensive ones. Entry starts at
            twenty-five cents.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
          Entering responsibly
        </h2>
        <p>
          Entry is for adults aged 18 or over, and it is a discretionary purchase — never an
          investment, and never something to spend money you need. If entering ever stops feeling
          like entertainment, please stop, and consider speaking to a support organisation in your
          country.
        </p>
      </section>

      <p className="border-t border-[var(--border)] pt-6 text-xs">
        Hold us to this. If we fall short, tell us at the{" "}
        <Link href="/contact" className="text-[var(--champagne)] underline-offset-4 hover:underline">
          contact desk
        </Link>
        .
      </p>
    </article>
  );
}
