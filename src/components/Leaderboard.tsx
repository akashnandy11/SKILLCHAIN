import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Zap, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import leaderboardLogo from "@/assets/leaderboard-3d-logo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const topDevelopers = [
  {
    rank: 1,
    name: "Alex Chen",
    username: "@alexdev",
    xp: 45280,
    skills: ["React", "TypeScript", "Web3"],
    level: 78,
    trend: "+12%",
    avatar: "AC",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    rank: 2,
    name: "Sarah Williams",
    username: "@sarahw",
    xp: 42150,
    skills: ["Solidity", "Rust", "Go"],
    level: 75,
    trend: "+8%",
    avatar: "SW",
    color: "from-gray-300 to-gray-500"
  },
  {
    rank: 3,
    name: "Marcus Rodriguez",
    username: "@mrodrig",
    xp: 39840,
    skills: ["Python", "AI/ML", "Node.js"],
    level: 73,
    trend: "+15%",
    avatar: "MR",
    color: "from-orange-400 to-orange-600"
  },
  {
    rank: 4,
    name: "Emma Thompson",
    username: "@emmathompson",
    xp: 37200,
    skills: ["Vue", "Docker", "AWS"],
    level: 71,
    trend: "+5%",
    avatar: "ET",
    color: "from-primary to-primary-glow"
  },
  {
    rank: 5,
    name: "James Park",
    username: "@jpark",
    xp: 35900,
    skills: ["Angular", "GraphQL", "MongoDB"],
    level: 69,
    trend: "+10%",
    avatar: "JP",
    color: "from-accent to-accent-glow"
  }
];

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/40 rounded-full blur-[150px] animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/40 rounded-full blur-[150px] animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header with 3D Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-6 relative"
            whileHover={{ scale: 1.1, rotateY: 180 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <img 
              src={leaderboardLogo} 
              alt="Leaderboard" 
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
              Global Leaderboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with the world's top developers. Build your reputation and climb the ranks.
          </p>
        </motion.div>

        {/* Top 3 Podium Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {topDevelopers.slice(0, 3).map((dev, index) => (
            <motion.div
              key={dev.rank}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}
            >
              <Card 
                className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 p-6 
                hover:shadow-[0_0_60px_hsl(var(--primary)/0.4)] transition-all duration-500 group
                hover:-translate-y-2"
                style={{
                  transform: index === 0 ? "scale(1.05)" : "scale(1)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Rank badge */}
                <div className="absolute -top-4 -right-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${dev.color} flex items-center justify-center shadow-lg`}
                  >
                    {getRankIcon(dev.rank)}
                  </motion.div>
                </div>

                {/* Avatar */}
                <div className="relative mb-4 pt-4">
                  <motion.div 
                    className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${dev.color} flex items-center justify-center text-2xl font-bold text-white shadow-2xl`}
                    whileHover={{ scale: 1.1, rotateY: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {dev.avatar}
                  </motion.div>
                </div>

                {/* Info */}
                <div className="text-center space-y-3 relative">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{dev.name}</h3>
                    <p className="text-sm text-muted-foreground">{dev.username}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {dev.xp.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Badge variant="outline" className="border-primary/50">
                      Level {dev.level}
                    </Badge>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {dev.trend}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {dev.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Card className="overflow-hidden bg-card/40 backdrop-blur-xl border-border/50">
            <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Top Developers
                </h3>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Updated Live
                </Badge>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-foreground font-bold">Rank</TableHead>
                  <TableHead className="text-foreground font-bold">Developer</TableHead>
                  <TableHead className="text-foreground font-bold">Skills</TableHead>
                  <TableHead className="text-foreground font-bold">Level</TableHead>
                  <TableHead className="text-foreground font-bold text-right">XP</TableHead>
                  <TableHead className="text-foreground font-bold text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDevelopers.map((dev, index) => (
                  <motion.tr
                    key={dev.rank}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-border/30 hover:bg-primary/5 transition-colors group cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {getRankIcon(dev.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dev.color} flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          {dev.avatar}
                        </div>
                        <div>
                          <div className="font-semibold group-hover:text-primary transition-colors">
                            {dev.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{dev.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {dev.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs border-primary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {dev.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 font-bold">
                        <Zap className="w-4 h-4 text-accent" />
                        {dev.xp.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {dev.trend}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8 text-primary" />
                <Badge className="bg-primary/20 text-primary">Live</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">10,847</div>
              <div className="text-sm text-muted-foreground">Active Developers</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm border-accent/30 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-accent" />
                <Badge className="bg-accent/20 text-accent">Total</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">2.4M+</div>
              <div className="text-sm text-muted-foreground">XP Earned Today</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-primary" />
                <Badge className="bg-primary/20 text-primary">New</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">1,284</div>
              <div className="text-sm text-muted-foreground">NFTs Minted This Week</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
