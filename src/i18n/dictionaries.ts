export type Locale = "en" | "es" | "fr" | "de" | "pt" | "it";

export const LOCALES: Locale[] = ["en", "es", "fr", "de", "pt", "it"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "trr_locale";

/** Locales with complete page + form copy (no English fallback). */
export const FULL_LOCALES: Locale[] = ["en", "es", "fr", "de", "pt", "it"];

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
  formAccountLegend: "Account",
  formPassword: "Password",
  formIdPlaceholder: "As it appears on official ID",
  formStatePlaceholder: "State, province, or region",
  membershipCreating: "Creating membership…",
  membershipCreated: "Membership created.",
  membershipLegalConfirm:
    "By joining you confirm you are 18+, a legal resident of an eligible jurisdiction, and agree to the official rules. No purchase necessary.",

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
  contactSubject: "Subject",
  contactMessage: "Message",
  contactSending: "Sending…",
  contactSend: "Send message",
  contactSent: "Sent.",

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
  formAccountLegend: "Cuenta",
  formPassword: "Contraseña",
  formIdPlaceholder: "Como aparece en el documento oficial",
  formStatePlaceholder: "Estado, provincia o región",
  membershipCreating: "Creando membresía…",
  membershipCreated: "Membresía creada.",
  membershipLegalConfirm:
    "Al unirte confirmas que tienes 18 años o más, resides legalmente en una jurisdicción elegible y aceptas las reglas oficiales. No es necesario comprar.",

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
  contactSubject: "Asunto",
  contactMessage: "Mensaje",
  contactSending: "Enviando…",
  contactSend: "Enviar mensaje",
  contactSent: "Enviado.",

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

const fr: Dictionary = {
  membersOnly: "Membres uniquement",
  heroHeadline: "Discrètement plus riche",
  heroSub:
    "Des concours privés pour les lecteurs qui en attendent davantage — technologie phare, prestige éditorial et espèces tirées avec discrétion.",
  viewCollection: "Voir la collection",
  becomeMember: "Devenir membre",
  competitionsEyebrow: "Collection actuelle",
  competitionsHeading: "Tirages exclusifs",
  competitionsIntro:
    "Cinq prix sélectionnés. Entrée à vingt-cinq cents. Nous livrons les gagnants dans le monde entier.",
  howItWorks: "Comment ça marche",
  howHeading: "Une invitation, pas une course",
  step1Title: "Choisissez un prix",
  step1Body: "Sélectionnez parmi notre collection limitée. Chaque tirage a un plafond d'entrées fixe.",
  step2Title: "Sécurisez vos entrées",
  step2Body: "Les billets sont réservés dès le début du paiement — pas de double réservation.",
  step3Title: "Attendez le tirage",
  step3Body:
    "Les gagnants sont choisis au hasard après la date du tirage. Les règles officielles s'appliquent.",
  buyTickets: "Acheter des billets",
  enterNow: "Participer",
  securing: "Réservation…",
  entries: "Entrées",
  total: "Total",
  each: "chacune",
  perEntry: "par entrée",
  limitedTo: "Limité à",
  entriesWord: "entrées",
  liveInventory: "Inventaire en direct",
  chooseQty: "choisissez de 1 à 1 000 ci-dessous",
  cashAlternative: "Alternative en espèces",
  cashAltLine:
    "Le gagnant peut choisir une alternative en espèces exonérée d'impôt de {amount} à la place du prix.",
  worldwide:
    "Nous livrons les prix dans le monde entier — où que soit le gagnant. Expédition et livraison par The Rich Reporter.",
  backCollection: "← Collection",
  noPurchase: "Aucun achat nécessaire. Voir",
  amoe: "Méthode alternative d'entrée",
  and: "et",
  officialRules: "Règles officielles",
  navCompetitions: "Compétitions",
  navMembership: "Adhésion",
  navContact: "Contact",
  navFreeEntry: "Entrée gratuite",
  navAdmin: "Admin",
  navAccount: "Gérer le compte",
  signIn: "Connexion",
  signOut: "Déconnexion",
  join: "Rejoindre",
  enter: "Participer",
  loginRequired: "Connectez-vous pour acheter des entrées",
  loginRequiredBody:
    "L'adhésion est requise avant le paiement. Vous reviendrez ici après vous être connecté.",
  monthlyClub: "Cercle des Mécènes",
  monthlyClubBody:
    "Un abonnement mensuel pour les lecteurs qui préfèrent une relation durable avec le magazine — paiements internationaux importants gérés en toute sécurité par Stripe.",
  subscribeMonthly: "S'abonner mensuellement",
  language: "Langue",
  footerBlurb:
    "Concours exclusifs pour les membres du magazine. Aucun achat nécessaire — voir la Méthode alternative d'entrée.",
  footerRules: "Règles",
  footerPrivacy: "Confidentialité",
  footerTerms: "Conditions",
  monthly: "Mensuel",
  retailApprox: "Valeur approx.",

  membershipEyebrow: "Adhésion",
  membershipHeading: "Rejoindre le cercle",
  membershipIntro:
    "Créez votre profil de membre pour participer. Nous recueillons les informations nécessaires à l'éligibilité, à la livraison des prix et à la conformité.",
  alreadyMember: "Déjà membre ?",
  membershipLoggedIn:
    "Vous êtes connecté. Mettez à jour vos informations à tout moment depuis Gérer le compte.",
  membershipStandingTitle: "Relation durable",
  marketingOptOut:
    "Se désinscrire des notes éditoriales et des annonces de concours de The Rich Reporter.",
  marketingOptOutHint:
    "Laissez décoché pour rester sur la liste. Cochez uniquement si vous ne souhaitez pas recevoir d'e-mails.",
  formAccountLegend: "Compte",
  formPassword: "Mot de passe",
  formIdPlaceholder: "Tel qu'il apparaît sur la pièce d'identité officielle",
  formStatePlaceholder: "État, province ou région",
  membershipCreating: "Création de l'adhésion…",
  membershipCreated: "Adhésion créée.",
  membershipLegalConfirm:
    "En rejoignant, vous confirmez avoir 18 ans ou plus, être résident légal d'une juridiction éligible et accepter les règles officielles. Aucun achat nécessaire.",

  loginEyebrow: "Membres",
  loginHeading: "Connexion",
  loginIntro: "Accédez à votre adhésion pour sécuriser vos entrées aux concours.",
  loginNewHere: "Nouveau ici ?",
  loginApply: "Demander l'adhésion",
  signingIn: "Connexion…",

  contactEyebrow: "Bureau",
  contactHeading: "Nous contacter",
  contactIntro:
    "Questions sur l'adhésion, la livraison ou la Méthode alternative d'entrée — écrivez au bureau des concours. Nous répondons avec discrétion.",
  contactSubject: "Objet",
  contactMessage: "Message",
  contactSending: "Envoi…",
  contactSend: "Envoyer le message",
  contactSent: "Envoyé.",

  amoeLegalEyebrow: "Juridique · États-Unis",
  amoeHeading: "Méthode alternative d'entrée",
  amoeBody:
    "Aucun achat n'est nécessaire pour participer ou gagner. Téléchargez un formulaire d'entrée gratuit par courrier pour tout concours actif, remplissez-le à la main et postez-le à l'adresse indiquée. Limite d'une demande gratuite par enveloppe extérieure, sauf indication contraire des règles officielles. Nul là où la loi l'interdit.",
  amoeDownload: "Télécharger le formulaire",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Entrée gratuite par courrier",
  amoeIndexIntro:
    "Sélectionnez un concours pour ouvrir un formulaire imprimable. Aucun achat nécessaire.",
  amoeFormLabel: "Formulaire",

  checkoutConfirmed: "Confirmé",
  checkoutEntered: "Vous êtes inscrit",
  checkoutSuccessBody:
    "Paiement réussi. Vos numéros de billet sont sécurisés et un reçu est en route. Les détails officiels du tirage figurent dans votre e-mail de confirmation.",
  checkoutReturn: "Retour à la collection",
  checkoutManageAccount: "Gérer le compte",

  accountEyebrow: "Compte",
  accountHeading: "Gérer le compte",
  accountIntro:
    "Mettez à jour votre profil d'adhésion, votre adresse postale, votre préférence marketing et votre mot de passe.",
  accountProfileHeading: "Profil",
  accountAddressHeading: "Adresse postale",
  accountPasswordHeading: "Changer le mot de passe",
  accountFullName: "Nom complet",
  accountEmail: "E-mail",
  accountEmailHint: "L'e-mail ne peut pas être modifié ici. Pour le mettre à jour,",
  accountPhone: "Téléphone",
  accountDob: "Date de naissance",
  accountAddress1: "Adresse ligne 1",
  accountAddress2: "Adresse ligne 2",
  accountCity: "Ville",
  accountState: "État / Province / Région",
  accountPostal: "Code postal",
  accountCountry: "Pays",
  accountMarketing:
    "Se désinscrire des notes éditoriales et des annonces de concours de The Rich Reporter.",
  accountMarketingHint:
    "Laissez décoché pour rester sur la liste. Cochez uniquement si vous ne souhaitez pas recevoir d'e-mails.",
  accountSaveProfile: "Enregistrer le profil",
  accountSaving: "Enregistrement…",
  accountProfileSaved: "Votre profil a été mis à jour.",
  accountCurrentPassword: "Mot de passe actuel",
  accountNewPassword: "Nouveau mot de passe",
  accountConfirmPassword: "Confirmer le nouveau mot de passe",
  accountPasswordHint: "Minimum 8 caractères",
  accountChangePassword: "Mettre à jour le mot de passe",
  accountUpdatingPassword: "Mise à jour…",
  accountPasswordSaved: "Votre mot de passe a été mis à jour.",
  accountSignOutHint: "Déconnectez-vous de votre adhésion sur cet appareil.",
  accountAdminNote: "Vous avez un accès administrateur.",

  legalPrivacyTitle: "Politique de confidentialité",
  legalTermsTitle: "Conditions d'utilisation",
  legalRulesTitle: "Règles officielles",
  legalLastUpdated: "Dernière mise à jour : juillet 2026",
  legalPrivacyStub:
    "Nous collectons les données de compte et d'entrée pour gérer les concours, livrer les prix et répondre aux demandes. Les messages marketing ne sont envoyés que si vous ne vous êtes pas désinscrit.",
  legalTermsStub:
    "En utilisant ce site, vous acceptez les règles officielles de chaque concours et les conditions d'éligibilité, notamment avoir 18 ans ou plus.",
  legalRulesStub:
    "Aucun achat nécessaire. Méthode alternative d'entrée disponible. Nul là où la loi l'interdit. Les règles complètes régissent tous les tirages.",

  adminEyebrow: "Privé",
  adminHeading: "Admin",
  adminIntro: "Gérez les concours, l'ordre d'affichage et les demandes des membres.",
  adminAccountLink: "Gérer le compte",
};

const de: Dictionary = {
  membersOnly: "Nur für Mitglieder",
  heroHeadline: "Leise reicher",
  heroSub:
    "Private Wettbewerbe für Leser, die mehr erwarten — Flaggschiff-Technik, Magazinprestige und Bargeld mit Diskretion.",
  viewCollection: "Kollektion ansehen",
  becomeMember: "Mitglied werden",
  competitionsEyebrow: "Aktuelle Kollektion",
  competitionsHeading: "Exklusive Verlosungen",
  competitionsIntro:
    "Fünf kuratierte Preise. Teilnahme für fünfundzwanzig Cent. Wir liefern Gewinner weltweit.",
  howItWorks: "So funktioniert's",
  howHeading: "Eine Einladung, kein Ansturm",
  step1Title: "Preis wählen",
  step1Body: "Wählen Sie aus unserer begrenzten Kollektion. Jede Verlosung hat ein festes Teilnehmerlimit.",
  step2Title: "Teilnahmen sichern",
  step2Body: "Tickets werden reserviert, sobald Sie den Checkout starten — keine Doppelbuchungen.",
  step3Title: "Auf die Verlosung warten",
  step3Body:
    "Gewinner werden nach dem Ziehungstermin zufällig ausgewählt. Es gelten die offiziellen Regeln.",
  buyTickets: "Tickets kaufen",
  enterNow: "Jetzt teilnehmen",
  securing: "Teilnahme wird gesichert…",
  entries: "Teilnahmen",
  total: "Gesamt",
  each: "je",
  perEntry: "pro Teilnahme",
  limitedTo: "Begrenzt auf",
  entriesWord: "Teilnahmen",
  liveInventory: "Live-Bestand",
  chooseQty: "unten 1–1.000 wählen",
  cashAlternative: "Baralternative",
  cashAltLine:
    "Der Gewinner kann statt des Preises eine steuerfreie Baralternative von {amount} wählen.",
  worldwide:
    "Wir liefern Preise weltweit — wo immer der Gewinner ist. Versand und Erfüllung durch The Rich Reporter.",
  backCollection: "← Kollektion",
  noPurchase: "Kein Kauf erforderlich. Siehe",
  amoe: "Alternative Teilnahmemethode",
  and: "und",
  officialRules: "Offizielle Regeln",
  navCompetitions: "Wettbewerbe",
  navMembership: "Mitgliedschaft",
  navContact: "Kontakt",
  navFreeEntry: "Freier Eintrag",
  navAdmin: "Admin",
  navAccount: "Konto verwalten",
  signIn: "Anmelden",
  signOut: "Abmelden",
  join: "Beitreten",
  enter: "Teilnehmen",
  loginRequired: "Anmelden, um Teilnahmen zu kaufen",
  loginRequiredBody:
    "Mitgliedschaft ist vor dem Checkout erforderlich. Nach der Anmeldung kehren Sie hierher zurück.",
  monthlyClub: "Mäzenkreis",
  monthlyClubBody:
    "Ein monatliches Abonnement für Leser, die eine dauerhafte Beziehung zum Magazin bevorzugen — große internationale Zahlungen sicher über Stripe.",
  subscribeMonthly: "Monatlich abonnieren",
  language: "Sprache",
  footerBlurb:
    "Exklusive Wettbewerbe für Magazinmitglieder. Kein Kauf erforderlich — siehe Alternative Teilnahmemethode.",
  footerRules: "Regeln",
  footerPrivacy: "Datenschutz",
  footerTerms: "Bedingungen",
  monthly: "Monatlich",
  retailApprox: "Ungef. UVP",

  membershipEyebrow: "Mitgliedschaft",
  membershipHeading: "Dem Kreis beitreten",
  membershipIntro:
    "Erstellen Sie Ihr Mitgliederprofil, um teilzunehmen. Wir erfassen die für Teilnahmeberechtigung, Preisauslieferung und Compliance erforderlichen Angaben.",
  alreadyMember: "Bereits Mitglied?",
  membershipLoggedIn:
    "Sie sind angemeldet. Aktualisieren Sie Ihre Daten jederzeit unter Konto verwalten.",
  membershipStandingTitle: "Dauerhafte Beziehung",
  marketingOptOut:
    "Abmelden von redaktionellen Hinweisen und Wettbewerbsankündigungen von The Rich Reporter.",
  marketingOptOutHint:
    "Unmarkiert lassen, um auf der Liste zu bleiben. Nur ankreuzen, wenn Sie keine E-Mails erhalten möchten.",
  formAccountLegend: "Konto",
  formPassword: "Passwort",
  formIdPlaceholder: "Wie auf dem amtlichen Ausweis",
  formStatePlaceholder: "Bundesland, Provinz oder Region",
  membershipCreating: "Mitgliedschaft wird erstellt…",
  membershipCreated: "Mitgliedschaft erstellt.",
  membershipLegalConfirm:
    "Mit dem Beitritt bestätigen Sie, dass Sie 18+ sind, rechtmäßiger Einwohner einer zulässigen Gerichtsbarkeit und den offiziellen Regeln zustimmen. Kein Kauf erforderlich.",

  loginEyebrow: "Mitglieder",
  loginHeading: "Anmelden",
  loginIntro: "Greifen Sie auf Ihre Mitgliedschaft zu, um Wettbewerbsteilnahmen zu sichern.",
  loginNewHere: "Neu hier?",
  loginApply: "Mitgliedschaft beantragen",
  signingIn: "Anmeldung…",

  contactEyebrow: "Redaktion",
  contactHeading: "Kontakt",
  contactIntro:
    "Fragen zu Mitgliedschaft, Erfüllung oder Alternativer Teilnahmemethode — schreiben Sie dem Wettbewerbsbüro. Wir antworten diskret.",
  contactSubject: "Betreff",
  contactMessage: "Nachricht",
  contactSending: "Wird gesendet…",
  contactSend: "Nachricht senden",
  contactSent: "Gesendet.",

  amoeLegalEyebrow: "Rechtlich · Vereinigte Staaten",
  amoeHeading: "Alternative Teilnahmemethode",
  amoeBody:
    "Kein Kauf ist erforderlich, um teilzunehmen oder zu gewinnen. Laden Sie ein kostenloses Post-Eintragsformular für jeden aktiven Wettbewerb herunter, füllen Sie es handschriftlich aus und senden Sie es an die Adresse auf dem Formular. Maximal eine kostenlose Anfrage pro äußerem Umschlag, sofern die offiziellen Regeln nichts anderes vorsehen. Ungültig, wo verboten.",
  amoeDownload: "Formular herunterladen",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Kostenlose Post-Teilnahme",
  amoeIndexIntro:
    "Wählen Sie einen Wettbewerb, um ein druckbares Formular zu öffnen. Kein Kauf erforderlich.",
  amoeFormLabel: "Formular",

  checkoutConfirmed: "Bestätigt",
  checkoutEntered: "Sie sind angemeldet",
  checkoutSuccessBody:
    "Zahlung erfolgreich. Ihre Ticketnummern sind gesichert und eine Quittung ist unterwegs. Offizielle Ziehungdetails stehen in Ihrer Bestätigungs-E-Mail.",
  checkoutReturn: "Zurück zur Kollektion",
  checkoutManageAccount: "Konto verwalten",

  accountEyebrow: "Konto",
  accountHeading: "Konto verwalten",
  accountIntro:
    "Aktualisieren Sie Ihr Mitgliederprofil, Ihre Postadresse, Marketingpräferenz und Ihr Passwort.",
  accountProfileHeading: "Profil",
  accountAddressHeading: "Postadresse",
  accountPasswordHeading: "Passwort ändern",
  accountFullName: "Vollständiger Name",
  accountEmail: "E-Mail",
  accountEmailHint: "E-Mail kann hier nicht geändert werden. Zum Aktualisieren bitte",
  accountPhone: "Telefon",
  accountDob: "Geburtsdatum",
  accountAddress1: "Adresszeile 1",
  accountAddress2: "Adresszeile 2",
  accountCity: "Stadt",
  accountState: "Bundesland / Provinz / Region",
  accountPostal: "PLZ",
  accountCountry: "Land",
  accountMarketing:
    "Abmelden von redaktionellen Hinweisen und Wettbewerbsankündigungen von The Rich Reporter.",
  accountMarketingHint:
    "Unmarkiert lassen, um auf der Liste zu bleiben. Nur ankreuzen, wenn Sie keine E-Mails erhalten möchten.",
  accountSaveProfile: "Profil speichern",
  accountSaving: "Wird gespeichert…",
  accountProfileSaved: "Ihr Profil wurde aktualisiert.",
  accountCurrentPassword: "Aktuelles Passwort",
  accountNewPassword: "Neues Passwort",
  accountConfirmPassword: "Neues Passwort bestätigen",
  accountPasswordHint: "Mindestens 8 Zeichen",
  accountChangePassword: "Passwort aktualisieren",
  accountUpdatingPassword: "Wird aktualisiert…",
  accountPasswordSaved: "Ihr Passwort wurde aktualisiert.",
  accountSignOutHint: "Melden Sie sich von Ihrer Mitgliedschaft auf diesem Gerät ab.",
  accountAdminNote: "Sie haben Admin-Zugang.",

  legalPrivacyTitle: "Datenschutzrichtlinie",
  legalTermsTitle: "Nutzungsbedingungen",
  legalRulesTitle: "Offizielle Regeln",
  legalLastUpdated: "Zuletzt aktualisiert: Juli 2026",
  legalPrivacyStub:
    "Wir erheben Konto- und Teilnahmedaten, um Wettbewerbe zu betreiben, Preise auszuliefern und Anfragen zu beantworten. Marketingnachrichten werden nur gesendet, wenn Sie sich nicht abgemeldet haben.",
  legalTermsStub:
    "Durch die Nutzung dieser Website stimmen Sie den offiziellen Regeln jedes Wettbewerbs und den Teilnahmevoraussetzungen zu, einschließlich eines Mindestalters von 18 Jahren.",
  legalRulesStub:
    "Kein Kauf erforderlich. Alternative Teilnahmemethode verfügbar. Ungültig, wo verboten. Vollständige Regeln gelten für alle Verlosungen.",

  adminEyebrow: "Privat",
  adminHeading: "Admin",
  adminIntro: "Verwalten Sie Wettbewerbe, Anzeigereihenfolge und Mitgliederanfragen.",
  adminAccountLink: "Konto verwalten",
};

const pt: Dictionary = {
  membersOnly: "Só membros",
  heroHeadline: "Discretamente mais rico",
  heroSub:
    "Competições privadas para leitores que esperam mais — tecnologia de topo, prestígio editorial e dinheiro com discrição.",
  viewCollection: "Ver coleção",
  becomeMember: "Tornar-se membro",
  competitionsEyebrow: "Coleção atual",
  competitionsHeading: "Sorteios exclusivos",
  competitionsIntro:
    "Cinco prémios selecionados. Entrada a vinte e cinco cêntimos. Entregamos vencedores em todo o mundo.",
  howItWorks: "Como funciona",
  howHeading: "Um convite, não uma corrida",
  step1Title: "Escolha um prémio",
  step1Body: "Selecione da nossa coleção limitada. Cada sorteio tem um limite fixo de entradas.",
  step2Title: "Garanta as suas entradas",
  step2Body: "Os bilhetes são reservados no momento em que inicia o pagamento — sem dupla reserva.",
  step3Title: "Aguarde o sorteio",
  step3Body:
    "Os vencedores são escolhidos ao acaso após a data do sorteio. Aplicam-se as regras oficiais.",
  buyTickets: "Comprar bilhetes",
  enterNow: "Participar",
  securing: "A reservar…",
  entries: "Entradas",
  total: "Total",
  each: "cada",
  perEntry: "por entrada",
  limitedTo: "Limitado a",
  entriesWord: "entradas",
  liveInventory: "Inventário ao vivo",
  chooseQty: "escolha de 1 a 1.000 abaixo",
  cashAlternative: "Alternativa em dinheiro",
  cashAltLine:
    "O vencedor pode optar por uma alternativa em dinheiro isenta de impostos de {amount} em vez do prémio.",
  worldwide:
    "Entregamos prémios em todo o mundo — onde quer que esteja o vencedor. Envio e cumprimento pela The Rich Reporter.",
  backCollection: "← Coleção",
  noPurchase: "Não é necessária compra. Consulte",
  amoe: "Método alternativo de entrada",
  and: "e",
  officialRules: "Regras oficiais",
  navCompetitions: "Competições",
  navMembership: "Associação",
  navContact: "Contacto",
  navFreeEntry: "Entrada gratuita",
  navAdmin: "Admin",
  navAccount: "Gerir conta",
  signIn: "Entrar",
  signOut: "Sair",
  join: "Juntar-se",
  enter: "Participar",
  loginRequired: "Inicie sessão para comprar entradas",
  loginRequiredBody:
    "É necessária associação antes do pagamento. Voltará aqui após iniciar sessão.",
  monthlyClub: "Círculo Patrono",
  monthlyClubBody:
    "Uma subscrição mensal para leitores que preferem uma relação contínua com a revista — pagamentos internacionais elevados tratados com segurança pela Stripe.",
  subscribeMonthly: "Subscrever mensalmente",
  language: "Idioma",
  footerBlurb:
    "Competições exclusivas para membros da revista. Não é necessária compra — consulte o Método alternativo de entrada.",
  footerRules: "Regras",
  footerPrivacy: "Privacidade",
  footerTerms: "Termos",
  monthly: "Mensal",
  retailApprox: "Valor aprox.",

  membershipEyebrow: "Associação",
  membershipHeading: "Junte-se ao círculo",
  membershipIntro:
    "Crie o seu perfil de membro para participar. Recolhemos os dados necessários para elegibilidade, entrega de prémios e conformidade.",
  alreadyMember: "Já é membro?",
  membershipLoggedIn:
    "Tem sessão iniciada. Atualize os seus dados a qualquer momento em Gerir conta.",
  membershipStandingTitle: "Relação contínua",
  marketingOptOut:
    "Excluir-me de notas editoriais e anúncios de competições da The Rich Reporter.",
  marketingOptOutHint:
    "Deixe desmarcado para permanecer na lista. Marque apenas se preferir não receber e-mails.",
  formAccountLegend: "Conta",
  formPassword: "Palavra-passe",
  formIdPlaceholder: "Como aparece no documento oficial",
  formStatePlaceholder: "Estado, província ou região",
  membershipCreating: "A criar associação…",
  membershipCreated: "Associação criada.",
  membershipLegalConfirm:
    "Ao juntar-se, confirma que tem 18+ anos, é residente legal de uma jurisdição elegível e aceita as regras oficiais. Não é necessária compra.",

  loginEyebrow: "Membros",
  loginHeading: "Entrar",
  loginIntro: "Aceda à sua associação para garantir entradas nas competições.",
  loginNewHere: "Novo por aqui?",
  loginApply: "Pedir associação",
  signingIn: "A entrar…",

  contactEyebrow: "Secretaria",
  contactHeading: "Contacte-nos",
  contactIntro:
    "Questões sobre associação, cumprimento ou Método alternativo de entrada — escreva à secretaria de competições. Respondemos com discrição.",
  contactSubject: "Assunto",
  contactMessage: "Mensagem",
  contactSending: "A enviar…",
  contactSend: "Enviar mensagem",
  contactSent: "Enviado.",

  amoeLegalEyebrow: "Legal · Estados Unidos",
  amoeHeading: "Método alternativo de entrada",
  amoeBody:
    "Não é necessária compra para participar ou ganhar. Descarregue um formulário gratuito de entrada por correio para qualquer competição ativa, preencha-o à mão e envie para o endereço do formulário. Limite de um pedido gratuito por envelope exterior, salvo indicação em contrário nas regras oficiais. Nulo onde for proibido.",
  amoeDownload: "Descarregar formulário",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Entrada gratuita por correio",
  amoeIndexIntro:
    "Selecione uma competição para abrir um formulário imprimível. Não é necessária compra.",
  amoeFormLabel: "Formulário",

  checkoutConfirmed: "Confirmado",
  checkoutEntered: "Está inscrito",
  checkoutSuccessBody:
    "Pagamento concluído. Os seus números de bilhete estão garantidos e o recibo está a caminho. Os detalhes oficiais do sorteio aparecem no e-mail de confirmação.",
  checkoutReturn: "Voltar à coleção",
  checkoutManageAccount: "Gerir conta",

  accountEyebrow: "Conta",
  accountHeading: "Gerir conta",
  accountIntro:
    "Atualize o perfil de associação, morada postal, preferência de marketing e palavra-passe.",
  accountProfileHeading: "Perfil",
  accountAddressHeading: "Morada postal",
  accountPasswordHeading: "Alterar palavra-passe",
  accountFullName: "Nome completo",
  accountEmail: "E-mail",
  accountEmailHint: "O e-mail não pode ser alterado aqui. Para o atualizar,",
  accountPhone: "Telefone",
  accountDob: "Data de nascimento",
  accountAddress1: "Morada linha 1",
  accountAddress2: "Morada linha 2",
  accountCity: "Cidade",
  accountState: "Estado / Província / Região",
  accountPostal: "Código postal",
  accountCountry: "País",
  accountMarketing:
    "Excluir-me de notas editoriais e anúncios de competições da The Rich Reporter.",
  accountMarketingHint:
    "Deixe desmarcado para permanecer na lista. Marque apenas se preferir não receber e-mails.",
  accountSaveProfile: "Guardar perfil",
  accountSaving: "A guardar…",
  accountProfileSaved: "O seu perfil foi atualizado.",
  accountCurrentPassword: "Palavra-passe atual",
  accountNewPassword: "Nova palavra-passe",
  accountConfirmPassword: "Confirmar nova palavra-passe",
  accountPasswordHint: "Mínimo 8 caracteres",
  accountChangePassword: "Atualizar palavra-passe",
  accountUpdatingPassword: "A atualizar…",
  accountPasswordSaved: "A sua palavra-passe foi atualizada.",
  accountSignOutHint: "Termine a sessão da sua associação neste dispositivo.",
  accountAdminNote: "Tem acesso de administrador.",

  legalPrivacyTitle: "Política de privacidade",
  legalTermsTitle: "Termos de utilização",
  legalRulesTitle: "Regras oficiais",
  legalLastUpdated: "Última atualização: julho de 2026",
  legalPrivacyStub:
    "Recolhemos dados de conta e de entrada para operar competições, entregar prémios e responder a pedidos. Mensagens de marketing só são enviadas se não se tiver excluído.",
  legalTermsStub:
    "Ao utilizar este site, aceita as regras oficiais de cada competição e os requisitos de elegibilidade, incluindo ter 18 anos ou mais.",
  legalRulesStub:
    "Não é necessária compra. Método alternativo de entrada disponível. Nulo onde for proibido. As regras completas regem todos os sorteios.",

  adminEyebrow: "Privado",
  adminHeading: "Admin",
  adminIntro: "Faça a gestão de competições, ordem de exibição e pedidos de membros.",
  adminAccountLink: "Gerir conta",
};

const it: Dictionary = {
  membersOnly: "Solo membri",
  heroHeadline: "Discretamente più ricco",
  heroSub:
    "Concorsi privati per lettori che si aspettano di più — tecnologia di punta, prestigio editoriale e denaro con discrezione.",
  viewCollection: "Vedi collezione",
  becomeMember: "Diventa membro",
  competitionsEyebrow: "Collezione attuale",
  competitionsHeading: "Estrazioni esclusive",
  competitionsIntro:
    "Cinque premi selezionati. Ingresso a venticinque centesimi. Consegnamo i vincitori in tutto il mondo.",
  howItWorks: "Come funziona",
  howHeading: "Un invito, non una corsa",
  step1Title: "Scegli un premio",
  step1Body: "Seleziona dalla nostra collezione limitata. Ogni estrazione ha un tetto fisso di ingressi.",
  step2Title: "Assicura i tuoi ingressi",
  step2Body: "I biglietti vengono riservati non appena inizi il pagamento — niente doppie prenotazioni.",
  step3Title: "Attendi l'estrazione",
  step3Body:
    "I vincitori sono selezionati a caso dopo la data di estrazione. Si applicano le regole ufficiali.",
  buyTickets: "Acquista biglietti",
  enterNow: "Partecipa",
  securing: "Prenotazione…",
  entries: "Ingressi",
  total: "Totale",
  each: "ciascuno",
  perEntry: "per ingresso",
  limitedTo: "Limitato a",
  entriesWord: "ingressi",
  liveInventory: "Inventario in tempo reale",
  chooseQty: "scegli da 1 a 1.000 sotto",
  cashAlternative: "Alternativa in contanti",
  cashAltLine:
    "Il vincitore può scegliere un'alternativa in contanti esente da imposte di {amount} al posto del premio.",
  worldwide:
    "Consegnamo i premi in tutto il mondo — ovunque sia il vincitore. Spedizione e adempimento a cura di The Rich Reporter.",
  backCollection: "← Collezione",
  noPurchase: "Nessun acquisto necessario. Vedi",
  amoe: "Metodo alternativo di partecipazione",
  and: "e",
  officialRules: "Regole ufficiali",
  navCompetitions: "Competizioni",
  navMembership: "Iscrizione",
  navContact: "Contatto",
  navFreeEntry: "Ingresso gratuito",
  navAdmin: "Admin",
  navAccount: "Gestisci account",
  signIn: "Accedi",
  signOut: "Esci",
  join: "Unisciti",
  enter: "Partecipa",
  loginRequired: "Accedi per acquistare ingressi",
  loginRequiredBody:
    "L'iscrizione è richiesta prima del pagamento. Tornerai qui dopo aver effettuato l'accesso.",
  monthlyClub: "Circolo Patron",
  monthlyClubBody:
    "Un abbonamento mensile per i lettori che preferiscono un rapporto continuo con la rivista — grandi pagamenti internazionali gestiti in sicurezza da Stripe.",
  subscribeMonthly: "Abbonati mensilmente",
  language: "Lingua",
  footerBlurb:
    "Competizioni esclusive per i membri della rivista. Nessun acquisto necessario — vedi Metodo alternativo di partecipazione.",
  footerRules: "Regole",
  footerPrivacy: "Privacy",
  footerTerms: "Termini",
  monthly: "Mensile",
  retailApprox: "Valore approx.",

  membershipEyebrow: "Iscrizione",
  membershipHeading: "Unisciti al circolo",
  membershipIntro:
    "Crea il tuo profilo membro per partecipare. Raccogliamo i dati necessari per idoneità, consegna dei premi e conformità.",
  alreadyMember: "Già membro?",
  membershipLoggedIn:
    "Hai effettuato l'accesso. Aggiorna i tuoi dati in qualsiasi momento da Gestisci account.",
  membershipStandingTitle: "Rapporto continuo",
  marketingOptOut:
    "Escludimi dalle note editoriali e dagli annunci di competizioni di The Rich Reporter.",
  marketingOptOutHint:
    "Lascia deselezionato per restare in lista. Seleziona solo se preferisci non ricevere e-mail.",
  formAccountLegend: "Account",
  formPassword: "Password",
  formIdPlaceholder: "Come appare sul documento ufficiale",
  formStatePlaceholder: "Stato, provincia o regione",
  membershipCreating: "Creazione iscrizione…",
  membershipCreated: "Iscrizione creata.",
  membershipLegalConfirm:
    "Iscrivendoti confermi di avere 18+ anni, di essere residente legale in una giurisdizione idonea e di accettare le regole ufficiali. Nessun acquisto necessario.",

  loginEyebrow: "Membri",
  loginHeading: "Accedi",
  loginIntro: "Accedi alla tua iscrizione per assicurarti gli ingressi alle competizioni.",
  loginNewHere: "Nuovo qui?",
  loginApply: "Richiedi iscrizione",
  signingIn: "Accesso…",

  contactEyebrow: "Scrivania",
  contactHeading: "Contattaci",
  contactIntro:
    "Domande su iscrizione, adempimento o Metodo alternativo di partecipazione — scrivi alla scrivania delle competizioni. Rispondiamo con discrezione.",
  contactSubject: "Oggetto",
  contactMessage: "Messaggio",
  contactSending: "Invio…",
  contactSend: "Invia messaggio",
  contactSent: "Inviato.",

  amoeLegalEyebrow: "Legale · Stati Uniti",
  amoeHeading: "Metodo alternativo di partecipazione",
  amoeBody:
    "Nessun acquisto è necessario per partecipare o vincere. Scarica un modulo gratuito di partecipazione per posta per qualsiasi competizione attiva, compilalo a mano e spediscilo all'indirizzo sul modulo. Limite di una richiesta gratuita per busta esterna, salvo diversa indicazione delle regole ufficiali. Nullo dove vietato.",
  amoeDownload: "Scarica modulo",
  amoeIndexEyebrow: "AMOE",
  amoeIndexHeading: "Partecipazione gratuita per posta",
  amoeIndexIntro:
    "Seleziona una competizione per aprire un modulo stampabile. Nessun acquisto necessario.",
  amoeFormLabel: "Modulo",

  checkoutConfirmed: "Confermato",
  checkoutEntered: "Sei iscritto",
  checkoutSuccessBody:
    "Pagamento riuscito. I tuoi numeri di biglietto sono assicurati e la ricevuta è in arrivo. I dettagli ufficiali dell'estrazione compaiono nell'e-mail di conferma.",
  checkoutReturn: "Torna alla collezione",
  checkoutManageAccount: "Gestisci account",

  accountEyebrow: "Account",
  accountHeading: "Gestisci account",
  accountIntro:
    "Aggiorna il profilo di iscrizione, l'indirizzo postale, la preferenza di marketing e la password.",
  accountProfileHeading: "Profilo",
  accountAddressHeading: "Indirizzo postale",
  accountPasswordHeading: "Cambia password",
  accountFullName: "Nome completo",
  accountEmail: "E-mail",
  accountEmailHint: "L'e-mail non può essere modificata qui. Per aggiornarla,",
  accountPhone: "Telefono",
  accountDob: "Data di nascita",
  accountAddress1: "Indirizzo riga 1",
  accountAddress2: "Indirizzo riga 2",
  accountCity: "Città",
  accountState: "Stato / Provincia / Regione",
  accountPostal: "CAP / Codice postale",
  accountCountry: "Paese",
  accountMarketing:
    "Escludimi dalle note editoriali e dagli annunci di competizioni di The Rich Reporter.",
  accountMarketingHint:
    "Lascia deselezionato per restare in lista. Seleziona solo se preferisci non ricevere e-mail.",
  accountSaveProfile: "Salva profilo",
  accountSaving: "Salvataggio…",
  accountProfileSaved: "Il tuo profilo è stato aggiornato.",
  accountCurrentPassword: "Password attuale",
  accountNewPassword: "Nuova password",
  accountConfirmPassword: "Conferma nuova password",
  accountPasswordHint: "Minimo 8 caratteri",
  accountChangePassword: "Aggiorna password",
  accountUpdatingPassword: "Aggiornamento…",
  accountPasswordSaved: "La tua password è stata aggiornata.",
  accountSignOutHint: "Esci dalla tua iscrizione su questo dispositivo.",
  accountAdminNote: "Hai accesso amministratore.",

  legalPrivacyTitle: "Informativa sulla privacy",
  legalTermsTitle: "Termini di utilizzo",
  legalRulesTitle: "Regole ufficiali",
  legalLastUpdated: "Ultimo aggiornamento: luglio 2026",
  legalPrivacyStub:
    "Raccogliamo dati di account e di partecipazione per gestire le competizioni, consegnare i premi e rispondere alle richieste. I messaggi di marketing vengono inviati solo se non ti sei escluso.",
  legalTermsStub:
    "Utilizzando questo sito accetti le regole ufficiali di ogni competizione e i requisiti di idoneità, incluso avere 18 anni o più.",
  legalRulesStub:
    "Nessun acquisto necessario. Metodo alternativo di partecipazione disponibile. Nullo dove vietato. Le regole complete disciplinano tutte le estrazioni.",

  adminEyebrow: "Privato",
  adminHeading: "Admin",
  adminIntro: "Gestisci competizioni, ordine di visualizzazione e richieste dei membri.",
  adminAccountLink: "Gestisci account",
};

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
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
