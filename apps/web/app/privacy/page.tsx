"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { Sparkles, ArrowLeft, Lock, Eye, Database, Share2, ShieldCheck, UserCheck, Bell } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data We Collect",
      icon: <Database className="w-5 h-5" />,
      content: "We collect information you provide directly to us when you create an account, including your name, email address, phone number, and any profile photo you choose to upload."
    },
    {
      title: "How We Use Data",
      icon: <Eye className="w-5 h-5" />,
      content: "We use your data to provide, maintain, and improve our services, to communicate with you about your account, and to ensure the safety and security of our platform."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: "We implement robust security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction."
    },
    {
      title: "Sharing of Information",
      icon: <Share2 className="w-5 h-5" />,
      content: "We do not sell your personal data. We may share information with service providers who perform services on our behalf or when required by law."
    },
    {
      title: "Your Rights",
      icon: <UserCheck className="w-5 h-5" />,
      content: "You have the right to access, correct, or delete your personal information at any time through your account settings or by contacting us."
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      content: "We may send you service-related announcements from time to time. You can opt-out of marketing communications but essential service updates will still be sent."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className} relative overflow-hidden`}>
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#5E8F8B]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#FFF3B0]/20 blur-[100px] pointer-events-none rounded-full" />

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
            <ShieldCheck className="w-3 h-3" />
            Privacy First
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[#8E8E9F] font-medium italic">Last updated: May 2, 2026</p>
        </div>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <section key={index} className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-slate-100 hover:border-[#5E8F8B]/30 transition-all duration-300">
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

        <div className="mt-16 bg-[#5E8F8B] rounded-[2.5rem] p-10 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Your privacy is our priority</h3>
          <p className="text-white/80 mb-8 max-w-md mx-auto">We are committed to being transparent about the data we collect and how it is used to serve you better.</p>
          <a href="mailto:privacy@supportsutra.com" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A2E] rounded-2xl font-bold hover:bg-[#2A2A4A] transition-colors shadow-lg">
            Privacy Inquiries
          </a>
        </div>

        <footer className="mt-16 text-center text-[#8E8E9F] text-sm font-medium">
          <p>© 2026 SupportSutra. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
