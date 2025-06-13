import { Outlet } from "react-router-dom";
import ChatWidget from "../components/ChatWidget.jsx";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">Curator AI</header>

      <main className="p-6">
        <Outlet />
      </main>

      <ChatWidget />

      <footer className="p-4 bg-blue-600 text-white mt-auto">Footer</footer>
    </div>
  );
};

export default MainLayout;
