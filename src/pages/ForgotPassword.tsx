import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setEmailSent(true);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl text-center">
            <h1 className="text-2xl font-bold text-white mb-3">
              Check your email
            </h1>

            <p className="text-gray-400 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="text-blue-400 font-medium mb-6">{email}</p>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300">
                Click the link in the email to reset your password. The link
                will expire in 1 hour.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-500">Didn't receive the email?</p>
              <button
                onClick={() => setEmailSent(false)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Try again
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Reset your password
          </h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>{" "}
        <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                placeholder="Enter your email"
              />
            </div>{" "}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
            <div className="pt-4 border-t border-gray-800">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
