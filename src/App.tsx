import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Learn from "@/pages/Learn";
import Showcase from "@/pages/Showcase";
import Opportunities from "@/pages/Opportunities";
import CheckEligibility from "@/pages/CheckEligibility";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import MembershipApplication from "@/pages/MembershipApplication";
import MembershipRequired from "@/pages/MembershipRequired";
import AdminDashboard from "@/pages/AdminDashboard";
import VerifyEmail from "@/pages/VerifyEmail";
import EmailVerificationRequired from "@/pages/EmailVerificationRequired";
import GoogleCallback from "@/pages/GoogleCallback";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route
            path="/email-verification-required"
            element={<EmailVerificationRequired />}
          />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/membership-required" element={<MembershipRequired />} />
          <Route path="/apply-membership" element={<MembershipApplication />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
            <Route path="/login" element={<CheckEligibility />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
