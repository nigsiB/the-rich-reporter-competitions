"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/dictionaries";

export async function setLocaleAction(next: string): Promise<void> {
  if (!isLocale(next)) return;

  const jar = await cookies();
  jar.set(LOCALE_COOKIE, next as Locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    // Secure on production HTTPS so the cookie is retained across navigations.
    secure: process.env.NODE_ENV === "production",
  });

  // Revalidate the whole app shell so header/footer/pages re-render with the new dict.
  revalidatePath("/", "layout");
}
