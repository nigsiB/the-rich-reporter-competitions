import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type MarketingSource = "signup" | "contact" | "checkout" | "subscription" | "import";

/** Persist email for future prize / marketing outreach. Never throws. */
export async function recordMarketingEmail(opts: {
  email: string;
  fullName?: string | null;
  source: MarketingSource;
  optedIn?: boolean;
}): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.info("[marketing_email]", opts);
    return;
  }

  const email = opts.email.trim().toLowerCase();
  if (!email || !email.includes("@")) return;

  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("upsert_marketing_email", {
      p_email: email,
      p_full_name: opts.fullName?.trim() || null,
      p_source: opts.source,
      p_opted_in: opts.optedIn ?? true,
    });

    if (error) {
      // Fallback insert if RPC missing
      await supabase.from("marketing_emails").upsert(
        {
          email,
          full_name: opts.fullName?.trim() || null,
          source: opts.source,
          opted_in: opts.optedIn ?? true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );
    }
  } catch (err) {
    console.error("[marketing_email] failed", err);
  }
}
