-- Seed 10 accessible Rich Reporter competitions + ticket inventory.
-- Run AFTER schema.sql in the Supabase SQL Editor.

TRUNCATE tickets, competitions RESTART IDENTITY CASCADE;

INSERT INTO competitions (
    id,
    title,
    prize_description,
    total_entries,
    price_per_entry,
    draw_date,
    image_url,
    display_order,
    status
) VALUES
(
    'a1000000-0000-4000-8000-000000000001',
    'Brand New iPhone',
    'The latest flagship iPhone, factory sealed. Discrete courier delivery arranged for the sole winner.',
    5000,
    0.25,
    NOW() + INTERVAL '28 days',
    'https://images.unsplash.com/photo-1697636979792-fb057f6cbe8d?auto=format&fit=crop&q=80&w=800',
    1,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000002',
    'Coastal Weekend Escape',
    'Two nights at a boutique seaside hotel — breakfast, late checkout, and a quiet view included.',
    4000,
    0.50,
    NOW() + INTERVAL '35 days',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    2,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000003',
    'Premium Noise-Cancelling Headphones',
    'Flagship over-ears in midnight black. Studio-grade quiet for travel, work, and late listening.',
    3500,
    0.25,
    NOW() + INTERVAL '21 days',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    3,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000004',
    'Michelin Dining for Two',
    'A reserved table for two at a starred kitchen — tasting menu and paired wines, one evening only.',
    3000,
    0.35,
    NOW() + INTERVAL '30 days',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    4,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000005',
    'Designer Leather Weekender',
    'A full-grain leather weekender in cognac — hand-finished, brass hardware, and lifetime care kit.',
    2800,
    0.30,
    NOW() + INTERVAL '40 days',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    5,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000006',
    'Wireless Earbuds Pro',
    'Spatial audio, adaptive ANC, and a charging case — sealed, current generation, ready to ship.',
    4500,
    0.15,
    NOW() + INTERVAL '18 days',
    'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&q=80&w=800',
    6,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000007',
    'Spa Day Ritual',
    'A full-day wellness ritual for one — massage, thermal suite, and a quiet lounge afternoon.',
    3200,
    0.40,
    NOW() + INTERVAL '42 days',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    7,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000008',
    'Espresso Atelier Kit',
    'A compact espresso machine with ceramic cups and a curated bean selection — barista at home.',
    2500,
    0.30,
    NOW() + INTERVAL '25 days',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    8,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000009',
    'Titanium Smartwatch',
    'A titanium smartwatch with cellular and adventure bands — sealed retail box, full warranty.',
    3800,
    0.25,
    NOW() + INTERVAL '32 days',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    9,
    'active'
),
(
    'a1000000-0000-4000-8000-000000000010',
    'Acetate Sunglasses',
    'Hand-polished acetate frames with polarized lenses — a quiet signature for bright days.',
    2200,
    0.20,
    NOW() + INTERVAL '22 days',
    'https://images.unsplash.com/photo-1511499767150-a48a237ac008?auto=format&fit=crop&q=80&w=800',
    10,
    'active'
);

-- Generate available tickets for each competition
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000001', 5000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000002', 4000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000003', 3500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000004', 3000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000005', 2800);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000006', 4500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000007', 3200);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000008', 2500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000009', 3800);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000010', 2200);

-- Mark a portion sold so progress indicators look lived-in (demo only)
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000001' AND ticket_number <= 1875;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000002' AND ticket_number <= 1200;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000003' AND ticket_number <= 1400;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000004' AND ticket_number <= 1050;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000005' AND ticket_number <= 1120;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000006' AND ticket_number <= 1800;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000007' AND ticket_number <= 800;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000008' AND ticket_number <= 1000;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000009' AND ticket_number <= 1520;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000010' AND ticket_number <= 880;
