// src/components/ChatWindow.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const TypingDots = () => (
  <div className="flex space-x-1 text-white pl-4">
    <span className="animate-bounce">.</span>
    <span className="animate-bounce delay-200">.</span>
    <span className="animate-bounce delay-400">.</span>
  </div>
);

const ChatWindow = ({ input, setInput, messages, sendMessage, model, setModel }) => {
  return (
    <main className="flex-1 flex flex-col bg-zinc-950">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div>
          <label className="text-sm text-zinc-400 mr-2">Model:</label>
          <select
            className="bg-zinc-800 text-white rounded px-2 py-1"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="Ollama3">Ollama3</option>
            <option value="llama3">LLaMA 3</option>
            <option value="mistral">Mistral</option>
            <option value="codellama">CodeLLaMA</option>
            <option value="gemma">Gemma</option>
            <option value="phi">Phi</option>
            <option value="neural-chat">Neural Chat</option>
            <option value="dolphin-mixtral">Dolphin Mixtral</option>
            <option value="llava">LLaVA (Vision)</option>
            <option value="starling">Starling</option>
          </select>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-blue-200 transition">
          Share
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="bg-zinc-800 text-zinc-200 px-6 py-4 rounded-xl shadow text-center text-lg">
              How can the <span className="font-semibold">Curator</span> assist you today?
            </div>
          </div>
        ) : (
          messages.map((msg) => (
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
          ))
        )}
      </div>

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
  );
};

export default ChatWindow;