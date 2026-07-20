# **Project Plan: Rich Reporter Exclusive Competitions**

## **1\. Stack Architecture**

> * **Frontend:** Next.js (App Router), React, TailwindCSS.  
> * **Animations:** Framer Motion (for high-end, smooth page transitions).  
> * **Backend & Auth:** Supabase (PostgreSQL is required for strict transactional integrity on ticket sales).  
> * **Payments:** Stripe (Custom Elements checkout to retain the luxury branding, avoiding redirects).

## **2\. Core Mechanics to Build**

> * **Real-Time Inventory:** Live "Entries Remaining" counters utilizing Supabase Realtime subscriptions.  
> * **Concurrency Control:** Database logic must lock selected ticket numbers the moment a user enters the checkout flow to prevent double-booking.  
> * **AMOE Integration:** A legally compliant free-entry route flow (e.g., generating downloadable mail-in forms) to satisfy U.S. Sweepstakes regulations.

## **3\. Database Schema (MVP)**

> * users: id, email, full\_name, stripe\_customer\_id  
> * competitions: id, title, prize\_description, total\_entries, price\_per\_entry, draw\_date, status  
> * tickets: id, competition\_id, user\_id, ticket\_number, status (available, reserved, sold)

## **4\. UI/UX Guidelines**

> * **Color Palette:** Deep charcoals, stark white typography, and muted metallic accents.  
> * **Typography:** Elegant serif headers paired with a wide-tracking, minimalist sans-serif for UI elements.  
> * **Interactions:** No aggressive pop-ups or flashing badges. Rely on subtle parallax, fade-ins, and editorial-quality imagery.