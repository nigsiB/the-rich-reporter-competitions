import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";

/**
 * Turns an emailed auth link into a real session.
 *
 * Nothing did this before, which matters more than it sounds: @supabase/ssr
 * uses PKCE by default, so confirmation and recovery emails arrive as a
 * `?code=` that has to be exchanged server-side. Without this route the link
 * simply landed on a page that ignored it.
 *
 * Handles both shapes Supabase sends:
 *   - PKCE:   ?code=...
 *   - OTP:    ?token_hash=...&type=recovery|signup|email_change
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  // Only ever redirect somewhere on this site.
  const requested = searchParams.get("next") ?? "/";
  const next = requested.startsWith("/") ? requested : "/";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "recovery" | "signup" | "email_change" | "invite",
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("That link is invalid or has expired.")}`,
  );
}
