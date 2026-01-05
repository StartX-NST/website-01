import { useState, useEffect } from "react";
import { Plus, Link2, FileCode, Save, X } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Toast from "@/components/ui/toast";

interface Metric {
  label: string;
  value: string;
}

interface ShowcaseFormData {
  title: string;
  description: string;
  founder: string;
  category: string;
  metrics: Metric[];
  link: string;
  htmlFile: File | null;
  linkType: "url" | "html";
}

interface AddShowcaseFormProps {
  editData?: any;
}

export default function AddShowcaseForm({ editData }: AddShowcaseFormProps) {
  const isEditMode = !!editData?.id;
  const [formData, setFormData] = useState<ShowcaseFormData>({
    title: "",
    description: "",
    founder: "",
    category: "saas",
    metrics: [],
    link: "",
    htmlFile: null,
    linkType: "url",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        founder: editData.founder || "",
        category: editData.category?.toLowerCase() || "saas",
        metrics: editData.metrics || [],
        link: editData.projectLink || "",
        htmlFile: null,
        linkType: editData.projectLink ? "url" : "html",
      });
    }
  }, [editData]);

  const categories = [
    { value: "saas", label: "SaaS" },
    { value: "marketplace", label: "Marketplace" },
    { value: "ai", label: "AI" },
    { value: "fintech", label: "Fintech" },
    { value: "consumer", label: "Consumer" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/html") {
      setFormData((prev) => ({ ...prev, htmlFile: file }));
    } else if (file) {
      alert("Please upload a valid HTML file");
      e.target.value = "";
    }
  };

  const handleLinkTypeChange = (type: "url" | "html") => {
    setFormData((prev) => ({
      ...prev,
      linkType: type,
      link: "",
      htmlFile: null,
    }));
  };

  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: "", value: "" }],
    }));
  };

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const updateMetric = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) =>
        i === index ? { ...metric, [field]: value } : metric
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Map frontend category values to backend enum values
      const categoryMap: Record<string, string> = {
        saas: "SaaS",
        marketplace: "Marketplace",
        ai: "AI",
        fintech: "Fintech",
        consumer: "Consumer",
        other: "Other",
      };

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("founders", formData.founder);
      submitData.append(
        "category",
        categoryMap[formData.category] || formData.category
      );

      // Filter out empty metrics
      const validMetrics = formData.metrics.filter(
        (m) => m.label.trim() && m.value.trim()
      );
      submitData.append("metrics", JSON.stringify(validMetrics));

      if (formData.linkType === "url" && formData.link) {
        submitData.append("projectLink", formData.link);
      } else if (formData.linkType === "html" && formData.htmlFile) {
        submitData.append("showcaseFile", formData.htmlFile);
      }

      if (isEditMode) {
        await axiosInstance.patch(`/showcase/${editData.id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("/showcase", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSuccess(true);

      // Reset form if creating new
      if (!isEditMode) {
        setFormData({
          title: "",
          description: "",
          founder: "",
          category: "saas",
          metrics: [],
          link: "",
          htmlFile: null,
          linkType: "url",
        });
      }

      // Redirect after delay if editing
      if (isEditMode) {
        setTimeout(() => {
          window.location.href = "/showcase";
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error saving showcase:", error);
      alert(error.response?.data?.message || "Failed to save showcase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <Toast
          message={`Project ${isEditMode ? "updated" : "added"} successfully!`}
          onClose={() => setSuccess(false)}
        />
      )}

      <h2 className="text-2xl font-bold text-white mb-6">
        {isEditMode ? "Edit Showcase Project" : "Add New Showcase Project"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., TaskFlow"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Describe the project..."
          />
        </div>

        {/* Founder */}
        <div>
          <label
            htmlFor="founder"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Founder Name *
          </label>
          <input
            type="text"
            id="founder"
            name="founder"
            value={formData.founder}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Sarah Chen"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metrics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Metrics
            </label>
            <button
              type="button"
              onClick={addMetric}
              className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Metric
            </button>
          </div>

          {formData.metrics.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
              <p className="text-gray-500 text-sm">
                No metrics added yet. Click "Add Metric" to add project metrics.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-black/40 border border-gray-700 rounded-lg"
                >
                  <div>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) =>
                        updateMetric(index, "value", e.target.value)
                      }
                      placeholder="e.g., 2.5k"
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) =>
                        updateMetric(index, "label", e.target.value)
                      }
                      placeholder="e.g., active users"
                      className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Link or HTML File */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Project Link / File
          </label>

          {/* Toggle between URL and HTML */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleLinkTypeChange("url")}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                formData.linkType === "url"
                  ? "bg-blue-500/20 border-2 border-blue-500 text-blue-400"
                  : "bg-black/60 border border-gray-700 text-gray-400 hover:border-gray-600"
              }`}
            >
              <Link2 className="w-4 h-4" />
              Project URL
            </button>
            <button
              type="button"
              onClick={() => handleLinkTypeChange("html")}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                formData.linkType === "html"
                  ? "bg-blue-500/20 border-2 border-blue-500 text-blue-400"
                  : "bg-black/60 border border-gray-700 text-gray-400 hover:border-gray-600"
              }`}
            >
              <FileCode className="w-4 h-4" />
              HTML File
            </button>
          </div>

          {/* URL Input */}
          {formData.linkType === "url" && (
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="https://example.com"
            />
          )}

          {/* HTML File Upload */}
          {formData.linkType === "html" && (
            <div>
              <input
                type="file"
                id="htmlFile"
                accept=".html,.htm"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="htmlFile"
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-gray-400 hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-2 group"
              >
                <FileCode className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  {formData.htmlFile
                    ? formData.htmlFile.name
                    : "Choose HTML file..."}
                </span>
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Upload an HTML file for your project showcase
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(19,40,85,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{isEditMode ? "Updating..." : "Adding Project..."}</span>
            </>
          ) : (
            <>
              {isEditMode ? (
                <Save className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>{isEditMode ? "Update Project" : "Add Project"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
