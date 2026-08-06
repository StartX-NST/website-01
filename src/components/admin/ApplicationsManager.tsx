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
  } | null;
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
    switch (status) {
      case "submitted":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
            New
          </span>
        );
      case "under_review":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
            Reviewing
          </span>
        );
      case "approved":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400">
            Rejected
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-gray-100">
          Membership Applications ({applications.length})
        </h2>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="px-3.5 py-2 bg-[#141724] border border-[#23283b] rounded-xl text-gray-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all [&>option]:bg-[#141724] [&>option]:text-gray-100"
        >
          <option value="all">All Applications</option>
          <option value="submitted">New</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-400 text-sm">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className="rounded-xl p-5 bg-[#141724] border border-[#23283b] hover:border-gray-700/80 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-gray-100">
                      {app.firstName} {app.lastName}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    {app.user && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <span>{app.user.email}</span>
                      </div>
                    )}
                    {!app.user && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-500 italic">
                          User deleted
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{app.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
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
                    className="px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 rounded-lg"
                  >
                    {selectedApp?._id === app._id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedApp?._id === app._id && (
                <div className="mt-4 pt-4 border-t border-[#23283b] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Year of Study
                      </label>
                      <p className="text-gray-200 mt-1 text-sm">Year {app.yearOfStudy}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Skills & Interests
                    </label>
                    <p className="text-gray-200 mt-1 text-sm">{app.skillsOrInterests}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Previous Experience
                    </label>
                    <p className="text-gray-200 mt-1 text-sm">
                      {app.prevExp || "None provided"}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Why Join StartX
                    </label>
                    <p className="text-gray-200 mt-1 text-sm">{app.whyJoin}</p>
                  </div>

                  {/* Decision Buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => handleStatusChange(app._id, "approved")}
                      disabled={app.status === "approved"}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "rejected")}
                      disabled={app.status === "rejected"}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-sm font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    {app.status === "submitted" && (
                      <button
                        onClick={() =>
                          handleStatusChange(app._id, "under_review")
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-sm font-medium rounded-xl transition-all"
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
