import { useState, useEffect } from "react";
import { Briefcase, Trophy } from "lucide-react";
import axiosInstance from "@/lib/axios";
import {
  OpportunityCard,
  OpportunityFilters,
} from "@/components/opportunities";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { BGPattern } from "@/components/ui/bg-pattern";

export default function Opportunities() {
  const [selectedType, setSelectedType] = useState("all");
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/oppurtunities", {
        params: selectedType !== "all" ? { type: selectedType } : {},
      });
      setOpportunities(response.data.opportunities || []);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [selectedType]);

  // Filter opportunities based on selected type
  const filteredOpportunities = opportunities.filter((opp) => {
    return selectedType === "all" || opp.type.toLowerCase() === selectedType;
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black relative">
        {/* Diagonal Stripes Background Pattern */}
        <BGPattern
          variant="diagonal-stripes"
          mask="fade-y"
          size={60}
          fill="rgba(255, 255, 255, 0.08)"
        />

        {/* Opportunities Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Active Opportunities
                </h2>
              </div>
            </div>

            {/* Filters */}
            <OpportunityFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />

            {/* Opportunities grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading opportunities...</p>
              </div>
            ) : filteredOpportunities.length > 0 ? (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <StaggerItem key={opportunity._id}>
                    <OpportunityCard
                      id={opportunity._id}
                      title={opportunity.title}
                      description={opportunity.desc}
                      type={opportunity.type.toLowerCase()}
                      organization={opportunity.org}
                      deadline={new Date(
                        opportunity.deadline
                      ).toLocaleDateString()}
                      duration={opportunity.duration}
                      location={opportunity.location}
                      stipend={opportunity.reward}
                      link={opportunity.projectLink}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-12 md:py-16 lg:py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
                  <Briefcase className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
