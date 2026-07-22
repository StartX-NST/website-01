import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import type { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Learn from "@/pages/Learn";
import Showcase from "@/pages/Showcase";
import Opportunities from "@/pages/Opportunities";
import CheckEligibility from "@/pages/CheckEligibility";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import MembershipApplication from "@/pages/MembershipApplication";
import MembershipRequired from "@/pages/MembershipRequired";
import AdminDashboard from "@/pages/AdminDashboard";
import VerifyEmail from "@/pages/VerifyEmail";
import EmailVerificationRequired from "@/pages/EmailVerificationRequired";
import GoogleCallback from "@/pages/GoogleCallback";

function RequireRole({
  allowedRoles,
  children,
}: {
  allowedRoles: Array<"guest" | "admin" | "member" | "user">;
  children: ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SmoothScrollProvider>
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Navigate to="/login" replace />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/email-verification-required"
              element={<EmailVerificationRequired />}
            />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route
              path="/membership-required"
              element={<MembershipRequired />}
            />
            <Route
              path="/apply-membership"
              element={<MembershipApplication />}
            />
            <Route
              path="/admin"
              element={
                <RequireRole allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RequireRole>
              }
            />
            {/* Main app routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/check-eligibility" element={<CheckEligibility />} />
              {/* Placeholder routes for header navigation */}
              <Route path="/resources" element={<Opportunities />} />
              <Route path="features" element={<Opportunities />} />
              <Route path="community" element={<Opportunities />} />
              <Route path="pricing" element={<Opportunities />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SmoothScrollProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
