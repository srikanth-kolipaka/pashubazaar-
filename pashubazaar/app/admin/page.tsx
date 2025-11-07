'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
export default function AdminPage(){
  const [ok,setOk]=useState(false); const [listings,setListings]=useState<any[]>([]); const [reports,setReports]=useState<any[]>([]);
  useEffect(()=>{(async()=>{
    const user=(await supabase.auth.getUser()).data.user; if(!user){location.href='/login';return;}
    const {data:admin}=await supabase.from('admins').select('*').eq('user_id',user.id).maybeSingle(); if(!admin){alert('Not admin');location.href='/';return;}
    setOk(true);
    const {data:ls}=await supabase.from('listings').select('*').order('created_at',{ascending:false}).limit(200); setListings(ls||[]);
    const {data:rs}=await supabase.from('reports').select('*, listing:listings(title,owner_id)').order('created_at',{ascending:false}).limit(200); setReports(rs||[]);
  })();},[]);

  async function toggleFlag(id:string, flagged:boolean){
    const { error } = await supabase.from('listings').update({ flagged }).eq('id', id);
    if (error) alert(error.message); else setListings(ls => ls.map(l => l.id===id ? { ...l, flagged } : l));
  }
  if(!ok) return null;
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <section className="grid gap-3">
        <h2 className="font-semibold">Listings</h2>
        <div className="grid gap-2">
          {listings.map(l => (
            <div key={l.id} className="bg-white p-3 rounded-xl flex items-center justify-between">
              <div className="text-sm">{l.title} — {l.status} {l.flagged ? '• FLAGGED' : ''}</div>
              <div className="flex gap-2">
                <button onClick={()=>toggleFlag(l.id, !l.flagged)} className="px-3 py-2 rounded-xl border">{l.flagged ? 'Unflag' : 'Flag'}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-3">
        <h2 className="font-semibold">Reports</h2>
        <div className="grid gap-2">
          {reports.map(r => (
            <div key={r.id} className="bg-white p-3 rounded-xl">
              <div className="text-sm">#{r.id} on {r.listing_id} — {r.reason}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
