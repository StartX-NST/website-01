import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, Clock, AlertCircle, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";

export default function MembershipApplication() {
  const navigate = useNavigate();
  const { user, updateApplicationStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [step, setStep] = useState<"form" | "success">("form");
  const [draftSaved, setDraftSaved] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Check if user already has an application
  useEffect(() => {
    const checkExistingApplication = async () => {
      if (!user) return;

      try {
        const response = await axiosInstance.get("/application");
        if (response.data.submitted && response.data.application) {
          setExistingApplication(response.data.application);
        }
      } catch (error) {
        console.error("Error checking application:", error);
      } finally {
        setCheckingApplication(false);
      }
    };

    checkExistingApplication();
  }, [user]);

  // Block access if not logged in or email not verified
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/apply-membership" } });
      return;
    }

    if (user.isEmailVerified === false) {
      navigate("/email-verification-required");
      return;
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    campus: "",
    year: "",
    interests: "",
    experience: "",
    motivation: "",
  });

  // Validation functions
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else {
      const nameParts = formData.name.trim().split(" ");
      if (nameParts.length < 2 || nameParts[0].length < 2) {
        errors.name = "Please enter your first and last name";
      }
    }

    // Phone validation (optional but if provided, validate format)
    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    // Year validation
    if (!formData.year) {
      errors.year = "Year of study is required";
    } else if (!["1", "2", "3", "4"].includes(formData.year)) {
      errors.year = "Please select a valid year (1-4)";
    }

    // Interests validation
    if (!formData.interests.trim()) {
      errors.interests = "Skills/Interests are required";
    } else if (formData.interests.trim().length < 10) {
      errors.interests = "Please provide at least 10 characters";
    } else if (formData.interests.trim().length > 500) {
      errors.interests = "Skills/Interests cannot exceed 500 characters";
    }

    // Experience validation (optional but limit length)
    if (formData.experience && formData.experience.length > 500) {
      errors.experience = "Previous experience cannot exceed 500 characters";
    }

    // Motivation validation
    if (!formData.motivation.trim()) {
      errors.motivation = "Please tell us why you want to join StartX";
    } else if (formData.motivation.trim().length < 20) {
      errors.motivation = "Please provide at least 20 characters";
    } else if (formData.motivation.trim().length > 1000) {
      errors.motivation = "Motivation cannot exceed 1000 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Load draft from localStorage on mount
  useEffect(() => {
    if (user?.email) {
      const draftKey = `membership_draft_${user.email}`;
      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData({
            ...parsedDraft,
            email: user.email, // Always use current user's email
          });
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      }
    }
  }, [user?.email]);

  // Get status config for displaying application status
  const statusConfig = {
    none: null,
    draft: {
      icon: Clock,
      title: "Draft Saved",
      message:
        "Your application has been saved as a draft. Continue editing or submit when ready.",
      color: "gray",
    },
    submitted: {
      icon: Clock,
      title: "Application Submitted",
      message: "Your application has been received and is awaiting review.",
      color: "blue",
    },
    under_review: {
      icon: Clock,
      title: "Under Review",
      message:
        "Our team is currently reviewing your application. You will hear from us soon!",
      color: "yellow",
    },
    approved: {
      icon: CheckCircle,
      title: "Application Approved!",
      message:
        "Congratulations! You are now a StartX member. Welcome to the community!",
      color: "blue",
    },
    rejected: {
      icon: AlertCircle,
      title: "Application Decision",
      message:
        "Thank you for your interest. Unfortunately, we cannot approve your application at this time.",
      color: "red",
    },
  };

  const currentStatus = user?.applicationStatus || "none";
  const status = statusConfig[currentStatus as keyof typeof statusConfig];

  // If application is already submitted/reviewed, show status page
  if (status && currentStatus !== "none" && currentStatus !== "draft") {
    const Icon = status.icon;
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src="/image.png" alt="StartX Logo" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl">
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${status.color}-500/10 border border-${status.color}-500/20 mb-6`}
              >
                <Icon className={`w-8 h-8 text-${status.color}-400`} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {status.title}
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {status.message}
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveDraft = () => {
    if (user?.email) {
      const draftKey = `membership_draft_${user.email}`;
      localStorage.setItem(draftKey, JSON.stringify(formData));

      // Show saved indicator
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate form
    if (!validateForm()) {
      setError("Please fix the errors below before submitting");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Split name into firstName and lastName
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || nameParts[0];

      const applicationData = {
        firstName,
        lastName,
        phoneNumber: formData.phone,
        yearOfStudy: formData.year,
        skillsOrInterests: formData.interests,
        prevExp: formData.experience,
        whyJoin: formData.motivation,
      };

      await axiosInstance.post("/application", applicationData);

      // Clear draft after successful submission
      if (user?.email) {
        const draftKey = `membership_draft_${user.email}`;
        localStorage.removeItem(draftKey);
      }

      updateApplicationStatus("submitted");
      setLoading(false);
      setStep("success");
    } catch (error: any) {
      console.error("Application submission error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src="/image.png" alt="StartX Logo" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="bg-black/80 border border-gray-800 rounded-xl p-12 backdrop-blur-xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Application Submitted!
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Thank you for applying to join StartX. Our team will review your
                application and get back to you within 3-5 business days.
              </p>
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)]"
              >
                Done
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking for existing application
  if (checkingApplication) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user already has an application, show status
  if (existingApplication) {
    const statusMap: Record<
      string,
      { icon: any; title: string; message: string; color: string }
    > = {
      submitted: {
        icon: Clock,
        title: "Application Received",
        message:
          "Your application has been received and is awaiting review. We'll get back to you within 3-5 business days.",
        color: "blue",
      },
      under_review: {
        icon: Clock,
        title: "Under Review",
        message:
          "Our team is currently reviewing your application. You will hear from us soon!",
        color: "yellow",
      },
      approved: {
        icon: CheckCircle,
        title: "Application Approved!",
        message:
          "Congratulations! You are now a StartX member. Welcome to the community!",
        color: "green",
      },
      rejected: {
        icon: AlertCircle,
        title: "Application Decision",
        message:
          "Thank you for your interest. Unfortunately, we cannot approve your application at this time.",
        color: "red",
      },
    };

    const appStatus =
      statusMap[existingApplication.status] || statusMap.submitted;
    const Icon = appStatus.icon;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src="/image.png" alt="StartX Logo" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Icon className={`w-8 h-8 text-${appStatus.color}-400`} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {appStatus.title}
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {appStatus.message}
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img src="/image.png" alt="StartX Logo" className="h-8 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Apply for Membership
          </h1>
          <p className="text-gray-400">
            Join 1000+ student builders creating the future
          </p>
        </div>

        <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                    fieldErrors.name
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-gray-700 focus:border-blue-500/50"
                  }`}
                  placeholder="John Doe"
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-400 mt-1">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email locked to your verified account
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.phone
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500/50"
                }`}
                placeholder="9876543210"
              />
              {fieldErrors.phone && (
                <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Campus Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Campus *
                </label>
                <input
                  type="text"
                  required
                  value={formData.campus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      campus: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Your University"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year of Study *
                </label>
                <select
                  required
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white focus:outline-none transition-all ${
                    fieldErrors.year
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-gray-700 focus:border-blue-500/50"
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {fieldErrors.year && (
                  <p className="text-xs text-red-400 mt-1">
                    {fieldErrors.year}
                  </p>
                )}
              </div>
            </div>

            {/* Interests & Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Areas of Interest *
              </label>
              <input
                type="text"
                required
                value={formData.interests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interests: e.target.value,
                  })
                }
                className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                  fieldErrors.interests
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500/50"
                }`}
                placeholder="e.g., AI, Web Development, Blockchain (min 10 characters)"
              />
              {fieldErrors.interests && (
                <p className="text-xs text-red-400 mt-1">
                  {fieldErrors.interests}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Previous Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value,
                  })
                }
                rows={3}
                className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all resize-none ${
                  fieldErrors.experience
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500/50"
                }`}
                placeholder="Tell us about your relevant experience, projects, or achievements (optional, max 500 characters)..."
              />
              {fieldErrors.experience && (
                <p className="text-xs text-red-400 mt-1">
                  {fieldErrors.experience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Why StartX? *
              </label>
              <textarea
                required
                value={formData.motivation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    motivation: e.target.value,
                  })
                }
                rows={4}
                className={`w-full px-4 py-2.5 bg-black/40 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all resize-none ${
                  fieldErrors.motivation
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500/50"
                }`}
                placeholder="Tell us why you want to join StartX and what you hope to achieve (min 20 characters, max 1000)..."
              />
              {fieldErrors.motivation && (
                <p className="text-xs text-red-400 mt-1">
                  {fieldErrors.motivation}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {draftSaved ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Draft Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Draft</span>
                  </>
                )}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
