"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { Astrologer } from "../talkToAstrologerApi";

interface AstrologerGridProps {
  astrologers: Astrologer[];
  onResetFilters: () => void;
}

export function AstrologerGrid({
  astrologers,
  onResetFilters,
}: AstrologerGridProps) {
  if (astrologers.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-10 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
          🔍
        </div>
        <h3 className="font-bold text-xl text-[#2b1810]">
          No Astrologers Found
        </h3>
        <p className="text-sm text-[#5c4033]">
          Try resetting your search query or selecting a different category
          filter.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-2 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
      {astrologers.map((astrologer, index) => (
        <div
          key={`${astrologer.id}-${index}`}
          className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-[#1b4327] transition-all group relative"
        >
          {/* Profile Avatar with Online Badge */}
          <div className="relative mb-3">
            <div
              className={`w-20 h-20 rounded-full ${astrologer.bgColor} border-2 border-[#1b4327] flex items-center justify-center text-white text-xl font-bold shadow-md`}
            >
              {astrologer.initials}
            </div>
            {astrologer.isOnline && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-green-600 flex items-center gap-1 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] font-bold text-green-700 uppercase">
                  Online
                </span>
              </span>
            )}
          </div>

          {/* Astrologer Info */}
          <h3 className="font-bold text-lg text-[#2b1810] mt-2 mb-0.5 line-clamp-1">
            {astrologer.name}
          </h3>
          <p className="text-xs text-[#5c4033] min-h-[32px] flex items-center justify-center mb-2 leading-tight">
            {astrologer.specialty}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{astrologer.rating}</span>
            <span className="text-[10px] text-[#8c6d58] font-normal">
              ({astrologer.reviewsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#2b1810] mb-4">
            <span>₹{astrologer.price}/min</span>
            <s className="text-xs text-red-500 font-normal">
              ₹{astrologer.originalPrice}/min
            </s>
          </div>

          {/* Green Chat Button */}
          <button className="w-full py-2 px-4 rounded-full border border-emerald-600 text-emerald-700 bg-emerald-50/50 hover:bg-[#1b4327] hover:text-white hover:border-[#1b4327] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs mt-auto cursor-pointer">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      ))}
    </div>
  );
}
