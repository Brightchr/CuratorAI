const Home = () => {
  return (
    <div className="bg-zinc-900 text-white space-y-24">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/images/The Curator.png"
          alt="The Curator"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 backdrop-brightness-90"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Welcome to Curator (Curi)
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl drop-shadow">
            Ask anything. Learn faster. Powered by Ollama.
          </p>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        {[ 
          { src: "/images/Reading.png", title: "Feature One", desc: "Placeholder for your first major feature or value proposition." },
          { src: "/images/Math.png", title: "Feature Two", desc: "Highlight another awesome benefit of your assistant." },
          { src: "/images/Science.png", title: "Feature Three", desc: "Share how it helps users solve real-world problems." },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {card.title}
              </h2>
              <p className="text-zinc-300">{card.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="bg-zinc-800 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">About This Project</h2>
        <p className="text-zinc-300 max-w-3xl mx-auto">
          This assistant is powered by a local AI model using Ollama. It's fast,
          private, and extensible — built to grow with your needs.
        </p>
      </section>
    </div>
  );
};

export default Home;
