"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Moon, MessageSquareHeart, Sparkles, HeartPulse, BrainCircuit, ActivitySquare, Plus, Check } from "lucide-react";

// The "Ethereal Night" Brain visualization
const BrainArt = () => (
  <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center animate-float">
    {/* Deep glowing therapeutic ambiance / Atmosphere */}
    <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-[#6366F1]/20 rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow blur-[80px]" />
    <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-[#34D399]/10 rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow blur-[60px]" style={{ animationDelay: '2s' }} />

    
    <svg viewBox="0 0 400 400" className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] z-10 overflow-visible relative drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
      {/* Center nexus */}
      <rect x="175" y="100" width="50" height="200" rx="25" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />

      {/* Left Hemisphere - Focus, Calm, Structure (Electric Teals & Indigos) */}
      <circle cx="140" cy="160" r="70" fill="#2E1065" />
      <rect x="80" y="200" width="100" height="80" rx="40" fill="#0C4A6E" />
      <circle cx="160" cy="260" r="50" fill="#312E81" />
      
      {/* Right Hemisphere - Emotion, Warmth (Deep Purples & Magentas) */}
      <circle cx="260" cy="180" r="70" fill="#4B0B59" />
      <rect x="220" y="100" width="80" height="100" rx="40" fill="#065F46" />
      <circle cx="240" cy="270" r="45" fill="#1E3A8A" />

      {/* Sparks / Synapses (Luminous Nodes) */}
      <circle cx="80" cy="80" r="14" fill="#6EE7B7" className="animate-thought shadow-xl" />
      <rect x="330" y="90" width="22" height="22" rx="6" fill="#FDBA74" className="animate-thought" style={{ animationDelay: '1.2s' }} />
      <path d="M 320 320 L 340 292 L 360 320 Z" fill="#818CF8" className="animate-thought" style={{ animationDelay: '2.8s' }} />
      <circle cx="90" cy="340" r="10" fill="#FFFFFF" className="animate-thought" style={{ animationDelay: '0.5s' }} />
    </svg>
  </div>
);

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
    <div className="min-h-screen overflow-x-hidden relative bg-[#050814]">
      {/* Absolute Atmospheric Glows for entire page background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3B82F6]/5 rounded-full blur-[120px] -z-20 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[120px] -z-20 pointer-events-none -translate-x-1/2" />
      
      {/* Floating Premium Navbar */}
      <div 
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "top-0 px-0" : "top-6 px-6"
        }`}
      >
        <nav 
          className={`mx-auto transition-all duration-500 border-white/10 flex justify-between items-center ${
            scrolled 
              ? "max-w-full bg-[#050814]/80 backdrop-blur-xl rounded-none border-b py-4 px-8 shadow-xl" 
              : "max-w-5xl bg-[#0F172A]/60 backdrop-blur-xl rounded-full border py-3 px-6 shadow-2xl"
          }`}
        >
          <div className="text-sm font-normal tracking-[0.3em] uppercase text-white/90">
            SUPPORT SUTRA
          </div>
          
          <div className="hidden md:flex gap-8 font-bold text-[10px] uppercase tracking-widest text-slate-500">
            <a href="#meditation" className="hover:text-white transition-colors">Meditation</a>
            <a href="#therapy" className="hover:text-white transition-colors">Therapy</a>
            <a href="#journal" className="hover:text-white transition-colors">Journaling</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white font-bold text-sm hidden sm:block hover:text-[#818CF8] transition-colors">
              Sign In
            </button>
            <button className="bg-[#818CF8] text-[#050814] font-black text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95">
              GET STARTED
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section (Full Background) */}
      <section 
        className="relative pt-24 pb-32 md:pt-36 md:pb-48 z-10 min-h-[600px] md:min-h-[800px] flex items-center bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        {/* Subtle dark overlay for text readability (Focused on the left) */}
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black md:via-black/40 md:to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-8 text-[#F8FAFC]">
              Quiet the mind. <br className="hidden md:block" />
              <span className="text-[#818CF8] relative inline-block">
                Master the self.
                <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-4 text-[#818CF8]/30 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12 text-white/90 leading-relaxed">
              Step away from digital anxiety. Support Sutra is an elegant, dedicated space for guided mindfulness, emotional tracking, and quiet reflection.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="flat-btn-primary w-full sm:w-auto">
                Start Your Journey <ArrowRight className="ml-3 w-5 h-5" />
              </button>
              <button className="flat-btn-secondary w-full sm:w-auto">
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
               <div className="inline-block px-3 py-1 bg-[#818CF8]/10 text-[#818CF8] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Curated Pathways
               </div>
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                  Choose your <span className="italic font-light text-slate-500">frequency.</span>
               </h2>
            </div>
            <div className="lg:col-span-5">
               <p className="text-xl text-slate-400 font-light leading-relaxed">
                  Every day requires a different mental posture. Select a state to begin your personalized session.
               </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Zen State */}
            <div className="ethereal-card group overflow-hidden cursor-pointer hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <Moon className="w-12 h-12 text-[#818CF8]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#818CF8] font-bold text-sm mb-4">MODE 01</div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Pure Zen</h3>
                <p className="text-slate-400 font-light mb-8">Guided breathing to lower cortisol and reset the nervous system in under 5 minutes.</p>
                <div className="w-full h-[2px] bg-white/5 relative">
                  <div className="absolute inset-y-0 left-0 bg-[#818CF8] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Focus State */}
            <div className="ethereal-card group overflow-hidden cursor-pointer hover:scale-[1.02] lg:translate-y-12">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-12 h-12 text-[#34D399]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#34D399] font-bold text-sm mb-4">MODE 02</div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Flow Work</h3>
                <p className="text-slate-400 font-light mb-8">Neuro-acoustic soundscapes designed to lock your brain into productive alpha-wave states.</p>
                <div className="w-full h-[2px] bg-white/5 relative">
                  <div className="absolute inset-y-0 left-0 bg-[#34D399] w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Deep Rest */}
            <div className="ethereal-card group overflow-hidden cursor-pointer hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <HeartPulse className="w-12 h-12 text-[#F87171]" />
              </div>
              <div className="relative z-10">
                <div className="text-[#F87171] font-bold text-sm mb-4">MODE 03</div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Deep Night</h3>
                <p className="text-slate-400 font-light mb-8">Restorative visualizations and body scans to prepare your mind for deep, high-quality sleep.</p>
                <div className="w-full h-[2px] bg-white/5 relative">
                  <div className="absolute inset-y-0 left-0 bg-[#F87171] w-0 group-hover:w-full transition-all duration-700" />
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
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[#F8FAFC]">
              Designed for <span className="text-[#34D399]">clarity.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light md:max-w-xl leading-relaxed">
              We carefully curated these modules to help you process complex emotions and return to a grounded baseline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="ethereal-card group lg:col-span-2 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#6366F1]/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#111827] border border-[#334155] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#818CF8]">
                <Moon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-white relative z-10">Deep Sleep & Meditation</h3>
              <p className="text-slate-400 leading-relaxed text-lg max-w-md relative z-10 font-light">
                Struggling to turn your brain off? Drift into rest with our vast library of neuro-acoustic soundscapes, guided bodily relaxation techniques, and specialized anxiety release meditations.
              </p>
            </div>

            <div className="ethereal-card group relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#10B981]/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#111827] border border-[#334155] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#34D399]">
                <ActivitySquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-white relative z-10">Mood Analytics</h3>
              <p className="text-slate-400 leading-relaxed font-light relative z-10">
                Log your emotions securely. Discover patterns in your days that trigger stress or promote feelings of calmness and joy.
              </p>
            </div>

            <div className="ethereal-card group relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F59E0B]/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="h-16 w-16 bg-[#111827] border border-[#334155] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#FBBF24]">
                <MessageSquareHeart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-white relative z-10">AI Companion</h3>
              <p className="text-slate-400 leading-relaxed font-light relative z-10">
                Sometimes you just need to vent. An unconditionally listening, private AI trained to hold space for your hardest thoughts.
              </p>
            </div>

            <div className="ethereal-card group lg:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#E11D48]/5 pointer-events-none" />
              <div className="h-16 w-16 bg-[#111827] border border-[#334155] rounded-2xl flex items-center justify-center mb-8 relative z-10 text-[#FB7185]">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-white relative z-10">Mindfulness Prompts</h3>
              <p className="text-slate-400 leading-relaxed text-lg max-w-md relative z-10 font-light">
                Rebuild your relationship with yourself through daily cognitive behavioral journaling exercises designed to untangle complex feelings and cultivate deep gratitude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with subtle elegant borders */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="absolute inset-y-0 left-0 right-0 border-y border-white/5 bg-[#111827]/30 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-white max-w-2xl mx-auto">
              A private retreat offering very real results.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <div className="text-6xl font-black text-[#6EE7B7] mb-4">8M+</div>
                  <div className="text-slate-400 font-medium text-lg">Mindful sessions completed</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-[#818CF8] mb-4">92%</div>
                  <div className="text-slate-400 font-medium text-lg">Reported lowered anxiety</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-[#FDE68A] mb-4">100%</div>
                  <div className="text-slate-400 font-medium text-lg">Private & encrypted journals</div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 relative z-10 overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#818CF8]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="mb-10 inline-block p-5 rounded-3xl bg-[#1E293B]/40 backdrop-blur-md border border-[#334155]/50">
              <BrainCircuit className="w-12 h-12 text-[#A5B4FC]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-3xl mx-auto leading-tight text-white drop-shadow-sm">
              Ready to find your center?
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 leading-relaxed">
              Transform your mental wellbeing today with Support Sutra's carefully engineered meditation and journaling tools.
            </p>
            <button className="flat-btn-primary !h-20 !px-12 !text-xl shadow-[0_0_50px_rgba(129,140,248,0.25)]">
              Create Your Free Account <ArrowRight className="ml-4 w-6 h-6" />
            </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center border-t border-white/10 pt-12">
          <div>
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-4 text-white">
              <BrainCircuit className="w-8 h-8 text-[#818CF8]" />
              SUPPORT<span className="text-[#818CF8]">.</span>SUTRA
            </div>
            <p className="text-slate-500 font-medium max-w-sm">
              Supporting your mental and emotional wellness journey through beautiful digital experiences.
            </p>
          </div>
          <div className="md:text-right font-medium text-slate-600">
            <p>&copy; 2026 Support Sutra. Built for your mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
