"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { recordMarketingEmail } from "@/lib/marketing";
import { sendEmail } from "@/lib/email";
import type { ActionResult, ContactInput } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function submitContactAction(input: ContactInput): Promise<ActionResult> {
  if (!input.fullName.trim() || !input.email.trim() || !input.message.trim()) {
    return { success: false, error: "Please complete name, email, and message." };
  }

  if (!isSupabaseConfigured()) {
    // Local/demo fallback — accept the message so the UI can be reviewed
    console.info("[contact]", input);
    return {
      success: true,
      message: "Message received (demo mode). Connect Supabase to store inquiries.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    full_name: input.fullName.trim(),
    email: input.email.trim(),
    subject: input.subject.trim() || "General enquiry",
    message: input.message.trim(),
  });

  if (error) {
    return { success: false, error: "Unable to send your message. Please try again." };
  }

  await recordMarketingEmail({
    email: input.email,
    fullName: input.fullName,
    source: "contact",
    optedIn: true,
  });

  // Notify the operator. The message is already saved above, so a failure here
  // must not fail the submission — the enquiry is not lost, it just waits in
  // /admin/messages as it always did.
  await notifyOperator(input);

  revalidatePath("/admin/messages");
  return { success: true, message: "Thank you. We will respond shortly." };
}

/**
 * Email the operator that an enquiry has arrived.
 *
 * Until this existed the contact form only wrote to the database, so nobody
 * knew a message had come in unless they happened to open the admin panel.
 *
 * Reply-To is set to the sender so the operator can just hit reply; From has
 * to stay on the verified domain or the message will not send.
 */
async function notifyOperator(input: ContactInput): Promise<void> {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!to) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const name = input.fullName.trim();
  const from = input.email.trim();
  const subject = input.subject.trim() || "General enquiry";
  const message = input.message.trim();

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  await sendEmail({
    to,
    replyTo: from,
    subject: `Enquiry: ${subject}`,
    text: [
      `From:    ${name} <${from}>`,
      `Subject: ${subject}`,
      ``,
      message,
      ``,
      `---`,
      `Reply directly to this email to answer ${name}.`,
      `All enquiries: ${siteUrl}/admin/messages`,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#14140f">
        <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#8a6a35;margin:0 0 8px">
          New enquiry
        </p>
        <h1 style="font-size:20px;margin:0 0 16px">${escape(subject)}</h1>
        <p style="font-size:14px;margin:0 0 4px"><strong>${escape(name)}</strong></p>
        <p style="font-size:14px;margin:0 0 20px"><a href="mailto:${escape(from)}" style="color:#8a6a35">${escape(from)}</a></p>
        <div style="font-size:14px;line-height:1.7;white-space:pre-wrap;border-left:3px solid #c4a574;padding-left:16px">${escape(message)}</div>
        <p style="font-size:12px;color:#55524b;margin-top:24px">
          Reply directly to this email to answer ${escape(name)}.
          &nbsp;·&nbsp;
          <a href="${siteUrl}/admin/messages" style="color:#8a6a35">All enquiries</a>
        </p>
      </div>`,
  });
}
