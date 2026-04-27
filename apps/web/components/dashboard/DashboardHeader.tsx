"use client";
import React from "react";
import { MessageSquare, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  firstName: string;
}

export default function DashboardHeader({ firstName }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-start mb-6 lg:mb-12">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-1 lg:mb-2">Morning, {firstName}!</h1>
        <p className="text-[#8E8E9F] text-sm lg:text-base font-medium">Your daily wellness journey</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => router.push('/messages')}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-100 flex items-center justify-center text-[#5E8F8B] bg-white shadow-sm hover:bg-slate-50 transition-colors"
        >
          <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-100 flex items-center justify-center text-[#F87171] bg-white shadow-sm hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
}
