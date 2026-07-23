"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
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

  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: { full_name: input.fullName.trim() },
    },
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  const userId = authData.user?.id;
  if (!userId) {
    return {
      success: false,
      error: "Account created but session pending. Check your email to confirm, then sign in.",
    };
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    email: input.email.trim(),
    full_name: input.fullName.trim(),
    phone: input.phone.trim(),
    address_line1: input.addressLine1.trim(),
    address_line2: input.addressLine2?.trim() || null,
    city: input.city.trim(),
    state: input.state.trim(),
    postal_code: input.postalCode.trim(),
    country: input.country || "US",
    date_of_birth: input.dateOfBirth,
    marketing_opt_in: input.marketingOptIn,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    return {
      success: false,
      error: `Account created, but profile could not be saved: ${profileError.message}`,
    };
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
