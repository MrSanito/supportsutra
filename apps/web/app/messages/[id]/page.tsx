"use client";
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Search, MoreVertical, Send, CheckCheck, 
  User, ShieldCheck, Clock, Calendar, MessageSquare, Phone, Video
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import api from "../../../lib/axios";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<any>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConversation() {
      if (!id) return;
      try {
        const response = await api.get(`/conversations/${id}`);
        if (response.data && response.data.conversation) {
          setConversation(response.data.conversation);
          const currentUserId = response.data.conversation.participants.find(
            (p: any) => p.user.role !== "DOCTOR" // Assuming current user is patient if the other is DOCTOR
          )?.userId; // This is a bit hacky, but the backend doesn't return myId explicitly
          
          // Actually, we can just find the participant that is NOT us, but we don't have our ID here easily.
          // The backend returns otherUserOnline. Let's just pick the first doctor for now if we are patient.
          // In a real app we'd use the Auth context to know our ID.
          const other = response.data.conversation.participants.find(
            (p: any) => p.user.doctorProfile
          );
          
          if (other) {
            setOtherUser({
              ...other.user,
              isOnline: response.data.otherUserOnline,
              name: `Dr. ${other.user.profile?.firstName || ""} ${other.user.profile?.lastName || ""}`,
              specialty: other.user.doctorProfile?.specialization || "Specialist",
              isVerified: other.user.doctorProfile?.isVerified || false
            });
          }

          setChatHistory(response.data.conversation.messages || []);
        }
      } catch (err) {
        console.error("Error fetching conversation", err);
      } finally {
        setLoading(false);
      }
    }
    fetchConversation();
    
    // Optional: add a polling mechanism here for real-time messages
    // const interval = setInterval(fetchConversation, 5000);
    // return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await api.post(`/conversations/${id}/messages`, {
        content: message
      });
      if (response.data) {
        setChatHistory([...chatHistory, response.data]);
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message");
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-[#FAFAFC] flex items-center justify-center ${outfit.className}`}>
        <div className="w-10 h-10 border-4 border-[#FF8C8C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!conversation || !otherUser) return null;

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
            <div className={`w-10 h-10 bg-[#E8F3F1] rounded-full flex items-center justify-center text-[#5E8F8B] relative`}>
              <User className="w-6 h-6" />
              {otherUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-[#1A1A2E]">{otherUser.name}</h2>
                {otherUser.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
              </div>
              <p className="text-[10px] text-[#8E8E9F] font-bold uppercase tracking-wider">{otherUser.specialty}</p>
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
            <span className="text-xs font-bold text-[#8E8E9F]">Recent Messages</span>
          </div>
        </div>

        {chatHistory.map((msg, idx) => {
          // Identify if message is from the other user (doctor) or current user
          const isOther = msg.senderId === otherUser.id;
          
          return (
            <div 
              key={msg.id || idx} 
              className={`flex ${!isOther ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${!isOther ? "order-1" : "order-2"}`}>
                <div 
                  className={`p-4 rounded-3xl shadow-sm cursor-pointer ${
                  !isOther 
                    ? "bg-[#1A1A2E] text-white rounded-tr-none" 
                    : "bg-white border border-slate-100 text-[#1A1A2E] rounded-tl-none"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <div className={`flex items-center gap-1.5 mt-2 ${!isOther ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] font-bold text-[#8E8E9F]">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!isOther && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Input Area */}
      <footer className="p-6 bg-white border-t border-slate-100 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1 bg-[#FAFAFC] rounded-2xl border border-slate-200 px-4 py-2 flex items-center focus-within:border-[#FF8C8C] focus-within:ring-2 focus-within:ring-[#FF8C8C]/10 transition-all">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="bg-transparent border-none focus:ring-0 w-full text-sm py-2 outline-none"
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
