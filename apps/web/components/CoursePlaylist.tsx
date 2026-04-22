import React from 'react';
import { ChevronLeft, Play, ChevronRight } from 'lucide-react';

export interface Session {
  id: number;
  title: string;
  duration: string;
  color: string;
  text?: string;
  playing: boolean;
}

interface CoursePlaylistProps {
  courseTitle: string;
  sessions: Session[];
  onBack: () => void;
  onPlaySession: (session: Session) => void;
}

export function CoursePlaylist({ courseTitle, sessions, onBack, onPlaySession }: CoursePlaylistProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300 mb-24 lg:mb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 lg:mb-12">
        <button onClick={onBack} className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1A1A2E] hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-6 h-6 lg:w-5 lg:h-5" />
        </button>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]">{courseTitle}</h1>
          <p className="text-[#8E8E9F] text-sm lg:text-base font-medium">{sessions.length} sessions • 3h 15m</p>
        </div>
      </div>

      <div className="lg:max-w-3xl lg:mx-auto">
        {/* Playlist Items */}
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div 
              key={session.id} 
              onClick={() => onPlaySession(session)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-8 font-bold text-[#D0D0E0] text-center group-hover:text-[#FF8C8C] transition-colors">{index + 1}</div>
              <div className={`w-12 h-12 ${session.color} rounded-xl flex items-center justify-center flex-shrink-0 ${session.text || 'text-white'}`}>
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#1A1A2E] text-lg">{session.title}</h4>
                <p className="text-[#8E8E9F] text-sm">{session.duration}</p>
              </div>
              <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-[#D0D0E0] group-hover:text-[#1A1A2E] transition-colors">
                 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
