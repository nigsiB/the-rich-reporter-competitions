export type Locale = "en" | "es" | "fr";

export const LOCALES: Locale[] = ["en", "es", "fr"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "trr_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
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
};

const fr: Dictionary = {
  membersOnly: "Membres uniquement",
  heroHeadline: "Discrètement plus riche",
  heroSub:
    "Compétitions privées pour lecteurs exigeants — tech emblématique, prestige éditorial et espèces avec discrétion.",
  viewCollection: "Voir la collection",
  becomeMember: "Devenir membre",
  competitionsEyebrow: "Collection actuelle",
  competitionsHeading: "Tirages exclusifs",
  competitionsIntro:
    "Cinq prix sélectionnés. Entrée à vingt-cinq cents. Livraison mondiale des gagnants.",
  howItWorks: "Comment ça marche",
  howHeading: "Une invitation, pas une course",
  step1Title: "Choisissez un prix",
  step1Body: "Sélectionnez dans notre collection limitée. Chaque tirage a un plafond d’entrées.",
  step2Title: "Sécurisez vos entrées",
  step2Body: "Les billets sont réservés dès le paiement — sans double réservation.",
  step3Title: "Attendez le tirage",
  step3Body:
    "Les gagnants sont tirés au sort après la date indiquée. Les règles officielles s’appliquent.",
  buyTickets: "Acheter des billets",
  enterNow: "Participer",
  securing: "Réservation…",
  entries: "Entrées",
  total: "Total",
  each: "chacun",
  perEntry: "par entrée",
  limitedTo: "Limité à",
  entriesWord: "entrées",
  liveInventory: "Inventaire en direct",
  chooseQty: "choisissez de 1 à 1 000 ci-dessous",
  cashAlternative: "Alternative en espèces",
  cashAltLine:
    "Le gagnant peut choisir une alternative en espèces exonérée d’environ {amount} à la place du prix.",
  worldwide:
    "Nous livrons les prix dans le monde entier — où que soit le gagnant. Expédition par The Rich Reporter.",
  backCollection: "← Collection",
  noPurchase: "Aucun achat nécessaire. Voir",
  amoe: "Méthode alternative d’entrée",
  and: "et",
  officialRules: "Règles officielles",
  navCompetitions: "Compétitions",
  navMembership: "Adhésion",
  navContact: "Contact",
  navFreeEntry: "Entrée gratuite",
  navAdmin: "Admin",
  signIn: "Connexion",
  signOut: "Déconnexion",
  join: "Rejoindre",
  enter: "Participer",
  loginRequired: "Connectez-vous pour acheter",
  loginRequiredBody:
    "L’adhésion est requise avant le paiement. Vous reviendrez ici après connexion.",
  monthlyClub: "Cercle Patron",
  monthlyClubBody:
    "Un abonnement mensuel pour les lecteurs qui préfèrent une relation durable avec le magazine — paiements internationaux sécurisés via Stripe.",
  subscribeMonthly: "S’abonner mensuellement",
  language: "Langue",
  footerBlurb:
    "Compétitions exclusives pour les membres du magazine. Aucun achat nécessaire — voir la Méthode alternative d’entrée.",
  footerRules: "Règles",
  footerPrivacy: "Confidentialité",
  footerTerms: "Conditions",
  monthly: "Mensuel",
  retailApprox: "Valeur approx.",
};

export const dictionaries: Record<Locale, Dictionary> = { en, es, fr };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "es" || value === "fr";
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
