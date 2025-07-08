import { useState, useRef, useEffect } from "react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Add an empty AI message placeholder
    let aiMessage = { role: "ai", text: "" };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const response = await fetch("http://localhost:8000/api/generate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to stream response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
let partialText = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value, { stream: true });

  const lines = chunk.split("\n").filter(Boolean);
  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.response) {
        partialText += parsed.response;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "ai", text: partialText };
          return updated;
        });
      }
    } catch (err) {
      console.warn("Invalid JSON chunk:", line);
    }
  }
}

    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Failed to stream response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll if user is near bottom
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    if (isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 h-96 bg-zinc-900 border border-zinc-800 shadow-lg rounded-lg flex flex-col overflow-hidden">
          <div className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white p-3 flex justify-between items-center">
            <span className="font-semibold">The Curator</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-2 space-y-2 text-sm"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[90%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-violet-400 ml-auto text-right"
                    : "bg-zinc-600"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="bg-zinc-700 p-2 rounded-lg max-w-[90%] italic text-gray-400">
                Typing...
              </div>
            )}
          </div>

          <div className="p-2 border-t border-zinc-500 flex">
            <input
              className="flex-1 border border-gray-600 rounded-l px-2 py-1 text-sm"
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white px-3 py-1 rounded-r text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className=" bg-gradient-to-b from-[#114870] to-[#383A80] text-white px-4 py-2 rounded-full shadow-lg hover:bg-violet-700"
        >
          Try Out
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
