export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !url.includes("your-project") &&
      !key.startsWith("your-anon") &&
      key !== "your-anon-or-publishable-key",
  );
}

export function isSupabaseServiceConfigured(): boolean {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(
    isSupabaseConfigured() &&
      key &&
      !key.startsWith("your-service") &&
      key !== "your-service-role-jwt",
  );
}
