"use server";

import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
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

  revalidatePath("/admin/messages");
  return { success: true, message: "Thank you. We will respond shortly." };
}
