"use client";
import React, { useState, useEffect } from "react";
import { 
  Bell, Search, Play, Home, Moon, HeartPulse, Dumbbell, User, 
  Grid, Brain, Activity, CircleDot, Sparkles, Settings, Shield, HelpCircle, LogOut, Flame, Trophy, ChevronRight, Stethoscope
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function Dashboard() {
  const { user, loading, logOutUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<"Home" | "Sleep" | "Meditate" | "Exercise" | "Profile">("Home");
  const [activeCategory, setActiveCategory] = useState("All");
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

  const categories = [
    { id: "All", icon: <Grid className="w-5 h-5" /> },
    { id: "Anxious", icon: <HeartPulse className="w-5 h-5" /> },
    { id: "Balance", icon: <CircleDot className="w-5 h-5" /> },
    { id: "Mindful", icon: <Brain className="w-5 h-5" /> },
    { id: "Focus", icon: <Activity className="w-5 h-5" /> }
  ];

  const renderHome = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 lg:mb-12">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-1 lg:mb-2">Morning, {user?.name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-[#8E8E9F] text-sm lg:text-base font-medium">Your daily wellness journey</p>
        </div>
        <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-100 flex items-center justify-center text-[#F87171] bg-white shadow-sm hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          {/* Your Daily Path */}
          <h3 className="font-bold text-[#1A1A2E] text-xl lg:text-2xl mb-4 lg:mb-6">Your Daily Path</h3>
          
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
        </div>

        <div className="lg:col-span-7 flex flex-col">
          {/* Recommended Courses */}
          <div className="flex justify-between items-end mb-4 lg:mb-6">
            <h3 className="font-bold text-[#1A1A2E] text-xl lg:text-2xl">Explore Courses</h3>
            <button className="text-[#8E8E9F] text-sm font-bold">See All</button>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-6">
            <div onClick={() => router.push('/course/basics')} className="bg-[#FF8C8C] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
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

            <div onClick={() => router.push('/course/happiness')} className="bg-[#FFF3B0] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
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
      </div>
    </div>
  );

  const renderMeditate = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24 lg:mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]">Meditate</h1>
        <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors lg:w-12 lg:h-12 lg:bg-white lg:rounded-full lg:shadow-sm lg:flex lg:items-center lg:justify-center">
          <Search className="w-6 h-6 lg:w-5 lg:h-5" />
        </button>
      </div>
      
      <p className="text-[#8E8E9F] text-sm lg:text-base leading-relaxed mb-8 pr-4 lg:max-w-xl">
        Feel happier and strengthe your heart by focusing on meditation
      </p>

      {/* Categories */}
      <div className="flex justify-between items-center mb-8 overflow-x-auto scrollbar-hide pb-2 lg:justify-start lg:gap-8 lg:mb-12">
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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {/* Finding Calm (Full Width) */}
        <div className="col-span-2 lg:col-span-2 bg-[#1A1A2E] rounded-[2rem] p-6 text-white flex items-center justify-between relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-50">
            <div className="w-8 h-8 bg-[#FFF3B0] rounded-full absolute top-4 right-12"></div>
            <div className="w-4 h-4 bg-[#FF8C8C] rounded-full absolute bottom-4 left-12"></div>
            <div className="w-12 h-12 bg-white/10 rounded-full absolute left-4"></div>
          </div>
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-1 lg:text-xl">Finding Calm</h4>
            <p className="text-white/70 text-sm font-medium lg:text-base">17 sessions</p>
          </div>
          <div className="w-10 h-10 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center relative z-10 lg:w-12 lg:h-12">
            <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Spiritual Growth */}
        <div className="bg-[#FFF3B0] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
            <div className="w-10 h-10 bg-[#FF8C8C] rounded-t-full relative z-10 lg:w-12 lg:h-12"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Spiritual<br/>Growth</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70 lg:text-base">8 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-[#5E8F8B] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-[#FFF3B0] rounded-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Motivation</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80 lg:text-base">11 sessions</span>
              <div className="w-7 h-7 bg-white text-[#5E8F8B] rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Breathe */}
        <div className="bg-[#FFEBEB] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-[#1A1A2E] rounded-t-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Breathe</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70 lg:text-base">9 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Meaningfull Life */}
        <div className="bg-[#FF8C8C] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-white/20 rounded-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 leading-tight lg:text-lg">Meaningfull<br/>Life</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80 lg:text-base">14 sessions</span>
              <div className="w-7 h-7 bg-white text-[#FF8C8C] rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSleep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24 lg:mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]">Sleep</h1>
        <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors lg:w-12 lg:h-12 lg:bg-white lg:rounded-full lg:shadow-sm lg:flex lg:items-center lg:justify-center">
          <Settings className="w-6 h-6 lg:w-5 lg:h-5" />
        </button>
      </div>
      
      <p className="text-[#8E8E9F] text-sm lg:text-base leading-relaxed mb-8 pr-4 lg:max-w-xl">
        Monitor your sleep cycles and wake up refreshed with guided wind-downs.
      </p>

      {/* Sleep Recorder Card */}
      <div className="bg-[#1A1A2E] rounded-[2rem] p-6 lg:p-8 text-white mb-8 relative overflow-hidden group">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-30">
          <Moon className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-2xl lg:text-3xl mb-2">Sleep Recorder</h3>
          <p className="text-white/70 mb-6 lg:mb-8 max-w-[200px] lg:max-w-sm">Place your phone near your bed to track sleep phases.</p>
          <button className="bg-white text-[#1A1A2E] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
            <Moon className="w-5 h-5 fill-current" />
            Start Tracking
          </button>
        </div>
      </div>

      <h3 className="font-bold text-[#1A1A2E] text-xl lg:text-2xl mb-4">Wind Down Courses</h3>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <div className="bg-[#FFF3B0] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-10 h-10 bg-[#1A1A2E] rounded-full relative z-10 lg:w-12 lg:h-12"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Deep Sleep</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70 lg:text-base">10 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#5E8F8B] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-[#FFF3B0] rounded-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Relaxation</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80 lg:text-base">7 sessions</span>
              <div className="w-7 h-7 bg-white text-[#5E8F8B] rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExercise = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24 lg:mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]">Exercise</h1>
        <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors lg:w-12 lg:h-12 lg:bg-white lg:rounded-full lg:shadow-sm lg:flex lg:items-center lg:justify-center">
          <Settings className="w-6 h-6 lg:w-5 lg:h-5" />
        </button>
      </div>
      
      <p className="text-[#8E8E9F] text-sm lg:text-base leading-relaxed mb-8 pr-4 lg:max-w-xl">
        Stay active and build strength with guided workouts and activity tracking.
      </p>

      {/* Activity Recorder Card */}
      <div className="bg-[#5E8F8B] rounded-[2rem] p-6 lg:p-8 text-white mb-8 relative overflow-hidden group">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-30">
          <Dumbbell className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-2xl lg:text-3xl mb-2">Activity Recorder</h3>
          <p className="text-white/70 mb-6 lg:mb-8 max-w-[200px] lg:max-w-sm">Track your steps, running, and workouts automatically.</p>
          <button className="bg-white text-[#5E8F8B] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
            <Activity className="w-5 h-5" />
            Start Workout
          </button>
        </div>
      </div>

      <h3 className="font-bold text-[#1A1A2E] text-xl lg:text-2xl mb-4">Workout Courses</h3>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <div className="bg-[#FF8C8C] rounded-[2rem] p-5 text-white flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-white/20 rounded-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Morning Yoga</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-white/80 lg:text-base">14 sessions</span>
              <div className="w-7 h-7 bg-white text-[#FF8C8C] rounded-full flex items-center justify-center lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#E8F3F1] rounded-[2rem] p-5 text-[#1A1A2E] flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="self-center w-16 h-16 relative flex items-center justify-center mb-2 lg:w-20 lg:h-20">
             <div className="w-8 h-8 bg-[#5E8F8B] rounded-full relative z-10 lg:w-10 lg:h-10"></div>
          </div>
          <div>
            <h4 className="font-bold text-base mb-1 lg:text-lg">Core Strength</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-[#1A1A2E]/70 lg:text-base">12 sessions</span>
              <div className="w-7 h-7 bg-white text-[#1A1A2E] rounded-full flex items-center justify-center shadow-sm lg:w-8 lg:h-8">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
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
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">{user?.name || 'User'}</h2>
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
          {[
            { id: "account", label: "Account Settings", icon: <User className="w-5 h-5" />, color: "text-[#818CF8]", bg: "bg-indigo-50" },
            { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" />, color: "text-[#FFB166]", bg: "bg-orange-50" },
            { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-5 h-5" />, color: "text-[#5E8F8B]", bg: "bg-[#E8F3F1]" },
            { id: "help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" />, color: "text-[#FF8C8C]", bg: "bg-[#FFEBEB]" }
          ].map((item) => (
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

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] relative font-sans ${outfit.className} lg:flex`}>
      
      {/* Sidebar (Desktop) / Bottom Nav (Mobile/Tablet) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-[2rem] px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex justify-between items-center pb-8 z-50 lg:static lg:flex lg:flex-col lg:justify-start lg:w-72 lg:h-screen lg:rounded-none lg:shadow-none lg:border-r lg:border-slate-200 lg:p-8 lg:gap-8 lg:bg-white">
        
        {/* Desktop Logo */}
        <div className="hidden lg:flex w-full items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FF8C8C] rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A2E] tracking-tight">SupportSutra</h2>
        </div>

        <div className="flex w-full justify-between lg:flex-col lg:gap-3 lg:w-full">
          {[
            { id: "Home", icon: <Home className="w-6 h-6 lg:w-5 lg:h-5" /> },
            { id: "Sleep", icon: <Moon className="w-6 h-6 lg:w-5 lg:h-5" /> },
            { id: "Meditate", icon: <HeartPulse className="w-6 h-6 lg:w-5 lg:h-5" /> },
            { id: "Exercise", icon: <Dumbbell className="w-6 h-6 lg:w-5 lg:h-5" /> },
            { id: "Profile", icon: <User className="w-6 h-6 lg:w-5 lg:h-5" /> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* Main Content Area */}
      <main className="px-6 pt-4 pb-32 lg:pb-12 lg:flex-1 lg:p-12 lg:h-screen lg:overflow-y-auto bg-[#FAFAFC]">
        <div className="lg:max-w-5xl lg:mx-auto w-full relative">
          {activeTab === "Home" && renderHome()}
          {activeTab === "Sleep" && renderSleep()}
          {activeTab === "Meditate" && renderMeditate()}
          {activeTab === "Exercise" && renderExercise()}
          {activeTab === "Profile" && renderProfile()}
        </div>
      </main>
      {/* Floating Action Button */}
      <button 
        onClick={() => router.push('/doctors')}
        className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 w-16 h-16 bg-[#1A1A2E] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#FF8C8C] hover:scale-110 active:scale-95 transition-all z-[60] group"
        aria-label="Find a doctor"
      >
        <Stethoscope className="w-8 h-8 group-hover:animate-pulse" />
        <div className="absolute -top-12 right-0 bg-white text-[#1A1A2E] px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Talk to a Specialist
        </div>
      </button>

    </div>
  );
}

