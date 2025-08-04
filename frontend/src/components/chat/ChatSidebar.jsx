import { faUser, faSignOutAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";

const ChatSidebar = ({ chats, onNewChat, loadChat, loading }) => {
  const { user, logout } = useAuth();
  const [visibleChats, setVisibleChats] = useState([]);

  useEffect(() => {
    if (user && chats?.length) {
      const userChats = chats.filter(chat => chat.user_id === user.id || chat.userId === user.uid);
      setVisibleChats(userChats);
    } else {
      setVisibleChats([]);
    }
  }, [chats, user]);

  return (
    <aside className="w-72 bg-zinc-900 flex flex-col border-r border-zinc-800">
      <div className="px-6 py-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">CuratorAI</h1>
      </div>

      <div className="px-6 py-3 border-b border-zinc-800">
        <button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-[#114870] to-[#383A80] py-2 rounded hover:from-[#1b5f91] hover:to-[#4a4eb3] transition font-medium"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {loading ? (
          <p className="text-sm text-zinc-500">Loading chats...</p>
        ) : visibleChats.length === 0 ? (
          <p className="text-sm text-zinc-500">No chats yet. Start one above!</p>
        ) : (
          visibleChats.map((chat) => (
            <div
              key={chat.id}
              className="p-3 bg-zinc-800 rounded hover:bg-zinc-700 cursor-pointer flex justify-between items-center group"
              onClick={() => loadChat(chat.id)}
            >
              <span className="truncate max-w-[160px]">{chat.title}</span>
              <div className="relative">
                <FontAwesomeIcon icon={faEllipsisV} className="text-zinc-400 group-hover:text-white" />
                {/* Future: Dropdown with "Add to Folder", "Rename", etc. */}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="w-full text-left text-sm hover:text-zinc-300 flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} /> Profile
        </button>
        <button
          onClick={logout}
          className="w-full text-left text-sm hover:text-zinc-300 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
