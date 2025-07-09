import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const conversations = [
  { id: 1, title: "Math Help" },
  { id: 2, title: "Project Notes" },
  { id: 3, title: "Code Review" },
];

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#114870] to-[#383A80] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1c1e3a] p-5 border-r border-zinc-700 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Chats</h2>
        <ul className="space-y-3">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className="p-3 bg-[#2c2f50] rounded-lg hover:bg-[#3b3f68] cursor-pointer transition"
            >
              {conv.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <main className="flex flex-col flex-1">
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
                  msg.role === "user"
                    ? "bg-[#4a4eb3]"
                    : "bg-[#2f315a]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 bg-[#1c1e3a] border-t border-zinc-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 bg-[#2f315a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
