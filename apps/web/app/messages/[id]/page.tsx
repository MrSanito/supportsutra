"use client";
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Search, MoreVertical, Send, CheckCheck, 
  User, ShieldCheck, Clock, Calendar, MessageSquare, Phone, Video
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter, useParams } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

const doctorsData: any = {
  "sarah-chen": {
    name: "Dr. Sarah Chen",
    specialty: "Mental Wellness Specialist",
    color: "bg-[#FFEBEB]",
    textColor: "text-[#FF8C8C]",
    history: [
      { sender: "doctor", text: "Hello! I've reviewed your wellness metrics. You've been very consistent.", time: "10:30 AM" },
      { sender: "doctor", text: "How are you feeling today?", time: "10:31 AM" },
      { sender: "user", text: "I'm feeling a bit more focused today.", time: "10:45 AM" }
    ]
  },
  "marcus-thorne": {
    name: "Dr. Marcus Thorne",
    specialty: "Sleep Specialist",
    color: "bg-[#E8F3F1]",
    textColor: "text-[#5E8F8B]",
    history: [
      { sender: "doctor", text: "Your sleep metrics are improving. Let's keep this pace.", time: "Yesterday" }
    ]
  },
  "elena-rodriguez": {
    name: "Dr. Elena Rodriguez",
    specialty: "Nutritionist",
    color: "bg-[#FFF3B0]",
    textColor: "text-[#1A1A2E]",
    history: [
      { sender: "doctor", text: "Have you tried the new meal plan I sent over?", time: "Monday" }
    ]
  }
};

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [message, setMessage] = useState("");
  const [doctor, setDoctor] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  useEffect(() => {
    if (id && doctorsData[id]) {
      setDoctor(doctorsData[id]);
      setChatHistory(doctorsData[id].history);
    }
  }, [id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
  };

  if (!doctor) return null;

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className} flex flex-col`}>
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/messages')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E8E9F] hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${doctor.color} rounded-full flex items-center justify-center ${doctor.textColor} relative`}>
              <User className="w-6 h-6" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-[#1A1A2E]">{doctor.name}</h2>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <p className="text-[10px] text-[#8E8E9F] font-bold uppercase tracking-wider">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E8E9F] hover:bg-slate-50 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E8E9F] hover:bg-slate-50 transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#8E8E9F] hover:bg-slate-50 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex justify-center mb-8">
          <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#8E8E9F]" />
            <span className="text-xs font-bold text-[#8E8E9F]">Today</span>
          </div>
        </div>

        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${msg.sender === "user" ? "order-1" : "order-2"}`}>
              <div 
                onClick={() => msg.sender === "doctor" && alert("Interactive message features Coming Soon!")}
                className={`p-4 rounded-3xl shadow-sm cursor-pointer ${
                msg.sender === "user" 
                  ? "bg-[#1A1A2E] text-white rounded-tr-none" 
                  : "bg-white border border-slate-100 text-[#1A1A2E] rounded-tl-none"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <div className={`flex items-center gap-1.5 mt-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] font-bold text-[#8E8E9F]">{msg.time}</span>
                {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Area */}
      <footer className="p-6 bg-white border-t border-slate-100 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1 bg-[#FAFAFC] rounded-2xl border border-slate-200 px-4 py-2 flex items-center focus-within:border-[#FF8C8C] focus-within:ring-2 focus-within:ring-[#FF8C8C]/10 transition-all">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="bg-transparent border-none focus:ring-0 w-full text-sm py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center gap-2 ml-2">
              <button type="button" className="text-[#8E8E9F] hover:text-[#1A1A2E]">
                <Clock className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button 
            type="submit"
            disabled={!message.trim()}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              message.trim() 
                ? "bg-[#FF8C8C] text-white shadow-lg shadow-[#FF8C8C]/20 hover:scale-105" 
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}
