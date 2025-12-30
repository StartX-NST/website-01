import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailVerificationRequired() {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Check authentication status
  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login");
      return;
    }

    if (user.isEmailVerified) {
      // Redirect to home if already verified
      navigate("/");
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/resend-verification", {
        email: user.email,
      });
      setSent(true);

      // Recheck auth status after sending email
      await checkAuth();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;

      // If email is already verified, redirect
      if (errorMessage?.includes("already verified")) {
        await checkAuth();
        navigate("/");
        return;
      }

      setError(
        errorMessage || "Failed to send verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            {!sent ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <Mail className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Verify Your Email
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We sent a verification email to{" "}
                  <span className="text-white font-medium">{user?.email}</span>.
                  Please check your inbox and click the verification link to
                  continue.
                </p>

                {error && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleResendEmail}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all mb-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </button>

                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or click the
                  button above.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Email Sent!
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We've sent a new verification email to{" "}
                  <span className="text-white font-medium">{user?.email}</span>.
                  Please check your inbox.
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
