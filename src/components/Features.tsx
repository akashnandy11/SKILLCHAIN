import { Sparkles, TrendingUp, Shield, Users, Zap, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI Skill Verification",
    description: "Advanced AI analyzes your code quality, problem-solving abilities, and coding patterns to generate accurate skill assessments."
  },
  {
    icon: Shield,
    title: "Blockchain Trust",
    description: "Your credentials are minted as NFTs on Polygon blockchain, providing immutable, verifiable proof of your abilities."
  },
  {
    icon: TrendingUp,
    title: "Evolving NFTs",
    description: "Your credentials level up as you grow. XP system tracks your progress with visual upgrades and new achievement badges."
  },
  {
    icon: Users,
    title: "Peer Endorsements",
    description: "Build reputation through on-chain endorsements from other verified developers in your network."
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Real-time skill analysis and NFT minting. Go from code review to blockchain credential in minutes."
  },
  {
    icon: Trophy,
    title: "Global Leaderboard",
    description: "Compete with developers worldwide. Showcase your rank and verified achievements to potential employers."
  }
];

const Features = () => {
  return (
    <section className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to prove, grow, and showcase your coding expertise
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all group hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] cursor-pointer hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-[0_0_15px_hsl(var(--accent)/0.2)]">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
