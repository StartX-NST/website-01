import { useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Users,
  Trophy,
  Heart,
  Calendar,
  LogOut,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AddShowcaseForm from "@/components/admin/AddShowcaseForm";
import AddOpportunityForm from "@/components/admin/AddOpportunityForm";
import AddEventForm from "@/components/admin/AddEventForm";
import ApplicationsManager from "@/components/admin/ApplicationsManager";
import OpportunityInterestsManager from "@/components/admin/OpportunityInterestsManager";
import EventInterestsManager from "@/components/admin/EventInterestsManager";

type ActiveTab =
  | "showcase"
  | "opportunities"
  | "events"
  | "applications"
  | "interests"
  | "eventInterests";

const NAV = [
  {
    group: "Manage",
    items: [
      { id: "showcase" as ActiveTab, label: "Showcase", icon: LayoutGrid },
      {
        id: "opportunities" as ActiveTab,
        label: "Opportunities",
        icon: Trophy,
      },
      { id: "events" as ActiveTab, label: "Events", icon: Calendar },
    ],
  },
  {
    group: "People",
    items: [
      { id: "applications" as ActiveTab, label: "Applications", icon: Users },
      { id: "interests" as ActiveTab, label: "Opp. Interests", icon: Heart },
      { id: "eventInterests" as ActiveTab, label: "Event RSVPs", icon: Bell },
    ],
  },
];

const TITLES: Record<ActiveTab, { h: string; sub: string }> = {
  showcase: { h: "Showcase", sub: "Add and manage startup showcase projects" },
  opportunities: {
    h: "Opportunities",
    sub: "Post internships, hackathons and challenges",
  },
  events: { h: "Events", sub: "Schedule and manage StartX events" },
  applications: {
    h: "Applications",
    sub: "Review and action membership requests",
  },
  interests: {
    h: "Opportunity Interests",
    sub: "See who expressed interest in each opportunity",
  },
  eventInterests: {
    h: "Event RSVPs",
    sub: "Track attendance list for all events",
  },
};

const SIDEBAR_BG = "#0a0c12";
const MUTED_TEXT = "rgba(255,255,255,0.45)";
const NAV_TEXT = "rgba(255,255,255,0.75)";
const BLUE = "#3b82f6";
const PAGE_BG = "#07080d";
const HEADER_BG = "#0f111a";
const CARD_BG = "#0f111a";
const HEADING = "#f3f4f6";
const BODY_TEXT = "#9ca3af";
const BORDER_COLOR = "#1c2030";

export default function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState<ActiveTab>("showcase");
  const [editData, setEditData] = useState<any>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (location.state?.editOpportunity) {
      setTab("opportunities");
      setEditData(location.state.editOpportunity);
    } else if (location.state?.editShowcase) {
      setTab("showcase");
      setEditData(location.state.editShowcase);
    } else if (location.state?.editEvent) {
      setTab("events");
      setEditData(location.state.editEvent);
    }
  }, [location.state]);

  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  const switchTab = (t: ActiveTab) => {
    if (t !== tab) {
      setTab(t);
      setKey((k) => k + 1);
    }
  };

  const info = TITLES[tab];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: PAGE_BG,
        fontFamily: "'Raleway', system-ui, sans-serif",
        color: HEADING,
      }}
    >
      {/* ─── SIDEBAR ─── */}
      <aside
        style={{
          width: 230,
          minWidth: 230,
          background: SIDEBAR_BG,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          inset: "0 auto 0 0",
          zIndex: 40,
          borderRight: `1px solid ${BORDER_COLOR}`,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "24px 20px",
            textDecoration: "none",
            borderBottom: `1px solid ${BORDER_COLOR}`,
          }}
        >
          <img
            src="/logo.png"
            alt="StartX"
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
              }}
            >
              StartX
            </span>
            <span
              style={{
                color: BLUE,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Admin Suite
            </span>
          </div>
        </Link>

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {NAV.map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: MUTED_TEXT,
                  padding: "0 10px",
                  marginBottom: 8,
                  margin: "0 0 8px",
                }}
              >
                {group}
              </p>
              {items.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    onClick={() => switchTab(id)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      background: "transparent",
                      color: active ? "#ffffff" : NAV_TEXT,
                      marginBottom: 3,
                      transition: "color 0.15s ease",
                      textAlign: "left",
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebarActivePill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                          mass: 0.8,
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 10,
                          background: "rgba(59, 130, 246, 0.15)",
                          border: "1px solid rgba(59, 130, 246, 0.35)",
                          zIndex: 0,
                        }}
                      />
                    )}
                    <Icon
                      style={{
                        width: 16,
                        height: 16,
                        flexShrink: 0,
                        color: active ? BLUE : MUTED_TEXT,
                        position: "relative",
                        zIndex: 1,
                        transition: "color 0.15s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: active ? 500 : 400,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "16px 12px 20px",
            borderTop: `1px solid ${BORDER_COLOR}`,
          }}
        >
          {/* User row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${BORDER_COLOR}`,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${BLUE}, #1d4ed8)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {user.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#f3f4f6",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: BLUE,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Administrator
              </p>
            </div>
          </div>

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              textDecoration: "none",
              color: MUTED_TEXT,
              transition: "all 0.14s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED_TEXT)}
          >
            <LogOut style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 13, fontWeight: 400 }}>Back to site</span>
          </Link>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div
        style={{
          flex: 1,
          marginLeft: 230,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: HEADER_BG,
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 20,
            borderBottom: `1px solid ${BORDER_COLOR}`,
            backdropFilter: "blur(8px)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: HEADING,
                margin: 0,
                letterSpacing: "-0.2px",
              }}
            >
              {info.h}
            </h1>
            <p
              style={{
                fontSize: 12,
                color: BODY_TEXT,
                margin: "2px 0 0",
                fontWeight: 400,
              }}
            >
              {info.sub}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 20,
                background: "rgba(59, 130, 246, 0.12)",
                color: BLUE,
                border: "1px solid rgba(59, 130, 246, 0.25)",
                fontWeight: 500,
              }}
            >
              Active Section
            </span>
          </div>
        </header>

        {/* Body */}
        <main style={{ flex: 1, padding: "32px" }}>
          {/* Content card */}
          <div
            style={{
              background: CARD_BG,
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${BORDER_COLOR}`,
            }}
          >
            {/* Card title row */}
            <div
              style={{
                padding: "18px 28px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderBottom: `1px solid ${BORDER_COLOR}`,
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: BLUE,
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: HEADING,
                  margin: 0,
                  letterSpacing: "-0.1px",
                }}
              >
                {info.h}
              </h2>
            </div>

            {/* Panel content */}
            <div style={{ padding: "28px" }}>
              <div
                key={key}
                style={{ animation: "fadeUp 0.2s ease-out both" }}
              >
                {tab === "showcase" && <AddShowcaseForm editData={editData} />}
                {tab === "opportunities" && (
                  <AddOpportunityForm editData={editData} />
                )}
                {tab === "events" && <AddEventForm editData={editData} />}
                {tab === "applications" && <ApplicationsManager />}
                {tab === "interests" && <OpportunityInterestsManager />}
                {tab === "eventInterests" && <EventInterestsManager />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
				@keyframes fadeUp {
					from { opacity: 0; transform: translateY(6px); }
					to   { opacity: 1; transform: translateY(0); }
				}
			`}</style>
    </div>
  );
}
