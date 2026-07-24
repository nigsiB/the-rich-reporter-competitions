-- Manual competition translations (title + prize description per locale).
-- English remains in competitions.title / competitions.prize_description.
-- Shape: { "es": { "title": "...", "prize_description": "..." }, "fr": {...}, ... }

ALTER TABLE competitions
  ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN competitions.translations IS
  'Per-locale title and prize_description for es/fr/de/pt/it. English uses primary columns.';

-- Backfill the five seed prizes from the existing static i18n map (idempotent).
UPDATE competitions
SET translations = jsonb_build_object(
  'es', jsonb_build_object(
    'title', 'Anuncio gratis en la revista',
    'prize_description', 'Un anuncio a página completa en The Rich Reporter — tu marca en papel. Sorteo mensual continuo para miembros.'
  ),
  'fr', jsonb_build_object(
    'title', 'Publicité gratuite dans le magazine',
    'prize_description', 'Une publicité pleine page dans The Rich Reporter — votre marque à l''imprimé. Tirage mensuel renouvelé pour les membres.'
  ),
  'de', jsonb_build_object(
    'title', 'Kostenlose Magazinanzeige',
    'prize_description', 'Eine ganzseitige Anzeige in The Rich Reporter — Ihre Marke im Druck. Laufende monatliche Ziehung für Mitglieder.'
  ),
  'pt', jsonb_build_object(
    'title', 'Anúncio grátis na revista',
    'prize_description', 'Um anúncio de página inteira na The Rich Reporter — a sua marca no papel. Sorteio mensal contínuo para membros.'
  ),
  'it', jsonb_build_object(
    'title', 'Annuncio gratis sulla rivista',
    'prize_description', 'Un annuncio a pagina intera su The Rich Reporter — il tuo brand sulla carta. Estrazione mensile continua per i membri.'
  )
)
WHERE id = 'a1000000-0000-4000-8000-000000000001'
  AND (translations = '{}'::jsonb OR translations IS NULL);

UPDATE competitions
SET translations = jsonb_build_object(
  'es', jsonb_build_object(
    'title', 'Premio en efectivo de $1,000',
    'prize_description', 'Mil dólares estadounidenses, pagados al único ganador. Transferencia en efectivo libre de impuestos tras la verificación.'
  ),
  'fr', jsonb_build_object(
    'title', 'Prix en espèces de 1 000 $',
    'prize_description', 'Mille dollars américains, versés au seul gagnant. Virement en espèces exonéré d''impôt après vérification.'
  ),
  'de', jsonb_build_object(
    'title', 'Geldpreis $1.000',
    'prize_description', 'Eintausend US-Dollar, ausgezahlt an den alleinigen Gewinner. Steuerfreie Überweisung nach Verifizierung.'
  ),
  'pt', jsonb_build_object(
    'title', 'Prémio em dinheiro de $1.000',
    'prize_description', 'Mil dólares americanos, pagos ao único vencedor. Transferência em dinheiro isenta de impostos após verificação.'
  ),
  'it', jsonb_build_object(
    'title', 'Premio in contanti da $1.000',
    'prize_description', 'Mille dollari USA, pagati all''unico vincitore. Bonifico in contanti esente da tasse dopo la verifica.'
  )
)
WHERE id = 'a1000000-0000-4000-8000-000000000002'
  AND (translations = '{}'::jsonb OR translations IS NULL);

UPDATE competitions
SET translations = jsonb_build_object(
  'es', jsonb_build_object(
    'title', 'iPhone 17',
    'prize_description', 'Un Apple iPhone 17 nuevo, precintado de fábrica. Envío mundial por mensajería — o elige la alternativa en efectivo.'
  ),
  'fr', jsonb_build_object(
    'title', 'iPhone 17',
    'prize_description', 'Un Apple iPhone 17 neuf, scellé d''usine. Livraison mondiale par coursier — ou choisissez l''alternative en espèces.'
  ),
  'de', jsonb_build_object(
    'title', 'iPhone 17',
    'prize_description', 'Ein brandneues Apple iPhone 17, werkseitig versiegelt. Weltweiter Kurierversand — oder wählen Sie die Baralternative.'
  ),
  'pt', jsonb_build_object(
    'title', 'iPhone 17',
    'prize_description', 'Um Apple iPhone 17 novo, selado de fábrica. Entrega mundial por courier — ou escolha a alternativa em dinheiro.'
  ),
  'it', jsonb_build_object(
    'title', 'iPhone 17',
    'prize_description', 'Un Apple iPhone 17 nuovo, sigillato in fabbrica. Consegna mondiale via corriere — oppure scegli l''alternativa in contanti.'
  )
)
WHERE id = 'a1000000-0000-4000-8000-000000000003'
  AND (translations = '{}'::jsonb OR translations IS NULL);

UPDATE competitions
SET translations = jsonb_build_object(
  'es', jsonb_build_object(
    'title', 'iPad',
    'prize_description', 'El último Apple iPad, precintado de venta. Envío mundial al ganador, o elige la alternativa en efectivo.'
  ),
  'fr', jsonb_build_object(
    'title', 'iPad',
    'prize_description', 'Le dernier Apple iPad, scellé au détail. Expédié dans le monde entier au gagnant, ou choisissez l''alternative en espèces.'
  ),
  'de', jsonb_build_object(
    'title', 'iPad',
    'prize_description', 'Das neueste Apple iPad, originalverpackt. Weltweiter Versand an den Gewinner — oder wählen Sie die Baralternative.'
  ),
  'pt', jsonb_build_object(
    'title', 'iPad',
    'prize_description', 'O mais recente Apple iPad, selado de retalho. Enviado mundialmente ao vencedor, ou escolha a alternativa em dinheiro.'
  ),
  'it', jsonb_build_object(
    'title', 'iPad',
    'prize_description', 'L''ultimo Apple iPad, sigillato al dettaglio. Spedito in tutto il mondo al vincitore, oppure scegli l''alternativa in contanti.'
  )
)
WHERE id = 'a1000000-0000-4000-8000-000000000004'
  AND (translations = '{}'::jsonb OR translations IS NULL);

UPDATE competitions
SET translations = jsonb_build_object(
  'es', jsonb_build_object(
    'title', 'Portátil Samsung',
    'prize_description', 'Un portátil premium Samsung Galaxy Book. Entrega mundial con servicio premium, o una alternativa en efectivo libre de impuestos.'
  ),
  'fr', jsonb_build_object(
    'title', 'Ordinateur portable Samsung',
    'prize_description', 'Un ordinateur portable premium Samsung Galaxy Book. Livraison mondiale haut de gamme, ou une alternative en espèces exonérée d''impôt.'
  ),
  'de', jsonb_build_object(
    'title', 'Samsung-Laptop',
    'prize_description', 'Ein Premium-Laptop Samsung Galaxy Book. Weltweite White-Glove-Lieferung oder eine steuerfreie Baralternative.'
  ),
  'pt', jsonb_build_object(
    'title', 'Portátil Samsung',
    'prize_description', 'Um portátil premium Samsung Galaxy Book. Entrega mundial com serviço premium, ou uma alternativa em dinheiro isenta de impostos.'
  ),
  'it', jsonb_build_object(
    'title', 'Laptop Samsung',
    'prize_description', 'Un laptop premium Samsung Galaxy Book. Consegna mondiale white-glove, oppure un''alternativa in contanti esente da tasse.'
  )
)
WHERE id = 'a1000000-0000-4000-8000-000000000005'
  AND (translations = '{}'::jsonb OR translations IS NULL);
