import { useState } from "react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: trimmed,
          stream: false,
        }),
      });

      const data = await response.json();
      const aiMessage = { role: "ai", text: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Ollama error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Failed to reach the AI model." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 h-96 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[90%] ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg max-w-[90%]">
                <p className="italic text-gray-500">Typing...</p>
              </div>
            )}
          </div>

          <div className="p-2 border-t flex">
            <input
              className="flex-1 border border-gray-300 rounded-l px-2 py-1 text-sm"
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          Chat
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
