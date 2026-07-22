import { useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
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

const SIDEBAR_BG = "#141414";
const ACTIVE_BG = "#ffffff";
const MUTED_TEXT = "rgba(255,255,255,0.42)";
const NAV_TEXT = "rgba(255,255,255,0.70)";
const BLUE = "#0673f9";
const PAGE_BG = "#f5f6f8";
const CARD_BG = "#ffffff";
const HEADING = "#111111";
const BODY_TEXT = "#6b7280";

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
      }}
    >
      {/* ─── SIDEBAR ─── */}
      <aside
        style={{
          width: 220,
          minWidth: 220,
          background: SIDEBAR_BG,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          inset: "0 auto 0 0",
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "26px 20px 22px",
            textDecoration: "none",
          }}
        >
          <img
            src="/logo.png"
            alt="StartX"
            style={{ width: 26, height: 26, objectFit: "contain" }}
          />
          <span
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: "-0.2px",
            }}
          >
            StartX
          </span>
        </Link>

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: "0 10px", overflow: "auto" }}>
          {NAV.map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: MUTED_TEXT,
                  padding: "0 10px",
                  marginBottom: 4,
                  margin: "0 0 4px",
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
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      background: active ? ACTIVE_BG : "transparent",
                      color: active ? HEADING : NAV_TEXT,
                      marginBottom: 1,
                      transition: "background 0.14s, color 0.14s",
                      textAlign: "left",
                    }}
                  >
                    <Icon
                      style={{
                        width: 15,
                        height: 15,
                        flexShrink: 0,
                        color: active ? BLUE : "inherit",
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 400 }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 10px 18px" }}>
          {/* User row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              marginBottom: 2,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 400,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {user.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: "#fff",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 130,
                }}
              >
                {user.email}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: BLUE,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Admin
              </p>
            </div>
          </div>

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 12px",
              borderRadius: 8,
              textDecoration: "none",
              color: MUTED_TEXT,
              transition: "color 0.14s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED_TEXT)}
          >
            <LogOut style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 12, fontWeight: 400 }}>Back to site</span>
          </Link>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div
        style={{
          flex: 1,
          marginLeft: 220,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: CARD_BG,
            padding: "0 28px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 20,
            boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: HEADING,
                margin: 0,
              }}
            >
              {info.h}
            </h1>
            <p
              style={{
                fontSize: 11,
                color: BODY_TEXT,
                margin: "1px 0 0",
                fontWeight: 400,
              }}
            >
              {info.sub}
            </p>
          </div>
        </header>

        {/* Body */}
        <main style={{ flex: 1, padding: "24px 28px" }}>
          {/* Content card */}
          <div
            style={{
              background: CARD_BG,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            }}
          >
            {/* Card title row */}
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 9,
                borderBottom: "1px solid #f2f2f2",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: BLUE,
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: HEADING,
                  margin: 0,
                }}
              >
                {info.h}
              </h2>
            </div>

            {/* Panel content */}
            <div style={{ padding: "24px" }}>
              <div
                key={key}
                style={{ animation: "fadeUp 0.18s ease-out both" }}
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
					from { opacity: 0; transform: translateY(5px); }
					to   { opacity: 1; transform: translateY(0); }
				}
			`}</style>
    </div>
  );
}
