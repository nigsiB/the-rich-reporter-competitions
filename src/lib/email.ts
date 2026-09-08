/**
 * Minimal Resend client.
 *
 * Uses the REST API over fetch rather than the SDK — one HTTP call does not
 * justify a dependency, and it keeps the failure modes visible.
 *
 * Everything degrades quietly when unconfigured: the site has run without any
 * email provider until now, and a missing key should not break a cron run.
 */

export type EmailResult =
  | { sent: true; id: string | null }
  | { sent: false; reason: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!key || !from) {
    return { sent: false, reason: "RESEND_API_KEY or EMAIL_FROM is not set" };
  }
  if (!to) {
    return { sent: false, reason: "no recipient configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { sent: false, reason: `Resend returned ${res.status}: ${body.slice(0, 200)}` };
    }

    const data = (await res.json()) as { id?: string };
    return { sent: true, id: data.id ?? null };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "unknown error sending email",
    };
  }
}
