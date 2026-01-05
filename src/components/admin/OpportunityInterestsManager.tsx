import { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Calendar,
  Trophy,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

interface InterestedUser {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface OpportunityWithInterests {
  id: string;
  title: string;
  organization: string;
  type: string;
  deadline: string;
  interestedCount: number;
  interestedUsers: InterestedUser[];
}

export default function OpportunityInterestsManager() {
  const [opportunities, setOpportunities] = useState<
    OpportunityWithInterests[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState<
    "all" | "internship" | "challenge" | "hackathon" | "accelerator"
  >("all");

  useEffect(() => {
    fetchOpportunitiesWithInterests();
  }, []);

  const fetchOpportunitiesWithInterests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/oppurtunities/admin/all-with-interests"
      );
      setOpportunities(response.data.opportunities || []);
    } catch (error) {
      console.error("Error fetching opportunities with interests:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (oppId: string) => {
    setExpandedOpportunity(expandedOpportunity === oppId ? null : oppId);
  };

  const filteredOpportunities = opportunities.filter(
    (opp) => filter === "all" || opp.type.toLowerCase() === filter.toLowerCase()
  );

  const getTypeBadge = (type: string) => {
    const typeConfig: Record<string, { color: string }> = {
      Internship: { color: "blue" },
      Challenge: { color: "purple" },
      Hackathon: { color: "green" },
      Accelerator: { color: "orange" },
    };

    const config = typeConfig[type] || { color: "gray" };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-${config.color}-500/10 border border-${config.color}-500/20 text-${config.color}-400`}
      >
        {type}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const exportToCSV = (opportunity: OpportunityWithInterests) => {
    const headers = ["Name", "Email"];
    const rows = opportunity.interestedUsers.map((user) => [
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
      `${opportunity.title.replace(/\s+/g, "_")}_interested_users.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          Opportunity Interests ({filteredOpportunities.length})
        </h2>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Types</option>
          <option value="internship">Internship</option>
          <option value="challenge">Challenge</option>
          <option value="hackathon">Hackathon</option>
          <option value="accelerator">Accelerator</option>
        </select>
      </div>

      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No opportunities found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-black/40 border border-gray-800 rounded-lg overflow-hidden transition-all hover:border-gray-700"
            >
              {/* Opportunity Header */}
              <div
                onClick={() => toggleExpand(opportunity.id)}
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {opportunity.title}
                      </h3>
                      {getTypeBadge(opportunity.type)}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        <span>{opportunity.organization}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Deadline: {formatDate(opportunity.deadline)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-lg font-semibold text-blue-400">
                        {opportunity.interestedCount}{" "}
                        {opportunity.interestedCount === 1 ? "user" : "users"}{" "}
                        interested
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {opportunity.interestedCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportToCSV(opportunity);
                        }}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-medium"
                      >
                        Export CSV
                      </button>
                    )}
                    {expandedOpportunity === opportunity.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Interested Users List */}
              {expandedOpportunity === opportunity.id && (
                <div className="border-t border-gray-800 p-6 bg-black/20">
                  {opportunity.interestedUsers.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      No users have shown interest yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-300 mb-4">
                        Interested Users:
                      </h4>
                      <div className="grid gap-3">
                        {opportunity.interestedUsers.map((user, index) => (
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
