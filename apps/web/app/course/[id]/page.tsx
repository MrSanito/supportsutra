"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CoursePlaylist, Session } from "../../../components/CoursePlaylist";
import { AudioPlayer } from "../../../components/AudioPlayer";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

// Mock data
const coursesData: Record<string, any> = {
  basics: {
    title: "Basics",
    sessions: [
      { id: 1, title: "Introduction to Basics", duration: "5:30", color: "bg-[#FF8C8C]", playing: false },
      { id: 2, title: "Focusing on Breath", duration: "10:15", color: "bg-[#FFF3B0]", text: "text-[#1A1A2E]", playing: true },
      { id: 3, title: "Body Scan Meditation", duration: "12:00", color: "bg-[#5E8F8B]", playing: false },
      { id: 4, title: "Managing Distractions", duration: "8:45", color: "bg-[#1A1A2E]", playing: false },
      { id: 5, title: "Finding Your Center", duration: "15:20", color: "bg-[#FFEBEB]", text: "text-[#1A1A2E]", playing: false },
    ]
  },
  happiness: {
    title: "Happiness",
    sessions: [
      { id: 1, title: "What is Happiness?", duration: "7:00", color: "bg-[#FFF3B0]", text: "text-[#1A1A2E]", playing: false },
      { id: 2, title: "Gratitude Practice", duration: "12:30", color: "bg-[#FF8C8C]", playing: false },
      { id: 3, title: "Letting Go", duration: "10:00", color: "bg-[#5E8F8B]", playing: false },
    ]
  }
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  
  // React 19 / Next.js 15+ allows accessing params directly if not async, but best practice is just to use it directly in client components if it's passed.
  const courseId = params.id;
  const course = coursesData[courseId] || coursesData.basics;

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-[#1A1A2E] font-sans ${outfit.className} p-6 lg:p-12 relative`}>
      {!activeSession ? (
        <CoursePlaylist 
          courseTitle={course.title}
          sessions={course.sessions}
          onBack={() => router.back()}
          onPlaySession={(session) => setActiveSession(session)}
        />
      ) : (
        <AudioPlayer
          courseTitle={course.title}
          sessionTitle={activeSession.title}
          duration={activeSession.duration}
          onClose={() => setActiveSession(null)}
        />
      )}
    </div>
  );
}
