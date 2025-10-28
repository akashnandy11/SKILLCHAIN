import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Navigation = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SkillChain
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('#features')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('#how-it-works')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('#leaderboard')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => scrollToSection('#about')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex" 
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
            <Button 
              variant="cyber" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
