import { useState, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { useSavedChats } from "../hooks/useSavedChats";
import { auth } from "../firebase";

const ChatDashboard = () => {
  const [token, setToken] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [model, setModel] = useState("Ollama3");
  const [loading, setLoading] = useState(false); // For AI response typing

  // Rename loading from the hook to avoid conflict
  const { chats, loading: chatsLoading, refreshChats } = useSavedChats(token);

  useEffect(() => {
    const fetchToken = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      }
    };
    fetchToken();
  }, []);

  const loadChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const res = await fetch(`http://localhost:8000/api/chat/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data.map((m) => ({ id: m.id, role: m.role, content: m.content })));
      }
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  const handleNewChat = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/chat/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat", folder_id: null }),
      });

      if (res.ok) {
        const newChat = await res.json();
        setSelectedChatId(newChat.id);
        setMessages([]);
        refreshChats(); // Refresh sidebar
      } else {
        console.error("Failed to create chat");
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    let chatId = selectedChatId;

    if (!chatId) {
      try {
        const createRes = await fetch("http://localhost:8000/api/chat/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: "New Chat", folder_id: null }),
        });

        if (!createRes.ok) throw new Error("Failed to create chat");

        const newChat = await createRes.json();
        chatId = newChat.id;
        setSelectedChatId(chatId);
        setMessages([]);
        refreshChats();
      } catch (err) {
        console.error("Auto chat creation failed:", err);
        setLoading(false);
        return;
      }
    }

    const userMessage = { id: Date.now(), role: "user", content: input };
    const assistantId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    const promptText = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/api/generate/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let accumulated = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), { stream: true });

        const lines = chunk.trim().split("\n");
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              accumulated += parsed.response;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId ? { ...msg, content: accumulated } : msg
                )
              );
            }
          } catch (err) {
            console.warn("Chunk parse error:", err, line);
          }
        }
      }
    } catch (err) {
      console.error("Streaming failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <ChatSidebar
        chats={chats}
        loading={chatsLoading} // ← Uses renamed loading
        loadChat={loadChat}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        model={model}
        setModel={setModel}
        loading={loading} // ← Local typing animation
      />
    </div>
  );
};

export default ChatDashboard;
