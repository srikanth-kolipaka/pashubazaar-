'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ListingCard } from '@/components/ListingCard';
import { t } from '@/lib/i18n';

export default function HomePage() {
  const [q,setQ]=useState(''); const [rows,setRows]=useState<any[]>([]);
  const [species,setSpecies]=useState('all'); const [state,setState]=useState('all');
  const [minP,setMinP]=useState(''); const [maxP,setMaxP]=useState('');
  const lang = typeof window!=='undefined' ? (localStorage.getItem('lang')||'en') as any : 'en';

  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('listings')
      .select('*, media:listing_media(*)')
      .eq('status','active').is('flagged', false)
      .order('created_at',{ascending:false}).limit(200);
    setRows(data||[]);
  })();},[]);

  const filtered = rows.filter(r=>{
    const text=[r.title,r.species,r.breed,r.location,r.state].join(' ').toLowerCase();
    if(!text.includes(q.toLowerCase())) return false;
    if(species!=='all' && r.species!==species) return false;
    if(state!=='all' && (r.state||'')!==state) return false;
    const p=Number(r.price||0);
    if(minP && p<Number(minP)) return false;
    if(maxP && p>Number(maxP)) return false;
    return true;
  });

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input className="flex-1 min-w-[220px] rounded-xl border p-3" placeholder={t(lang,'searchPh')} value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border p-3 rounded-xl" value={species} onChange={e=>setSpecies(e.target.value)}>
          <option value="all">All</option><option>cow</option><option>buffalo</option><option>goat</option><option>sheep</option><option>poultry</option>
        </select>
        <input className="border p-3 rounded-xl w-32" placeholder="Min ₹" value={minP} onChange={e=>setMinP(e.target.value)} />
        <input className="border p-3 rounded-xl w-32" placeholder="Max ₹" value={maxP} onChange={e=>setMaxP(e.target.value)} />
        <select className="border p-3 rounded-xl" value={state} onChange={e=>setState(e.target.value)}>
          <option value="all">State</option>
          <option>Andhra Pradesh</option><option>Telangana</option><option>Karnataka</option><option>Tamil Nadu</option>
          <option>Maharashtra</option><option>Gujarat</option><option>Rajasthan</option><option>Uttar Pradesh</option>
          <option>Madhya Pradesh</option><option>Punjab</option><option>Haryana</option><option>West Bengal</option>
          <option>Bihar</option><option>Odisha</option><option>Kerala</option><option>Delhi</option>
        </select>
        <button onClick={()=>{setQ('');setSpecies('all');setState('all');setMinP('');setMaxP('');}} className="px-3 py-2 rounded-xl border">{t(lang,'reset')}</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(l=>(<ListingCard key={l.id} listing={l} />))}
      </div>
    </div>
  );
}
