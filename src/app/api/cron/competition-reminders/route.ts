import { NextResponse } from "next/server";

import { createServiceClient } from "@/utils/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";
import { isEmailConfigured, sendEmail } from "@/lib/email";

/** Hours before the draw at which the operator is reminded. */
const MILESTONES = [48, 12, 1] as const;

type CompetitionRow = {
  id: string;
  title: string;
  draw_date: string | null;
  total_entries: number;
  entries_remaining: number | null;
  price_per_entry: number | string;
};

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function body(c: CompetitionRow, milestone: number, hoursLeft: number, siteUrl: string) {
  const sold = c.total_entries - (c.entries_remaining ?? c.total_entries);
  const takings = sold * Number(c.price_per_entry);
  const drawAt = c.draw_date
    ? new Date(c.draw_date).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })
    : "unknown";
  // Report the time actually remaining, not the milestone. On a daily
  // schedule the 12-hour reminder may genuinely fire with 9 hours left, and
  // saying "12 hours" when it is 9 would be worse than useless.
  const rounded = Math.max(1, Math.round(hoursLeft));
  const when = rounded === 1 ? "in about 1 hour" : `in about ${rounded} hours`;

  const text = [
    `${c.title} closes ${when}.`,
    ``,
    `Draw date:        ${drawAt}`,
    `Tickets sold:     ${sold.toLocaleString("en-US")} of ${c.total_entries.toLocaleString("en-US")}`,
    `Entry price:      ${money(Number(c.price_per_entry))}`,
    `Takings:          ${money(takings)}`,
    ``,
    `Entries stop automatically at the draw date, but the winner is NOT drawn`,
    `automatically. Draw it from the admin panel when you are ready:`,
    `${siteUrl}/admin`,
    ``,
    `Competition page: ${siteUrl}/competitions/${c.id}`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#14140f">
      <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#8a6a35;margin:0 0 8px">
        Closing ${when}
      </p>
      <h1 style="font-size:22px;margin:0 0 16px">${c.title}</h1>
      <table style="border-collapse:collapse;font-size:14px;margin:0 0 20px">
        <tr><td style="padding:4px 16px 4px 0;color:#55524b">Draw date</td><td>${drawAt}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#55524b">Tickets sold</td><td>${sold.toLocaleString("en-US")} of ${c.total_entries.toLocaleString("en-US")}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#55524b">Entry price</td><td>${money(Number(c.price_per_entry))}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#55524b">Takings</td><td>${money(takings)}</td></tr>
      </table>
      <p style="font-size:14px;line-height:1.6">
        Entries stop automatically at the draw date, but <strong>the winner is not drawn
        automatically</strong>. Draw it from the admin panel when you are ready.
      </p>
      <p style="margin:24px 0">
        <a href="${siteUrl}/admin"
           style="background:#c4a574;color:#0e0e0c;padding:12px 22px;text-decoration:none;
                  font-size:12px;letter-spacing:.18em;text-transform:uppercase">Open admin</a>
      </p>
      <p style="font-size:12px;color:#55524b">
        <a href="${siteUrl}/competitions/${c.id}" style="color:#8a6a35">View the competition page</a>
      </p>
    </div>`;

  return { text, html };
}

/**
 * Emails the operator as each competition approaches its draw.
 *
 * Written to be safe at any schedule. Rather than matching "is it exactly 12
 * hours out", it asks "has this competition passed the 12 hour mark without
 * that reminder being sent" — so a late or missed run still sends, and a run
 * every five minutes still sends only once.
 *
 * The guard against duplicates is the UNIQUE constraint in migration 015: the
 * row is inserted first, and the email only goes out if that insert won.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron") !== null;

  if (!isVercelCron && (!cronSecret || auth !== `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const to = process.env.ADMIN_NOTIFICATION_EMAIL ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!isEmailConfigured() || !to) {
    // Not an error: the site ran without email until this existed. Say so
    // plainly so a silent no-op is never mistaken for "nothing was due".
    return NextResponse.json({
      skipped: true,
      reason: "email is not configured (RESEND_API_KEY, RESEND_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL)",
    });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("competitions")
    .select("id,title,draw_date,total_entries,entries_remaining,price_per_entry")
    .eq("status", "active")
    .not("draw_date", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = Date.now();
  const sent: { competition: string; milestone: number }[] = [];
  const failed: { competition: string; milestone: number; reason: string }[] = [];

  for (const c of (data ?? []) as CompetitionRow[]) {
    if (!c.draw_date) continue;
    const hoursLeft = (new Date(c.draw_date).getTime() - now) / 3_600_000;
    if (hoursLeft <= 0) continue; // already closed; nothing to warn about

    for (const milestone of MILESTONES) {
      if (hoursLeft > milestone) continue;

      // Claim the milestone first. If another run already has it, this fails
      // on the unique constraint and we send nothing.
      const { error: claimError } = await supabase
        .from("competition_reminders")
        .insert({ competition_id: c.id, milestone_hours: milestone, sent_to: to });

      if (claimError) continue; // already sent, or claimed by a concurrent run

      const { text, html } = body(c, milestone, hoursLeft, siteUrl);
      const result = await sendEmail({
        to,
        subject: `${c.title} closes in about ${Math.max(1, Math.round(hoursLeft))} hour${
          Math.round(hoursLeft) === 1 ? "" : "s"
        }`,
        html,
        text,
      });

      if (result.sent) {
        sent.push({ competition: c.title, milestone });
      } else {
        // Release the claim so the next run can retry rather than the
        // reminder being lost to a transient provider failure.
        await supabase
          .from("competition_reminders")
          .delete()
          .eq("competition_id", c.id)
          .eq("milestone_hours", milestone);
        failed.push({ competition: c.title, milestone, reason: result.reason });
      }
    }
  }

  return NextResponse.json({
    checked: data?.length ?? 0,
    sent,
    failed,
  });
}
