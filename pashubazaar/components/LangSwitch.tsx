'use client';
import { useEffect, useState } from 'react';
export function LangSwitch() {
  const [lang, setLang] = useState(typeof window !== 'undefined' ? (localStorage.getItem('lang')||'en') : 'en');
  useEffect(()=>{ localStorage.setItem('lang', lang); location.reload(); }, [lang]);
  return (
    <select className="border rounded-xl p-2" value={lang} onChange={(e)=>setLang(e.target.value)}>
      <option value="en">EN</option>
      <option value="hi">हिंदी</option>
      <option value="te">తెలుగు</option>
    </select>
  );
}
