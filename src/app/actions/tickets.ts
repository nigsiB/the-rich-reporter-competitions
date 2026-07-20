"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function reserveTicketsAction(competitionId: string, quantity: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be logged in to enter." };
  }

  try {
    const { data, error } = await supabase.rpc("reserve_tickets", {
      p_competition_id: competitionId,
      p_user_id: user.id,
      p_quantity: quantity,
    });

    if (error) {
      return {
        success: false,
        error: error.message.includes("Not enough tickets")
          ? "Sorry, this competition has sold out or not enough tickets remain."
          : "Failed to secure tickets. Please try again.",
      };
    }

    revalidatePath(`/competitions/${competitionId}`);

    return { success: true, data: data };
  } catch {
    return { success: false, error: "An unexpected system error occurred." };
  }
}
