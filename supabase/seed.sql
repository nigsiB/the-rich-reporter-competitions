-- Seed exactly 5 Rich Reporter competitions + ticket inventory.
-- Run AFTER schema + migrations.

TRUNCATE tickets, competitions RESTART IDENTITY CASCADE;

INSERT INTO competitions (
    id,
    title,
    prize_description,
    total_entries,
    price_per_entry,
    cash_alternative,
    retail_value,
    draw_date,
    image_url,
    display_order,
    status,
    is_monthly
) VALUES
(
    'a1000000-0000-4000-8000-000000000001',
    'Free Magazine Advert',
    'A full-page advert in The Rich Reporter — your brand in print. Rolling monthly draw for members.',
    4000,
    0.25,
    1000.00,
    1500.00,
    NOW() + INTERVAL '30 days',
    'https://images.unsplash.com/photo-1504711434719-bc93ca84b44c?auto=format&fit=crop&q=85&w=1200&sat=-30&bri=-15',
    1,
    'active',
    true
),
(
    'a1000000-0000-4000-8000-000000000002',
    'Cash Prize $1,000',
    'One thousand US dollars, paid to the sole winner. Tax-free cash transfer arranged after verification.',
    5000,
    0.25,
    1000.00,
    1000.00,
    NOW() + INTERVAL '28 days',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=85&w=1200&sat=-40&bri=-20',
    2,
    'active',
    false
),
(
    'a1000000-0000-4000-8000-000000000003',
    'iPhone 17',
    'A brand-new Apple iPhone 17, factory sealed. Worldwide courier delivery — or take the cash alternative.',
    6000,
    0.25,
    1000.00,
    1200.00,
    NOW() + INTERVAL '35 days',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=85&w=1200&sat=-35&bri=-25',
    3,
    'active',
    false
),
(
    'a1000000-0000-4000-8000-000000000004',
    'iPad',
    'The latest Apple iPad, sealed retail. Shipped worldwide to the winner, or elect the cash alternative.',
    4500,
    0.25,
    700.00,
    849.00,
    NOW() + INTERVAL '32 days',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=85&w=1200&sat=-30&bri=-20',
    4,
    'active',
    false
),
(
    'a1000000-0000-4000-8000-000000000005',
    'Samsung Laptop',
    'A premium Samsung Galaxy Book laptop. White-glove worldwide delivery, or a tax-free cash alternative.',
    4500,
    0.25,
    1000.00,
    1299.00,
    NOW() + INTERVAL '40 days',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=85&w=1200&sat=-40&bri=-25',
    5,
    'active',
    false
);

SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000001', 4000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000002', 5000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000003', 6000);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000004', 4500);
SELECT generate_tickets_for_competition('a1000000-0000-4000-8000-000000000005', 4500);

UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000001' AND ticket_number <= 1200;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000002' AND ticket_number <= 1800;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000003' AND ticket_number <= 2100;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000004' AND ticket_number <= 1800;
UPDATE tickets SET status = 'sold'
WHERE competition_id = 'a1000000-0000-4000-8000-000000000005' AND ticket_number <= 1500;
