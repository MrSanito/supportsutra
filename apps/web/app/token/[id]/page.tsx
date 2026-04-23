"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import api from "../../../lib/axios";

interface TokenPageProps {
  params: Promise<{ id: string }>;
}

export default function TokenVerifyPage({ params }: TokenPageProps) {
  const { id } = use(params);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Adding a slight delay for better UX feel
        const startTime = Date.now();
        const res = await api.get(`/auth/verify/${id}`);
        const duration = Date.now() - startTime;
        
        if (duration < 1500) {
          await new Promise(resolve => setTimeout(resolve, 1500 - duration));
        }

        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Your account has been successfully verified and is now active.");
        } else {
          setStatus("error");
          setMessage(res.data.message || "The verification link is invalid or has already been used.");
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed. The link might be expired or the server is unreachable.");
      }
    };

    if (id) {
      verifyToken();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FF8C8C] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5E8F8B] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[480px] relative z-10">
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100/80 p-12 text-center transition-all duration-500">
          
          {/* Header Icon */}
          <div className="mb-10 flex justify-center">
            {status === "loading" && (
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-[#F0F2F5] flex items-center justify-center animate-pulse">
                  <Loader2 className="w-10 h-10 text-[#FF8C8C] animate-spin" strokeWidth={1.5} />
                </div>
              </div>
            )}
            
            {status === "success" && (
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#22C55E]/20 rounded-full blur-xl group-hover:bg-[#22C55E]/30 transition-all duration-500" />
                <div className="relative w-20 h-20 rounded-3xl bg-[#22C55E] flex items-center justify-center shadow-lg shadow-[#22C55E]/40 animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            )}
            
            {status === "error" && (
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#EF4444]/20 rounded-full blur-xl group-hover:bg-[#EF4444]/30 transition-all duration-500" />
                <div className="relative w-20 h-20 rounded-3xl bg-[#EF4444] flex items-center justify-center shadow-lg shadow-[#EF4444]/40 animate-in zoom-in duration-500">
                  <XCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h1 className="text-3xl font-extrabold text-[#1A1A2E] tracking-tight">
              {status === "loading" && "Authenticating Link"}
              {status === "success" && "Welcome Aboard!"}
              {status === "error" && "Verification Error"}
            </h1>
            <p className="text-[#8E8E9F] text-base font-medium leading-relaxed max-w-[300px] mx-auto">
              {status === "loading" && "We're validating your secure token with our servers. This will only take a moment."}
              {status === "success" && message}
              {status === "error" && message}
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            {status === "success" && (
              <Link
                href="/login"
                className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            {status === "error" && (
              <Link
                href="/register"
                className="w-full bg-[#F0F2F5] text-[#1A1A2E] rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#E5E8ED] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Try Registering Again
              </Link>
            )}
            
            {status === "loading" && (
              <div className="w-full bg-[#F0F2F5]/50 text-[#8E8E9F] rounded-2xl font-bold py-4 text-sm flex items-center justify-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FF8C8C] animate-bounce [animation-delay:-0.3s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#FF8C8C] animate-bounce [animation-delay:-0.15s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-[#FF8C8C] animate-bounce" />
              </div>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5E8F8B]" />
            <span className="text-[10px] font-bold text-[#D0D0E0] uppercase tracking-[0.2em]">
              Support Sutra Secure Verification
            </span>
          </div>
        </div>
        
        {/* Helper Link */}
        <div className="mt-8 text-center">
          <Link href="/support" className="text-xs font-bold text-[#8E8E9F] hover:text-[#FF8C8C] transition-colors uppercase tracking-widest">
            Need Help? Contact Support 
          </Link>
        </div>
      </div>
    </div>
  );
}
