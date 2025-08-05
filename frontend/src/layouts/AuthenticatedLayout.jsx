import Navbar from "../components/layout/Navbar";
import ChatWidget from "../components/chat/ChatWidget.jsx";
import Home from "../pages/Home.jsx";



const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />
      <ChatWidget />
      <Home />
      <main className="pt-16">{children}</main> {/* padding accounts for navbar */}
    </div>
  );
};

export default AuthenticatedLayout;
