import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Toast from "@/components/ui/toast";

interface EventFormData {
  title: string;
  desc: string;
  datetime: string;
  location: string;
  maxCapicity: number;
}

interface AddEventFormProps {
  editData?: {
    _id: string;
    title: string;
    desc: string;
    date: string;
    time: string;
    location: string;
    maxCapicity?: number;
  };
}

export default function AddEventForm({ editData }: AddEventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    desc: "",
    datetime: "",
    location: "",
    maxCapicity: 50,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editData) {
      // Use the date field for datetime-local input (format: yyyy-MM-ddTHH:mm)
      const datetime = editData.date
        ? new Date(editData.date).toISOString().slice(0, 16)
        : "";

      setFormData({
        title: editData.title,
        desc: editData.desc,
        datetime: datetime,
        location: editData.location,
        maxCapicity: editData.maxCapicity || 50,
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxCapicity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Convert datetime-local to ISO string for both date and time
      const datetimeObj = new Date(formData.datetime);

      const payload = {
        title: formData.title,
        desc: formData.desc,
        date: datetimeObj.toISOString(),
        time: datetimeObj.toISOString(),
        location: formData.location,
        maxCapicity: formData.maxCapicity,
      };

      if (editData) {
        // Update existing event
        await axiosInstance.patch(`/events/${editData._id}`, payload);
      } else {
        // Create new event
        await axiosInstance.post("/events", payload);
      }

      setSuccess(true);

      // Reset form only if creating new event
      if (!editData) {
        setFormData({
          title: "",
          desc: "",
          datetime: "",
          location: "",
          maxCapicity: 50,
        });
      }

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error saving event:", error);
      alert(error.response?.data?.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <Toast
          message={`Event ${editData ? "updated" : "added"} successfully!`}
          onClose={() => setSuccess(false)}
        />
      )}

      <h2 className="text-2xl font-bold text-white mb-6">
        {editData ? "Edit Event" : "Add New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Building Your MVP in 48 Hours"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description *
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Describe the event..."
          />
        </div>

        {/* Date and Time */}
        <div>
          <label
            htmlFor="datetime"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Date & Time *
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
            style={{ colorScheme: "dark" }}
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:brightness-200"
          />
        </div>

        {/* Location */}
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
            placeholder="e.g., Online (Zoom) or Building 360, Room 105"
          />
        </div>

        {/* Max Capacity */}
        <div>
          <label
            htmlFor="maxCapicity"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Maximum Capacity *
          </label>
          <input
            type="number"
            id="maxCapicity"
            name="maxCapicity"
            value={formData.maxCapicity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., 50"
          />
          <p className="mt-2 text-xs text-gray-500">
            Set the maximum number of people who can attend this event
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
              <span>{editData ? "Updating" : "Adding"} Event...</span>
            </>
          ) : (
            <>
              {editData ? (
                <Edit className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>{editData ? "Update" : "Add"} Event</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
