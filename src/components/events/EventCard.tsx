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
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import Grainient from "@/components/Grainient";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  maxAttendees?: number;
  memberOnly?: boolean;
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
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(`/events/${id}/interest`);
      setIsInterested(true);
      if (onRefresh) onRefresh();
    } catch (error: any) {
      console.error("Error adding interest:", error);
      alert(error.response?.data?.message || "Failed to register for event");
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
      if (onRefresh) onRefresh();
      setShowDeleteModal(false);
    } catch (error: any) {
      console.error("Error deleting event:", error);
      alert(error.response?.data?.message || "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  // Parse Date into Day number and Month code
  const getParsedDate = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const day = isNaN(eventDate.getDate()) ? "01" : eventDate.getDate().toString().padStart(2, "0");
    const month = isNaN(eventDate.getTime())
      ? "JAN"
      : eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    return { day, month };
  };

  const formatTime = (timeStr: string) => {
    const eventTime = new Date(timeStr);
    if (isNaN(eventTime.getTime())) return timeStr || "TBA";
    return eventTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const { day, month } = getParsedDate(date);

  return (
    <>
      <div
        className={`group relative bg-white text-gray-900 rounded-[28px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-gray-100/20 flex flex-col h-full ${
          isCompleted ? "opacity-95" : ""
        }`}
      >
        {/* Top Section with Grainient Component */}
        <div className="relative h-44 w-full overflow-hidden shrink-0">
          <Grainient
            color1="#0673f9"
            color2="#3b82f6"
            color3="#1d4ed8"
            timeSpeed={0.15}
            warpStrength={1.2}
            className="absolute inset-0 w-full h-full"
          />

          {/* Fallback CSS Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 opacity-80 pointer-events-none -z-10" />

          {/* Dashed Circle & Curve Wave Graphic (Matching User Screenshot) */}
          <svg
            className="absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 text-white/35 pointer-events-none z-10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="34"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 24 52 Q 48 20, 76 60"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Top Left Capsule Badge (Matching User Screenshot) */}
          <div className="relative z-10 p-4">
            {status === "upcoming" && (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#152342]/80 backdrop-blur-md text-white font-semibold text-xs tracking-wider border border-white/20 uppercase shadow-md">
                UPCOMING
              </span>
            )}
            {status === "completed" && (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#152342]/80 backdrop-blur-md text-white font-semibold text-xs tracking-wider border border-white/20 uppercase shadow-md">
                COMPLETED
              </span>
            )}
            {status === "ongoing" && (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-semibold text-xs tracking-wider border border-white/20 uppercase shadow-md animate-pulse">
                LIVE NOW
              </span>
            )}
          </div>
        </div>

        {/* Card Main Body */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white justify-between">
          <div>
            {/* Event Title Heading with font-normal as requested */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug group-hover:text-[#0673f9] transition-colors line-clamp-2 tracking-tight">
                {title}
              </h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mt-2.5" />
            </div>

            {/* Date & Location Split Row */}
            <div className="flex items-start gap-4 py-4 border-y border-gray-100 my-4">
              {/* Left Column: Big Date Callout */}
              <div className="flex flex-col items-center justify-center min-w-[56px] pr-3 border-r border-gray-100">
                <span className="text-3xl sm:text-4xl font-normal text-gray-900 leading-none tracking-tight">
                  {day}
                </span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  {month}
                </span>
              </div>

              {/* Right Column: Event Details */}
              <div className="flex-1 space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span
                    className="font-medium text-gray-700 truncate max-w-[200px]"
                    title={location}
                  >
                    {location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-medium text-gray-700">
                    {formatTime(time)}
                  </span>
                </div>
                {maxAttendees && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-medium text-gray-700">
                      {attendees}/{maxAttendees} attendees
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden ml-1 max-w-[80px]">
                      <div
                        className="h-full bg-[#0673f9] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (attendees / maxAttendees) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Snippet */}
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 font-normal">
              {description}
            </p>
          </div>

          {/* Footer Action Button */}
          <div className="mt-auto flex items-center justify-end pt-2">
            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 border-2 border-[#0673f9] text-[#0673f9] hover:bg-[#0673f9] hover:text-white font-medium rounded-full text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium rounded-full text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            ) : (
              <>
                {isUpcoming && !isInterested && (
                  <button
                    onClick={handleInterestToggle}
                    disabled={loading || checkingInterest}
                    className="px-6 py-2.5 border-2 border-[#0673f9] text-[#0673f9] hover:bg-[#0673f9] hover:text-white font-semibold rounded-full text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                  >
                    {loading || checkingInterest ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Register Now</span>
                      </>
                    )}
                  </button>
                )}
                {isUpcoming && isInterested && (
                  <div className="px-5 py-2 bg-emerald-50 text-emerald-600 border-2 border-emerald-500 font-semibold rounded-full text-xs sm:text-sm flex items-center gap-1.5 shadow-sm">
                    <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>Registered</span>
                  </div>
                )}
                {isCompleted && (
                  <span className="px-5 py-2 border-2 border-gray-200 text-gray-400 font-medium rounded-full text-xs sm:text-sm cursor-default">
                    Event Ended
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Event"
          message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
          confirmText="Delete"
          loading={deleting}
        />
      )}
    </>
  );
}


