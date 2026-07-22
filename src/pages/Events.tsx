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
        <div className="min-h-screen bg-black relative">
          {/* Diagonal Stripes Background Pattern */}
          <BGPattern
            variant="diagonal-stripes"
            mask="fade-y"
            size={60}
            fill="rgba(255, 255, 255, 0.08)"
          />

          {/* Events Section */}
          <section className="relative py-12 md:py-16 lg:py-20 px-6 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto">
              {/* Filters */}
              <EventFilters
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />

              {/* Check if there are any filtered results */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 md:py-16 lg:py-20">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-400">
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
                          <Sparkles className="w-6 h-6 text-blue-400" />
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Upcoming Events
                          </h2>
                        </div>
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <TrendingUp className="w-6 h-6 text-gray-400" />
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Past Events
                          </h2>
                        </div>
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
