export function ChatBubble({ me, msg }: { me: string, msg: any }) {
  const mine = msg.sender_id === me;
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-2xl p-3 ${mine ? 'bg-black text-white' : 'bg-gray-200'}`}>
        <div className="text-sm opacity-70">{new Date(msg.created_at).toLocaleString()}</div>
        <div>{msg.body}</div>
      </div>
    </div>
  );
}
