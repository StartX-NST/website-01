import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Loader2 } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { BGPattern } from "@/components/ui/bg-pattern";
import axiosInstance from "@/lib/axios";
import { ComingSoon } from "@/components/ui/coming-soon";

interface Event {
  _id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  location: string;
  maxCapicity?: number;
  memberOnly?: boolean;
  interestedUsers: string[];
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/events");
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Determine if event is past
  const isPastEvent = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    return eventDate < now;
  };

  // Map events to include status
  const eventsWithStatus = events.map((event) => ({
    ...event,
    status: isPastEvent(event.date) ? "completed" : "upcoming",
  }));

  // Filter events based on selected filters
  const filteredEvents = eventsWithStatus.filter((event) => {
    const statusMatch =
      selectedStatus === "all" || event.status === selectedStatus;
    return statusMatch;
  });

  // Separate upcoming and past events
  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");
  const pastEvents = filteredEvents.filter((e) => e.status === "completed");

  return (
    <AnimatedPage>
      {loading ? (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <ComingSoon
          section="Events"
          title="Coming Soon"
          message="Exciting events and meetups will be announced here soon. Stay tuned!"
          showHomeButton={false}
        />
      ) : (
        <div className="min-h-screen bg-black relative pt-20">
          {/* Diagonal Stripes Background Pattern */}
          <BGPattern
            variant="diagonal-stripes"
            mask="fade-y"
            size={60}
            fill="rgba(255, 255, 255, 0.05)"
          />

          {/* Events Section */}
          <section className="relative py-8 md:py-12 lg:py-16 px-6 overflow-hidden z-10">
            <div className="relative z-10 max-w-7xl mx-auto">
              {/* Page Title Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-normal text-white tracking-tight mb-3">
                  StartX <span className="text-[#0673f9]">Events</span>
                </h1>
                <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-normal">
                  Explore upcoming workshops, bootcamps, and past ecosystem
                  gatherings.
                </p>
              </div>

              {/* Filters */}
              <EventFilters
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />

              {/* Check if there are any filtered results */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 md:py-20 bg-black rounded-3xl border border-white/10 max-w-2xl mx-auto">
                  <h3 className="text-xl font-normal text-white mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-400 text-sm font-normal">
                    Try adjusting your filters or check back later for new
                    events.
                  </p>
                </div>
              ) : (
                <>
                  {/* Upcoming Events */}
                  {(selectedStatus === "all" ||
                    selectedStatus === "upcoming") &&
                    upcomingEvents.length > 0 && (
                      <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-normal text-white tracking-tight">
                            Upcoming Events
                          </h2>
                        </div>
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {upcomingEvents.map((event) => (
                            <StaggerItem key={event._id}>
                              <EventCard
                                id={event._id}
                                title={event.title}
                                description={event.desc}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                attendees={event.interestedUsers.length}
                                maxAttendees={event.maxCapicity}
                                status={event.status as any}
                                onRefresh={fetchEvents}
                              />
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    )}

                  {/* Past Events */}
                  {(selectedStatus === "all" ||
                    selectedStatus === "completed") &&
                    pastEvents.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2 rounded-xl bg-white/5 text-gray-400 border border-white/10">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-normal text-white tracking-tight">
                            Past Events
                          </h2>
                        </div>
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {pastEvents.map((event) => (
                            <StaggerItem key={event._id}>
                              <EventCard
                                id={event._id}
                                title={event.title}
                                description={event.desc}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                attendees={event.interestedUsers.length}
                                maxAttendees={event.maxCapicity}
                                status={event.status as any}
                                onRefresh={fetchEvents}
                              />
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    )}
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </AnimatedPage>
  );
}
