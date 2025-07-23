import { useEffect, useState } from "react";

export const useSavedChats = (token) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8000/api/chat/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      } else {
        console.error("Error fetching chats:", res.statusText);
      }
    } catch (err) {
      console.error("Failed to load chats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token]);

  return { chats, loading, refreshChats: fetchChats };
};
