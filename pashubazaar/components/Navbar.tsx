'use client';
import { LangSwitch } from '@/components/LangSwitch';
import { t } from '@/lib/i18n';
export function Navbar() {
  const lang = typeof window !== 'undefined' ? (localStorage.getItem('lang')||'en') as any : 'en';
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3 gap-3">
        <a href="/" className="font-bold text-xl">{t(lang,'appName')}</a>
        <nav className="flex items-center gap-3">
          <a href="/my" className="px-3 py-2 rounded-lg border">{t(lang,'myListings')}</a>
          <a href="/sell" className="px-3 py-2 rounded-lg bg-black text-white">{t(lang,'sell')}</a>
          <a href="/login" className="px-3 py-2 rounded-lg border">{t(lang,'login')}</a>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}
