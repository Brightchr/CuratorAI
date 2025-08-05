import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/marketing/HeroSection";
import Features from "../components/marketing/Features.jsx";
import AboutSection from "../components/marketing/AboutSection";

const Home = () => {
  return (
    <div className="bg-zinc-950 text-white">
      <HeroSection />
      <Features />
      <AboutSection />
    </div>
  );
};

export default Home;
