export type MembershipSignupInput = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  marketingOptIn: boolean;
};

export type ProfileUpdateInput = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth?: string;
  marketingOptIn: boolean;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ContactInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

/** Non-English locale copy stored on competitions.translations JSONB. */
export type CompetitionLocaleCopy = {
  title: string;
  prize_description: string;
};

export type CompetitionTranslations = Partial<
  Record<"es" | "fr" | "de" | "pt" | "it", CompetitionLocaleCopy>
>;

export type CompetitionAdminInput = {
  title: string;
  prizeDescription: string;
  /** Manual translations for ES/FR/DE/PT/IT (English uses title/prizeDescription). */
  translations?: CompetitionTranslations;
  totalEntries: number;
  pricePerEntry: number;
  cashAlternative: number;
  retailValue: number;
  isMonthly: boolean;
  drawDate: string;
  imageUrl: string;
  displayOrder: number;
  status: "active" | "paused" | "completed";
  generateTickets?: boolean;
};

export type ActionResult<T = undefined> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };
