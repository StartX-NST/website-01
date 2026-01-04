import { useState, useEffect } from "react";
import { Plus, CheckCircle, Save } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface OpportunityFormData {
  type: "internship" | "challenge" | "hackathon" | "accelerator";
  title: string;
  organization: string;
  description: string;
  deadline: string;
  duration: string;
  location: string;
  stipend: string;
}

interface AddOpportunityFormProps {
  editData?: any;
}

export default function AddOpportunityForm({
  editData,
}: AddOpportunityFormProps) {
  const isEditMode = !!editData?.id;
  const [formData, setFormData] = useState<OpportunityFormData>({
    type: "internship",
    title: "",
    organization: "",
    description: "",
    deadline: "",
    duration: "",
    location: "",
    stipend: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type?.toLowerCase() || "internship",
        title: editData.title || "",
        organization: editData.organization || "",
        description: editData.description || "",
        deadline: editData.deadline
          ? new Date(editData.deadline).toISOString().slice(0, 16)
          : "",
        duration: editData.duration || "",
        location: editData.location || "",
        stipend: editData.stipend || "",
      });
    }
  }, [editData]);

  const types = [
    { value: "internship", label: "Internship" },
    { value: "challenge", label: "Challenge" },
    { value: "hackathon", label: "Hackathon" },
    { value: "accelerator", label: "Accelerator" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const payload = {
        type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
        title: formData.title,
        org: formData.organization,
        desc: formData.description,
        deadline: formData.deadline,
        duration: formData.duration,
        location: formData.location,
        reward: formData.stipend,
      };

      if (isEditMode) {
        await axiosInstance.patch(`/oppurtunities/${editData.id}`, payload);
      } else {
        await axiosInstance.post("/oppurtunities", payload);
      }

      setSuccess(true);

      // Reset form if creating new
      if (!isEditMode) {
        setFormData({
          type: "internship",
          title: "",
          organization: "",
          description: "",
          deadline: "",
          duration: "",
          location: "",
          stipend: "",
        });
      }

      // Hide success message after 1.5 seconds
      setTimeout(() => {
        setSuccess(false);
        if (isEditMode) {
          window.location.href = "/opportunities";
        }
      }, 1500);
    } catch (error: any) {
      console.error("Error saving opportunity:", error);
      alert(error.response?.data?.message || "Failed to save opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEditMode ? "Edit Opportunity" : "Add New Opportunity"}
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-medium">
            Opportunity {isEditMode ? "updated" : "added"} successfully!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Opportunity Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Product Design Intern"
          />
        </div>

        {/* Organization */}
        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Organization *
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
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
            placeholder="Describe the opportunity..."
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Deadline *
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Duration and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., 3 months, 48 hours"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., Remote, San Francisco, CA"
            />
          </div>
        </div>

        {/* Stipend */}
        <div>
          <label
            htmlFor="stipend"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Stipend/Prize Badge
          </label>
          <input
            type="text"
            id="stipend"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., $2k/month, $50k prize"
          />
          <p className="mt-2 text-sm text-gray-500">
            This text will appear in the top-right highlight badge
          </p>
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
              <span>
                {isEditMode ? "Updating..." : "Adding Opportunity..."}
              </span>
            </>
          ) : (
            <>
              {isEditMode ? (
                <Save className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>
                {isEditMode ? "Update Opportunity" : "Add Opportunity"}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
