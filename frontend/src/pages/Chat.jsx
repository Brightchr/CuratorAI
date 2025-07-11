import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const conversations = [
  { id: 1, title: "Chat 1" },
  { id: 2, title: "Chat 2" },
  { id: 3, title: "Chat 3" },
];

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const responseId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: responseId, role: "assistant", content: "" }]);

    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok || !res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let responseText = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      responseText += decoder.decode(value || new Uint8Array(), { stream: true });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === responseId ? { ...msg, content: responseText } : msg
        )
      );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-5 border-r border-zinc-800 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Your Chats</h2>
        <ul className="space-y-3">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer transition"
            >
              {conv.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <main className="flex flex-col flex-1 bg-zinc-950">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-2xl ${
                msg.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              <div
                className={`inline-block p-4 rounded-xl shadow ${
                  msg.role === "user" ? "bg-[#4a4eb3]" : "bg-zinc-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 bg-zinc-900 border-t border-zinc-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-b from-[#114870] to-[#383A80] px-5 py-3 rounded-lg hover:from-[#1b5f91] hover:to-[#4a4eb3] transition text-white font-medium"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
