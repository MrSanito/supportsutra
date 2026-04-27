"use client";
import React from "react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeaturedCourses() {
  const router = useRouter();

  return (
    <div className="lg:col-span-7 flex flex-col">
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
  );
}
