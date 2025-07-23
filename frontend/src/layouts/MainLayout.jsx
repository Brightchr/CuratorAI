// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import { useAuth } from "../context/AuthContext";

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const showChatWidget = location.pathname === "/" && !user;

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />
      {showChatWidget && <ChatWidget />}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
