"use client";

import React, { useState, useEffect } from "react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import {
  Home,
  Stethoscope,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
  Heart,
  TrendingUp,
  Calendar,
  ArrowRight,
  Search,
  Star,
  Clock,
  Shield,
  ChevronRight,
  Send,
  LogOut,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";
import api from "../../lib/axios";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

type TabType = "home" | "doctors" | "chat";

/* ─────────────── HOME TAB ─────────────── */
function HomeTab({ firstName }: { firstName: string }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const icon = hour < 17 ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;

  const quickActions = [
    { label: "Mood Check", icon: <Heart className="w-5 h-5" />, color: "#FF8C8C" },
    { label: "Sleep Log", icon: <Moon className="w-5 h-5" />, color: "#5E8F8B" },
    { label: "Meditate", icon: <Sparkles className="w-5 h-5" />, color: "#B88BD6" },
    { label: "Journal", icon: <TrendingUp className="w-5 h-5" />, color: "#F5A623" },
  ];

  const tips = [
    "Take 5 deep breaths to ground yourself.",
    "Drink a glass of water — hydration affects mood!",
    "Step outside for 10 minutes of sunlight.",
    "Write down 3 things you're grateful for.",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Greeting */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4A] rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF8C8C]/10 rounded-full blur-3xl -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1">
            {icon}
            <span>{greeting}</span>
          </div>
          <h1 className="text-2xl font-bold">{firstName} 👋</h1>
          <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-[260px]">
            Your wellness journey continues. Let's make today count.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-3 pl-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${action.color}15`, color: action.color }}
              >
                {action.icon}
              </div>
              <span className="text-[11px] font-semibold text-[#1A1A2E]">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Tip */}
      <div className="bg-[#5E8F8B]/8 border border-[#5E8F8B]/15 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-[#5E8F8B]/15 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#5E8F8B]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#5E8F8B] uppercase tracking-wider mb-1">
              Daily Wellness Tip
            </h3>
            <p className="text-sm text-[#1A1A2E] leading-relaxed font-medium">
              {randomTip}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-[#8E8E9F] uppercase tracking-wider">
            Upcoming
          </h2>
          <button className="text-xs font-bold text-[#FF8C8C] flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FF8C8C]/10 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#FF8C8C]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1A1A2E]">No upcoming sessions</p>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              Book a session with a specialist
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#D0D0E0]" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────── DOCTORS TAB ─────────────── */
function DoctorsTab() {
  const router = useRouter();

  const specializations = [
    { label: "Physician", icon: <Stethoscope className="w-5 h-5" />, color: "#5E8F8B", count: "Available" },
    { label: "Psychiatrist", icon: <Heart className="w-5 h-5" />, color: "#FF8C8C", count: "Available" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Find Doctors</h1>
        <p className="text-sm text-[#8E8E9F] mt-1">Connect with verified specialists</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D0D0E0]" />
        <input
          type="text"
          placeholder="Search by name or specialty..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#1A1A2E] placeholder-[#8E8E9F] focus:outline-none focus:border-[#FF8C8C] focus:bg-white transition-all"
          onClick={() => router.push("/doctors")}
          readOnly
        />
      </div>

      {/* Specializations */}
      <div>
        <h2 className="text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-3 pl-1">
          Specializations
        </h2>
        <div className="space-y-3">
          {specializations.map((spec) => (
            <button
              key={spec.label}
              onClick={() => router.push("/doctors")}
              className="w-full flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-left"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${spec.color}15`, color: spec.color }}
              >
                {spec.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1A1A2E]">{spec.label}</p>
                <p className="text-xs text-[#8E8E9F] mt-0.5">{spec.count}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D0D0E0]" />
            </button>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-br from-[#5E8F8B]/10 to-[#5E8F8B]/5 border border-[#5E8F8B]/15 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-[#5E8F8B]/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-[#5E8F8B]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A1A2E]">Verified Professionals</h3>
            <p className="text-xs text-[#8E8E9F] mt-1 leading-relaxed">
              All doctors are verified and licensed. Your conversations are private and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Browse All */}
      <button
        onClick={() => router.push("/doctors")}
        className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm hover:bg-[#2A2A4A] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
      >
        Browse All Doctors
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ─────────────── CHAT TAB ─────────────── */
function ChatTab({ conversations, loading }: { conversations: any[]; loading: boolean }) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-[#FF8C8C] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-[#8E8E9F] font-medium">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Messages</h1>
        <p className="text-sm text-[#8E8E9F] mt-1">Your conversations with specialists</p>
      </div>

      {conversations.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-[#FF8C8C]/10 rounded-full flex items-center justify-center mb-5">
            <MessageCircle className="w-9 h-9 text-[#FF8C8C]" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">No conversations yet</h3>
          <p className="text-sm text-[#8E8E9F] max-w-[240px] leading-relaxed">
            Start a conversation with a doctor to begin your wellness journey.
          </p>
          <button
            onClick={() => router.push("/doctors")}
            className="mt-6 bg-[#1A1A2E] text-white rounded-2xl font-bold py-3 px-8 text-sm hover:bg-[#2A2A4A] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
          >
            Find a Doctor
            <Send className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Conversation List */
        <div className="space-y-3">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => router.push(`/messages/${chat.id}`)}
              className="w-full bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-left group"
            >
              <div className={`w-14 h-14 ${chat.color} ${chat.textColor} rounded-2xl flex items-center justify-center relative flex-shrink-0`}>
                <UserIcon className="w-7 h-7" />
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-[#1A1A2E] truncate">{chat.name}</h3>
                    {chat.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                  <span className="text-[10px] font-bold text-[#8E8E9F]">{chat.time}</span>
                </div>
                <p className="text-[11px] text-[#8E8E9F] font-bold uppercase tracking-wider mb-1">{chat.specialty}</p>
                <p className="text-sm text-[#8E8E9F] truncate group-hover:text-[#1A1A2E] transition-colors leading-tight">
                  {chat.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {chat.unread > 0 && (
                  <div className="bg-[#FF8C8C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {chat.unread}
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-[#D0D0E0] group-hover:text-[#1A1A2E] transition-colors" />
              </div>
            </button>
          ))}
          
          <button
            onClick={() => router.push("/messages")}
            className="w-full bg-white/50 border border-dashed border-slate-200 text-[#8E8E9F] rounded-2xl font-bold py-4 text-xs hover:bg-white hover:border-slate-300 transition-all duration-200 mt-4"
          >
            Manage All Conversations
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────── MAIN DASHBOARD V2 ─────────────── */
export default function DashboardV2() {
  const { user, loading, logOutUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [conversations, setConversations] = useState<any[]>([]);
  const [convLoading, setConvLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  async function fetchConversations() {
    try {
      const response = await api.get("/conversations");
      if (response.data && response.data.conversations) {
        const formatted = response.data.conversations.map((chat: any, index: number) => {
          const userProfile = chat.otherUser?.profile || {};
          const isDoctor = chat.otherUser?.role === "DOCTOR";
          const fullName = `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim() || "User";
          const name = isDoctor ? `Dr. ${fullName}` : fullName;
          
          return {
            id: chat.id,
            name,
            specialty: chat.otherUser?.doctorProfile?.specialization || "Member",
            lastMessage: chat.lastMessage?.content || "No messages yet.",
            time: chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "New",
            unread: chat.unreadCount || 0,
            online: chat.otherUser?.isOnline || false,
            verified: chat.otherUser?.doctorProfile?.isVerified || false,
            color: index % 2 === 0 ? "bg-[#FFEBEB]" : "bg-[#E8F3F1]",
            textColor: index % 2 === 0 ? "text-[#FF8C8C]" : "text-[#5E8F8B]",
          };
        });
        setConversations(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setConvLoading(false);
    }
  }

  if (loading || !user) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-[#FAFAFC] ${outfit.className}`}>
        <div className="w-12 h-12 border-4 border-[#FF8C8C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    { key: "doctors", label: "Doctors", icon: <Stethoscope className="w-5 h-5" /> },
    { key: "chat", label: "Chat", icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab firstName={user?.firstName || "User"} />;
      case "doctors":
        return <DoctorsTab />;
      case "chat":
        return <ChatTab conversations={conversations} loading={convLoading} />;
      default:
        return <HomeTab firstName={user?.firstName || "User"} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] relative ${outfit.className}`}>
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#FAFAFC]/80 backdrop-blur-xl border-b border-slate-100/80">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#FF8C8C] rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">SupportSutra</span>
          </div>
          <button
            onClick={logOutUser}
            className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#8E8E9F] hover:text-[#FF8C8C] hover:border-[#FF8C8C]/30 transition-all"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 pt-5 pb-28">
        <div className="max-w-lg mx-auto">{renderContent()}</div>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-100/80">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center gap-1 py-2 px-5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "text-[#FF8C8C]"
                    : "text-[#B0B0C0] hover:text-[#1A1A2E]"
                }`}
              >
                <div
                  className={`transition-all duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {tab.icon}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? "text-[#FF8C8C]" : "text-[#B0B0C0]"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-[#FF8C8C] rounded-full mt-0.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        {/* Safe area for notched phones */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      {/* Fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
