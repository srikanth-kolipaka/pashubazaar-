'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ChatBubble } from '@/components/ChatBubble';

export default function ChatPage({ params }: { params: { threadId: string } }) {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [me, setMe] = useState<string>('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { (async () => {
    const user = (await supabase.auth.getUser()).data.user; if (!user) { window.location.href='/login'; return; }
    setMe(user.id);
    const { data } = await supabase.from('messages').select('*').eq('thread_id', params.threadId).order('created_at', { ascending: true });
    setMsgs(data || []);
    const channel = supabase.channel(`messages-thread-${params.threadId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${params.threadId}` }, (payload) => {
        setMsgs((m) => [...m, payload.new as any]);
        setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: 'smooth' }), 50);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  })(); }, [params.threadId]);

  async function send() {
    if (!input.trim()) return;
    const user = (await supabase.auth.getUser()).data.user; if (!user) return;
    const { error } = await supabase.from('messages').insert({ thread_id: params.threadId, sender_id: user.id, body: input.trim() });
    if (error) alert(error.message); else setInput('');
  }

  return (
    <div className="grid gap-3 max-w-2xl mx-auto h-[75vh]">
      <div ref={listRef} className="flex-1 overflow-y-auto bg-white rounded-2xl p-3 grid gap-2">
        {msgs.map((m) => (<ChatBubble key={m.id} me={me} msg={m} />))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border p-3 rounded-xl" placeholder="Type a message" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter') send(); }} />
        <button onClick={send} className="bg-black text-white rounded-xl px-4">Send</button>
      </div>
    </div>
  );
}
