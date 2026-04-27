"use client";
import React from "react";
import { 
  Sparkles, Home, Moon, HeartPulse, Dumbbell, User 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function DashboardSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "Home", icon: <Home className="w-6 h-6 lg:w-5 lg:h-5" /> },
    { id: "Sleep", icon: <Moon className="w-6 h-6 lg:w-5 lg:h-5" /> },
    { id: "Meditate", icon: <HeartPulse className="w-6 h-6 lg:w-5 lg:h-5" /> },
    { id: "Exercise", icon: <Dumbbell className="w-6 h-6 lg:w-5 lg:h-5" /> },
    { id: "Profile", icon: <User className="w-6 h-6 lg:w-5 lg:h-5" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-[2rem] px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex justify-between items-center pb-8 z-50 lg:static lg:flex lg:flex-col lg:justify-start lg:w-72 lg:h-screen lg:rounded-none lg:shadow-none lg:border-r lg:border-slate-200 lg:p-8 lg:gap-8 lg:bg-white">
      {/* Desktop Logo */}
      <div className="hidden lg:flex w-full items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#FF8C8C] rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A2E] tracking-tight">SupportSutra</h2>
      </div>

      <div className="flex w-full justify-between lg:flex-col lg:gap-3 lg:w-full">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all lg:flex-row lg:w-full lg:px-4 lg:py-3.5 lg:rounded-2xl ${
              activeTab === tab.id ? 'text-[#FF8C8C] scale-110 lg:scale-100 lg:bg-[#FFEBEB] lg:text-[#1A1A2E]' : 'text-[#D0D0E0] hover:text-[#FF8C8C]/50 lg:hover:bg-slate-50 lg:hover:text-[#1A1A2E]'
            }`}
          >
            <div className={activeTab === tab.id ? 'lg:text-[#FF8C8C]' : ''}>{tab.icon}</div>
            <span className="text-[10px] font-bold lg:text-sm">{tab.id}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
