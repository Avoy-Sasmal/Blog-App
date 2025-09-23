import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function Chat() {
  const [params] = useSearchParams();
  const withUser = params.get("with");
  const withName = params.get("name") || "User";
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const load = async () => {
    if (!withUser) return;
    const res = await api.get(`/messages/with/${withUser}`);
    setMessages(res.data.data || []);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, [withUser]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim() || !withUser) return;
    await api.post("/messages", { to: withUser, text });
    setText("");
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-purple-300 mb-4">
          Chat with {withName}
        </h1>
        <div className="bg-gray-800 rounded-xl p-4 h-[60vh] overflow-y-auto border border-gray-700 mb-4">
          {messages.map((m) => {
            const isMine = m.from && m.from._id === user?.id;
            return (
              <div
                key={m._id}
                className={`mb-3 ${isMine ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    isMine
                      ? "bg-purple-700 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="text-sm">{m.text}</div>
                  <div className="text-[10px] opacity-70 mt-1">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={send} className="flex gap-2">
          <input
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white flex items-center gap-2">
            <FiSend /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
