'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  useEffect(() => { supabase.auth.getUser().then(async ({ data }) => {
    const uid = data.user?.id; if (!uid) return;
    const { data: p } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle();
    setProfile(p || {});
  }); }, []);
  async function save() {
    const user = (await supabase.auth.getUser()).data.user; if (!user) return;
    const payload = { id: user.id, full_name: profile.full_name, phone: profile.phone, avatar_url: profile.avatar_url };
    const { error } = await supabase.from('profiles').upsert(payload);
    if (error) alert(error.message); else alert('Saved');
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow grid gap-3">
      <h1 className="text-2xl font-bold">Your profile</h1>
      <input className="border p-3 rounded-xl" placeholder="Full name" value={profile.full_name||''} onChange={e=>setProfile({...profile, full_name:e.target.value})} />
      <input className="border p-3 rounded-xl" placeholder="Phone (for calls)" value={profile.phone||''} onChange={e=>setProfile({...profile, phone:e.target.value})} />
      <button onClick={save} className="bg-black text-white rounded-xl p-3">Save</button>
    </div>
  );
}
