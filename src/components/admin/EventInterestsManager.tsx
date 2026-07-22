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
        "/events/admin/all-with-interests",
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
      `${event.title.replace(/\s+/g, "_")}_interested_users.csv`,
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
        <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-normal text-gray-900">
          Event Interests ({events.length})
        </h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No events found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl overflow-hidden transition-all bg-gray-50 hover:bg-gray-100"
            >
              {/* Event Header */}
              <div
                onClick={() => toggleExpand(event.id)}
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-normal text-gray-900">
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
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-md font-semibold text-blue-400">
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
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-xs font-normal"
                      >
                        Export CSV
                      </button>
                    )}
                    {expandedEvent === event.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Interested Users List */}
              {expandedEvent === event.id && (
                <div className="border-t border-gray-100 p-5 bg-gray-50">
                  {event.interestedUsers.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No users have shown interest yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-xs font-normal text-gray-400 mb-3">
                        Interested Users:
                      </h4>
                      <div className="grid gap-3">
                        {event.interestedUsers.map((user, index) => (
                          <div
                            key={user._id}
                            className="flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm hover:shadow transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-normal">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-gray-900 font-normal">
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
