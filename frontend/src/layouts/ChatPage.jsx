import React from 'react';
import ChatWidget from '../components/ChatWidget';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">
        <h1 className="text-xl font-semibold">Chat</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <ChatWidget />
      </main>
    </div>
  );
};

export default ChatPage;
