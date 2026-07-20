-- Seed 10 exclusive Rich Reporter competitions + ticket inventory.
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
    status
) VALUES
(
    'a1000000-0000-4000-8000-000000000001',
    'Porsche 911 GT3 RS',
    'A track-honed icon finished in Guards Red. Private delivery arranged coast-to-coast for the sole winner.',
    2500,
    250.00,
    NOW() + INTERVAL '28 days',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000002',
    'Malibu Modern Estate',
    'Seven thousand square feet of glass, stone, and Pacific light. Keys and title transfer included.',
    5000,
    500.00,
    NOW() + INTERVAL '45 days',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000003',
    'Rolex Cosmograph Daytona',
    'The steel Daytona in its most coveted configuration. Authenticated, insured, and presented in-person.',
    1500,
    175.00,
    NOW() + INTERVAL '21 days',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000004',
    'Mediterranean Superyacht Week',
    'Seven nights aboard a 50-metre yacht between Capri and Portofino. Crew, chef, and tender included.',
    3000,
    350.00,
    NOW() + INTERVAL '35 days',
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000005',
    'Private Jet Charter Pack',
    'Twenty-five flight hours on a light jet network. Board anywhere in the continental United States.',
    2000,
    400.00,
    NOW() + INTERVAL '40 days',
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000006',
    'Vintage Champagne Cellar',
    'A curated vault of Krug, Dom Pérignon, and rare growers — professionally stored and delivered.',
    1200,
    125.00,
    NOW() + INTERVAL '18 days',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000007',
    'Luxury Safari Experience',
    'Ten days across Botswana and Kenya with private guides, fly-camps, and conservation access.',
    1800,
    300.00,
    NOW() + INTERVAL '50 days',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000008',
    'Savile Row Wardrobe',
    'A full seasonal wardrobe from a house on the Row — fittings in London, shipping worldwide.',
    1000,
    200.00,
    NOW() + INTERVAL '30 days',
    'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000009',
    'Audemars Piguet Royal Oak',
    'The iconic steel Royal Oak. Sourced through authorised channels and presented with papers.',
    1600,
    225.00,
    NOW() + INTERVAL '25 days',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    'active'
),
(
    'a1000000-0000-4000-8000-000000000010',
    'Aston Martin Vantage',
    'The Vantage in Racing Green. Performance pack, ceramic brakes, and white-glove handover.',
    2800,
    275.00,
    NOW() + INTERVAL '32 days',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    'active'
);

-- Generate available tickets for each competition
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000001', 2500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000002', 5000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000003', 1500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000004', 3000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000005', 2000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000006', 1200);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000007', 1800);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000008', 1000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000009', 1600);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000010', 2800);

-- Mark a portion sold so progress indicators look lived-in (demo only)
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000001' AND ticket_number <= 875;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000002' AND ticket_number <= 1200;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000003' AND ticket_number <= 980;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000004' AND ticket_number <= 450;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000005' AND ticket_number <= 600;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000006' AND ticket_number <= 720;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000007' AND ticket_number <= 360;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000008' AND ticket_number <= 410;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000009' AND ticket_number <= 880;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000010' AND ticket_number <= 700;
