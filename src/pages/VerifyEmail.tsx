import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setAuthUser, checkAuth } = useAuth();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    setStatus("loading");

    try {
      const response = await axiosInstance.get(`/auth/verify-email/${token}`);

      if (response.data.success) {
        setStatus("success");
        setMessage("Email verified successfully!");

        // Update user context with verified user
        if (response.data.user) {
          setAuthUser(response.data.user);
          // Store user data
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // Refresh auth state from backend to get latest user data
        await checkAuth();

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Failed to verify email. The link may be invalid or expired."
      );
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

        <div className="bg-black/80 border border-gray-800 rounded-xl p-12 backdrop-blur-xl">
          <div className="text-center">
            {status === "idle" && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Verify Your Email
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Click the button below to confirm your email address and
                  complete your registration.
                </p>
                <button
                  onClick={handleVerify}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all"
                >
                  Verify Email
                </button>
              </>
            )}

            {status === "loading" && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Verifying Your Email
                </h2>
                <p className="text-gray-400">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Email Verified!
                </h2>
                <p className="text-gray-400 mb-8">{message}</p>
                <p className="text-sm text-gray-500">
                  Redirecting you to the homepage...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Verification Failed
                </h2>
                <p className="text-gray-400 mb-8">{message}</p>
                <Link
                  to="/login"
                  className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all"
                >
                  Go to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
