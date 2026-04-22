"use client";
import React, { useState } from "react";
import { 
  Bell, Search, Play, Home, Moon, HeartPulse, Dumbbell, User, 
  Grid, Brain, Activity, CircleDot, Coffee, Sparkles
} from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"Home" | "Sleep" | "Meditate" | "Exercise" | "Profile">("Home");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", icon: <Grid className="w-5 h-5" /> },
    { id: "Anxious", icon: <HeartPulse className="w-5 h-5" /> },
    { id: "Balance", icon: <CircleDot className="w-5 h-5" /> },
    { id: "Mindful", icon: <Brain className="w-5 h-5" /> },
    { id: "Focus", icon: <Activity className="w-5 h-5" /> }
  ];

  const renderHome = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A2E] mb-1">Morning, Vishal!</h1>
          <p className="text-[#8E8E9F] text-sm font-medium">Your daily wellness journey</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-[#F87171] bg-white shadow-sm hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Your Daily Path */}
      <h3 className="font-bold text-[#1A1A2E] text-xl mb-4">Your Daily Path</h3>
      
      <div className="relative pl-4 border-l-2 border-[#E5E5EA] space-y-6 mb-8 ml-4">
        
        {/* Step 1: Meditation Course */}
        <div className="relative">
          <div className="absolute -left-[21px] top-4 w-4 h-4 bg-[#FAFAFC] border-4 border-[#FF8C8C] rounded-full z-10"></div>
          <div className="bg-[#FFEBEB] rounded-[2rem] p-5 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#FF8C8C] shadow-sm flex-shrink-0">
                <Brain className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <div className="text-[#FF8C8C] text-xs font-bold uppercase tracking-wider mb-1">Morning</div>
               <h4 className="font-bold text-[#1A1A2E] text-lg leading-tight">Focus Meditation</h4>
               <p className="text-[#8E8E9F] text-xs">Course • 15 mins</p>
             </div>
             <div className="w-10 h-10 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
               <Play className="w-4 h-4 fill-current ml-0.5" />
             </div>
          </div>
        </div>

        {/* Step 2: Exercise Recorder */}
        <div className="relative">
          <div className="absolute -left-[21px] top-4 w-4 h-4 bg-[#FAFAFC] border-4 border-[#5E8F8B] rounded-full z-10"></div>
          <div className="bg-[#E8F3F1] rounded-[2rem] p-5 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#5E8F8B] shadow-sm flex-shrink-0">
                <Dumbbell className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <div className="text-[#5E8F8B] text-xs font-bold uppercase tracking-wider mb-1">Afternoon</div>
               <h4 className="font-bold text-[#1A1A2E] text-lg leading-tight">Activity Recorder</h4>
               <p className="text-[#8E8E9F] text-xs">Track your exercise</p>
             </div>
             <div className="w-10 h-10 bg-[#5E8F8B] text-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
               <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
             </div>
          </div>
        </div>

        {/* Step 3: Sleep Recorder */}
        <div className="relative">
          <div className="absolute -left-[21px] top-4 w-4 h-4 bg-[#FAFAFC] border-4 border-[#1A1A2E] rounded-full z-10"></div>
          <div className="bg-[#1A1A2E] rounded-[2rem] p-5 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-shadow text-white">
             <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-[#FFF3B0] shadow-sm flex-shrink-0">
                <Moon className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Evening</div>
               <h4 className="font-bold text-white text-lg leading-tight">Sleep Recorder</h4>
               <p className="text-white/70 text-xs">Monitor sleep cycles</p>
             </div>
             <div className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
               <div className="w-2.5 h-2.5 bg-[#F87171] rounded-full animate-pulse" />
             </div>
          </div>
        </div>

      </div>

      {/* Recommended Courses */}
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-[#1A1A2E] text-xl">Explore Courses</h3>
        <button className="text-[#8E8E9F] text-sm font-bold">See All</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#FF8C8C] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-20 h-20 relative flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
            <div className="w-10 h-10 bg-[#1A1A2E] rounded-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Basics</h4>
            <p className="text-white/80 text-xs font-semibold mb-3 tracking-widest uppercase">MEDITATION</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">17 sessions</span>
              <div className="w-8 h-8 bg-white text-[#FF8C8C] rounded-full flex items-center justify-center shadow-sm">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF3B0] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-20 h-20 relative flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-white/50 rounded-full blur-md"></div>
            <div className="w-10 h-10 bg-[#FF8C8C] rounded-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Happiness</h4>
            <p className="text-[#1A1A2E]/60 text-xs font-semibold mb-3 tracking-widest uppercase">COURSE</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">21 sessions</span>
              <div className="w-8 h-8 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMeditate = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#1A1A2E]">Meditate</h1>
        <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors">
          <Search className="w-6 h-6" />
        </button>
      </div>
      
      <p className="text-[#8E8E9F] text-sm leading-relaxed mb-8 pr-4">
        Feel happier and strengthe your heart by focusing on meditation
      </p>

      {/* Categories */}
      <div className="flex justify-between items-center mb-8 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex flex-col items-center gap-2 min-w-[4rem]"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              activeCategory === cat.id 
              ? 'bg-[#FF8C8C] text-white shadow-md' 
              : 'bg-[#F0F0F5] text-[#8E8E9F] hover:bg-[#E5E5EA]'
            }`}>
              {cat.icon}
            </div>
            <span className={`text-xs font-semibold ${
              activeCategory === cat.id ? 'text-[#FF8C8C]' : 'text-[#A0A0B0]'
            }`}>
              {cat.id}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Finding Calm (Full Width) */}
        <div className="col-span-2 bg-[#1A1A2E] rounded-[2rem] p-6 text-white flex items-center justify-between relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-50">
            <div className="w-8 h-8 bg-[#FFF3B0] rounded-full absolute top-4 right-12"></div>
            <div className="w-4 h-4 bg-[#FF8C8C] rounded-full absolute bottom-4 left-12"></div>
            <div className="w-12 h-12 bg-white/10 rounded-full absolute left-4"></div>
          </div>
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-1">Finding Calm</h4>
            <p className="text-white/70 text-sm font-medium">17 sessions</p>
          </div>
          <div className="w-10 h-10 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center relative z-10">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Spiritual Growth */}
        <div className="bg-[#FFF3B0] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-[#FF8C8C] rounded-t-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1">Spiritual<br/>Growth</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70">8 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-[#5E8F8B] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2">
             <div className="w-8 h-8 bg-[#FFF3B0] rounded-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1">Motivation</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80">11 sessions</span>
              <div className="w-7 h-7 bg-white text-[#5E8F8B] rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Breathe */}
        <div className="bg-[#FFEBEB] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2">
             <div className="w-8 h-8 bg-[#1A1A2E] rounded-t-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1">Breathe</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70">9 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Meaningfull Life */}
        <div className="bg-[#FF8C8C] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2">
             <div className="w-8 h-8 bg-white/20 rounded-full relative z-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 leading-tight">Meaningfull<br/>Life</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80">14 sessions</span>
              <div className="w-7 h-7 bg-white text-[#FF8C8C] rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] relative font-sans ${outfit.className}`}>
      


      {/* Main Content Area */}
      <main className="px-6 pt-4">
        {activeTab === "Home" && renderHome()}
        {activeTab === "Meditate" && renderMeditate()}
        {/* Render placeholders for other tabs if selected */}
        {["Sleep", "Exercise", "Profile"].includes(activeTab) && (
          <div className="flex items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold text-slate-300">{activeTab} coming soon</h2>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-[2rem] px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex justify-between items-center pb-8">
        {[
          { id: "Home", icon: <Home className="w-6 h-6" /> },
          { id: "Sleep", icon: <Moon className="w-6 h-6" /> },
          { id: "Meditate", icon: <HeartPulse className="w-6 h-6" /> },
          { id: "Exercise", icon: <Dumbbell className="w-6 h-6" /> },
          { id: "Profile", icon: <User className="w-6 h-6" /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all ${
              activeTab === tab.id ? 'text-[#FF8C8C] scale-110' : 'text-[#D0D0E0] hover:text-[#FF8C8C]/50'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-bold">{tab.id}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
