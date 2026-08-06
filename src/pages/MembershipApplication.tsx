import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import { AnimatedPage, FadeIn } from "@/components/animations";
import Grainient from "@/components/Grainient";

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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else {
      const nameParts = formData.name.trim().split(" ");
      if (nameParts.length < 2 || nameParts[0].length < 2) {
        errors.name = "Please enter your first and last name";
      }
    }

    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.year) {
      errors.year = "Year of study is required";
    } else if (!["1", "2", "3", "4"].includes(formData.year)) {
      errors.year = "Please select a valid year (1-4)";
    }

    if (!formData.interests.trim()) {
      errors.interests = "Skills/Interests are required";
    } else if (formData.interests.trim().length < 10) {
      errors.interests = "Please provide at least 10 characters";
    } else if (formData.interests.trim().length > 500) {
      errors.interests = "Skills/Interests cannot exceed 500 characters";
    }

    if (formData.experience && formData.experience.length > 500) {
      errors.experience = "Previous experience cannot exceed 500 characters";
    }

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

  useEffect(() => {
    if (user?.email) {
      const draftKey = `membership_draft_${user.email}`;
      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData({
            ...parsedDraft,
            email: user.email,
          });
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      }
    }
  }, [user?.email]);

  const handleSaveDraft = () => {
    if (user?.email) {
      const draftKey = `membership_draft_${user.email}`;
      localStorage.setItem(draftKey, JSON.stringify(formData));

      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) {
      setError("Please fix the errors below before submitting");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
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
          "Failed to submit application. Please try again.",
      );
      setLoading(false);
    }
  };

  if (checkingApplication) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 text-[#0673f9] mx-auto animate-spin" />
          <p className="text-zinc-400 text-sm font-normal">
            Checking application status...
          </p>
        </div>
      </div>
    );
  }

  const currentStatus = user?.applicationStatus || "none";
  const displayStatus = existingApplication
    ? existingApplication.status
    : currentStatus;

  if (displayStatus && displayStatus !== "none" && displayStatus !== "draft") {
    const statusDetails: Record<
      string,
      { title: string; message: string; badgeColor: string }
    > = {
      submitted: {
        title: "Application Received",
        message:
          "Thank you for applying to StartX. Your application has been submitted and is currently in queue for review.",
        badgeColor: "text-[#0673f9] bg-[#0673f9]/10 border-[#0673f9]/30",
      },
      under_review: {
        title: "Under Review",
        message:
          "Our membership team is evaluating your application. Expect to hear back via email within 3-5 business days.",
        badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      },
      approved: {
        title: "Application Approved!",
        message:
          "Congratulations! You are officially a StartX member. Welcome to our student-founder ecosystem!",
        badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      },
      rejected: {
        title: "Application Decision",
        message:
          "Thank you for taking the time to apply. Unfortunately, we cannot approve your application at this time.",
        badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      },
    };

    const currentDetails =
      statusDetails[displayStatus] || statusDetails.submitted;

    return (
      <AnimatedPage>
        <div className="relative min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
            <Grainient
              color1="#0673f9"
              color2="#1e3a8a"
              color3="#000000"
              timeSpeed={0.6}
              colorBalance={0.15}
              warpStrength={2.0}
              warpFrequency={3.5}
              warpSpeed={1.5}
              warpAmplitude={40}
              blendAngle={90}
              blendSoftness={0.2}
              rotationAmount={300}
              noiseScale={2.5}
              grainAmount={0.2}
              grainScale={1.5}
              grainAnimated={true}
              contrast={1.3}
              gamma={1.0}
              saturation={1.2}
              centerX={0}
              centerY={0}
              zoom={0.95}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg">
            <FadeIn>
              <div className="bg-white/90 border border-white/60 shadow-2xl backdrop-blur-2xl rounded-3xl p-8 sm:p-10 text-center space-y-6 text-slate-900">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border ${currentDetails.badgeColor} mx-auto`}
                >
                  {displayStatus === "approved" ? (
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  ) : displayStatus === "rejected" ? (
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                  ) : (
                    <Clock className="w-8 h-8 text-[#0673f9]" />
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                    {currentDetails.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {currentDetails.message}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center w-full py-3.5 bg-[#0673f9] hover:bg-[#0562d6] text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (step === "success") {
    return (
      <AnimatedPage>
        <div className="relative min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
            <Grainient
              color1="#0673f9"
              color2="#1e3a8a"
              color3="#000000"
              timeSpeed={0.6}
              colorBalance={0.15}
              warpStrength={2.0}
              warpFrequency={3.5}
              warpSpeed={1.5}
              warpAmplitude={40}
              blendAngle={90}
              blendSoftness={0.2}
              rotationAmount={300}
              noiseScale={2.5}
              grainAmount={0.2}
              grainScale={1.5}
              grainAnimated={true}
              contrast={1.3}
              gamma={1.0}
              saturation={1.2}
              centerX={0}
              centerY={0}
              zoom={0.95}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg">
            <FadeIn>
              <div className="bg-white/90 border border-white/60 shadow-2xl backdrop-blur-2xl rounded-3xl p-8 sm:p-10 text-center space-y-6 text-slate-900">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0673f9]/10 border border-[#0673f9]/30 text-[#0673f9] mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                    Application Submitted!
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    Thank you for applying to join StartX. Our team will review
                    your application and update you via email within 3-5
                    business days.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center w-full py-3.5 bg-[#0673f9] hover:bg-[#0562d6] text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md"
                  >
                    Done & Return Home
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="relative min-h-screen bg-transparent text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
          <Grainient
            color1="#0673f9"
            color2="#1e3a8a"
            color3="#000000"
            timeSpeed={0.6}
            colorBalance={0.15}
            warpStrength={2.0}
            warpFrequency={3.5}
            warpSpeed={1.5}
            warpAmplitude={40}
            blendAngle={90}
            blendSoftness={0.2}
            rotationAmount={300}
            noiseScale={2.5}
            grainAmount={0.2}
            grainScale={1.5}
            grainAnimated={true}
            contrast={1.3}
            gamma={1.0}
            saturation={1.2}
            centerX={0}
            centerY={0}
            zoom={0.95}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <FadeIn>
            <div className="text-center space-y-3 pt-6 max-w-xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                Apply for Membership
              </h1>
              <p className="text-base text-zinc-300 font-normal">
                Join 1000+ student builders, developers, and founders creating
                the future.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white/90 border border-white/60 shadow-2xl backdrop-blur-2xl rounded-3xl p-6 sm:p-10 md:p-12 text-slate-900 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-600 text-sm font-normal flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                      Personal Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
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
                        className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm ${
                          fieldErrors.name
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200/90"
                        }`}
                        placeholder="e.g. Alex Rivera"
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-rose-500 font-normal mt-1.5">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          disabled
                          className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-normal text-sm cursor-not-allowed"
                          placeholder="your@email.com"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Locked to your verified account email
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm ${
                          fieldErrors.phone
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200/90"
                        }`}
                        placeholder="e.g. 9876543210"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    </div>
                    {fieldErrors.phone && (
                      <p className="text-xs text-rose-500 font-normal mt-1.5">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                      Academic Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                        Campus / University *
                      </label>
                      <div className="relative">
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
                          className="w-full px-4 py-3 bg-[#f4f5f8] border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm"
                          placeholder="e.g. Stanford University / NST"
                        />
                        <Building className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
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
                        className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm ${
                          fieldErrors.year
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200/90"
                        }`}
                      >
                        <option value="">Select your year</option>
                        <option value="1">1st Year (Freshman)</option>
                        <option value="2">2nd Year (Sophomore)</option>
                        <option value="3">3rd Year (Junior)</option>
                        <option value="4">4th Year (Senior / Grad)</option>
                      </select>
                      {fieldErrors.year && (
                        <p className="text-xs text-rose-500 font-normal mt-1.5">
                          {fieldErrors.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                      Skills & Experience
                    </h2>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                      Areas of Interest / Skills *
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
                      className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm ${
                        fieldErrors.interests
                          ? "border-rose-400 focus:border-rose-500"
                          : "border-slate-200/90"
                      }`}
                      placeholder="e.g. AI/ML, Full-Stack Dev, UI/UX Design, Growth Marketing"
                    />
                    {fieldErrors.interests && (
                      <p className="text-xs text-rose-500 font-normal mt-1.5">
                        {fieldErrors.interests}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                      Previous Experience{" "}
                      <span className="text-slate-400 font-light">
                        (Optional)
                      </span>
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
                      className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm resize-none ${
                        fieldErrors.experience
                          ? "border-rose-400 focus:border-rose-500"
                          : "border-slate-200/90"
                      }`}
                      placeholder="Share any past projects, hackathons, startups, or leadership roles..."
                    />
                    {fieldErrors.experience && (
                      <p className="text-xs text-rose-500 font-normal mt-1.5">
                        {fieldErrors.experience}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                      Why Join StartX?
                    </h2>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
                      Your Motivation *
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
                      className={`w-full px-4 py-3 bg-[#f4f5f8] border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0673f9] focus:bg-white focus:ring-2 focus:ring-[#0673f9]/20 transition-all font-normal text-sm resize-none ${
                        fieldErrors.motivation
                          ? "border-rose-400 focus:border-rose-500"
                          : "border-slate-200/90"
                      }`}
                      placeholder="Tell us why you want to join StartX and what you hope to build or learn..."
                    />
                    {fieldErrors.motivation && (
                      <p className="text-xs text-rose-500 font-normal mt-1.5">
                        {fieldErrors.motivation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm rounded-xl border border-slate-300/80 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {draftSaved ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Draft Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-slate-600" />
                        <span>Save Draft</span>
                      </>
                    )}
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 bg-[#0673f9] hover:bg-[#0562d6] text-white font-medium text-sm rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(6,115,249,0.35)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedPage>
  );
}
