const features = [
  {
    title: "Real-time Reasoning",
    description: "Delivers accurate, contextual responses for technical and creative queries.",
    image: "/images/Reading.png",
  },
  {
    title: "Offline Intelligence",
    description: "All inference is local — private, fast, and reliable even without internet.",
    image: "/images/Math.png",
  },
  {
    title: "Extensible Toolkit",
    description: "Easily plug into your workflow with modular tools and API extensions.",
    image: "/images/Science.png",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid gap-10 md:grid-cols-3">
      {features.map((f, i) => (
        <div key={i} className="bg-zinc-800/80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <img src={f.image} alt={f.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-2">{f.title}</h2>
            <p className="text-zinc-300">{f.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
