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
    switch (type.toLowerCase()) {
      case "internship":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
            Internship
          </span>
        );
      case "challenge":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400">
            Challenge
          </span>
        );
      case "hackathon":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            Hackathon
          </span>
        );
      case "accelerator":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
            Accelerator
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-500/15 border border-gray-500/30 text-gray-300">
            {type}
          </span>
        );
    }
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
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-gray-100">
          Opportunity Interests ({filteredOpportunities.length})
        </h2>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3.5 py-2 bg-[#141724] border border-[#23283b] rounded-xl text-gray-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all [&>option]:bg-[#141724] [&>option]:text-gray-100"
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
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No opportunities found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="rounded-xl overflow-hidden transition-all bg-[#141724] border border-[#23283b] hover:border-gray-700/80"
            >
              {/* Opportunity Header */}
              <div
                onClick={() => toggleExpand(opportunity.id)}
                className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-medium text-gray-100">
                        {opportunity.title}
                      </h3>
                      {getTypeBadge(opportunity.type)}
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-gray-500" />
                        <span>{opportunity.organization}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span>
                          Deadline: {formatDate(opportunity.deadline)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">
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
                        className="px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 rounded-lg transition-colors text-xs font-medium"
                      >
                        Export CSV
                      </button>
                    )}
                    {expandedOpportunity === opportunity.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Interested Users List */}
              {expandedOpportunity === opportunity.id && (
                <div className="border-t border-[#23283b] p-5 bg-[#0f111a]">
                  {opportunity.interestedUsers.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No users have shown interest yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-xs font-medium text-gray-400 mb-3 tracking-wider uppercase">
                        Interested Users:
                      </h4>
                      <div className="grid gap-3">
                        {opportunity.interestedUsers.map((user, index) => (
                          <div
                            key={user._id}
                            className="flex items-center justify-between p-3.5 bg-[#141724] border border-[#23283b] rounded-xl hover:border-gray-700 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-gray-200 text-sm font-medium">
                                  {user.firstName && user.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : "Name not provided"}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                  <Mail className="w-3.5 h-3.5 text-gray-500" />
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
