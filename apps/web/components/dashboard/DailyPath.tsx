"use client";
import React from "react";
import { Brain, Dumbbell, Moon, MessageSquare, Play, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DailyPath() {
  const router = useRouter();

  return (
    <div className="lg:col-span-5">
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

        {/* Step 4: Connect with Doctor */}
        <div className="relative">
          <div className="absolute -left-[21px] top-4 w-4 h-4 bg-[#FAFAFC] border-4 border-[#FFB166] rounded-full z-10"></div>
          <div onClick={() => router.push('/doctors')} className="bg-[#FFF4E8] rounded-[2rem] p-5 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#FFB166] shadow-sm flex-shrink-0">
                <MessageSquare className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <div className="text-[#FFB166] text-xs font-bold uppercase tracking-wider mb-1">Ongoing</div>
               <h4 className="font-bold text-[#1A1A2E] text-lg leading-tight">Connect with Doctor</h4>
               <p className="text-[#8E8E9F] text-xs">Chat with your specialists</p>
             </div>
             <div className="w-10 h-10 bg-[#FFB166] text-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
               <ChevronRight className="w-5 h-5" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
