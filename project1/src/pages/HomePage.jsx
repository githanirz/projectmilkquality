import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Header from "../components/Navbar";
import Footers from "../components/Footers";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Header />
        <HeroSection />
        <Features />
        <About />
        <Footers />
      </main>
    </div>
  );
};

export default HomePage;
