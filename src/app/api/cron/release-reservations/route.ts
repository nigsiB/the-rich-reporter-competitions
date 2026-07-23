import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    // Allow Vercel's native cron header when CRON_SECRET is also present in prod wiring
    const isVercelCron = request.headers.get("x-vercel-cron") === "1";
    if (!(isVercelCron && cronSecret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ released: 0, note: "Supabase not configured" });
  }

  try {
    const supabase = createServiceClient();
    const minutes = Number(process.env.RESERVATION_EXPIRY_MINUTES ?? 15);
    const { data, error } = await supabase.rpc("release_expired_reservations", {
      p_minutes: minutes,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ released: data ?? 0, minutes });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
