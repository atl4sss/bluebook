import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { X } from "lucide-react";

export default function MiniChat({ roomId, userName, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "chatRooms", String(roomId), "messages"),
      orderBy("ts", "asc")
    );
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setMsgs(arr);
      // автоскролл вниз
      setTimeout(() => {
        listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
      }, 50);
    });
    return () => unsub();
  }, [roomId]);

  const send = async () => {
    if (!text.trim()) return;
    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, name: userName || "" }),
    });
    setText("");
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999] w-[360px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      <div className="px-3 py-2 flex items-center justify-between border-b">
        <div className="font-semibold">Chat</div>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
          <X size={18} />
        </button>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto px-3 py-2 space-y-2">
        {msgs.map(m => (
          <div key={m.id} className="text-[14px] leading-snug">
            <div className="text-gray-600">{m.fromName || "User"}</div>
            <div className="px-3 py-2 bg-gray-100 rounded-lg">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="p-2 flex gap-2 border-t">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-800"
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-lg bg-[#324DC7] text-white text-sm font-semibold hover:bg-[#2B43B3]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
