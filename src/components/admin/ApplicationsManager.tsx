import { useState, useEffect } from "react";
import { Check, X, Clock, Mail, Phone, Calendar, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  yearOfStudy: string;
  skillsOrInterests: string;
  prevExp: string;
  whyJoin: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  createdAt: string;
  user: {
    email: string;
  };
}

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "submitted" | "under_review" | "approved" | "rejected"
  >("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/application/apps");
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    appId: string,
    newStatus: Application["status"]
  ) => {
    try {
      await axiosInstance.patch(`/application/${appId}/status`, {
        status: newStatus,
      });

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );

      // Update selected app if it's the one being changed
      if (selectedApp?._id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update application status");
    }
  };

  const filteredApplications = applications.filter(
    (app) => filter === "all" || app.status === filter
  );

  const getStatusBadge = (status: Application["status"]) => {
    const statusConfig = {
      submitted: { text: "New", color: "blue" },
      under_review: { text: "Reviewing", color: "yellow" },
      approved: { text: "Approved", color: "green" },
      rejected: { text: "Rejected", color: "red" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-${config.color}-500/10 border border-${config.color}-500/20 text-${config.color}-400`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Membership Applications ({applications.length})
        </h2>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="all">All Applications</option>
          <option value="submitted">New</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-400">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className="border border-gray-700 rounded-lg p-6 bg-black/40 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {app.firstName} {app.lastName}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      <span>{app.user.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      <span>{app.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Submitted:{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setSelectedApp(selectedApp?._id === app._id ? null : app)
                    }
                    className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {selectedApp?._id === app._id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedApp?._id === app._id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase">
                        Year of Study
                      </label>
                      <p className="text-white mt-1">Year {app.yearOfStudy}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase">
                      Skills & Interests
                    </label>
                    <p className="text-white mt-1">{app.skillsOrInterests}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase">
                      Previous Experience
                    </label>
                    <p className="text-white mt-1">
                      {app.prevExp || "None provided"}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase">
                      Why Join StartX
                    </label>
                    <p className="text-white mt-1">{app.whyJoin}</p>
                  </div>

                  {/* Decision Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleStatusChange(app._id, "approved")}
                      disabled={app.status === "approved"}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "rejected")}
                      disabled={app.status === "rejected"}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    {app.status === "submitted" && (
                      <button
                        onClick={() =>
                          handleStatusChange(app._id, "under_review")
                        }
                        className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 font-medium rounded-lg transition-all"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Mark as Reviewing</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
