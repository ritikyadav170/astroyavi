"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Astrologer } from "../talkToAstrologer";
import { formatImageUrl } from "@/lib/utils";

interface AstrologerGridProps {
  astrologers: Astrologer[];
  onResetFilters: () => void;
  onSelectAstrologer?: (astrologer: Astrologer) => void;
}

function AstrologerCard({
  astrologer,
  onSelect,
}: {
  astrologer: Astrologer;
  onSelect?: (astrologer: Astrologer) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = formatImageUrl(astrologer.profileImage || astrologer.image);
  const hasImage = Boolean(imageUrl) && !imgError;

  return (
    <div
      onClick={() => onSelect && onSelect(astrologer)}
      className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:border-[#1b4327] hover:-translate-y-2 transition-all duration-300 group relative cursor-pointer"
    >
      {/* Profile Avatar with Online Badge */}
      <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={astrologer.name}
            onError={() => setImgError(true)}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#1b4327] shadow-md"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-full ${astrologer.bgColor || "bg-[#1b4327]"} border-2 border-[#1b4327] flex items-center justify-center text-white text-xl font-bold shadow-md`}
          >
            {astrologer.initials || "AS"}
          </div>
        )}

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
      <h3 className="font-bold text-lg text-[#2b1810] mt-2 mb-0.5 line-clamp-1 group-hover:text-[#1b4327] transition-colors">
        {astrologer.name}
      </h3>
      <p className="text-xs text-[#5c4033] min-h-[32px] flex items-center justify-center mb-2 leading-tight px-1">
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
        {astrologer.originalPrice > astrologer.price && (
          <s className="text-xs text-red-500 font-normal">
            ₹{astrologer.originalPrice}/min
          </s>
        )}
      </div>

      {/* Green Chat Button / View Profile */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(astrologer);
        }}
        className="w-full py-2 px-4 rounded-full border border-emerald-600 text-emerald-700 bg-emerald-50/50 hover:bg-[#1b4327] hover:text-white hover:border-[#1b4327] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs mt-auto cursor-pointer"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Chat</span>
      </button>
    </div>
  );
}

export function AstrologerGrid({
  astrologers,
  onResetFilters,
  onSelectAstrologer,
}: AstrologerGridProps) {
  if (astrologers.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-10 space-y-4 shadow-sm">
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
          className="px-6 py-2.5 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all cursor-pointer shadow-xs"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
      {astrologers.map((astrologer, index) => (
        <AstrologerCard
          key={`${astrologer.id || astrologer._id}-${index}`}
          astrologer={astrologer}
          onSelect={onSelectAstrologer}
        />
      ))}
    </div>
  );
}

