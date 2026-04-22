"use client";
import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className={`min-h-screen bg-[#FFEBEB] text-[#1A1A2E] flex flex-col ${outfit.className}`}>


      <main className="flex-1 flex flex-col justify-center items-center px-8 relative">
        {/* Floating background elements */}
        <div className="absolute top-1/4 left-8 text-[#FFD166] opacity-70 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-1/3 right-12 text-[#FFD166] opacity-60">
          <Sparkles className="w-4 h-4" />
        </div>
        
        {/* Illustration Area */}
        <div className="relative w-full max-w-sm aspect-square mb-12 flex items-center justify-center">
          {/* Decorative glowing background behind illustration */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 w-64 h-64 bg-[#FFEBEB] rounded-full border-4 border-white/40 shadow-xl flex items-center justify-center overflow-hidden">
             {/* Using a placeholder composed of shapes to match the vibe since we don't have the image asset */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/50 rounded-full blur-xl animate-pulse"></div>
             
             {/* Abstract Meditating Figure */}
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#1A1A2E] rounded-full mb-2 shadow-lg"></div> {/* Head */}
                <div className="w-28 h-24 bg-[#818CF8] rounded-t-full shadow-lg"></div> {/* Body */}
                <div className="w-40 h-12 bg-[#FFD166] rounded-full -mt-6 shadow-md z-20"></div> {/* Legs */}
             </div>
             
             {/* Rays */}
             <div className="absolute top-0 w-1 h-12 bg-white/60 rounded-full"></div>
             <div className="absolute top-4 left-10 w-1 h-10 bg-white/60 rounded-full rotate-45"></div>
             <div className="absolute top-4 right-10 w-1 h-10 bg-white/60 rounded-full -rotate-45"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-sm mx-auto">
          <h1 className="text-3xl font-bold mb-4 tracking-tight leading-tight">
            Say Hello, to Your <br/> Mental Health
          </h1>
          <p className="text-[#646478] text-sm leading-relaxed mb-16 px-4">
            Start meditate to enhance objectivity and achieve the bravest goals
          </p>
        </div>
      </main>

      {/* Bottom Controls */}
      <div className="px-8 pb-12 flex justify-between items-center w-full max-w-md mx-auto">
        <button 
          onClick={handleSkip}
          className="text-[#1A1A2E] font-semibold text-sm hover:opacity-70 transition-opacity"
        >
          Skip
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          <div className={`w-6 h-1.5 rounded-full ${step === 0 ? 'bg-[#1A1A2E]' : 'bg-[#1A1A2E]/20'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${step === 1 ? 'bg-[#1A1A2E]' : 'bg-[#1A1A2E]/20'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${step === 2 ? 'bg-[#1A1A2E]' : 'bg-[#1A1A2E]/20'}`}></div>
        </div>

        <button 
          onClick={handleNext}
          className="text-[#1A1A2E] font-semibold text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
