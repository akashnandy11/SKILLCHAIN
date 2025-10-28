import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Code2, Home, Sparkles, Trophy, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Features", href: "#features", icon: Sparkles },
    { name: "How It Works", href: "#how-it-works", icon: Code2 },
    { name: "Leaderboard", href: "#leaderboard", icon: Trophy },
    { name: "About", href: "#about", icon: Info },
  ];

  const handleNavigation = (href: string) => {
    setOpen(false);
    
    if (href.startsWith('#')) {
      // Smooth scroll to section
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      // Navigate to route
      navigate(href);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 mt-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code2 className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SkillChain
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mt-4 px-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => {
                setOpen(false);
                navigate('/auth');
              }}
            >
              Sign In
            </Button>
            <Button 
              variant="cyber" 
              className="w-full justify-start" 
              onClick={() => {
                setOpen(false);
                navigate('/auth');
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-auto pt-6 border-t border-border/50 px-2">
            <p className="text-xs text-muted-foreground">
              Powered by OpenAI • Secured by Polygon
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
