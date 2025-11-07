'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PhoneLogin() {
  const [phone,setPhone]=useState(''); const [otp,setOtp]=useState(''); const [sent,setSent]=useState(false);
  async function sendOTP(e:React.FormEvent){ e.preventDefault(); const {error}=await supabase.auth.signInWithOtp({ phone }); if(error) alert(error.message); else setSent(true); }
  async function verify(e:React.FormEvent){ e.preventDefault(); const {error}=await supabase.auth.verifyOtp({ phone, token: otp, type:'sms' }); if(error) alert(error.message); else location.href='/'; }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow grid gap-4">
      <h1 className="text-2xl font-bold">Phone OTP Login</h1>
      {!sent ? (
        <form onSubmit={sendOTP} className="grid gap-3">
          <input className="border p-3 rounded-xl" placeholder="+91XXXXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} />
          <button className="bg-black text-white rounded-xl p-3">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={verify} className="grid gap-3">
          <input className="border p-3 rounded-xl" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button className="bg-black text-white rounded-xl p-3">Verify</button>
        </form>
      )}
    </div>
  );
}
