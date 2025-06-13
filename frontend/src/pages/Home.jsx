const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Curator (Curi)
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Ask anything. Learn faster. Powered by Ollama.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-3">
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Feature One</h2>
          <p className="text-gray-600">
            Placeholder for your first major feature or value proposition.
          </p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Feature Two</h2>
          <p className="text-gray-600">
            Highlight another awesome benefit of your assistant.
          </p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Feature Three</h2>
          <p className="text-gray-600">
            Share how it helps users solve real-world problems.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About This Project</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          This assistant is powered by a local AI model using Ollama. It's fast,
          private, and extensible — built to grow with your needs.
        </p>
      </section>
    </div>
  );
};

export default Home;
