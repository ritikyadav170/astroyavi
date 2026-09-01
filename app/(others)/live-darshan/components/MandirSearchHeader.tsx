"use client";

import React from "react";
import { Search } from "lucide-react";

interface MandirSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function MandirSearchHeader({
  searchQuery,
  setSearchQuery,
}: MandirSearchHeaderProps) {
  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            LIVE DARSHAN
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight">
          Witness the Divine in Real Time
        </h1>
      </div>

      {/* Centered Search Bar */}
      <div className="relative w-full max-w-md mb-12">
        <input
          type="text"
          placeholder="Search Live Mandir..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#e6c896] rounded-full py-3 pl-6 pr-12 text-sm text-[#2b1810] placeholder:text-[#8c6d58] focus:outline-none focus:border-[#1b4327] shadow-xs"
        />
        <Search className="w-5 h-5 text-[#8c6d58] absolute right-5 top-1/2 -translate-y-1/2" />
      </div>
    </>
  );
}
