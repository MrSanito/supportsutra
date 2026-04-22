import React, { useState } from 'react';
import { ChevronDown, ListMusic, SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  courseTitle: string;
  sessionTitle: string;
  duration: string;
  onClose: () => void;
}

export function AudioPlayer({ courseTitle, sessionTitle, duration, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 fixed inset-0 z-[100] bg-[#FAFAFC] flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 flex justify-between items-center lg:px-12 lg:py-8">
        <button onClick={onClose} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1A1A2E] hover:bg-slate-50 transition-colors">
          <ChevronDown className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-[#8E8E9F] text-xs font-bold uppercase tracking-widest mb-1">Playing from</p>
          <p className="text-[#1A1A2E] font-semibold">{courseTitle}</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1A1A2E] hover:bg-slate-50 transition-colors">
          <ListMusic className="w-5 h-5" />
        </button>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 max-w-lg mx-auto w-full">
        
        {/* Artwork */}
        <div className="w-64 h-64 lg:w-80 lg:h-80 bg-[#FF8C8C] rounded-full shadow-[0_20px_50px_rgba(255,140,140,0.3)] flex items-center justify-center mb-12 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#1A1A2E] rounded-full relative z-10 flex items-center justify-center">
            {isPlaying && (
               <div className="absolute -inset-4 border border-[#1A1A2E]/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 w-full">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">{sessionTitle}</h2>
          <p className="text-[#8E8E9F] text-lg font-medium">Vishal • {courseTitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-10">
          <div className="h-2 w-full bg-[#E5E5EA] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#FF8C8C] w-1/3 rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          <div className="flex justify-between text-[#8E8E9F] text-xs font-bold">
            <span>2:45</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full max-w-[280px]">
          <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors">
            <SkipBack className="w-8 h-8" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-[#1A1A2E] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
          
          <button className="text-[#8E8E9F] hover:text-[#1A1A2E] transition-colors">
            <SkipForward className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Volume / Bottom safe area */}
      <div className="px-8 py-8 flex items-center gap-4 text-[#8E8E9F] max-w-lg mx-auto w-full lg:mb-4">
        <Volume2 className="w-5 h-5 flex-shrink-0" />
        <div className="h-1 flex-1 bg-[#E5E5EA] rounded-full overflow-hidden">
           <div className="h-full bg-[#1A1A2E] w-2/3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
