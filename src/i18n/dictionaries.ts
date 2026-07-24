export type Locale = "en" | "es" | "fr" | "de" | "pt" | "it";

export const LOCALES: Locale[] = ["en", "es", "fr", "de", "pt", "it"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "trr_locale";

/** Primary locales with full copy; others fall back to English for missing keys. */
export const FULL_LOCALES: Locale[] = ["en", "es"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
};

const en = {
  membersOnly: "Members only",
  heroHeadline: "Quietly richer",
  heroSub:
    "Private competitions for readers who expect more — flagship tech, magazine prestige, and cash drawn with discretion.",
  viewCollection: "View Collection",
  becomeMember: "Become a member",
  competitionsEyebrow: "Current Collection",
  competitionsHeading: "Exclusive draws",
  competitionsIntro:
    "Five curated prizes. Entry at twenty-five cents. We deliver winners worldwide.",
  howItWorks: "How it works",
  howHeading: "An invitation, not a rush",
  step1Title: "Choose a prize",
  step1Body: "Select from our limited collection. Each draw has a fixed entry cap.",
  step2Title: "Secure your entries",
  step2Body: "Tickets are reserved the moment you begin checkout — no double-booking.",
  step3Title: "Await the draw",
  step3Body: "Winners are selected at random after the draw date. Official rules apply.",
  buyTickets: "Buy tickets now",
  enterNow: "Enter Now",
  securing: "Securing Entry…",
  entries: "Entries",
  total: "Total",
  each: "each",
  perEntry: "per entry",
  limitedTo: "Limited to",
  entriesWord: "entries",
  liveInventory: "Live inventory",
  chooseQty: "choose 1–1,000 below",
  cashAlternative: "Cash alternative",
  cashAltLine: "Winner may elect a tax-free cash alternative of {amount} instead of the prize.",
  worldwide:
    "We deliver prizes worldwide — wherever the winner is. Shipping and fulfilment arranged by The Rich Reporter.",
  backCollection: "← Collection",
  noPurchase: "No purchase necessary. See",
  amoe: "Alternative Method of Entry",
  and: "and",
  officialRules: "Official Rules",
  navCompetitions: "Competitions",
  navMembership: "Membership",
  navContact: "Contact",
  navFreeEntry: "Free Entry",
  navAdmin: "Admin",
  navAccount: "Manage account",
  signIn: "Sign in",
  signOut: "Sign out",
  join: "Join",
  enter: "Enter",
  loginRequired: "Sign in to purchase entries",
  loginRequiredBody:
    "Membership is required before checkout. You will return here after signing in.",
  monthlyClub: "Patron Circle",
  monthlyClubBody:
    "A monthly subscription for readers who prefer a standing relationship with the magazine — large international payments handled securely by Stripe.",
  subscribeMonthly: "Subscribe monthly",
  language: "Language",
  footerBlurb:
    "Exclusive competitions for members of the magazine. No purchase necessary — see Alternative Method of Entry.",
  footerRules: "Rules",
  footerPrivacy: "Privacy",
  footerTerms: "Terms",
  monthly: "Monthly",
  retailApprox: "Approx. retail",

  // Membership
  membershipEyebrow: "Membership",
  membershipHeading: "Join the circle",
  membershipIntro:
    "Create your member profile to enter competitions. We capture the details required for eligibility, prize fulfilment, and compliance.",
  alreadyMember: "Already a member?",
  membershipLoggedIn:
    "You are signed in. Update your details any time from Manage account.",
  membershipStandingTitle: "Standing relationship",
  marketingOptOut:
    "Opt out of editorial notes and competition announcements from The Rich Reporter.",
  marketingOptOutHint: "Leave unchecked to stay on our list. Check only if you prefer not to receive emails.",

  // Login
  loginEyebrow: "Members",
  loginHeading: "Sign in",
  loginIntro: "Access your membership to secure competition entries.",
  loginNewHere: "New here?",
  loginApply: "Apply for membership",
  signingIn: "Signing in…",

  // Contact
  contactEyebrow: "Desk",
  contactHeading: "Contact us",
  contactIntro:
    "Questions about membership, fulfilment, or Alternative Method of Entry — write to the competitions desk. We respond with discretion.",

  // AMOE
  amoeLegalEyebrow: "Legal · United States",
  amoeHeading: "Alternative Method of Entry",
  amoeBody:
    "No purchase is necessary to enter or win. Download a free mail-in entry form for any active competition, complete it by hand, and post it to the address on the form. Limit one free entry request per outer envelope, unless official rules state otherwise. Void where prohibited.",
  amoeDownload: "Download mail-in form",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Free mail-in entry",
  amoeIndexIntro: "Select a competition to open a printable mail-in form. No purchase necessary.",
  amoeFormLabel: "Form",

  // Checkout success
  checkoutConfirmed: "Confirmed",
  checkoutEntered: "You are entered",
  checkoutSuccessBody:
    "Payment succeeded. Your ticket numbers are secured and a receipt is on its way. Official draw details appear in your confirmation email.",
  checkoutReturn: "Return to collection",
  checkoutManageAccount: "Manage account",

  // Account
  accountEyebrow: "Account",
  accountHeading: "Manage account",
  accountIntro:
    "Update your membership profile, mailing address, marketing preference, and password.",
  accountProfileHeading: "Profile",
  accountAddressHeading: "Mailing address",
  accountPasswordHeading: "Change password",
  accountFullName: "Full name",
  accountEmail: "Email",
  accountEmailHint: "Email cannot be changed here. To update it, please",
  accountPhone: "Phone",
  accountDob: "Date of birth",
  accountAddress1: "Address line 1",
  accountAddress2: "Address line 2",
  accountCity: "City",
  accountState: "State / Province / Region",
  accountPostal: "ZIP / Postal code",
  accountCountry: "Country",
  accountMarketing:
    "Opt out of editorial notes and competition announcements from The Rich Reporter.",
  accountMarketingHint:
    "Leave unchecked to stay on our list. Check only if you prefer not to receive emails.",
  accountSaveProfile: "Save profile",
  accountSaving: "Saving…",
  accountProfileSaved: "Your profile has been updated.",
  accountCurrentPassword: "Current password",
  accountNewPassword: "New password",
  accountConfirmPassword: "Confirm new password",
  accountPasswordHint: "Minimum 8 characters",
  accountChangePassword: "Update password",
  accountUpdatingPassword: "Updating…",
  accountPasswordSaved: "Your password has been updated.",
  accountSignOutHint: "Sign out of your membership on this device.",
  accountAdminNote: "You have admin access.",

  // Legal stubs
  legalPrivacyTitle: "Privacy Policy",
  legalTermsTitle: "Terms of Use",
  legalRulesTitle: "Official Rules",
  legalLastUpdated: "Last updated: July 2026",
  legalPrivacyStub:
    "We collect account and entry details to operate competitions, fulfill prizes, and respond to enquiries. Marketing messages are sent only when you have not opted out.",
  legalTermsStub:
    "By using this site you agree to the official rules for each competition and to eligible participation requirements, including being 18 or older.",
  legalRulesStub:
    "No purchase necessary. Alternative Method of Entry available. Void where prohibited. Full rules govern all draws.",

  // Admin chrome
  adminEyebrow: "Private",
  adminHeading: "Admin",
  adminIntro: "Manage competitions, display order, and member enquiries.",
  adminAccountLink: "Manage account",
};

export type Dictionary = typeof en;

const es: Dictionary = {
  membersOnly: "Solo miembros",
  heroHeadline: "Discretamente más rico",
  heroSub:
    "Competiciones privadas para lectores que esperan más — tecnología emblemática, prestigio editorial y efectivo con discreción.",
  viewCollection: "Ver colección",
  becomeMember: "Hazte miembro",
  competitionsEyebrow: "Colección actual",
  competitionsHeading: "Sorteos exclusivos",
  competitionsIntro:
    "Cinco premios seleccionados. Entrada a veinticinco centavos. Entregamos en todo el mundo.",
  howItWorks: "Cómo funciona",
  howHeading: "Una invitación, no una prisa",
  step1Title: "Elige un premio",
  step1Body: "Selecciona de nuestra colección limitada. Cada sorteo tiene un cupo fijo.",
  step2Title: "Asegura tus entradas",
  step2Body: "Las entradas se reservan al iniciar el pago — sin dobles reservas.",
  step3Title: "Espera el sorteo",
  step3Body:
    "Los ganadores se eligen al azar tras la fecha del sorteo. Aplican las reglas oficiales.",
  buyTickets: "Comprar entradas",
  enterNow: "Participar",
  securing: "Reservando…",
  entries: "Entradas",
  total: "Total",
  each: "c/u",
  perEntry: "por entrada",
  limitedTo: "Limitado a",
  entriesWord: "entradas",
  liveInventory: "Inventario en vivo",
  chooseQty: "elige de 1 a 1.000 abajo",
  cashAlternative: "Alternativa en efectivo",
  cashAltLine:
    "El ganador puede optar por una alternativa en efectivo libre de impuestos de {amount} en lugar del premio.",
  worldwide:
    "Entregamos premios en todo el mundo — dondequiera que esté el ganador. Envío a cargo de The Rich Reporter.",
  backCollection: "← Colección",
  noPurchase: "No es necesario comprar. Consulte",
  amoe: "Método alternativo de entrada",
  and: "y",
  officialRules: "Reglas oficiales",
  navCompetitions: "Competiciones",
  navMembership: "Membresía",
  navContact: "Contacto",
  navFreeEntry: "Entrada gratis",
  navAdmin: "Admin",
  navAccount: "Gestionar cuenta",
  signIn: "Entrar",
  signOut: "Salir",
  join: "Unirse",
  enter: "Participar",
  loginRequired: "Inicia sesión para comprar",
  loginRequiredBody:
    "Se requiere membresía antes del pago. Volverás aquí después de iniciar sesión.",
  monthlyClub: "Círculo Patrono",
  monthlyClubBody:
    "Una suscripción mensual para lectores que prefieren una relación continua con la revista — pagos internacionales gestionados con seguridad por Stripe.",
  subscribeMonthly: "Suscribirse mensualmente",
  language: "Idioma",
  footerBlurb:
    "Competiciones exclusivas para miembros de la revista. No es necesario comprar — consulte el Método alternativo de entrada.",
  footerRules: "Reglas",
  footerPrivacy: "Privacidad",
  footerTerms: "Términos",
  monthly: "Mensual",
  retailApprox: "Valor aprox.",

  membershipEyebrow: "Membresía",
  membershipHeading: "Únete al círculo",
  membershipIntro:
    "Crea tu perfil de miembro para participar. Recogemos los datos necesarios para elegibilidad, entrega de premios y cumplimiento.",
  alreadyMember: "¿Ya eres miembro?",
  membershipLoggedIn:
    "Has iniciado sesión. Actualiza tus datos cuando quieras desde Gestionar cuenta.",
  membershipStandingTitle: "Relación continua",
  marketingOptOut:
    "Excluirme de notas editoriales y anuncios de competiciones de The Rich Reporter.",
  marketingOptOutHint:
    "Déjalo sin marcar para seguir en la lista. Márcalo solo si no deseas recibir correos.",

  loginEyebrow: "Miembros",
  loginHeading: "Entrar",
  loginIntro: "Accede a tu membresía para asegurar entradas a las competiciones.",
  loginNewHere: "¿Nuevo aquí?",
  loginApply: "Solicitar membresía",
  signingIn: "Entrando…",

  contactEyebrow: "Mesa",
  contactHeading: "Contáctanos",
  contactIntro:
    "Preguntas sobre membresía, entrega o el Método alternativo de entrada — escribe a la mesa de competiciones. Respondemos con discreción.",

  amoeLegalEyebrow: "Legal · Estados Unidos",
  amoeHeading: "Método alternativo de entrada",
  amoeBody:
    "No es necesario comprar para participar o ganar. Descarga un formulario gratuito de entrada por correo para cualquier competición activa, complétalo a mano y envíalo a la dirección del formulario. Límite de una solicitud gratuita por sobre exterior, salvo que las reglas oficiales indiquen lo contrario. Nulo donde esté prohibido.",
  amoeDownload: "Descargar formulario",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Entrada gratuita por correo",
  amoeIndexIntro:
    "Selecciona una competición para abrir un formulario imprimible. No es necesario comprar.",
  amoeFormLabel: "Formulario",

  checkoutConfirmed: "Confirmado",
  checkoutEntered: "Estás inscrito",
  checkoutSuccessBody:
    "Pago realizado. Tus números de entrada están asegurados y el recibo está en camino. Los detalles del sorteo aparecen en tu correo de confirmación.",
  checkoutReturn: "Volver a la colección",
  checkoutManageAccount: "Gestionar cuenta",

  accountEyebrow: "Cuenta",
  accountHeading: "Gestionar cuenta",
  accountIntro:
    "Actualiza tu perfil de membresía, dirección postal, preferencia de marketing y contraseña.",
  accountProfileHeading: "Perfil",
  accountAddressHeading: "Dirección postal",
  accountPasswordHeading: "Cambiar contraseña",
  accountFullName: "Nombre completo",
  accountEmail: "Correo",
  accountEmailHint: "El correo no se puede cambiar aquí. Para actualizarlo,",
  accountPhone: "Teléfono",
  accountDob: "Fecha de nacimiento",
  accountAddress1: "Dirección línea 1",
  accountAddress2: "Dirección línea 2",
  accountCity: "Ciudad",
  accountState: "Estado / Provincia / Región",
  accountPostal: "Código postal",
  accountCountry: "País",
  accountMarketing:
    "Excluirme de notas editoriales y anuncios de competiciones de The Rich Reporter.",
  accountMarketingHint:
    "Déjalo sin marcar para seguir en la lista. Márcalo solo si no deseas recibir correos.",
  accountSaveProfile: "Guardar perfil",
  accountSaving: "Guardando…",
  accountProfileSaved: "Tu perfil ha sido actualizado.",
  accountCurrentPassword: "Contraseña actual",
  accountNewPassword: "Nueva contraseña",
  accountConfirmPassword: "Confirmar nueva contraseña",
  accountPasswordHint: "Mínimo 8 caracteres",
  accountChangePassword: "Actualizar contraseña",
  accountUpdatingPassword: "Actualizando…",
  accountPasswordSaved: "Tu contraseña ha sido actualizada.",
  accountSignOutHint: "Cierra sesión de tu membresía en este dispositivo.",
  accountAdminNote: "Tienes acceso de administrador.",

  legalPrivacyTitle: "Política de privacidad",
  legalTermsTitle: "Términos de uso",
  legalRulesTitle: "Reglas oficiales",
  legalLastUpdated: "Última actualización: julio 2026",
  legalPrivacyStub:
    "Recopilamos datos de cuenta y entradas para operar competiciones, entregar premios y responder consultas. Los mensajes de marketing se envían solo si no te has excluido.",
  legalTermsStub:
    "Al usar este sitio aceptas las reglas oficiales de cada competición y los requisitos de elegibilidad, incluido ser mayor de 18 años.",
  legalRulesStub:
    "No es necesario comprar. Método alternativo de entrada disponible. Nulo donde esté prohibido. Las reglas completas rigen todos los sorteos.",

  adminEyebrow: "Privado",
  adminHeading: "Admin",
  adminIntro: "Gestiona competiciones, orden de visualización y consultas de miembros.",
  adminAccountLink: "Gestionar cuenta",
};

/** Partial overlays for tertiary locales — missing keys fall back to English. */
const frPartial: Partial<Dictionary> = {
  language: "Langue",
  navCompetitions: "Compétitions",
  navMembership: "Adhésion",
  navContact: "Contact",
  navFreeEntry: "Entrée gratuite",
  navAccount: "Gérer le compte",
  signIn: "Connexion",
  signOut: "Déconnexion",
  join: "Rejoindre",
  enter: "Participer",
  membersOnly: "Membres uniquement",
  heroHeadline: "Discrètement plus riche",
  viewCollection: "Voir la collection",
  becomeMember: "Devenir membre",
  footerPrivacy: "Confidentialité",
  footerTerms: "Conditions",
  footerRules: "Règles",
};

const dePartial: Partial<Dictionary> = {
  language: "Sprache",
  navCompetitions: "Wettbewerbe",
  navMembership: "Mitgliedschaft",
  navContact: "Kontakt",
  navFreeEntry: "Freier Eintrag",
  navAccount: "Konto verwalten",
  signIn: "Anmelden",
  signOut: "Abmelden",
  join: "Beitreten",
  enter: "Teilnehmen",
  membersOnly: "Nur für Mitglieder",
  heroHeadline: "Leise reicher",
  viewCollection: "Kollektion ansehen",
  becomeMember: "Mitglied werden",
  footerPrivacy: "Datenschutz",
  footerTerms: "Bedingungen",
  footerRules: "Regeln",
};

const ptPartial: Partial<Dictionary> = {
  language: "Idioma",
  navCompetitions: "Competições",
  navMembership: "Associação",
  navContact: "Contacto",
  navFreeEntry: "Entrada gratuita",
  navAccount: "Gerir conta",
  signIn: "Entrar",
  signOut: "Sair",
  join: "Juntar-se",
  enter: "Participar",
  membersOnly: "Só membros",
  heroHeadline: "Discretamente mais rico",
  viewCollection: "Ver coleção",
  becomeMember: "Tornar-se membro",
  footerPrivacy: "Privacidade",
  footerTerms: "Termos",
  footerRules: "Regras",
};

const itPartial: Partial<Dictionary> = {
  language: "Lingua",
  navCompetitions: "Competizioni",
  navMembership: "Iscrizione",
  navContact: "Contatto",
  navFreeEntry: "Ingresso gratuito",
  navAccount: "Gestisci account",
  signIn: "Accedi",
  signOut: "Esci",
  join: "Unisciti",
  enter: "Partecipa",
  membersOnly: "Solo membri",
  heroHeadline: "Discretamente più ricco",
  viewCollection: "Vedi collezione",
  becomeMember: "Diventa membro",
  footerPrivacy: "Privacy",
  footerTerms: "Termini",
  footerRules: "Regole",
};

function withFallback(partial: Partial<Dictionary>): Dictionary {
  return { ...en, ...partial };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  fr: withFallback(frPartial),
  de: withFallback(dePartial),
  pt: withFallback(ptPartial),
  it: withFallback(itPartial),
};

export function isLocale(value: string | undefined | null): value is Locale {
  return (
    value === "en" ||
    value === "es" ||
    value === "fr" ||
    value === "de" ||
    value === "pt" ||
    value === "it"
  );
}

export function t(
  dict: Dictionary,
  key: keyof Dictionary,
  vars?: Record<string, string>,
): string {
  let text = dict[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
