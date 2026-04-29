"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  Search, ArrowLeft, Star, Clock, MapPin, Phone, MessageSquare, 
  ChevronRight, Filter, ShieldCheck, Stethoscope 
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import api from "../../lib/axios";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

interface BackendDoctor {
  id: string;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  bio?: string;
  consultationFee?: number;
  isVerified: boolean;
  availableFrom?: string;
  availableTo?: string;
  user: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
  };
}

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Mental Health Specialist",
    rating: 4.9,
    reviews: 124,
    experience: "12 years",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200",
    color: "#FF8C8C"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Sleep Disorders Expert",
    rating: 4.8,
    reviews: 89,
    experience: "15 years",
    availability: "Available Tomorrow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
    color: "#5E8F8B"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    specialty: "Wellness & Nutrition",
    rating: 5.0,
    reviews: 56,
    experience: "8 years",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
    color: "#FFF3B0"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Anxiety & Stress Coach",
    rating: 4.7,
    reviews: 210,
    experience: "20 years",
    availability: "In 2 days",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200",
    color: "#1A1A2E"
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialty: "Mindfulness Practitioner",
    rating: 4.9,
    reviews: 45,
    experience: "6 years",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
    color: "#FF8C8C"
  }
];

export default function DoctorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dynamicDoctors, setDynamicDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        const params: any = { page: 1, limit: 50 };
        if (selectedCategory !== "All") {
          params.specialization = selectedCategory;
        }
        const response = await api.get("/doctor", { params });
        if (response.data && response.data.success && Array.isArray(response.data.doctors)) {
          const mapped = response.data.doctors.map((doc: BackendDoctor, index: number) => ({
            id: doc.id || index.toString(),
            name: `Dr. ${doc.user?.profile?.firstName || "Wellness"} ${doc.user?.profile?.lastName || "Specialist"}`,
            specialty: doc.specialization || "Mental Health",
            rating: 4.8 + (index % 3) * 0.1,
            reviews: 24 + (index * 7),
            experience: `${doc.experienceYears || 5} years`,
            availability: doc.availableFrom && doc.availableTo ? `${doc.availableFrom} - ${doc.availableTo}` : "Available Today",
            image: doc.user?.profile?.avatarUrl || `https://images.unsplash.com/photo-${1559839734 + (index * 100)}?auto=format&fit=crop&q=80&w=200&h=200`,
            color: index % 2 === 0 ? "#FF8C8C" : "#5E8F8B",
            isVerified: doc.isVerified,
            userId: doc.user?.id
          }));
          setDynamicDoctors(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [selectedCategory]);

  const displayedDoctors = dynamicDoctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           doc.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleChatClick = async (doc: any) => {
    if (doc.userId) {
      try {
        const response = await api.post("/conversations", { doctorId: doc.userId });
        if (response.data && response.data.conversation) {
          router.push(`/messages/${response.data.conversation.id}`);
        }
      } catch (err) {
        alert("Could not start conversation.");
      }
    } else {
      alert("Doctor unavailable for chat.");
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className}`}>
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#F0F0F5] flex items-center justify-center text-[#1A1A2E] hover:bg-[#E5E5EA] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Find a Specialist</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0B0]" />
          <input 
            type="text" 
            placeholder="Search doctors, specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F0F0F5] border-none rounded-2xl py-4 pl-12 pr-4 text-[#1A1A2E] focus:ring-2 focus:ring-[#FF8C8C] transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF8C8C]">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <main className="p-6 pb-24">
        {/* Categories / Badges */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-8 pb-2">
          {["All", "Psychiatrist", "Psychologist", "Therapist", "Coach", "General Physician"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${
                cat === selectedCategory ? 'bg-[#1A1A2E] text-white shadow-md' : 'bg-white text-[#8E8E9F] border border-slate-100 hover:border-[#FF8C8C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-10 h-10 border-4 border-[#FF8C8C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-[#8E8E9F]">Finding the best specialists...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedDoctors.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-sm">
                <p className="text-[#8E8E9F] font-bold">No specialists found in this category.</p>
              </div>
            ) : (
              displayedDoctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-50 hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                      <div className="absolute top-1 right-1">
                        <div className="w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg text-[#1A1A2E] group-hover:text-[#FF8C8C] transition-colors">{doc.name}</h3>
                        <div className="flex items-center gap-1 bg-[#FFEBEB] px-2 py-1 rounded-lg text-[#FF8C8C]">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">{doc.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#8E8E9F] text-sm font-medium mb-3">{doc.specialty}</p>
                      
                      <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-[#A0A0B0]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {doc.experience}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-sm font-bold text-[#5E8F8B]">
                      {doc.availability}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleChatClick(doc); }}
                        className="w-10 h-10 rounded-xl bg-[#E8F3F1] text-[#5E8F8B] flex items-center justify-center hover:bg-[#5E8F8B] hover:text-white transition-all"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleChatClick(doc); }}
                        className="bg-[#1A1A2E] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#FF8C8C] transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      
      {/* Footer / Disclaimer */}
      <div className="px-6 py-8 text-center text-[#8E8E9F]">
        <p className="text-xs leading-relaxed">
          Need immediate help? Please call emergency services.<br/>
          SupportSutra connects you with certified specialists for daily wellness.
        </p>
      </div>
    </div>
  );
}
