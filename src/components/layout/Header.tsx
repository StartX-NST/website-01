import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  FileText,
  Clock,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Shield,
  Sparkles,
  ArrowRight,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Learn", path: "/learn" },
  { name: "Showcase", path: "/showcase" },
  { name: "Opportunities", path: "/opportunities" },
];

export default function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getApplicationStatusBadge = () => {
    if (!user || user.role === "member" || user.role === "admin") return null;

    const statusConfig = {
      none: null,
      draft: {
        icon: FileText,
        text: "Draft",
        color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
      },
      submitted: {
        icon: Clock,
        text: "Submitted",
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      },
      under_review: {
        icon: Clock,
        text: "Under Review",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      },
      approved: {
        icon: CheckCircle,
        text: "Approved",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      },
      rejected: null,
    };

    if (!user.applicationStatus) return null;
    const status = statusConfig[user.applicationStatus];
    if (!status) return null;

    const Icon = status.icon;
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${status.color}`}
      >
        <Icon className="w-3 h-3" />
        <span>{status.text}</span>
      </div>
    );
  };

  const getRoleBadge = () => {
    if (!user) return null;
    if (user.role === "admin") {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-[#0673f9] text-white">
          Admin
        </span>
      );
    }
    if (user.role === "member") {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Member
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {/* Top Floating Dock Header Container */}
      <header
        id="app-header"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4"
      >
        {/* The Black Dock Notch Container */}
        <div className="pointer-events-auto relative flex items-center justify-between gap-4 md:gap-8 bg-black text-white px-4 md:px-6 py-2.5 rounded-b-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] border-b border-x border-white/10 max-w-6xl w-full sm:w-auto">
          {/* Left Inverted Concave Corner Ear */}
          <svg
            className="absolute top-0 -left-5 w-5 h-5 text-black fill-current pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M 0 0 H 20 V 20 C 20 8.954 11.046 0 0 0 Z" />
          </svg>

          {/* Right Inverted Concave Corner Ear */}
          <svg
            className="absolute top-0 -right-5 w-5 h-5 text-black fill-current pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M 20 0 H 0 V 20 C 0 8.954 8.954 0 20 0 Z" />
          </svg>

          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center shrink-0 transition-opacity duration-200 hover:opacity-90"
          >
            <img
              src="/image.png"
              alt="StartX Logo"
              className="h-4 w-auto object-contain transition-transform duration-200"
            />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 py-1 ${
                    active
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth Button & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!isAuthenticated ? (
              /* Same White Pill Button Style for Sign In */
              <Link
                to="/login"
                className="bg-white text-black font-semibold text-xs md:text-sm px-4 py-2 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-[0_2px_10px_rgba(255,255,255,0.15)] group"
              >
                <User className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                <span>Sign In</span>
              </Link>
            ) : (
              /* Same White Pill Button Style for User Button */
              <div className="relative user-menu-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="bg-white text-black font-semibold text-xs md:text-sm px-3.5 sm:px-4 py-2 rounded-xl hover:bg-neutral-100 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-[0_2px_10px_rgba(255,255,255,0.15)] group"
                >
                  <User className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                  <span className="max-w-[100px] truncate">
                    {user?.firstName ||
                      user?.name?.split(" ")[0] ||
                      user?.email?.split("@")[0] ||
                      "User"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-black/70 transition-transform duration-200 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                    >
                      {/* User Info Header */}
                      <div className="px-3.5 py-3 border-b border-white/10 mb-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-white truncate">
                            {user?.firstName || user?.name || "User"}
                          </p>
                          {getRoleBadge()}
                        </div>
                        <p className="text-xs text-neutral-400 truncate">
                          {user?.email}
                        </p>
                        {getApplicationStatusBadge() && (
                          <div className="mt-2">
                            {getApplicationStatusBadge()}
                          </div>
                        )}
                      </div>

                      {/* Menu Actions */}
                      <div className="space-y-0.5">
                        {user?.role === "admin" && (
                          <Link
                            to="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/20 transition-all flex items-center gap-2.5 group"
                          >
                            <Shield className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        {user?.role === "user" && (
                          <Link
                            to="/apply-membership"
                            onClick={() => setShowUserMenu(false)}
                            className="w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/20 transition-all flex items-center gap-2.5 group"
                          >
                            <Sparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                            <span>
                              {user.applicationStatus === "none" ||
                              user.applicationStatus === "draft"
                                ? "Apply for Membership"
                                : "View Application"}
                            </span>
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all flex items-center gap-2.5 group"
                        >
                          <LogOut className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Overlay Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
              mass: 0.9,
            }}
            className="fixed inset-0 z-[100] md:hidden bg-black text-white flex flex-col justify-between overflow-y-auto pointer-events-auto"
          >
            {/* Top Bar inside Mobile Overlay */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black sticky top-0 z-10">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-2"
              >
                <img
                  src="/image.png"
                  alt="StartX Logo"
                  className="h-6 w-auto"
                />
              </Link>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="px-6 py-8 flex-1 flex flex-col justify-between space-y-8">
              {/* User Profile Card if logged in */}
              {isAuthenticated && user && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 26,
                    delay: 0.05,
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#0673f9] text-white font-bold flex items-center justify-center shadow-md">
                        {(user?.firstName || user?.name || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {user?.firstName || user?.name || "User"}
                        </p>
                        <p className="text-xs text-neutral-400 truncate max-w-[180px]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    {getRoleBadge()}
                  </div>

                  {getApplicationStatusBadge() && (
                    <div className="pt-1">{getApplicationStatusBadge()}</div>
                  )}

                  <div className="pt-2 flex flex-col gap-2 border-t border-white/10">
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Shield className="w-4 h-4" /> Admin Dashboard
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {user?.role === "user" && (
                      <Link
                        to="/apply-membership"
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {user.applicationStatus === "none" ||
                          user.applicationStatus === "draft"
                            ? "Apply for Membership"
                            : "View Application"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 my-auto">
                <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase px-2 mb-2">
                  Navigation
                </p>
                {navLinks.map((link, index) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -30, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 26,
                        delay: 0.1 + index * 0.05,
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-lg font-semibold transition-all ${
                          active
                            ? "bg-[#0673f9] text-white shadow-lg shadow-blue-500/25"
                            : "text-neutral-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          className={`w-5 h-5 transition-transform ${
                            active
                              ? "text-white translate-x-1"
                              : "text-neutral-600"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Actions & Footer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                  delay: 0.35,
                }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold text-center text-base hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In to StartX</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-red-500/10 text-red-400 font-semibold text-sm border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                )}

                <div className="flex items-center justify-between px-2 text-neutral-400 pt-2">
                  <p className="text-xs">
                    &copy; {new Date().getFullYear()} StartX Ecosystem
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/startx.nst?igsh=MWlxNWZieHQ1d3ltcg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/startx-nst/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
