import { useState, useRef, useEffect } from "react";

export function useChatStream() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setInput("");
    setLoading(true);

    // Pre-add assistant placeholder message
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      const response = await fetch("http://localhost:8000/api/generate/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to backend.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // preserve incomplete line for next chunk

        for (const line of lines.filter(Boolean)) {
          try {
            const json = JSON.parse(line);
            const { response } = json;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1].text += response;
              return updated;
            });
          } catch (e) {
            console.error("Failed to parse line:", line);
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Could not connect to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return {
    input,
    setInput,
    messages,
    sendMessage,
    loading,
    chatContainerRef,
  };
}
