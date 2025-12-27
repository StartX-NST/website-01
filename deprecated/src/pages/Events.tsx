import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Product Design Workshop",
    type: "Workshop",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Hub, Room 301",
    description:
      "Learn the fundamentals of user-centered product design from industry experts.",
    attendees: 45,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Startup Funding Panel",
    type: "Panel",
    date: "Dec 20, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Auditorium A",
    description:
      "VCs and angel investors share insights on fundraising strategies.",
    attendees: 120,
    status: "upcoming",
  },
  {
    id: 3,
    title: "AI for Startups",
    type: "Talk",
    date: "Jan 8, 2025",
    time: "3:00 PM - 4:30 PM",
    location: "Online (Zoom)",
    description: "Discover how AI can accelerate your startup's growth.",
    attendees: 200,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Pitch Competition Finals",
    type: "Competition",
    date: "Jan 15, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "Main Auditorium",
    description: "Watch startups compete for $50,000 in prize money.",
    attendees: 300,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Growth Marketing Masterclass",
    type: "Workshop",
    date: "Nov 20, 2024",
    time: "1:00 PM - 4:00 PM",
    location: "Innovation Hub, Room 205",
    description: "Hands-on workshop on scaling user acquisition.",
    attendees: 60,
    status: "past",
  },
  {
    id: 6,
    title: "Founder Stories: Building in Public",
    type: "Talk",
    date: "Nov 10, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Online (YouTube Live)",
    description: "Successful founders share their journey and lessons learned.",
    attendees: 450,
    status: "past",
  },
];

const typeColors: Record<string, string> = {
  Workshop: "bg-primary/20 text-primary border-primary/30",
  Panel: "bg-accent/20 text-accent border-accent/30",
  Talk: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Competition: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function Events() {
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");

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
            Events
          </h1>
          <p className="text-xl text-muted-foreground/90 max-w-2xl leading-relaxed">
            Join workshops, talks, and networking sessions with industry leaders
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Upcoming Events
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
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
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <CardTitle className="text-2xl font-semibold leading-tight">
                        {event.title}
                      </CardTitle>
                      <Badge
                        className={`${typeColors[event.type]} shrink-0 border`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-base text-muted-foreground/80 leading-relaxed">
                      {event.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2.5 relative z-10">
                    <div className="flex items-center gap-2.5 text-muted-foreground/90 text-sm">
                      <Calendar
                        className="w-4 h-4 text-primary"
                        strokeWidth={1.5}
                      />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground/90 text-sm">
                      <Clock
                        className="w-4 h-4 text-primary"
                        strokeWidth={1.5}
                      />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground/90 text-sm">
                      <MapPin
                        className="w-4 h-4 text-primary"
                        strokeWidth={1.5}
                      />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground/90 text-sm pt-1">
                      <Users
                        className="w-4 h-4 text-primary"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium">
                        {event.attendees} attending
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-muted-foreground/70 tracking-tight">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
              >
                <Card className="h-full bg-card/30 backdrop-blur-sm border-border/30 opacity-60 hover:opacity-80 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <CardTitle className="text-2xl font-semibold leading-tight">
                        {event.title}
                      </CardTitle>
                      <Badge
                        className={`${
                          typeColors[event.type]
                        } shrink-0 border opacity-70`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-base text-muted-foreground/70 leading-relaxed">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-muted-foreground/70 text-sm">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground/70 text-sm pt-1 border-t border-border/30">
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                      <span>{event.attendees} attended</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
