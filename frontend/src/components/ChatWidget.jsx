import { useState } from "react";
import { useChatStream } from "../hooks/useChatStream";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";


const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [isPoppedOut, setIsPoppedOut] = useState(false);

  const {
    input,
    setInput,
    messages,
    sendMessage,
    loading,
    chatContainerRef,
  } = useChatStream();

  const closeChat = () => {
    setOpen(false);
    setIsPoppedOut(false); // reset on close
  };

  return (
    <div
      className={`fixed z-50 ${
        open
          ? isPoppedOut
            ? "inset-0 flex items-center justify-center bg-black/50"
            : "bottom-4 right-4"
          : "bottom-4 right-4"
      }`}
    >
      {open ? (
        <div
          className={`${
            isPoppedOut ? "w-[600px] h-[600px]" : "w-80 h-96"
          } bg-zinc-900 border border-zinc-800 shadow-xl rounded-xl flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white p-3 flex justify-between items-center">
            <span className="font-semibold text-lg">The Curator</span>
            <div className="flex gap-2 items-center">
              {/* Popout button */}
              <button
                onClick={() => setIsPoppedOut(!isPoppedOut)}
                title={isPoppedOut ? "Minimize" : "Pop Out"}
                className="text-white hover:text-gray-300 transition"
              >
                <FontAwesomeIcon
                  icon={isPoppedOut ? faDownLeftAndUpRightToCenter : faUpRightFromSquare}
                  className="w-4 h-4"
                />
              </button>

              {/* Close button */}
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200 text-lg"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 text-sm"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[90%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-violet-400 ml-auto text-right text-white"
                    : "bg-zinc-700 text-white"
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

          {/* Input */}
          <div className="p-2 border-t border-zinc-700 flex">
            <input
              className="flex-1 border border-gray-600 rounded-l px-2 py-1 text-sm bg-zinc-800 text-white"
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
          className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white px-4 py-2 rounded-full shadow-lg hover:bg-violet-700"
        >
          Try Out
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
