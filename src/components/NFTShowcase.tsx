import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap } from "lucide-react";
import nftPreview from "@/assets/nft-preview.jpg";

const NFTShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* NFT Preview Card */}
          <div className="relative group">
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border p-8 shadow-[0_0_50px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)] transition-all">
              {/* NFT Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-6 border border-primary/30">
                <img 
                  src={nftPreview} 
                  alt="Skill NFT Preview" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Floating badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm border-primary/50">
                    Level 42
                  </Badge>
                </div>
              </div>

              {/* NFT Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Full-Stack Developer</h3>
                  <p className="text-muted-foreground text-sm">Verified by SkillChain AI</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="font-medium">12,450 XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Minted</span>
                    <span className="font-medium">Jan 2025</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Web3</Badge>
                  <Badge variant="outline">Node.js</Badge>
                </div>

                {/* Blockchain link */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group/link"
                >
                  <span>View on PolygonScan</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </Card>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dynamic NFT Credentials
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your skills deserve recognition that grows with you. Each credential is a living proof of your expertise.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Visual Evolution</h4>
                  <p className="text-muted-foreground text-sm">
                    Watch your NFT transform as you earn XP and unlock new achievements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Immutable Proof</h4>
                  <p className="text-muted-foreground text-sm">
                    Stored on Polygon blockchain - tamper-proof, permanent, universally verifiable
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Shareable Everywhere</h4>
                  <p className="text-muted-foreground text-sm">
                    Add to LinkedIn, portfolios, or résumés. Employers can verify instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTShowcase;
