"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import api from "../../../lib/axios";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default function VerifyPage({ params }: VerifyPageProps) {
  const { id } = use(params);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      // Manual bypass for testing
      if (id === "1123") {
        setTimeout(() => {
          setStatus("success");
          setMessage("This is a test success message for ID: 1123.");
        }, 1200);
        return;
      }

      try {
        const res = await api.get(`/auth/verify/${id}`);
        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Your account has been successfully verified.");
        } else {
          setStatus("error");
          setMessage(res.data.message || "The verification link is invalid or has expired.");
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Something went wrong. Please try again later.");
      }
    };

    if (id) {
      verify();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements to match the theme */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(#818CF8 1px, transparent 1px), linear-gradient(to right, #818CF8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6366F1]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#8B5CF6]/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#030509] border border-[#0F1623] p-10 text-center shadow-2xl">
          {status === "loading" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-12 h-12 border-2 border-t-[#6366F1] border-r-transparent border-b-[#8B5CF6] border-l-transparent rounded-full animate-spin" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Verifying...</h1>
                <p className="text-[#4B5563] text-sm">Please wait while we secure your account</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Verified Successfully</h1>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{message}</p>
              </div>
              <Link
                href="/login"
                className="block w-full bg-[#6366F1] text-white font-bold py-3.5 text-sm tracking-wide transition-all duration-150 hover:bg-[#5558E3] active:scale-[0.98]"
              >
                Go to Login
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Verification Failed</h1>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{message}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/register"
                  className="block w-full bg-[#1A1C23] text-white font-bold py-3.5 text-sm tracking-wide border border-[#2D313E] transition-all duration-150 hover:bg-[#2D313E]"
                >
                  Back to Signup
                </Link>
                <Link
                  href="/support"
                  className="text-xs text-[#4B5563] hover:text-[#6366F1] transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-[#1F2937] mt-8 text-center uppercase tracking-[0.2em] font-medium selection:bg-[#6366F1]">
          Support<span className="text-[#6366F1]">Sutra</span> Secure Access
        </p>
      </div>
    </div>
  );
}
