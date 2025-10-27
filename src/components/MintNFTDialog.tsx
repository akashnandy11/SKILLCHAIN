import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Award, Sparkles, ExternalLink } from "lucide-react";

interface MintNFTDialogProps {
  trigger?: React.ReactNode;
}

const MintNFTDialog = ({ trigger }: MintNFTDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [level, setLevel] = useState(1);

  const handleMint = async () => {
    if (!skillName.trim() || !skillCategory.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Please sign in to mint NFTs");
        return;
      }

      const response = await supabase.functions.invoke("mint-nft", {
        body: {
          skillName,
          skillCategory,
          level,
          aiScore: 0.85, // Mock score
        },
      });

      if (response.error) {
        throw response.error;
      }

      const { data } = response;

      toast.success("NFT Minted Successfully!", {
        description: `Earned ${data.xpAwarded} XP`,
        action: {
          label: "View on PolygonScan",
          onClick: () => window.open(data.polygonScanUrl, "_blank"),
        },
      });

      setOpen(false);
      setSkillName("");
      setSkillCategory("");
      setLevel(1);

      // Refresh the page data
      window.location.reload();
    } catch (error) {
      console.error("Minting error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to mint NFT"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero" size="lg">
            <Award className="w-5 h-5" />
            Mint NFT Credential
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-primary/30 shadow-[0_0_50px_hsl(var(--primary)/0.3)] animate-slide-up">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary animate-glow" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mint Your Credential
            </span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Create a blockchain-verified NFT badge for your verified skill
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name" className="text-sm font-medium">
              Skill Name
            </Label>
            <Input
              id="skill-name"
              placeholder="e.g. React Development"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill-category" className="text-sm font-medium">
              Category
            </Label>
            <Input
              id="skill-category"
              placeholder="e.g. Frontend, Backend, AI"
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              className="focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium">
              Skill Level (1-10)
            </Label>
            <Input
              id="level"
              type="number"
              min="1"
              max="10"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
              className="focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg space-y-2 text-sm border border-primary/20">
            <p className="font-medium text-foreground">What happens next:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> NFT metadata generated
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Minted on Polygon blockchain
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> XP awarded to your profile
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Verifiable on PolygonScan
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 hover:scale-105 active:scale-95 transition-all"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="hero"
            className="flex-1 hover:scale-105 active:scale-95 transition-all"
            onClick={handleMint}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2">⚡</div>
                Minting...
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                Mint Now
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-primary" />
          Gas fees covered by SkillChain • Network: Polygon
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default MintNFTDialog;
