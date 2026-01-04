import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Award,
  Edit,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedAction from "@/components/auth/ProtectedAction";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmationModal from "@/components/ui/confirmation-modal";

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  type: "internship" | "challenge" | "hackathon" | "accelerator";
  organization: string;
  deadline: string;
  duration?: string;
  location: string;
  stipend?: string;
  link?: string;
  applied?: boolean;
  ineligible?: boolean; // TODO: Replace with actual eligibility criteria logic
}

const typeConfig = {
  internship: { label: "Internship", color: "blue" },
  challenge: { label: "Challenge", color: "blue" },
  hackathon: { label: "Hackathon", color: "blue" },
  accelerator: { label: "Accelerator", color: "blue" },
};

export default function OpportunityCard({
  id,
  title,
  description,
  type,
  organization,
  deadline,
  duration,
  location,
  stipend,
  link,
  applied: initialApplied = false,
  ineligible = false,
}: OpportunityCardProps) {
  const config = typeConfig[type];
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(initialApplied);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user) {
      checkInterest();
    }
  }, [user, id]);

  const checkInterest = async () => {
    try {
      const response = await axiosInstance.get(
        `/oppurtunities/${id}/check-interest`
      );
      setApplied(response.data.isInterested);
    } catch (error) {
      // User not authenticated or error checking
      console.error("Error checking interest:", error);
    }
  };

  const handleShowInterest = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await axiosInstance.post(`/oppurtunities/${id}/interest`);
      setApplied(true);
    } catch (error: any) {
      console.error("Error showing interest:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/admin", {
      state: {
        editOpportunity: {
          id,
          title,
          description,
          type,
          organization,
          deadline,
          duration,
          location,
          stipend,
        },
      },
    });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/oppurtunities/${id}`);
      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting opportunity:", error);
      alert(error.response?.data?.message || "Failed to delete opportunity");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <ProtectedAction requireMembership={false}>
      <div
        className={`group relative border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 h-full flex flex-col min-h-[400px] ${
          ineligible
            ? "border-orange-900/30 bg-gradient-to-br from-black/90 to-black/70 opacity-60"
            : applied
            ? "border-gray-800/50 bg-gradient-to-br from-black/90 to-black/70 opacity-60"
            : "border-gray-800 bg-gradient-to-br from-black/60 to-black/40 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(19,40,85,0.1)]"
        }`}
      >
        <div className="p-6 flex flex-col flex-1">
          {/* Header with type badge and stipend */}
          <div className="flex items-start justify-between mb-4">
            <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {config.label}
              </span>
            </div>
            {stipend && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400">
                  {stipend}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Organization */}
          <p className="text-sm text-gray-400 mb-3">
            by <span className="font-medium text-gray-300">{organization}</span>
          </p>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Details */}
          <div className="space-y-2.5 mb-6">
            <div className="flex items-center gap-2.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>
                Deadline: <span className="text-gray-300">{deadline}</span>
              </span>
            </div>
            {duration && (
              <div className="flex items-center gap-2.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>
                  Duration: <span className="text-gray-300">{duration}</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300">{location}</span>
            </div>
          </div>

          {/* CTA - pushed to bottom */}
          <div className="mt-auto">
            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="flex-1 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            ) : ineligible ? (
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500/70 cursor-default">
                <span>Not eligible</span>
              </button>
            ) : applied ? (
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-green-500 cursor-default">
                <span>Already Applied</span>
              </button>
            ) : (
              <button
                onClick={handleShowInterest}
                disabled={loading || !user}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/cta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Loading..." : "Show Interest"}</span>
                {!loading && (
                  <ExternalLink className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Opportunity"
        message="Are you sure you want to delete this opportunity? This action cannot be undone."
        confirmText="Delete"
        loading={deleting}
      />
    </ProtectedAction>
  );
}
