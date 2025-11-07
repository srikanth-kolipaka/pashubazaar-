'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { rupee } from '@/lib/utils';
import { t } from '@/lib/i18n';

export default function ListingPage({ params }: { params: { id: string } }) {
  const [row,setRow]=useState<any|null>(null); const [seller,setSeller]=useState<any|null>(null); const [me,setMe]=useState('');
  useEffect(()=>{ supabase.auth.getUser().then(({data})=>setMe(data.user?.id||'')); (async()=>{
    const { data } = await supabase.from('listings').select('*, media:listing_media(*)').eq('id', params.id).single();
    setRow(data); if(data?.owner_id){ const { data: p } = await supabase.from('profiles').select('*').eq('id',data.owner_id).maybeSingle(); setSeller(p); }
  })();},[params.id]);

  async function startChat(){ const user=(await supabase.auth.getUser()).data.user; if(!user){location.href='/login';return;} const buyer_id=user.id; const seller_id=row.owner_id; const listing_id=row.id; const { data: existing }=await supabase.from('threads').select('*').eq('listing_id',listing_id).eq('buyer_id',buyer_id).eq('seller_id',seller_id).maybeSingle(); let tid=existing?.id; if(!tid){const { data: t, error }=await supabase.from('threads').insert({ listing_id,buyer_id,seller_id }).select('*').single(); if(error){alert(error.message);return;} tid=t.id;} location.href=`/chat/${tid}`;}
  async function markSold(){ if(!row) return; if(me!==row.owner_id) return alert('Only owner'); await supabase.from('listings').update({ status:'sold' }).eq('id',row.id); alert('Marked as sold'); location.reload(); }

  if(!row) return <div>Loading…</div>;
  const waText=encodeURIComponent(`Hi, I am interested in your listing: ${row.title} (${rupee(row.price)})`);
  const waHref=seller?.phone?`https://wa.me/${seller.phone.replace(/\D/g,'')}?text=${waText}`:'';

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">{row.media?.map((m:any)=>(m.kind==='image'?<img key={m.id} alt={row.title} className="w-full rounded-2xl" src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${m.path}`} />:<video key={m.id} controls className="w-full rounded-2xl"><source src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${m.path}`} /></video>))}</div>
        <div className="bg-white p-4 rounded-2xl shadow grid gap-2 h-fit">
          <h1 className="text-2xl font-bold">{row.title}</h1>
          <div className="text-gray-600">{row.species} {row.breed?`• ${row.breed}`:''}</div>
          <div className="font-bold text-xl">{rupee(row.price)}</div>
          <div className="text-gray-700 whitespace-pre-wrap">{row.description}</div>
          <div className="text-gray-600">Location: {row.location} {row.state?`• ${row.state}`:''}</div>
          {seller?.phone && (
            <div className="grid sm:grid-cols-2 gap-2">
              <a href={`tel:${seller.phone}`} className="px-4 py-3 rounded-xl border text-center">{t('en','callSeller')}</a>
              <a target="_blank" rel="noreferrer" href={waHref} className="px-4 py-3 rounded-xl border text-center">{t('en','whatsapp')}</a>
            </div>
          )}
          <button onClick={startChat} className="px-4 py-3 rounded-xl bg-black text-white">{t('en','chatSeller')}</button>
          {me===row.owner_id && (<button onClick={markSold} className="px-4 py-3 rounded-xl border">{t('en','markSold')}</button>)}
        </div>
      </div>
    </div>
  );
}
