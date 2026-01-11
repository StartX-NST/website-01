import { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Calendar,
  MapPin,
  Loader2,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

interface InterestedUser {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface EventWithInterests {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxCapicity?: number;
  interestedCount: number;
  interestedUsers: InterestedUser[];
}

export default function EventInterestsManager() {
  const [events, setEvents] = useState<EventWithInterests[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  useEffect(() => {
    fetchEventsWithInterests();
  }, []);

  const fetchEventsWithInterests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/events/admin/all-with-interests"
      );
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events with interests:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const exportToCSV = (event: EventWithInterests) => {
    const headers = ["Name", "Email"];
    const rows = event.interestedUsers.map((user) => [
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A",
      user.email,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${event.title.replace(/\s+/g, "_")}_interested_users.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCapacityBadge = (event: EventWithInterests) => {
    if (!event.maxCapicity) return null;

    const percentage = (event.interestedCount / event.maxCapicity) * 100;
    let color = "green";
    if (percentage >= 90) color = "red";
    else if (percentage >= 70) color = "yellow";

    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-${color}-500/10 border border-${color}-500/20 text-${color}-400`}
      >
        {event.interestedCount}/{event.maxCapicity} capacity
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Event Interests ({events.length})
        </h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No events found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-black/40 border border-gray-800 rounded-lg overflow-hidden transition-all hover:border-gray-700"
            >
              {/* Event Header */}
              <div
                onClick={() => toggleExpand(event.id)}
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {event.title}
                      </h3>
                      {getCapacityBadge(event)}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-lg font-semibold text-blue-400">
                        {event.interestedCount}{" "}
                        {event.interestedCount === 1 ? "user" : "users"}{" "}
                        interested
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {event.interestedCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportToCSV(event);
                        }}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-medium"
                      >
                        Export CSV
                      </button>
                    )}
                    {expandedEvent === event.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Interested Users List */}
              {expandedEvent === event.id && (
                <div className="border-t border-gray-800 p-6 bg-black/20">
                  {event.interestedUsers.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      No users have shown interest yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-300 mb-4">
                        Interested Users:
                      </h4>
                      <div className="grid gap-3">
                        {event.interestedUsers.map((user, index) => (
                          <div
                            key={user._id}
                            className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {user.firstName && user.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : "Name not provided"}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                  <Mail className="w-4 h-4" />
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
