import { ExternalLink, Users, TrendingUp, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedAction from "@/components/auth/ProtectedAction";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmationModal from "@/components/ui/confirmation-modal";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  founder: string;
  category: string;
  metrics?: {
    label: string;
    value: string;
  };
  image?: string;
  link?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  founder,
  category,
  metrics,
  link,
}: ProjectCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isAdmin = user?.role === "admin";

  const handleEdit = () => {
    navigate("/admin", {
      state: {
        editShowcase: { id, title, description, founder, category, metrics },
      },
    });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/showcase/${id}`);
      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting showcase:", error);
      alert(error.response?.data?.message || "Failed to delete showcase");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <ProtectedAction requireMembership={false}>
      <div className="group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(19,40,85,0.1)] h-full flex flex-col min-h-[360px]">
        <div className="p-6 flex flex-col flex-1">
          {/* Category badge */}
          <div className="inline-flex mb-4">
            <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Founder */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Users className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>
              Built by{" "}
              <span className="font-medium text-gray-300">{founder}</span>
            </span>
          </div>

          {/* Metrics - fixed height to maintain uniformity */}
          <div className="mb-6 h-[42px] flex items-center">
            {metrics && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  <span className="font-semibold text-blue-400">
                    {metrics.value}
                  </span>{" "}
                  {metrics.label}
                </span>
              </div>
            )}
          </div>

          {/* CTA - pushed to bottom */}
          <div className="mt-auto space-y-2">
            {/* View Project Link - always show if link exists */}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/cta mb-3"
              >
                <span>View project</span>
                <ExternalLink className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {/* Admin Actions */}
            {isAdmin && (
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
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Showcase"
        message="Are you sure you want to delete this showcase project? This action cannot be undone."
        confirmText="Delete"
        loading={deleting}
      />
    </ProtectedAction>
  );
}
