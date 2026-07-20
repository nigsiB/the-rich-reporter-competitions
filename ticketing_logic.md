# **Rich Reporter Ticketing \- Database & Next.js Logic**

## **1\. Supabase SQL Schema**

Run this in your Supabase SQL Editor. This sets up the core tables and the all-important Stored Procedure (RPC) that handles the concurrency lock.

\-- 1\. Create the Competitions table  
CREATE TABLE competitions (  
    id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
    title TEXT NOT NULL,  
    total\_entries INT NOT NULL,  
    price\_per\_entry DECIMAL(10, 2\) NOT NULL,  
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),  
    created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

\-- 2\. Create the Tickets table  
CREATE TABLE tickets (  
    id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),  
    competition\_id UUID REFERENCES competitions(id) ON DELETE CASCADE,  
    ticket\_number INT NOT NULL,  
    user\_id UUID,  
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),  
    reserved\_at TIMESTAMP WITH TIME ZONE,  
    UNIQUE(competition\_id, ticket\_number)  
);

CREATE INDEX idx\_tickets\_available ON tickets(competition\_id) WHERE status \= 'available';

\-- 3\. The Concurrency Engine (Stored Procedure)  
CREATE OR REPLACE FUNCTION reserve\_tickets(  
    p\_competition\_id UUID,  
    p\_user\_id UUID,  
    p\_quantity INT  
)   
RETURNS JSONB   
LANGUAGE plpgsql  
AS $$  
DECLARE  
    v\_reserved\_ids UUID\[\];  
BEGIN  
    WITH locked\_tickets AS (  
        SELECT id   
        FROM tickets  
        WHERE competition\_id \= p\_competition\_id  
          AND status \= 'available'  
        LIMIT p\_quantity  
        FOR UPDATE SKIP LOCKED  
    )  
    UPDATE tickets  
    SET   
        status \= 'reserved',  
        user\_id \= p\_user\_id,  
        reserved\_at \= NOW()  
    WHERE id IN (SELECT id FROM locked\_tickets)  
    RETURNING id INTO v\_reserved\_ids;

    IF array\_length(v\_reserved\_ids, 1\) IS NULL OR array\_length(v\_reserved\_ids, 1\) \< p\_quantity THEN  
        RAISE EXCEPTION 'Not enough tickets available';  
    END IF;

    RETURN jsonb\_build\_object(  
        'success', true,   
        'reserved\_count', array\_length(v\_reserved\_ids, 1),  
        'ticket\_ids', v\_reserved\_ids  
    );  
END;  
$$;

## **2\. Next.js Database Connection Logic**

In your Next.js App Router, create a file at app/actions/tickets.ts:

'use server'

import { createClient } from '@/utils/supabase/server'  
import { revalidatePath } from 'next/cache'

export async function reserveTicketsAction(competitionId: string, quantity: number) {  
  const supabase \= createClient()

  const { data: { user }, error: authError } \= await supabase.auth.getUser()  
    
  if (authError || \!user) {  
    return { success: false, error: 'You must be logged in to enter.' }  
  }

  try {  
    const { data, error } \= await supabase.rpc('reserve\_tickets', {  
      p\_competition\_id: competitionId,  
      p\_user\_id: user.id,  
      p\_quantity: quantity  
    })

    if (error) {  
      return {   
        success: false,   
        error: error.message.includes('Not enough tickets')   
          ? 'Sorry, this competition has sold out or not enough tickets remain.'   
          : 'Failed to secure tickets. Please try again.'   
      }  
    }

    revalidatePath(\`/competitions/${competitionId}\`)

    return { success: true, data: data }

  } catch (err) {  
    return { success: false, error: 'An unexpected system error occurred.' }  
  }  
}

## **3\. Frontend Implementation Example**

A minimalist client component for the checkout button:

'use client'

import { useState } from 'react'  
import { reserveTicketsAction } from '@/app/actions/tickets'  
import { useRouter } from 'next/navigation'

export default function TicketCheckoutBtn({ competitionId }: { competitionId: string }) {  
  const \[loading, setLoading\] \= useState(false)  
  const \[error, setError\] \= useState('')  
  const router \= useRouter()

  const handlePurchase \= async () \=\> {  
    setLoading(true)  
    setError('')  
      
    const res \= await reserveTicketsAction(competitionId, 5\)

    if (\!res.success) {  
      setError(res.error)  
      setLoading(false)  
      return  
    }

    router.push(\`/checkout?session=${res.data.ticket\_ids.join(',')}\`)  
  }

  return (  
    \<div className="flex flex-col gap-2"\>  
      \<button   
        onClick={handlePurchase}   
        disabled={loading}  
        className="bg-zinc-900 text-zinc-100 px-8 py-4 uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"  
      \>  
        {loading ? 'Securing Entry...' : 'Enter Now — $250'}  
      \</button\>  
      {error && \<p className="text-red-500 text-sm tracking-wide"\>{error}\</p\>}  
    \</div\>  
  )  
}