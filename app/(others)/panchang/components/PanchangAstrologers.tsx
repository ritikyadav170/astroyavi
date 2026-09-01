"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
  MessageSquare,
  Video,
} from "lucide-react";
import { astrologers } from "../panchangApi";

export function PanchangAstrologers() {
  return (
    <div className="w-full flex flex-col items-center space-y-8 mb-8">
      <div className="flex items-center gap-3 text-[#c87638]">
        <div className="h-[1px] w-16 bg-[#c87638]"></div>
        <span className="text-xs font-bold uppercase tracking-widest">
          Recommended Astrologer
        </span>
        <div className="h-[1px] w-16 bg-[#c87638]"></div>
      </div>

      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          aria-label="Previous Astrologer"
          className="hidden sm:flex absolute -left-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Astrologers 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          {astrologers.map((astrologer) => (
            <div
              key={astrologer.id}
              className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative mb-3">
                <div
                  className={`w-16 h-16 rounded-full ${astrologer.bgColor} border-2 border-[#1b4327] flex items-center justify-center text-white text-lg font-bold shadow-md`}
                >
                  {astrologer.initials}
                </div>
              </div>

              <h3 className="font-bold text-base text-[#2b1810] mb-0.5">
                {astrologer.name}
              </h3>
              <p className="text-xs text-[#5c4033] min-h-[30px] flex items-center justify-center mb-2">
                {astrologer.specialty}
              </p>

              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{astrologer.rating}</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#2b1810] mb-4">
                <span>₹{astrologer.price}/min</span>
                <s className="text-[10px] text-red-500 font-normal">
                  ₹{astrologer.originalPrice}/min
                </s>
              </div>

              <div className="flex items-center justify-center gap-2 w-full">
                <button
                  aria-label={`Call ${astrologer.name}`}
                  className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  aria-label={`Message ${astrologer.name}`}
                  className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 transition-all shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  aria-label={`Video call ${astrologer.name}`}
                  className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          aria-label="Next Astrologer"
          className="hidden sm:flex absolute -right-4 z-20 w-10 h-10 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-md hover:bg-[#13321d] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Link
        href="/talk-to-astrologer"
        className="px-8 py-3 bg-[#1b4327] hover:bg-[#13321d] text-white font-bold text-sm rounded-full shadow-lg transition-all"
      >
        View All Astrologers &gt;
      </Link>
    </div>
  );
}
