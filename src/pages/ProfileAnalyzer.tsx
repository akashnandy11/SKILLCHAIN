import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Brain, Github, Linkedin, Loader2, ArrowRight } from "lucide-react";

export default function ProfileAnalyzer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubId, setGithubId] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkedinUrl && !githubId) {
      toast.error("Please provide at least one profile URL");
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to analyze your profile");
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke("analyze-profile", {
        body: { linkedin_url: linkedinUrl, github_id: githubId },
      });

      if (error) {
        if (error.message.includes('429')) {
          toast.error("Rate limit exceeded. Please try again in a few minutes.");
        } else if (error.message.includes('402')) {
          toast.error("AI credits exhausted. Please contact support to continue.");
        } else {
          throw error;
        }
        return;
      }

      if (data?.success) {
        toast.success("Profile analyzed successfully!");
        navigate("/dashboard");
      } else {
        throw new Error(data?.error || "Analysis failed");
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast.error(error.message || "Failed to analyze profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 backdrop-blur-sm bg-card/80 border-primary/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Brain className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
              AI-Powered Profile Analysis
            </h1>
            <p className="text-muted-foreground">
              Get personalized insights and recommendations to boost your career
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="linkedin" className="text-base flex items-center gap-2 mb-2">
                <Linkedin className="w-5 h-5 text-blue-600" />
                LinkedIn Profile URL
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="h-12"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="github" className="text-base flex items-center gap-2 mb-2">
                <Github className="w-5 h-5" />
                GitHub Username
              </Label>
              <Input
                id="github"
                type="text"
                placeholder="yourusername"
                value={githubId}
                onChange={(e) => setGithubId(e.target.value)}
                className="h-12"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Enter your GitHub username (not the full URL)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/5 border border-primary/20 rounded-lg p-4"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                What You'll Get:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Resume quality score with detailed feedback
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Coding platform statistics and analysis
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Skills assessment across multiple domains
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Personalized recommendations for improvement
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Profile...
                  </>
                ) : (
                  <>
                    Analyze My Profile
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-xs text-center text-muted-foreground">
              Your data is processed securely and never shared without your consent
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}