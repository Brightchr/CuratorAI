import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget.jsx";

const MainLayout = () => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />
      <ChatWidget />
      <main className="pt-16">
        <Outlet /> {/* this will render Home, Login, etc. based on route */}
      </main>
    </div>
  );
};

export default MainLayout;
