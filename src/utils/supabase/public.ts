import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free client for public, unauthenticated reads (competitions, ticket
 * counts).
 *
 * The server client in ./server.ts binds to cookies, which makes any function
 * using it uncacheable — Next refuses to cache anything that touches the
 * request. Public competition data does not depend on who is asking, so it can
 * use a plain anon client and be cached.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
