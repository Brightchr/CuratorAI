const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/TheCurator2.png"
        alt="The Curator"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 backdrop-brightness-75"></div>

      {/* Text Content */}
      <div className="relative z-10 h-full w-full flex items-center px-6">
        <div className="ml-auto max-w-xl text-right w-full md:w-2/3 lg:w-1/2 xl:pr-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow">
            Power Up Your World with AI
          </h1>
          <p className="text-lg md:text-2xl text-zinc-200 mb-8">
            Powered by Ollama,
            <br/>
            Built for speed, privacy, and capability.
          </p>
          <button
            className="bg-gradient-to-b from-[#114870] to-[#383A80] text-white px-8 py-3 font-semibold rounded-lg shadow hover:from-[#1b5f91] hover:to-[#4a4eb3] transition cursor-pointer">
            Launch Curator
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
