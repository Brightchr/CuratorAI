// src/pages/Login.jsx
import { signInWithPopup, auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await fetch("http://localhost:8000/api/auth/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      if (res.ok) {
        navigate("/chat");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleManualLogin = async () => {
    console.log("Manual login with", email, password);
    // Implement login logic here
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/TheCurator2.png"
        className="absolute inset-0 w-full h-full object-cover bg-black"
      >
        <source src="/Videos/CuratorMP4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 backdrop-brightness-75" />

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/90 p-8 rounded-lg shadow-lg text-white space-y-6">
        <h2 className="text-3xl font-bold text-center">Sign In to CuratorAI</h2>

        {/* Manual Login Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleManualLogin}
            className="w-full bg-gradient-to-b from-[#114870] to-[#383A80] text-white font-semibold py-2 rounded transition cursor-pointer hover:from-[#1b5f91] hover:to-[#4a4eb3]"
          >
            Sign In
          </button>
        </div>

        <div className="border-t border-zinc-600 pt-4 text-center text-sm text-zinc-400">
          or
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-blue-200 transition cursor-pointer"
        >
          Sign In with Google
        </button>
      </div>
    </section>
  );
};

export default Login;
