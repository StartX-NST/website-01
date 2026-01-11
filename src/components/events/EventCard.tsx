import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProtectedAction from "@/components/auth/ProtectedAction";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import toast from "@/components/ui/toast";
import ConfirmationModal from "@/components/ui/confirmation-modal";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  maxAttendees?: number;
  status: "upcoming" | "ongoing" | "completed";
  onRefresh?: () => void;
}

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  attendees = 0,
  maxAttendees,
  status,
  onRefresh,
}: EventCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isInterested, setIsInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingInterest, setCheckingInterest] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isUpcoming = status === "upcoming";
  const isCompleted = status === "completed";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user && isUpcoming) {
      checkIfInterested();
    }
  }, [user, id]);

  const checkIfInterested = async () => {
    try {
      setCheckingInterest(true);
      const response = await axiosInstance.get(`/events/${id}/check-interest`);
      setIsInterested(response.data.isInterested);
    } catch (error) {
      console.error("Error checking interest:", error);
    } finally {
      setCheckingInterest(false);
    }
  };

  const handleInterestToggle = async () => {
    if (!user) {
      toast.error("Please login to register for events");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(`/events/${id}/interest`);
      setIsInterested(true);
      toast.success("Successfully registered for event!");
      if (onRefresh) onRefresh();
    } catch (error: any) {
      console.error("Error adding interest:", error);
      toast.error(
        error.response?.data?.message || "Failed to register for event"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/admin", {
      state: {
        editEvent: {
          _id: id,
          title,
          desc: description,
          date,
          time,
          location,
          maxCapicity: maxAttendees,
        },
      },
    });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axiosInstance.delete(`/events/${id}`);
      toast.success("Event deleted successfully");
      if (onRefresh) onRefresh();
      setShowDeleteModal(false);
    } catch (error: any) {
      console.error("Error deleting event:", error);
      toast.error(error.response?.data?.message || "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    return eventDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const eventTime = new Date(timeStr);
    return eventTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <ProtectedAction requireMembership={false}>
        <div
          className={`group relative border rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full flex flex-col min-h-[400px] ${
            isCompleted
              ? "border-gray-800/50 bg-gradient-to-br from-black/90 to-black/70 opacity-60"
              : "border-gray-800 bg-gradient-to-br from-black/60 to-black/40 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(19,40,85,0.1)]"
          } backdrop-blur-sm`}
        >
          {/* Admin Actions */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Status badge */}
          {isCompleted && !isAdmin && (
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700/60 backdrop-blur-sm">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Completed
                </span>
              </div>
            </div>
          )}

          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
              {title}
            </h3>
            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
              {description}
            </p>
            {/* Event details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{formatTime(time)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{location}</span>
              </div>
              {maxAttendees && (
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Users className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>
                    {attendees}/{maxAttendees} attendees
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden ml-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${(attendees / maxAttendees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* CTA - pushed to bottom */}
            <div className="mt-auto">
              {isUpcoming && !isInterested && (
                <button
                  onClick={handleInterestToggle}
                  disabled={loading || checkingInterest}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || checkingInterest ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 group-hover/cta:scale-110 transition-transform" />
                      <span>Register now</span>
                    </>
                  )}
                </button>
              )}
              {isUpcoming && isInterested && (
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-400">
                  <Heart className="w-4 h-4 fill-green-400" />
                  <span>Registered</span>
                </div>
              )}
              {isCompleted && (
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 cursor-default">
                  <span>Event ended</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </ProtectedAction>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Event"
          message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
          confirmText="Delete"
          isDestructive={true}
          loading={deleting}
        />
      )}
    </>
  );
}
