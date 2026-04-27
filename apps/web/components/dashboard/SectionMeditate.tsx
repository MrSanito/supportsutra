"use client";
import React, { useState } from "react";
import { Search, Grid, HeartPulse, CircleDot, Brain, Activity, Play } from "lucide-react";

export default function SectionMeditate() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", icon: <Grid className="w-5 h-5" /> },
    { id: "Anxious", icon: <HeartPulse className="w-5 h-5" /> },
    { id: "Balance", icon: <CircleDot className="w-5 h-5" /> },
    { id: "Mindful", icon: <Brain className="w-5 h-5" /> },
    { id: "Focus", icon: <Activity className="w-5 h-5" /> }
  ];

  return (
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
}
