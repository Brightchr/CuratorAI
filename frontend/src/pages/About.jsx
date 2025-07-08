const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">About This Assistant</h1>

      <p className="text-lg text-gray-700 mb-6">
        This AI assistant is designed to help you explore knowledge, brainstorm ideas, and simplify tasks using the power of local AI models through Ollama.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        Unlike cloud-based solutions, this assistant runs entirely on your own infrastructure, offering faster responses, greater privacy, and full control over how your data is handled.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        The chatbot you see in the corner of every page is powered by <strong>LLaMA 3</strong> via Ollama’s REST API. You can easily expand it to remember past conversations, store responses, and integrate with other tools.
      </p>

      <p className="text-lg text-gray-700">
        Whether you’re building an educational platform, productivity tool, or internal support system, this project is designed to be flexible, privacy-first, and developer-friendly.
      </p>
    </div>
  );
};

export default About;
