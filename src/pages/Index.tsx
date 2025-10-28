import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Leaderboard from "@/components/Leaderboard";
import NFTShowcase from "@/components/NFTShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="leaderboard">
          <Leaderboard />
        </div>
        <NFTShowcase />
        <div id="about">
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;