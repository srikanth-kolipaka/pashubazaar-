'use client';
import { supabase } from '@/lib/supabaseClient';
export function Uploader({ onUploaded }: { onUploaded: (files: {kind: 'image'|'video', path: string}[]) => void }) {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files; if (!files) return;
    const uploaded: {kind:'image'|'video', path:string}[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const kind = ['mp4','mov','webm'].includes(ext) ? 'video' : 'image';
      const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).upload(key, file, { upsert: false });
      if (error) { alert(error.message); return; }
      uploaded.push({ kind, path: key });
    }
    onUploaded(uploaded);
  }
  return (<input type="file" multiple accept="image/*,video/*" onChange={handleChange} className="block" />);
}
