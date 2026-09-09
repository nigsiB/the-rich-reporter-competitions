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
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Lets the operator reply straight to an enquirer. */
  replyTo?: string;
}): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!key || !from) {
    return { sent: false, reason: "RESEND_API_KEY or RESEND_FROM_EMAIL is not set" };
  }
  if (!to) {
    return { sent: false, reason: "no recipient configured" };
  }

  // The From address is a send-only identity on the verified domain — there is
  // no mailbox behind it and no MX record at the apex, so a reply to it would
  // vanish. Default Reply-To to the operator so replying always reaches a real
  // person. Callers that know better override it: the contact form points
  // Reply-To at the enquirer so the operator can answer them directly.
  const replyAddress = replyTo || process.env.ADMIN_NOTIFICATION_EMAIL || undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyAddress ? { reply_to: replyAddress } : {}),
      }),
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
