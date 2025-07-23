import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout} = useAuth();
  return (
    <nav className="w-full fixed top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">CuratorAI</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="/" className="text-zinc-300 hover:text-white">Home</a>
          <a href="#" className="text-zinc-300 hover:text-white">About</a>
          <a href="#" className="text-zinc-300 hover:text-white">Pricing</a>
          <a href="#" className="text-zinc-300 hover:text-white">Documentation</a>
          <a href="#" className="text-zinc-300 hover:text-white">Contact</a>
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="relative text-white px-2 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Sign In
              </Link>
              <Link to="/signup">
                <button
                  className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white px-4 py-2 rounded hover:from-[#1b5f91] hover:to-[#4a4eb3] transition">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
