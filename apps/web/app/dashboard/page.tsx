"use client";
import React, { useState, useEffect } from "react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

// Dashboard Components
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import SectionHome from "../../components/dashboard/SectionHome";
import SectionSleep from "../../components/dashboard/SectionSleep";
import SectionMeditate from "../../components/dashboard/SectionMeditate";
import SectionExercise from "../../components/dashboard/SectionExercise";
import SectionProfile from "../../components/dashboard/SectionProfile";
import FloatingDoctorButton from "../../components/dashboard/FloatingDoctorButton";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

type TabType = "Home" | "Sleep" | "Meditate" | "Exercise" | "Profile";

export default function Dashboard() {
  const { user, loading, logOutUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>("Home");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <div className="w-12 h-12 border-4 border-[#FF8C8C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <SectionHome firstName={user?.firstName || 'User'} />;
      case "Sleep":
        return <SectionSleep />;
      case "Meditate":
        return <SectionMeditate />;
      case "Exercise":
        return <SectionExercise />;
      case "Profile":
        return <SectionProfile user={user} logOutUser={logOutUser} />;
      default:
        return <SectionHome firstName={user?.firstName || 'User'} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] relative font-sans ${outfit.className} lg:flex`}>
      
      {/* Sidebar / Navigation */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="px-6 pt-4 pb-32 lg:pb-12 lg:flex-1 lg:p-12 lg:h-screen lg:overflow-y-auto bg-[#FAFAFC]">
        <div className="lg:max-w-5xl lg:mx-auto w-full relative">
          {renderContent()}
        </div>
      </main>

      {/* Global Actions */}
      <FloatingDoctorButton />

    </div>
  );
}
