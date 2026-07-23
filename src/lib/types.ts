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

export type ContactInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type CompetitionAdminInput = {
  title: string;
  prizeDescription: string;
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
