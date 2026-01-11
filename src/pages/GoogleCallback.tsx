import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { BGPattern } from "@/components/ui/bg-pattern";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuth } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const errorParam = searchParams.get("error");

      if (errorParam) {
        if (errorParam === "invalid_domain") {
          setError("Only @nst.rishihood.edu.in emails are allowed");
        } else {
          setError("Authentication failed. Please try again.");
        }
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }

      // If no error, the backend already set the cookie, just check auth
      try {
        await checkAuth();
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } catch (err) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, checkAuth, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <BGPattern
        variant="dots"
        mask="fade-edges"
        size={30}
        fill="rgba(255, 255, 255, 0.15)"
      />
      <div className="text-center">
        {error ? (
          <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl max-w-md">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 mb-4">
              {error}
            </div>
            <p className="text-gray-400">Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Completing sign-in...
            </h2>
            <p className="text-gray-400">
              Please wait while we authenticate you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
