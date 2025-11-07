'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/` } });
    if (error) alert(error.message); else setSent(true);
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow grid gap-4">
      <h1 className="text-2xl font-bold">Login / Sign up</h1>
      {sent ? (
        <p>Check your email for a magic link.</p>
      ) : (
        <form onSubmit={onLogin} className="grid gap-3">
          <input type="email" required className="border p-3 rounded-xl" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="bg-black text-white rounded-xl p-3">Send Magic Link</button>
        </form>
      )}
    </div>
  );
}
