import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  Trophy,
  Calendar,
  Code2,
  Palette,
  Bot,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const opportunities = [
  {
    id: 1,
    title: "Product Intern at TechCorp",
    type: "Internship",
    company: "TechCorp",
    deadline: "Jan 15, 2025",
    description:
      "3-month product management internship at a leading tech company",
  },
  {
    id: 2,
    title: "AI Startup Challenge",
    type: "Challenge",
    company: "Innovation Labs",
    deadline: "Feb 1, 2025",
    description:
      "Build an AI-powered solution for real-world problems. $10,000 prize.",
  },
  {
    id: 3,
    title: "Summer Accelerator Program",
    type: "Accelerator",
    company: "STARTX Ventures",
    deadline: "Mar 1, 2025",
    description:
      "12-week intensive program with $50,000 funding and mentorship",
  },
  {
    id: 4,
    title: "Sustainability Hackathon",
    type: "Hackathon",
    company: "Green Future",
    deadline: "Jan 20, 2025",
    description: "48-hour hackathon focused on climate tech solutions",
  },
];

const communities = [
  {
    id: 1,
    name: "Tech Innovators",
    description: "Software engineers and tech enthusiasts building the future",
    members: 450,
    icon: Code2,
  },
  {
    id: 2,
    name: "Design Collective",
    description:
      "UI/UX designers sharing knowledge and collaborating on projects",
    members: 320,
    icon: Palette,
  },
  {
    id: 3,
    name: "Robotics Lab",
    description: "Hardware enthusiasts working on robotics and IoT projects",
    members: 180,
    icon: Bot,
  },
  {
    id: 4,
    name: "Business Builders",
    description: "Entrepreneurs focused on strategy, operations, and growth",
    members: 290,
    icon: TrendingUp,
  },
];

const typeColors: Record<string, string> = {
  Internship: "bg-primary/20 text-primary border-primary/30",
  Challenge: "bg-accent/20 text-accent border-accent/30",
  Hackathon: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Accelerator: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function Explore() {
  return (
    <div className="min-h-screen py-12 px-6 lg:px-12 bg-subtle-pattern relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight">
            Explore
          </h1>
          <p className="text-xl text-muted-foreground/90 max-w-2xl leading-relaxed">
            Discover opportunities, communities, and showcase your work
          </p>
        </div>

        <Tabs defaultValue="opportunities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-card/50 backdrop-blur-sm border border-border/50 p-1">
            <TabsTrigger
              value="opportunities"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger
              value="communities"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Communities
            </TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Badge
                          className={`${
                            typeColors[opp.type]
                          } border backdrop-blur-sm`}
                        >
                          {opp.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-semibold leading-tight">
                        {opp.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground/80">
                        {opp.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground/90 leading-relaxed mb-4">
                        {opp.description}
                      </p>
                      <div className="flex items-center gap-2.5 text-muted-foreground/90 text-sm pt-2 border-t border-border/50">
                        <Calendar
                          className="w-4 h-4 text-primary"
                          strokeWidth={1.5}
                        />
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {communities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="relative z-10">
                      {/* Clean icon with subtle accent line */}
                      <div className="mb-6 flex items-start gap-3">
                        <div className="relative">
                          <community.icon
                            className="w-7 h-7 text-primary group-hover:text-primary/90 transition-colors duration-300"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent mt-3 group-hover:from-primary/40 transition-all duration-300" />
                      </div>
                      <CardTitle className="text-xl font-semibold leading-tight">
                        {community.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground/80 leading-relaxed">
                        {community.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center gap-2.5 text-muted-foreground/90 pt-2 border-t border-border/50">
                        <Users
                          className="w-4 h-4 text-primary"
                          strokeWidth={1.5}
                        />
                        <span className="font-medium">
                          {community.members} members
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
                        Join Community
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
