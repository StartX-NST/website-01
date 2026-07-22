import { useState, useEffect } from "react";
import { Plus, Link2, FileCode, Save } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Toast from "@/components/ui/toast";

interface ShowcaseFormData {
  title: string;
  description: string;
  founder: string;
  category: string;
  metricsLabel: string;
  metricsValue: string;
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
    category: "SaaS",
    metricsLabel: "",
    metricsValue: "",
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
        category: editData.category?.toLowerCase() || "SaaS",
        metricsLabel: editData.metrics?.label || "",
        metricsValue: editData.metrics?.value || "",
        link: "",
        htmlFile: null,
        linkType: "url",
      });
    }
  }, [editData]);

  const categories = [
    { value: "SaaS", label: "SaaS" },
    { value: "marketplace", label: "Marketplace" },
    { value: "ai", label: "AI" },
    { value: "fintech", label: "Fintech" },
    { value: "consumer", label: "Consumer" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("founders", formData.founder);
      submitData.append(
        "category",
        formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
      );

      const metrics = [];
      if (formData.metricsLabel && formData.metricsValue) {
        metrics.push({
          label: formData.metricsLabel,
          value: formData.metricsValue,
        });
      }
      submitData.append("metrics", JSON.stringify(metrics));

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
          category: "SaaS",
          metricsLabel: "",
          metricsValue: "",
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

  const inputCls =
    "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all";
  const labelCls = "block text-xs font-normal text-gray-500 mb-1.5";

  return (
    <div>
      {success && (
        <Toast
          message={`Project ${isEditMode ? "updated" : "added"} successfully!`}
          onClose={() => setSuccess(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className={labelCls}>
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="e.g., TaskFlow"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelCls}>
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="Describe the project..."
          />
        </div>

        {/* Founder */}
        <div>
          <label htmlFor="founder" className={labelCls}>
            Founder Name *
          </label>
          <input
            type="text"
            id="founder"
            name="founder"
            value={formData.founder}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="e.g., Sarah Chen"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className={labelCls}>
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputCls}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="metricsValue" className={labelCls}>
              Metrics Value
            </label>
            <input
              type="text"
              id="metricsValue"
              name="metricsValue"
              value={formData.metricsValue}
              onChange={handleChange}
              className={inputCls}
              placeholder="e.g., 2.5k"
            />
          </div>
          <div>
            <label htmlFor="metricsLabel" className={labelCls}>
              Metrics Label
            </label>
            <input
              type="text"
              id="metricsLabel"
              name="metricsLabel"
              value={formData.metricsLabel}
              onChange={handleChange}
              className={inputCls}
              placeholder="e.g., active users"
            />
          </div>
        </div>

        {/* Link or HTML File */}
        <div>
          <label className={labelCls}>Project Link / File</label>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleLinkTypeChange("url")}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-normal transition-all flex items-center justify-center gap-2 ${
                formData.linkType === "url"
                  ? "bg-blue-50 border border-blue-500 text-blue-600"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              Project URL
            </button>
            <button
              type="button"
              onClick={() => handleLinkTypeChange("html")}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-normal transition-all flex items-center justify-center gap-2 ${
                formData.linkType === "html"
                  ? "bg-blue-50 border border-blue-500 text-blue-600"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              HTML File
            </button>
          </div>

          {formData.linkType === "url" && (
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className={inputCls}
              placeholder="https://example.com"
            />
          )}

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
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <FileCode className="w-4 h-4" />
                <span>
                  {formData.htmlFile
                    ? formData.htmlFile.name
                    : "Choose HTML file..."}
                </span>
              </label>
              <p className="mt-1.5 text-xs text-gray-400">
                Upload an HTML file for your project showcase
              </p>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-2.5 bg-[#0673f9] hover:bg-blue-600 text-white text-sm font-normal rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{isEditMode ? "Updating..." : "Adding Project..."}</span>
            </>
          ) : (
            <>
              {isEditMode ? (
                <Save className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>{isEditMode ? "Update Project" : "Add Project"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
