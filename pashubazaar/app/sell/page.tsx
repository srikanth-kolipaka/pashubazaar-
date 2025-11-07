'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Uploader } from '@/components/Uploader';

export default function SellPage() {
  const [form, setForm] = useState<any>({ title:'', species:'cow', description:'', price:0, breed:'', age_months:0, weight_kg:'', location:'', state:'' });
  const [media, setMedia] = useState<{kind:'image'|'video', path:string}[]>([]);
  async function submit() {
    const user = (await supabase.auth.getUser()).data.user; if (!user) { alert('Login first'); return; }
    const { data: listing, error } = await supabase.from('listings').insert({
      owner_id: user.id,
      title: form.title,
      description: form.description,
      species: form.species,
      breed: form.breed,
      age_months: Number(form.age_months||0),
      weight_kg: Number(form.weight_kg||0),
      price: Number(form.price||0),
      location: form.location,
      state: form.state
    }).select('*').single();
    if (error) { alert(error.message); return; }
    if (media.length) {
      const rows = media.map(m => ({ listing_id: listing.id, kind: m.kind, path: m.path }));
      const { error: mErr } = await supabase.from('listing_media').insert(rows);
      if (mErr) alert(mErr.message);
    }
    window.location.href = `/listing/${listing.id}`;
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow grid gap-3">
      <h1 className="text-2xl font-bold">Post an animal</h1>
      <div className="grid gap-2">
        <label>Title</label>
        <input className="border p-3 rounded-xl" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      </div>
      <div className="grid gap-2">
        <label>Species</label>
        <select className="border p-3 rounded-xl" value={form.species} onChange={e=>setForm({...form, species:e.target.value})}>
          <option>cow</option><option>buffalo</option><option>goat</option><option>sheep</option><option>poultry</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border p-3 rounded-xl" placeholder="Breed" value={form.breed} onChange={e=>setForm({...form, breed:e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Age (months)" type="number" value={form.age_months} onChange={e=>setForm({...form, age_months:e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Weight (kg)" type="number" value={form.weight_kg} onChange={e=>setForm({...form, weight_kg:e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Location (village/city)" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <select className="border p-3 rounded-xl" value={form.state} onChange={e=>setForm({...form, state:e.target.value})}>
          <option value="">Select State</option>
          <option>Andhra Pradesh</option><option>Telangana</option><option>Karnataka</option><option>Tamil Nadu</option>
          <option>Maharashtra</option><option>Gujarat</option><option>Rajasthan</option><option>Uttar Pradesh</option>
          <option>Madhya Pradesh</option><option>Punjab</option><option>Haryana</option><option>West Bengal</option>
          <option>Bihar</option><option>Odisha</option><option>Kerala</option><option>Delhi</option>
        </select>
      </div>
      <textarea className="border p-3 rounded-xl" rows={4} placeholder="Details (feed type, milk yield, vaccination, etc.)" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <div className="grid gap-2">
        <label>Photos & videos</label>
        <Uploader onUploaded={(files)=>setMedia([...media, ...files])} />
        <div className="text-sm text-gray-600">Uploaded: {media.length} file(s)</div>
      </div>
      <div className="grid gap-2">
        <label>Price (INR)</label>
        <input className="border p-3 rounded-xl" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
      </div>
      <button onClick={submit} className="bg-black text-white rounded-xl p-3">Publish Listing</button>
    </div>
  );
}
