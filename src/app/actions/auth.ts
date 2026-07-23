"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { recordMarketingEmail } from "@/lib/marketing";
import { DEFAULT_COUNTRY_CODE, isValidCountryCode } from "@/data/countries";
import type { ActionResult, MembershipSignupInput } from "@/lib/types";
import { redirect } from "next/navigation";

function yearsOld(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
}

function profilePayload(input: MembershipSignupInput, userId: string) {
  const country =
    input.country && isValidCountryCode(input.country)
      ? input.country.toUpperCase()
      : DEFAULT_COUNTRY_CODE;

  return {
    id: userId,
    email: input.email.trim(),
    full_name: input.fullName.trim(),
    phone: input.phone.trim(),
    address_line1: input.addressLine1.trim(),
    address_line2: input.addressLine2?.trim() || null,
    city: input.city.trim(),
    state: input.state.trim(),
    postal_code: input.postalCode.trim(),
    country,
    date_of_birth: input.dateOfBirth,
    marketing_opt_in: input.marketingOptIn,
    updated_at: new Date().toISOString(),
  };
}

export async function signUpMemberAction(
  input: MembershipSignupInput,
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error:
        "Membership is not connected yet. Add Supabase credentials to .env.local to enable signup.",
    };
  }

  if (!input.email || !input.password || input.password.length < 8) {
    return { success: false, error: "Use a valid email and a password of at least 8 characters." };
  }
  if (!input.fullName.trim()) {
    return { success: false, error: "Please enter your full name." };
  }
  if (!input.dateOfBirth || yearsOld(input.dateOfBirth) < 18) {
    return { success: false, error: "You must be 18 or older to become a member." };
  }
  if (!input.addressLine1 || !input.city || !input.state || !input.postalCode) {
    return { success: false, error: "Please complete your mailing address." };
  }
  if (!input.country || !isValidCountryCode(input.country)) {
    return { success: false, error: "Please select your country." };
  }

  const supabase = await createClient();
  const country = input.country.toUpperCase();

  // Pass full profile via raw_user_meta_data so handle_new_user can INSERT
  // even when email confirmation leaves the client without a session (auth.uid() null).
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        phone: input.phone.trim(),
        address_line1: input.addressLine1.trim(),
        address_line2: input.addressLine2?.trim() || "",
        city: input.city.trim(),
        state: input.state.trim(),
        postal_code: input.postalCode.trim(),
        country,
        date_of_birth: input.dateOfBirth,
        marketing_opt_in: input.marketingOptIn,
      },
    },
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  const userId = authData.user?.id;
  if (!userId) {
    return {
      success: true,
      message:
        "Account created. Please check your email to confirm, then sign in to continue.",
    };
  }

  await recordMarketingEmail({
    email: input.email,
    fullName: input.fullName,
    source: "signup",
    optedIn: input.marketingOptIn,
  });

  // Email confirmation required → no session → auth.uid() is null → RLS blocks
  // client upsert. Trigger already saved the profile from metadata.
  if (!authData.session) {
    return {
      success: true,
      message:
        "Account created. Please check your email to confirm, then sign in to continue.",
    };
  }

  // Session present: refresh profile fields (trigger may have raced / partial data).
  const payload = profilePayload(input, userId);
  const { error: profileError } = await supabase.from("profiles").upsert(payload, {
    onConflict: "id",
  });

  if (profileError) {
    // Fallback: update only (row should already exist from trigger).
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        email: payload.email,
        full_name: payload.full_name,
        phone: payload.phone,
        address_line1: payload.address_line1,
        address_line2: payload.address_line2,
        city: payload.city,
        state: payload.state,
        postal_code: payload.postal_code,
        country: payload.country,
        date_of_birth: payload.date_of_birth,
        marketing_opt_in: payload.marketing_opt_in,
        updated_at: payload.updated_at,
      })
      .eq("id", userId);

    if (updateError) {
      // Do not surface RLS jargon — account exists; profile may complete on next sign-in.
      console.error("[signup] profile save failed", profileError.message, updateError.message);
      return {
        success: true,
        message:
          "Account created. If any profile details look incomplete after you sign in, update them from membership or contact support.",
      };
    }
  }

  return {
    success: true,
    message: "Welcome. Your membership profile is ready.",
  };
}

export async function signInAction(
  email: string,
  password: string,
  nextPath = "/",
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Auth is not connected yet. Add Supabase credentials to enable login.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect(nextPath.startsWith("/") ? nextPath : "/");
}

export async function signOutAction(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getSessionProfile() {
  if (!isSupabaseConfigured()) {
    return { user: null, profile: null };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}
