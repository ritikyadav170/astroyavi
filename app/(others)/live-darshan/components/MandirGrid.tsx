"use client";

import React from "react";
import { Eye, Play, MapPin, Sparkles, Flame } from "lucide-react";
import { Mandir } from "../liveDarshan";

interface MandirGridProps {
  mandirs: Mandir[];
  onSelectMandir: (mandir: Mandir) => void;
  onClearFilters: () => void;
}

export function MandirGrid({
  mandirs,
  onSelectMandir,
  onClearFilters,
}: MandirGridProps) {
  if (mandirs.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl p-12 border border-[#e2d5c3] text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-3xl shadow-inner">
          🛕
        </div>
        <h3 className="font-serif font-bold text-xl text-slate-800">
          No Mandir Streams Found
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          We couldn't find any live streams matching your current search or filter criteria.
        </p>
        <button
          onClick={onClearFilters}
          className="px-6 py-2.5 bg-[#1b4327] hover:bg-[#13321d] text-white rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          Clear Filters & Search
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-16">
      {mandirs.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectMandir(item)}
          className="bg-white rounded-2xl overflow-hidden border border-[#e2d5c3]/80 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 group flex flex-col cursor-pointer hover:-translate-y-1"
        >
          {/* Mandir Image Container */}
          <div className="relative h-48 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-108 transition-transform duration-700"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 z-10"></div>

            {/* Top Live Badge & Viewers Counter */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <span className="bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                LIVE
              </span>
              <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/10 shadow-md">
                <Eye className="w-3 h-3 text-red-400" />
                {item.viewers}
              </span>
            </div>

            {/* Center Hover Play Button Badge */}
            <div className="relative z-20 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:bg-red-500 group-hover:scale-115 transition-all duration-300">
              <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
            </div>

            {/* Bottom Aarti Timing Badge on Image */}
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1 text-[11px] font-medium text-amber-200 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>{item.aartiTime}</span>
            </div>
          </div>

          {/* Mandir Info Footer Section */}
          <div className="p-4 bg-gradient-to-b from-[#f8fafc] to-white flex flex-col justify-between flex-1 border-t border-[#e2d5c3]/50">
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">
                  {item.location}, {item.state}
                </span>
              </div>
            </div>

            {/* Bottom Tag & Quick Watch Link */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                {item.deity}
              </span>
              <span className="font-bold text-[#1b4327] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                Watch Live &rarr;
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
