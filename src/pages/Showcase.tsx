import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { ProjectCard, ShowcaseFilters } from "@/components/showcase";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { BGPattern } from "@/components/ui/bg-pattern";

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/showcase", {
        params:
          selectedCategory !== "all" ? { category: selectedCategory } : {},
      });
      setProjects(response.data.showcases || []);
    } catch (error) {
      console.error("Error fetching showcases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  // Filter projects based on selected category
  const filteredProjects = projects.filter((project) => {
    return (
      selectedCategory === "all" ||
      project.category.toLowerCase() === selectedCategory
    );
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

        {/* Featured Projects Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Show empty state if no projects exist at all */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    No Projects Yet
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Student projects and startups will be featured here soon.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Section header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Featured Projects
                    </h2>
                  </div>
                </div>

                {/* Filters */}
                <ShowcaseFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                {/* Projects grid or filtered empty state */}
                {filteredProjects.length > 0 ? (
                  <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <StaggerItem key={project._id}>
                        <ProjectCard
                          id={project._id}
                          title={project.title}
                          description={project.description}
                          founder={project.founders}
                          category={project.category.toLowerCase()}
                          metrics={project.metrics?.[0]}
                          link={
                            project.projectLink ||
                            (project.showcaseFile
                              ? `${
                                  import.meta.env.VITE_API_URL
                                }/showcase/file/${project.showcaseFile}`
                              : undefined)
                          }
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <div className="text-center py-12 md:py-16 lg:py-20">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-400">
                      Try adjusting your filters or check back later.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
