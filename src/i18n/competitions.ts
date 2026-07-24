import type { Competition } from "@/data/competitions";
import type { Locale } from "@/i18n/dictionaries";

type CompetitionCopy = {
  title: string;
  prizeDescription: string;
};

/** Canonical English titles/descriptions stay in the DB; UI copy is localized here by competition id. */
const COMPETITION_I18N: Record<string, Record<Locale, CompetitionCopy>> = {
  "a1000000-0000-4000-8000-000000000001": {
    en: {
      title: "Free Magazine Advert",
      prizeDescription:
        "A full-page advert in The Rich Reporter — your brand in print. Rolling monthly draw for members.",
    },
    es: {
      title: "Anuncio gratis en la revista",
      prizeDescription:
        "Un anuncio a página completa en The Rich Reporter — tu marca en papel. Sorteo mensual continuo para miembros.",
    },
    fr: {
      title: "Publicité gratuite dans le magazine",
      prizeDescription:
        "Une publicité pleine page dans The Rich Reporter — votre marque à l'imprimé. Tirage mensuel renouvelé pour les membres.",
    },
    de: {
      title: "Kostenlose Magazinanzeige",
      prizeDescription:
        "Eine ganzseitige Anzeige in The Rich Reporter — Ihre Marke im Druck. Laufende monatliche Ziehung für Mitglieder.",
    },
    pt: {
      title: "Anúncio grátis na revista",
      prizeDescription:
        "Um anúncio de página inteira na The Rich Reporter — a sua marca no papel. Sorteio mensal contínuo para membros.",
    },
    it: {
      title: "Annuncio gratis sulla rivista",
      prizeDescription:
        "Un annuncio a pagina intera su The Rich Reporter — il tuo brand sulla carta. Estrazione mensile continua per i membri.",
    },
  },
  "a1000000-0000-4000-8000-000000000002": {
    en: {
      title: "Cash Prize $1,000",
      prizeDescription:
        "One thousand US dollars, paid to the sole winner. Tax-free cash transfer arranged after verification.",
    },
    es: {
      title: "Premio en efectivo de $1,000",
      prizeDescription:
        "Mil dólares estadounidenses, pagados al único ganador. Transferencia en efectivo libre de impuestos tras la verificación.",
    },
    fr: {
      title: "Prix en espèces de 1 000 $",
      prizeDescription:
        "Mille dollars américains, versés au seul gagnant. Virement en espèces exonéré d'impôt après vérification.",
    },
    de: {
      title: "Geldpreis $1.000",
      prizeDescription:
        "Eintausend US-Dollar, ausgezahlt an den alleinigen Gewinner. Steuerfreie Überweisung nach Verifizierung.",
    },
    pt: {
      title: "Prémio em dinheiro de $1.000",
      prizeDescription:
        "Mil dólares americanos, pagos ao único vencedor. Transferência em dinheiro isenta de impostos após verificação.",
    },
    it: {
      title: "Premio in contanti da $1.000",
      prizeDescription:
        "Mille dollari USA, pagati all'unico vincitore. Bonifico in contanti esente da tasse dopo la verifica.",
    },
  },
  "a1000000-0000-4000-8000-000000000003": {
    en: {
      title: "iPhone 17",
      prizeDescription:
        "A brand-new Apple iPhone 17, factory sealed. Worldwide courier delivery — or take the cash alternative.",
    },
    es: {
      title: "iPhone 17",
      prizeDescription:
        "Un Apple iPhone 17 nuevo, precintado de fábrica. Envío mundial por mensajería — o elige la alternativa en efectivo.",
    },
    fr: {
      title: "iPhone 17",
      prizeDescription:
        "Un Apple iPhone 17 neuf, scellé d'usine. Livraison mondiale par coursier — ou choisissez l'alternative en espèces.",
    },
    de: {
      title: "iPhone 17",
      prizeDescription:
        "Ein brandneues Apple iPhone 17, werkseitig versiegelt. Weltweiter Kurierversand — oder wählen Sie die Baralternative.",
    },
    pt: {
      title: "iPhone 17",
      prizeDescription:
        "Um Apple iPhone 17 novo, selado de fábrica. Entrega mundial por courier — ou escolha a alternativa em dinheiro.",
    },
    it: {
      title: "iPhone 17",
      prizeDescription:
        "Un Apple iPhone 17 nuovo, sigillato in fabbrica. Consegna mondiale via corriere — oppure scegli l'alternativa in contanti.",
    },
  },
  "a1000000-0000-4000-8000-000000000004": {
    en: {
      title: "iPad",
      prizeDescription:
        "The latest Apple iPad, sealed retail. Shipped worldwide to the winner, or elect the cash alternative.",
    },
    es: {
      title: "iPad",
      prizeDescription:
        "El último Apple iPad, precintado de venta. Envío mundial al ganador, o elige la alternativa en efectivo.",
    },
    fr: {
      title: "iPad",
      prizeDescription:
        "Le dernier Apple iPad, scellé au détail. Expédié dans le monde entier au gagnant, ou choisissez l'alternative en espèces.",
    },
    de: {
      title: "iPad",
      prizeDescription:
        "Das neueste Apple iPad, originalverpackt. Weltweiter Versand an den Gewinner — oder wählen Sie die Baralternative.",
    },
    pt: {
      title: "iPad",
      prizeDescription:
        "O mais recente Apple iPad, selado de retalho. Enviado mundialmente ao vencedor, ou escolha a alternativa em dinheiro.",
    },
    it: {
      title: "iPad",
      prizeDescription:
        "L'ultimo Apple iPad, sigillato al dettaglio. Spedito in tutto il mondo al vincitore, oppure scegli l'alternativa in contanti.",
    },
  },
  "a1000000-0000-4000-8000-000000000005": {
    en: {
      title: "Samsung Laptop",
      prizeDescription:
        "A premium Samsung Galaxy Book laptop. White-glove worldwide delivery, or a tax-free cash alternative.",
    },
    es: {
      title: "Portátil Samsung",
      prizeDescription:
        "Un portátil premium Samsung Galaxy Book. Entrega mundial con servicio premium, o una alternativa en efectivo libre de impuestos.",
    },
    fr: {
      title: "Ordinateur portable Samsung",
      prizeDescription:
        "Un ordinateur portable premium Samsung Galaxy Book. Livraison mondiale haut de gamme, ou une alternative en espèces exonérée d'impôt.",
    },
    de: {
      title: "Samsung-Laptop",
      prizeDescription:
        "Ein Premium-Laptop Samsung Galaxy Book. Weltweite White-Glove-Lieferung oder eine steuerfreie Baralternative.",
    },
    pt: {
      title: "Portátil Samsung",
      prizeDescription:
        "Um portátil premium Samsung Galaxy Book. Entrega mundial com serviço premium, ou uma alternativa em dinheiro isenta de impostos.",
    },
    it: {
      title: "Laptop Samsung",
      prizeDescription:
        "Un laptop premium Samsung Galaxy Book. Consegna mondiale white-glove, oppure un'alternativa in contanti esente da tasse.",
    },
  },
};

/**
 * Overlay translated title/description for the active locale.
 * Falls back to the competition's DB (English) fields when no mapping exists.
 * Matches by id first, then by canonical English title (for non-seed ids).
 */
export function localizeCompetition(competition: Competition, locale: Locale): Competition {
  const byId = COMPETITION_I18N[competition.id]?.[locale];
  if (byId) {
    return {
      ...competition,
      title: byId.title,
      prizeDescription: byId.prizeDescription,
    };
  }

  const byTitle = Object.values(COMPETITION_I18N).find(
    (locales) => locales.en.title === competition.title,
  )?.[locale];
  if (byTitle) {
    return {
      ...competition,
      title: byTitle.title,
      prizeDescription: byTitle.prizeDescription,
    };
  }

  return competition;
}

export function localizeCompetitions(
  competitions: Competition[],
  locale: Locale,
): Competition[] {
  return competitions.map((c) => localizeCompetition(c, locale));
}
