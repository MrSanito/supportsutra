"use client";
import React from "react";
import { Settings, Dumbbell, Activity, Play } from "lucide-react";

export default function SectionExercise() {
  return (
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
}
