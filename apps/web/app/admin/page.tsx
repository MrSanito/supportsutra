"use client";
import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, ShieldAlert, ArrowLeft, RefreshCw, CheckCircle, XCircle, 
  Stethoscope, FileText, Calendar, DollarSign, Sparkles 
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";
import api from "../../lib/axios";


const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

interface BackendDoctor {
  id: string;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  bio?: string;
  consultationFee?: string;
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

export default function AdminPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<BackendDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await api.get("/doctor", { params: { page: 1, limit: 100 } });
      if (response.data && response.data.success && Array.isArray(response.data.doctors)) {
        setDoctors(response.data.doctors);
      }
    } catch (error: any) {
      console.error("Failed to fetch doctors for admin:", error);
      setMessage({ type: 'error', text: "Failed to connect to backend data services." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleVerify = async (docId: string) => {
    setActionLoading(docId);
    setMessage(null);
    try {
      const response = await api.patch(`/doctor/${docId}/verify`);
      if (response.data && response.data.success) {
        setMessage({ type: 'success', text: "Doctor verified successfully!" });
        setDoctors(prev => prev.map(doc => doc.id === docId ? { ...doc, isVerified: true } : doc));
      }
    } catch (error: any) {
      console.error("Verification failed:", error);
      setMessage({ type: 'error', text: error.response?.data?.message || "Verification action failed" });
    } finally {
      setActionLoading(null);
    }
  };

  const unverifiedCount = doctors.filter(d => !d.isVerified).length;
  const verifiedCount = doctors.filter(d => d.isVerified).length;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B] text-slate-100 p-6 md:p-12 ${outfit.className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fadeIn">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all duration-300 backdrop-blur-md group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Doctor Verification Portal <Sparkles className="w-6 h-6 text-pink-400" />
              </h1>
              <p className="text-slate-400 mt-1">Verify healthcare credentials safely and securely.</p>
            </div>
          </div>

          <button 
            onClick={fetchDoctors}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-medium transition-all duration-300 active:scale-95 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slideUp">
          <div className="p-6 rounded-3xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Applications</p>
              <p className="text-3xl font-bold mt-1">{doctors.length}</p>
            </div>
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Pending Approval</p>
              <p className="text-3xl font-bold mt-1 text-amber-400">{unverifiedCount}</p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Verified Staff</p>
              <p className="text-3xl font-bold mt-1 text-emerald-400">{verifiedCount}</p>
            </div>
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Message Toast */}
        {message && (
          <div className={`p-4 rounded-2xl mb-8 flex items-center gap-3 animate-slideUp border ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <span className="font-medium text-sm">{message.text}</span>
          </div>
        )}

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin mb-4"></div>
            <p className="font-medium">Loading submissions...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-slate-800/20 border border-slate-700/20">
            <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Doctors Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">There are currently no doctor profiles uploaded to the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            {doctors.map((doc) => (
              <div 
                key={doc.id} 
                className={`group p-6 rounded-3xl transition-all duration-500 backdrop-blur-lg border ${
                  doc.isVerified 
                    ? 'bg-slate-800/20 border-slate-700/30 hover:border-emerald-500/20' 
                    : 'bg-slate-800/40 border-slate-700/50 hover:border-amber-500/30 shadow-lg shadow-slate-950/30'
                }`}
              >
                <div className="flex gap-5">
                  {/* Image / Initials */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-700 border border-slate-600 flex items-center justify-center">
                    {doc.user?.profile?.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={doc.user.profile.avatarUrl} 
                        alt={doc.user.profile.firstName || "Doctor"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold bg-gradient-to-br from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                        {doc.user?.profile?.firstName?.[0] || "D"}
                        {doc.user?.profile?.lastName?.[0] || ""}
                      </span>
                    )}
                    
                    {doc.isVerified && (
                      <div className="absolute bottom-1 right-1 p-1 bg-emerald-500 text-slate-950 rounded-lg shadow-md">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Doctor Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-slate-100 truncate">
                        Dr. {doc.user?.profile?.firstName || "Wellness"} {doc.user?.profile?.lastName || "Expert"}
                      </h3>
                      <span className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 ${
                        doc.isVerified 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      }`}>
                        {doc.isVerified ? "Verified" : "Pending"}
                      </span>
                    </div>

                    <p className="text-slate-300 font-medium flex items-center gap-2 mt-1">
                      <Stethoscope className="w-4 h-4 text-indigo-400" />
                      {doc.specialization || "General Practice"}
                    </p>

                    <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                      <FileText className="w-4 h-4 text-slate-500" />
                      License: <span className="text-slate-300 font-mono font-medium">{doc.licenseNumber}</span>
                    </p>
                  </div>
                </div>

                {/* Doctor Details Accordion */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 space-y-3">
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    &ldquo;{doc.bio || "No clinical background details provided."}&rdquo;
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/50 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="block text-slate-500">Availability</span>
                        <span className="font-medium text-slate-300">
                          {doc.availableFrom && doc.availableTo ? `${doc.availableFrom} - ${doc.availableTo}` : "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="block text-slate-500">Consultation</span>
                        <span className="font-medium text-slate-300 font-mono">
                          ₹{doc.consultationFee || "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Actions */}
                {!doc.isVerified && (
                  <div className="mt-6 pt-4 border-t border-slate-800/50">
                    <button 
                      onClick={() => handleVerify(doc.id)}
                      disabled={actionLoading === doc.id}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-slate-700 disabled:to-slate-700 text-slate-100 font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {actionLoading === doc.id ? (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></div>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5 text-indigo-200" />
                          Verify Credentials
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
