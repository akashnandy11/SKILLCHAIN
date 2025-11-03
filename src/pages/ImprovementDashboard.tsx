import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Award,
  Code2,
  MessageSquare,
  Database,
  Brain,
  Shield,
  ChevronRight,
} from "lucide-react";

interface AnalysisData {
  id: string;
  resume_score: number;
  coding_stats: any;
  feedback: string;
  recommendations: any;
  progress: any;
  verified: boolean;
}

export default function ImprovementDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
    fetchAnalysisData(user.id);
  };

  const fetchAnalysisData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_analysis")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setAnalysisData(data);
    } catch (error: any) {
      console.error("Error fetching analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const skillData = analysisData
    ? [
        { skill: "AI/ML", score: analysisData.progress.AI },
        { skill: "DSA", score: analysisData.progress.DSA },
        { skill: "Communication", score: analysisData.progress.Communication },
        { skill: "SQL", score: analysisData.progress.SQL },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Analysis Found</h2>
          <p className="text-muted-foreground mb-6">
            Start by analyzing your profile to get personalized insights and recommendations.
          </p>
          <Button
            onClick={() => navigate("/analyze")}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            Analyze My Profile
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Improvement Dashboard
            </h1>
            {analysisData.verified && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                <Shield className="w-4 h-4 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Track your progress and get personalized recommendations
          </p>
        </motion.div>

        {/* Resume Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Resume Quality Score</h3>
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold text-primary">
                {analysisData.resume_score}
              </div>
              <div className="text-2xl text-muted-foreground mb-2">/100</div>
            </div>
            <Progress value={analysisData.resume_score} className="mt-4 h-2" />
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Coding Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Coding Activity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Repositories</span>
                  <span className="text-2xl font-bold">{analysisData.coding_stats.repos || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Commits</span>
                  <span className="text-2xl font-bold">{analysisData.coding_stats.commits || 0}</span>
                </div>
                {analysisData.coding_stats.languages && (
                  <div>
                    <p className="text-muted-foreground mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.coding_stats.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Skills Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4">Skills Assessment</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={skillData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Feedback & Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                AI Feedback
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {analysisData.feedback}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Recommendations
              </h3>
              <ul className="space-y-3">
                {analysisData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Continue Improving</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate("/mock-interview")}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Mock Interview</span>
              </Button>
              <Button
                onClick={() => navigate("/certifications")}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <Award className="w-6 h-6" />
                <span>Add Certification</span>
              </Button>
              <Button
                onClick={() => navigate("/analyze")}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <TrendingUp className="w-6 h-6" />
                <span>Re-analyze Profile</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}