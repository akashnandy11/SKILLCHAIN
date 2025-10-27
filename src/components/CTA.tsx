import { Button } from "@/components/ui/button";
import { Github, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-200 animate-gradient-shift">
                Ready to Prove Your Skills?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers building verified, blockchain-backed reputations. 
              Your next opportunity starts here.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="hero" className="group" onClick={() => window.location.href = '/auth'}>
              <Github className="w-5 h-5" />
              Start Verification
              <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 text-sm text-muted-foreground">
            <p>Powered by OpenAI • Secured by Polygon • Trusted by 10,000+ developers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
