import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axiosInstance from "@/lib/axios";

export type UserRole = "guest" | "user" | "member" | "admin";

export type ApplicationStatus =
  | "none"
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  applicationStatus?: ApplicationStatus;
  avatar?: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateApplicationStatus: (status: ApplicationStatus) => void;
  setAuthUser: (user: User) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for authenticated user on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  };

  const signup = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });

    if (response.data.success && response.data.user) {
      // Set the unverified user in context so EmailVerificationRequired can access it
      const unverifiedUser = response.data.user;
      setUser(unverifiedUser);
      localStorage.setItem("user", JSON.stringify(unverifiedUser));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const response = await axiosInstance.get("/auth/google");
      if (response.data.url) {
        // Redirect to Google OAuth URL
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const updateApplicationStatus = (status: ApplicationStatus) => {
    if (user) {
      const updatedUser = { ...user, applicationStatus: status };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const setAuthUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateApplicationStatus,
        setAuthUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
