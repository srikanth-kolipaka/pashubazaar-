'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ListingCard } from '@/components/ListingCard';

export default function MyListings(){
  const [rows,setRows]=useState<any[]>([]);
  useEffect(()=>{(async()=>{
    const user=(await supabase.auth.getUser()).data.user; if(!user){location.href='/login';return;}
    const { data } = await supabase.from('listings').select('*, media:listing_media(*)').eq('owner_id', user.id).order('created_at',{ascending:false});
    setRows(data||[]);
  })();},[]);
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-bold">My Listings</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {rows.map(r=>(<ListingCard key={r.id} listing={r}/>))}
      </div>
    </div>
  );
}
