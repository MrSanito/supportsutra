"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { Sparkles, ArrowLeft, Shield, Scale, ScrollText, Heart, ShieldCheck, Lock, Info } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function TermsPage() {
  const sections = [
    {
      title: "Agreement to Terms",
      icon: <ScrollText className="w-5 h-5" />,
      content: "By accessing or using SupportSutra, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services."
    },
    {
      title: "Nature of Services",
      icon: <Heart className="w-5 h-5" />,
      content: "SupportSutra provides wellness and support services. We are not a medical provider, and our services are not a substitute for professional medical advice, diagnosis, or treatment."
    },
    {
      title: "User Responsibilities",
      icon: <Scale className="w-5 h-5" />,
      content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information."
    },
    {
      title: "Privacy & Data",
      icon: <ShieldCheck className="w-5 h-5" />,
      content: "Your use of SupportSutra is also governed by our Privacy Policy. Please review it to understand our practices regarding your personal information."
    },
    {
      title: "Termination",
      icon: <Info className="w-5 h-5" />,
      content: "We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className} relative overflow-hidden`}>
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#5E8F8B]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-[#FFF3B0]/20 blur-[100px] pointer-events-none rounded-full" />

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/register" className="flex items-center gap-2 text-sm font-bold text-[#8E8E9F] hover:text-[#5E8F8B] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Register
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5E8F8B] rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight">SupportSutra</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5E8F8B]/10 text-[#5E8F8B] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3 h-3" />
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-[#8E8E9F] font-medium italic">Last updated: May 2, 2026</p>
        </div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <section key={index} className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#FAFAFC] rounded-xl flex items-center justify-center text-[#5E8F8B] border border-slate-100">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <p className="text-[#5E8F8B] font-medium leading-relaxed opacity-80">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-[#1A1A2E] rounded-[2.5rem] p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Questions about our terms?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Our support team is here to help clarify any points in our legal documentation.</p>
          <a href="mailto:support@supportsutra.com" className="inline-flex items-center gap-2 px-8 py-4 bg-[#5E8F8B] rounded-2xl font-bold hover:bg-[#4D7A76] transition-colors shadow-lg">
            Contact Support
          </a>
        </div>

        <footer className="mt-16 text-center text-[#8E8E9F] text-sm font-medium">
          <p>© 2026 SupportSutra. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
