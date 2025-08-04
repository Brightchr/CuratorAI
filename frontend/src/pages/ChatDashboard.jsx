import { useState, useEffect } from "react";
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import { useSavedChats } from "../hooks/useSavedChats";
import { auth } from "../firebase";

const ChatDashboard = () => {
  // === Local state variables ===
  const [token, setToken] = useState(null);                    // Firebase auth token
  const [input, setInput] = useState("");                      // User input in chat box
  const [messages, setMessages] = useState([]);                // Message list for current chat
  const [selectedChatId, setSelectedChatId] = useState(null);  // ID of currently selected chat
  const [model, setModel] = useState("Ollama3");               // AI model name
  const [loading, setLoading] = useState(false);               // Whether assistant is typing

  // === Custom hook to fetch user’s saved chats ===
  const { chats, loading: chatsLoading, refreshChats } = useSavedChats(token);

  // === On mount, fetch Firebase user token ===
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

  // === Load messages for a selected chat ===
  const loadChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const res = await fetch(`http://localhost:8000/api/chat/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        // Format messages for display
        setMessages(data.map((m) => ({ id: m.id, role: m.role, content: m.content })));
      }
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  // === Handler to create a new chat ===
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
        setMessages([]); // Clear current messages
        refreshChats();  // Refresh sidebar with new chat
      } else {
        console.error("Failed to create chat");
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // === Send message and stream assistant reply ===
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    let chatId = selectedChatId;

    // === Auto-create chat if not selected ===
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
        setMessages([]);      // Reset message thread
        refreshChats();       // Show in sidebar
      } catch (err) {
        console.error("Auto chat creation failed:", err);
        setLoading(false);
        return;
      }
    }

    // === Add user message & placeholder for assistant ===
    const userMessage = { id: Date.now(), role: "user", content: input };
    const assistantId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    const promptText = input;
    setInput(""); // Clear input box

    try {
      // === Call streaming endpoint ===
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

      // === Read streamed chunks and build response ===
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

      // === Auto-name chat after first user message ===
      if (userMessage && userMessage.content && userMessage.content.length > 3) {
        await fetch(`http://localhost:8000/api/chat/${chatId}/title`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: userMessage.content.split(" ").slice(0, 6).join(" "),
          }),
        });

        refreshChats(); // Update sidebar titles
      }

    } catch (err) {
      console.error("Streaming failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // === Render full dashboard ===
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <ChatSidebar
        chats={chats}
        loading={chatsLoading}
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
        loading={loading}
      />
    </div>
  );
};

export default ChatDashboard;
