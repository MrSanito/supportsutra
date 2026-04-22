"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Moon, MessageSquareHeart, Sparkles, HeartPulse, BrainCircuit, ActivitySquare } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden relative bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className}`}>
      {/* Absolute Atmospheric Glows for entire page background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF8C8C]/15 rounded-full blur-[120px] -z-20 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#5E8F8B]/10 rounded-full blur-[120px] -z-20 pointer-events-none -translate-x-1/2" />
      
      {/* Floating Premium Navbar */}
      <div 
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "top-0 px-0" : "top-6 px-6"
        }`}
      >
        <nav 
          className={`mx-auto transition-all duration-500 flex justify-between items-center ${
            scrolled 
              ? "max-w-full bg-white/80 backdrop-blur-xl rounded-none border-b border-slate-100 py-4 px-8 shadow-sm" 
              : "max-w-5xl bg-[#0F172A]/40 backdrop-blur-xl rounded-full border border-white/10 py-3 px-6 shadow-2xl"
          }`}
        >
          <div className={`text-sm font-bold tracking-[0.3em] uppercase ${scrolled ? "text-[#1A1A2E]" : "text-white/90"}`}>
            SUPPORT SUTRA
          </div>
          
          <div className={`hidden md:flex gap-8 font-bold text-[10px] uppercase tracking-widest ${scrolled ? "text-[#8E8E9F]" : "text-slate-300"}`}>
            <a href="#meditation" className={`hover:${scrolled ? "text-[#1A1A2E]" : "text-white"} transition-colors`}>Meditation</a>
            <a href="#therapy" className={`hover:${scrolled ? "text-[#1A1A2E]" : "text-white"} transition-colors`}>Therapy</a>
            <a href="#journal" className={`hover:${scrolled ? "text-[#1A1A2E]" : "text-white"} transition-colors`}>Journaling</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className={`${scrolled ? "text-[#1A1A2E] hover:text-[#FF8C8C]" : "text-white hover:text-white/80"} font-bold text-sm hidden sm:block transition-colors`}>
              Sign In
            </Link>
            <Link href="/register" className="bg-[#FF8C8C] text-white font-black text-xs px-5 py-2.5 rounded-full hover:bg-[#ff7a7a] transition-all transform hover:scale-105 active:scale-95 shadow-sm">
              GET STARTED
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section (Full Background) */}
      <section 
        className="relative pt-24 pb-32 md:pt-36 md:pb-48 z-10 min-h-[600px] md:min-h-[800px] flex items-center bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        {/* Subtle dark overlay for text readability (Focused on the left) */}
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-8 text-white">
              Quiet the mind. <br className="hidden md:block" />
              <span className="text-[#FF8C8C] relative inline-block">
                Master the self.
                <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-4 text-[#FF8C8C]/30 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12 text-white/90 leading-relaxed">
              Step away from digital anxiety. Support Sutra is an elegant, dedicated space for guided mindfulness, emotional tracking, and quiet reflection.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/register" className="flat-btn-primary w-full sm:w-auto">
                Start Your Journey <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <button className="flat-btn-outline w-full sm:w-auto !text-white !border-white/20 hover:!bg-white/10 hover:!text-white">
                Explore the Method
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: States of Mind (Interactive Grid) */}
      <section className="py-24 md:py-32 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-7">
               <div className="inline-block px-3 py-1 bg-[#FF8C8C]/10 text-[#FF8C8C] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Curated Pathways
               </div>
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1A1A2E] leading-tight">
                  Choose your <span className="italic font-light text-[#8E8E9F]">frequency.</span>
               </h2>
            </div>
            <div className="lg:col-span-5">
               <p className="text-xl text-[#8E8E9F] font-medium leading-relaxed">
                  Every day requires a different mental posture. Select a state to begin your personalized session.
               </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Zen State */}
            <div className="ethereal-card group overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <Moon className="w-12 h-12 text-[#5E8F8B]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#5E8F8B] font-bold text-sm mb-4">MODE 01</div>
                <h3 className="text-3xl font-black text-[#1A1A2E] mb-6 tracking-tight">Pure Zen</h3>
                <p className="text-[#8E8E9F] font-medium mb-8">Guided breathing to lower cortisol and reset the nervous system in under 5 minutes.</p>
                <div className="w-full h-[3px] bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-[#5E8F8B] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Focus State */}
            <div className="ethereal-card group overflow-hidden cursor-pointer lg:translate-y-12">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <Sparkles className="w-12 h-12 text-[#F59E0B]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#F59E0B] font-bold text-sm mb-4">MODE 02</div>
                <h3 className="text-3xl font-black text-[#1A1A2E] mb-6 tracking-tight">Flow Work</h3>
                <p className="text-[#8E8E9F] font-medium mb-8">Neuro-acoustic soundscapes designed to lock your brain into productive alpha-wave states.</p>
                <div className="w-full h-[3px] bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-[#F59E0B] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Deep Rest */}
            <div className="ethereal-card group overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <HeartPulse className="w-12 h-12 text-[#FF8C8C]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#FF8C8C] font-bold text-sm mb-4">MODE 03</div>
                <h3 className="text-3xl font-black text-[#1A1A2E] mb-6 tracking-tight">Deep Night</h3>
                <p className="text-[#8E8E9F] font-medium mb-8">Restorative visualizations and body scans to prepare your mind for deep, high-quality sleep.</p>
                <div className="w-full h-[3px] bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-[#FF8C8C] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Mental Health & Meditation */}
      <section id="meditation" className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[#1A1A2E]">
              Designed for <span className="text-[#5E8F8B]">clarity.</span>
            </h2>
            <p className="text-xl text-[#8E8E9F] font-medium md:max-w-xl leading-relaxed">
              We carefully curated these modules to help you process complex emotions and return to a grounded baseline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="ethereal-card group lg:col-span-2 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#5E8F8B]/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#E8F3F1] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#5E8F8B] shadow-sm">
                <Moon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-[#1A1A2E] relative z-10">Deep Sleep & Meditation</h3>
              <p className="text-[#8E8E9F] font-medium leading-relaxed text-lg max-w-md relative z-10">
                Struggling to turn your brain off? Drift into rest with our vast library of neuro-acoustic soundscapes, guided bodily relaxation techniques, and specialized anxiety release meditations.
              </p>
            </div>

            <div className="ethereal-card group relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFF3B0]/50 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#FFF3B0]/50 rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#F59E0B] shadow-sm">
                <ActivitySquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#1A1A2E] relative z-10">Mood Analytics</h3>
              <p className="text-[#8E8E9F] font-medium leading-relaxed relative z-10">
                Log your emotions securely. Discover patterns in your days that trigger stress or promote feelings of calmness and joy.
              </p>
            </div>

            <div className="ethereal-card group relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFD166]/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#FFD166]/20 rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#F59E0B] shadow-sm">
                <MessageSquareHeart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#1A1A2E] relative z-10">AI Companion</h3>
              <p className="text-[#8E8E9F] font-medium leading-relaxed relative z-10">
                Sometimes you just need to vent. An unconditionally listening, private AI trained to hold space for your hardest thoughts.
              </p>
            </div>

            <div className="ethereal-card group lg:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FF8C8C]/5 pointer-events-none" />
              <div className="h-16 w-16 bg-[#FFEBEB] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#FF8C8C] shadow-sm">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-[#1A1A2E] relative z-10">Mindfulness Prompts</h3>
              <p className="text-[#8E8E9F] font-medium leading-relaxed text-lg max-w-md relative z-10">
                Rebuild your relationship with yourself through daily cognitive behavioral journaling exercises designed to untangle complex feelings and cultivate deep gratitude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with subtle elegant borders */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="absolute inset-y-0 left-0 right-0 border-y border-slate-100 bg-white/50 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-[#1A1A2E] max-w-2xl mx-auto">
              A private retreat offering very real results.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <div className="text-6xl font-black text-[#5E8F8B] mb-4">8M+</div>
                  <div className="text-[#1A1A2E] font-bold text-lg">Mindful sessions completed</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-[#FF8C8C] mb-4">92%</div>
                  <div className="text-[#1A1A2E] font-bold text-lg">Reported lowered anxiety</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-[#F59E0B] mb-4">100%</div>
                  <div className="text-[#1A1A2E] font-bold text-lg">Private & encrypted journals</div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 relative z-10 overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#FF8C8C]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="mb-10 inline-block p-5 rounded-3xl bg-white shadow-sm border border-slate-100">
              <BrainCircuit className="w-12 h-12 text-[#FF8C8C]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-3xl mx-auto leading-tight text-[#1A1A2E] drop-shadow-sm">
              Ready to find your center?
            </h2>
            <p className="text-xl md:text-2xl text-[#8E8E9F] font-medium mb-12 leading-relaxed">
              Transform your mental wellbeing today with Support Sutra's carefully engineered meditation and journaling tools.
            </p>
            <Link href="/register" className="flat-btn-primary !h-20 !px-12 !text-xl shadow-[0_8px_30px_rgb(255,140,140,0.3)]">
              Create Your Free Account <ArrowRight className="ml-4 w-6 h-6" />
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center border-t border-slate-200 pt-12">
          <div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-4 text-[#1A1A2E]">
              <BrainCircuit className="w-8 h-8 text-[#FF8C8C]" />
              SUPPORT<span className="text-[#FF8C8C]">.</span>SUTRA
            </div>
            <p className="text-[#8E8E9F] font-medium max-w-sm">
              Supporting your mental and emotional wellness journey through beautiful digital experiences.
            </p>
          </div>
          <div className="md:text-right font-medium text-[#8E8E9F]">
            <p>&copy; 2026 Support Sutra. Built for your mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
