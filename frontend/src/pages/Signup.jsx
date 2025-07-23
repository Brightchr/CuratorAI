import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const Signup = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // update Firebase user profile with first/last name
      await updateProfile(userCredential.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      // get Firebase ID token to send to backend
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("http://localhost:8000/auth/firebase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      // Handle the backend's response
      if (response.ok) {
        const user = await response.json();
        console.log("User authenticated and stored:", user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        const error = await response.json();
        console.error("Backend auth failed:", error.detail);
}


      console.log("Signup successful");
    } catch (error) {
      console.error("Signup failed", error.message);
    }

  };


  return (
    <section className="bg-black relative h-screen w-full overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 backdrop-brightness-75"></div>

      {/* Signup Form Content */}
      <div className="relative z-10 flex justify-center items-center h-full px-6">
        <div className="bg-zinc-800 backdrop-blur-md p-8 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              name="firstName"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              name="lastName"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              name="email"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              name="password"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="password"
              placeholder=" Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#114870] to-[#383A80] text-white font-semibold py-2 rounded hover:from-[#1b5f91] hover:to-[#4a4eb3] transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
