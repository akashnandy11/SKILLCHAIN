import { GitBranch, Brain, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const steps = [
  {
    icon: GitBranch,
    title: "Connect GitHub",
    description: "Securely link your GitHub account. We analyze your repositories, commits, and code quality.",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Verification",
    description: "Our AI evaluates your code on clean architecture, problem-solving, optimization, and creativity.",
    step: "02"
  },
  {
    icon: Award,
    title: "Mint Your Proof",
    description: "Get blockchain-verified NFT credentials that evolve with your skills. Share them anywhere.",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to verify your skills and earn blockchain credentials
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card
              className="relative p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] h-full"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-bold text-lg">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-8 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              )}
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
