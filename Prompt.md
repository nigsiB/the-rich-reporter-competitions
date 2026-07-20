I am building a high-end, luxury competition platform for "Rich Reporter Magazine" in the U.S. The design language must be exceptionally premium, clean, and minimalist (think dark mode, extensive negative space, champagne/gold accents, elegant serif typography, and zero casino-style flashing badges). 

I have provided our exact technical structure and database setup in `@project_plan.md` and `@ticketing_logic.md`. Please review them carefully before writing any code.

Please execute the following initialization steps:

1. NEXT.JS ARCHITECTURE & STATE
- Set up the Next.js Server Action in `app/actions/tickets.ts` using the exact `reserveTicketsAction` logic from `@ticketing_logic.md`.
- Implement the client-side checkout button component `TicketCheckoutBtn` as described in the logic document, styling it to look incredibly high-end using Tailwind CSS (sleek borders, wide tracking uppercase text, smooth transitions).

2. CORE LAYOUT & NAVIGATION
- Create a dark, editorial-style navigation header and layout. It should feature a clean logo placeholder, minimalist menu links, and an absolute lack of clutter to preserve the premium aesthetic.

3. DUMMY DATA SEEDING SCRIPT & COMPONENTS
Create a structured list or a local database seeding utility containing 10 high-value, exclusive dummy competitions matching the "Rich Reporter" theme. Each competition must have a title, luxury description, total ticket cap, price per entry (premium pricing), a countdown timer, and a curated high-resolution image from Unsplash. 

Use these exact Unsplash source URLs for the assets:
* Porsche 911 GT3 RS: https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800
* Luxury Modern Mansion: https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800
* Rolex Cosmograph Daytona: https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800
* Superyacht Mediterranean: https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800
* Private Jet Charter Pack: https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800
* Vintage Champagne & Wine Cellar: https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800
* Luxury Safari Experience: https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800
* Bespoke Savile Row Wardrobe: https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800
* Audemars Piguet Royal Oak: https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800
* Aston Martin Vantage: https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800

4. COMPETITION GRID INTERFACE
- Build the main marketplace dashboard displaying these 10 competitions using a balanced, scannable grid layout.
- Include a high-end visual progress indicator ("X% Available" or "Limited to X Entries") that feels exclusive rather than frantic.
- Ensure the entire experience feels like an elite club membership portal rather than a gambling site. Include a placeholder block explaining the legally required "Alternative Method of Entry (AMOE)" mail-in route to satisfy U.S. sweepstakes laws.

Let's begin scaffolding the project. Tell me which files you create/modify and provide the SQL command block when you're ready for me to execute it in Supabase.