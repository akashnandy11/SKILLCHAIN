import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MintNFTDialog from "@/components/MintNFTDialog";
import {
  Code2,
  LogOut,
  Sparkles,
  Trophy,
  Zap,
  Github,
  Award,
  TrendingUp,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  github_username: string | null;
  total_xp: number;
  reputation_score: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [repoUrl, setRepoUrl] = useState("");

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    await fetchProfile(user.id);
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile fetch error:", error);
    } else {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleAnalyzeCode = async () => {
    if (!codeSnippet.trim()) {
      toast.error("Please paste some code to analyze");
      return;
    }

    setAnalyzing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codeSnippet,
            repoUrl,
            language,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Analysis failed");
      }

      const analysis = await response.json();
      
      toast.success(`Analysis complete! Earned ${analysis.xpAwarded} XP`, {
        description: `Overall score: ${(analysis.overallScore * 100).toFixed(1)}%`,
      });

      // Save analysis as a project
      const { error: projectError } = await supabase.from("projects").insert({
        user_id: user?.id,
        repo_name: repoUrl || "Code Snippet",
        repo_url: repoUrl,
        analysis_status: "completed",
        ai_feedback: analysis,
        code_quality_score: analysis.overallScore,
        xp_awarded: analysis.xpAwarded,
        analyzed_at: new Date().toISOString(),
      });

      if (projectError) console.error("Project save error:", projectError);

      // Award XP
      const { error: xpError } = await supabase.from("xp_transactions").insert({
        user_id: user?.id,
        amount: analysis.xpAwarded,
        source: "code_analysis",
        description: "Code analysis completed",
      });

      if (xpError) console.error("XP error:", xpError);

      // Refresh profile
      if (user) await fetchProfile(user.id);

      setCodeSnippet("");
      setRepoUrl("");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center space-y-4 animate-slide-up">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto animate-glow shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
            <Code2 className="w-10 h-10 text-foreground animate-float" />
          </div>
          <div className="text-primary font-medium text-lg">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                <Code2 className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SkillChain
              </span>
            </div>
            <Button variant="ghost" onClick={handleSignOut} className="hover:bg-destructive/20 hover:text-destructive transition-all">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Welcome back, {profile?.full_name || "Developer"}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Verify your skills and mint blockchain credentials
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group cursor-pointer animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total XP</p>
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {profile?.total_xp || 0}
                </p>
              </div>
              <Zap className="w-10 h-10 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all" />
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/30 hover:border-accent/50 transition-all hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] group cursor-pointer animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reputation</p>
                <p className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform">
                  {profile?.reputation_score || 0}
                </p>
              </div>
              <Trophy className="w-10 h-10 text-accent group-hover:rotate-12 group-hover:scale-110 transition-all" />
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group cursor-pointer animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {Math.floor((profile?.total_xp || 0) / 1000) + 1}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all" />
            </div>
          </Card>
        </div>

        {/* Code Analysis Section */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm mb-8 border-border hover:border-primary/30 transition-all animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6 group">
            <Sparkles className="w-6 h-6 text-primary animate-glow" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Code Verification
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Repository URL (optional)
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Input
                placeholder="e.g. JavaScript, Python, TypeScript"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Paste Your Code
              </label>
              <Textarea
                placeholder="// Paste your code here for AI analysis"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                rows={10}
                className="font-mono"
              />
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyzeCode}
              disabled={analyzing}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin mr-2">⚡</div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze & Earn XP
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <MintNFTDialog
            trigger={
              <Card className="p-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] animate-slide-up" style={{ animationDelay: '400ms' }}>
                <Award className="w-10 h-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Mint NFT Credential
                </h3>
                <p className="text-muted-foreground text-sm">
                  Create blockchain-verified badges for your verified skills
                </p>
              </Card>
            }
          />

          <Card className="p-6 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all cursor-pointer group hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] animate-slide-up" style={{ animationDelay: '500ms' }}>
            <Trophy className="w-10 h-10 text-accent mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
              Global Leaderboard
            </h3>
            <p className="text-muted-foreground text-sm">
              See how you rank against other verified developers
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
