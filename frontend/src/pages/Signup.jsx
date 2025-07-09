const Signup = () => {
  return (
    <section className="bg-black relative h-screen w-full overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 backdrop-brightness-75"></div>

      {/* Signup Form Content */}
      <div className="relative z-10 flex justify-center items-center h-full px-6">
        <div className="bg-zinc-800 backdrop-blur-md p-8 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4a4eb3]"
            />
            <input
              type="password"
              placeholder=" Confirm password"
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
