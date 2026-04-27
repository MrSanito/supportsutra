"use client";
import React from "react";
import { Settings, User, Flame, Trophy, Shield, HelpCircle, LogOut, ChevronRight, Bell } from "lucide-react";

interface SectionProfileProps {
  user: any;
  logOutUser: () => void;
}

export default function SectionProfile({ user, logOutUser }: SectionProfileProps) {
  const profileOptions = [
    { id: "account", label: "Account Settings", icon: <User className="w-5 h-5" />, color: "text-[#818CF8]", bg: "bg-indigo-50" },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" />, color: "text-[#FFB166]", bg: "bg-orange-50" },
    { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-5 h-5" />, color: "text-[#5E8F8B]", bg: "bg-[#E8F3F1]" },
    { id: "help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" />, color: "text-[#FF8C8C]", bg: "bg-[#FFEBEB]" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24 lg:mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]">Profile</h1>
        <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors lg:w-12 lg:h-12 lg:bg-white lg:rounded-full lg:shadow-sm lg:flex lg:items-center lg:justify-center">
          <Settings className="w-6 h-6 lg:w-5 lg:h-5" />
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Left Column: User Info & Stats */}
        <div className="lg:col-span-5 mb-8 lg:mb-0">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-[#FFEBEB] rounded-full flex items-center justify-center text-[#FF8C8C] mb-4 relative">
              <User className="w-10 h-10" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm text-[#1A1A2E] hover:bg-slate-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">{user?.firstName} {user?.lastName}</h2>
            <p className="text-[#8E8E9F] text-sm font-medium mb-6">{user?.email || 'email@example.com'}</p>
            
            <div className="w-full flex justify-around border-t border-slate-100 pt-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#FFF3B0] rounded-full flex items-center justify-center text-[#1A1A2E] mb-2">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#1A1A2E] text-lg">12</span>
                <span className="text-xs text-[#8E8E9F] font-semibold uppercase tracking-wider">Day Streak</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#E8F3F1] rounded-full flex items-center justify-center text-[#5E8F8B] mb-2">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#1A1A2E] text-lg">47</span>
                <span className="text-xs text-[#8E8E9F] font-semibold uppercase tracking-wider">Sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Options */}
        <div className="lg:col-span-7 space-y-3">
          {profileOptions.map((item) => (
            <button key={item.id} className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-full flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="font-bold text-[#1A1A2E]">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D0D0E0] group-hover:text-[#1A1A2E] transition-colors" />
            </button>
          ))}

          <button onClick={logOutUser} className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow group mt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-bold text-red-500">Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
