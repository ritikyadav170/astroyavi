"use client";

import React from "react";
import { Eye, Play } from "lucide-react";
import { Mandir } from "../liveDarshanApi";

interface MandirGridProps {
  mandirs: Mandir[];
  onSelectMandir: (mandir: Mandir) => void;
  onClearSearch: () => void;
}

export function MandirGrid({
  mandirs,
  onSelectMandir,
  onClearSearch,
}: MandirGridProps) {
  if (mandirs.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
          🛕
        </div>
        <h3 className="font-bold text-xl text-[#2b1810]">No Mandir Found</h3>
        <p className="text-sm text-[#5c4033]">
          Try searching with another temple name or location.
        </p>
        <button
          onClick={onClearSearch}
          className="px-6 py-2 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all cursor-pointer"
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-16">
      {mandirs.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          onClick={() => onSelectMandir(item)}
          className="bg-[#edf2fc] rounded-2xl overflow-hidden border border-[#d5e1f7] shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer"
        >
          {/* Mandir Image Container with Play Overlay */}
          <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>

            {/* Top Live Badge & Viewers Counter */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                LIVE
              </span>
              <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Eye className="w-3 h-3 text-red-400" />
                {item.viewers}
              </span>
            </div>

            {/* YouTube Red Play Button Badge */}
            <div className="relative z-20 w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all">
              <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
            </div>
          </div>

          {/* Mandir Name Footer Bar */}
          <div className="p-3.5 bg-[#edf2fc] border-t border-[#d5e1f7] flex items-center justify-start">
            <p className="font-bold text-sm text-[#1e293b] truncate">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
