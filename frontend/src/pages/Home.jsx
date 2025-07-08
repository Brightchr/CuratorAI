import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import AboutSection from "../components/AboutSection";

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
