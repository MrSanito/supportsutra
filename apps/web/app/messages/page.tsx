"use client";
import React, { useState } from "react";
import { 
  ArrowLeft, Search, User, ShieldCheck, ChevronRight, 
  MessageSquare, Clock, Filter, Plus
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function MessagesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      specialty: "Mental Wellness",
      lastMessage: "I'd recommend trying the 'Deep Sleep' wind-down course tonight.",
      time: "10:50 AM",
      unread: 2,
      online: true,
      verified: true,
      color: "bg-[#FFEBEB]",
      textColor: "text-[#FF8C8C]"
    },
    {
      id: "marcus-thorne",
      name: "Dr. Marcus Thorne",
      specialty: "Sleep Specialist",
      lastMessage: "Your sleep metrics are improving. Let's keep this pace.",
      time: "Yesterday",
      unread: 0,
      online: false,
      verified: true,
      color: "bg-[#E8F3F1]",
      textColor: "text-[#5E8F8B]"
    },
    {
      id: "elena-rodriguez",
      name: "Dr. Elena Rodriguez",
      specialty: "Nutritionist",
      lastMessage: "Have you tried the new meal plan I sent over?",
      time: "Monday",
      unread: 0,
      online: true,
      verified: false,
      color: "bg-[#FFF3B0]",
      textColor: "text-[#1A1A2E]"
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className} flex flex-col`}>
      {/* Header */}
      <header className="bg-white px-6 py-8 pb-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E8E9F] hover:bg-slate-50 transition-colors lg:hidden"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold">Messages</h1>
          </div>
          <button className="w-10 h-10 bg-[#1A1A2E] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
          <input 
            type="text" 
            placeholder="Search doctors or messages..."
            className="w-full bg-[#F0F0F5] border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#FF8C8C]/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {["All", "Unread", "Doctors", "Support"].map((filter) => (
            <button 
              key={filter}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                filter === "All" 
                  ? "bg-[#FF8C8C] text-white shadow-md shadow-[#FF8C8C]/20" 
                  : "bg-white text-[#8E8E9F] border border-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Conversations List */}
      <main className="flex-1 px-6 py-4 space-y-3">
        {conversations.map((chat) => (
          <button 
            key={chat.id}
            onClick={() => router.push(`/messages/${chat.id}`)}
            className="w-full bg-white p-4 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all group"
          >
            <div className={`w-14 h-14 ${chat.color} ${chat.textColor} rounded-full flex items-center justify-center relative flex-shrink-0`}>
              <User className="w-7 h-7" />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[#1A1A2E] truncate">{chat.name}</h3>
                  {chat.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                </div>
                <span className="text-[10px] font-bold text-[#8E8E9F]">{chat.time}</span>
              </div>
              <p className="text-xs text-[#8E8E9F] font-bold uppercase tracking-wider mb-1">{chat.specialty}</p>
              <p className="text-sm text-[#8E8E9F] truncate group-hover:text-[#1A1A2E] transition-colors">
                {chat.lastMessage}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {chat.unread > 0 && (
                <div className="bg-[#FF8C8C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {chat.unread}
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-[#D0D0E0] group-hover:text-[#1A1A2E] transition-colors" />
            </div>
          </button>
        ))}
      </main>

      {/* Quick Stats / Empty State if needed */}
      <div className="px-6 py-8 flex flex-col items-center text-center opacity-50">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-[#8E8E9F]" />
        </div>
        <p className="text-xs font-bold text-[#8E8E9F] uppercase tracking-widest">End-to-end Encrypted</p>
        <p className="text-[10px] text-[#A0A0B0] mt-1 max-w-[200px]">Your conversations with doctors are private and secure.</p>
      </div>
    </div>
  );
}
