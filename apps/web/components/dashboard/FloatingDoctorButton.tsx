"use client";
import React from "react";
import { Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingDoctorButton() {
  const router = useRouter();

  return (
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
  );
}
