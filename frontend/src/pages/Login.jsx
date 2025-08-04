// src/pages/Login.jsx

// === Imports ===
import { useNavigate } from "react-router-dom";                     // Used to redirect after login
import { useEffect, useRef, useState } from "react";                // React hooks
import { loginWithGoogle, loginWithEmail } from "../services/authService.js"; // Auth logic
import { useAuth } from "../context/AuthContext";                   // Global auth context

const Login = () => {
  // === React State ===
  const navigate = useNavigate();           // For page navigation after login
  const [email, setEmail] = useState("");   // User email input
  const [password, setPassword] = useState(""); // User password input
  const videoRef = useRef(null);            // Ref to control background video
  const [ended, setEnded] = useState(false); // Whether video has finished playing
  const { login } = useAuth();              // Access the global login method from context

  // === Handle Google Login ===
  const handleGoogleLogin = async () => {
    try {
      const token = await loginWithGoogle(); // Call Firebase popup and get ID token

      const res = await fetch("http://localhost:8000/api/auth/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      if (res.ok) {
        const user = await res.json(); // Get user info back from backend
        login(user);                   // Save to context
        navigate("/chat");            // Redirect to chat dashboard
      }
    } catch (err) {
      console.error("Google Login failed", err);
    }
  };

  // === Handle Manual Email/Password Login ===
  const handleManualLogin = async () => {
    try {
      const token = await loginWithEmail(email, password); // Call Firebase with email/pass

      const res = await fetch("http://localhost:8000/api/auth/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      if (res.ok) {
        const user = await res.json();
        login(user);
        navigate("/chat");
      }
    } catch (err) {
      console.error("Manual Login failed", err);
    }
  };

  // === Render ===
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* === Background Image (Fallback after video ends) === */}
      {ended && (
        <img
          src="/images/TheCurator2.png"
          alt="The Curator"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* === Background Video (auto plays once then freezes) === */}
      {!ended && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/images/TheCurator2.png"
          className="absolute inset-0 w-full h-full object-cover bg-black"
          onEnded={() => {
            // When video finishes: reset and pause it so poster shows
            const video = videoRef.current;
            if (video) {
              video.currentTime = 0;
              video.pause();
            }
          }}
        >
          <source src="/Videos/CuratorMP4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* === Gradient Overlay to increase text contrast === */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 backdrop-brightness-75" />

      {/* === Login Form Container === */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/90 p-8 rounded-lg shadow-lg text-white space-y-6">
        <h2 className="text-3xl font-bold text-center">Sign In to CuratorAI</h2>

        {/* === Manual Login Form === */}
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

        {/* === Divider === */}
        <div className="border-t border-zinc-600 pt-4 text-center text-sm text-zinc-400">
          or
        </div>

        {/* === Google Sign-In Button === */}
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
