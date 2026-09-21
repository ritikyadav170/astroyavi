"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Phone,
  MessageSquare,
  Video,
} from "lucide-react";
import { Astrologer, getAstrologers } from "../../talk-to-astrologer/talkToAstrologer";
import { AstrologerDetailModal } from "../../talk-to-astrologer/components/AstrologerDetailModal";
import { formatImageUrl } from "@/lib/utils";

function KundliAstrologerCard({
  astrologer,
  onSelect,
}: {
  astrologer: Astrologer;
  onSelect: (astrologer: Astrologer) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = formatImageUrl(astrologer.profileImage || astrologer.image);
  const hasImage = Boolean(imageUrl) && !imgError;

  return (
    <div
      onClick={() => onSelect(astrologer)}
      className="bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-[#1b4327] transition-all cursor-pointer group"
    >
      <div className="relative mb-3 group-hover:scale-105 transition-transform">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={astrologer.name}
            onError={() => setImgError(true)}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#1b4327] shadow-md"
          />
        ) : (
          <div
            className={`w-16 h-16 rounded-full ${astrologer.bgColor || "bg-[#1b4327]"} border-2 border-[#1b4327] flex items-center justify-center text-white text-lg font-bold shadow-md`}
          >
            {astrologer.initials || "AS"}
          </div>
        )}
        {astrologer.isOnline && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-green-600 flex items-center gap-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[8px] font-bold text-green-700 uppercase">
              Online
            </span>
          </span>
        )}
      </div>

      <h3 className="font-bold text-base text-[#2b1810] mb-0.5 group-hover:text-[#1b4327] transition-colors line-clamp-1">
        {astrologer.name}
      </h3>
      <p className="text-xs text-[#5c4033] min-h-[30px] flex items-center justify-center mb-2 leading-tight">
        {astrologer.specialty}
      </p>

      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
        <Star className="w-3.5 h-3.5 fill-amber-400" />
        <span>{astrologer.rating}</span>
      </div>

      <div className="flex items-center gap-1 text-xs font-bold text-[#2b1810] mb-4">
        <span>₹{astrologer.price}/min</span>
        {astrologer.originalPrice > astrologer.price && (
          <s className="text-[10px] text-red-500 font-normal">
            ₹{astrologer.originalPrice}/min
          </s>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 w-full mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          aria-label={`Call ${astrologer.name}`}
          className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all cursor-pointer"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          aria-label={`Message ${astrologer.name}`}
          className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 transition-all shadow-xs cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          aria-label={`Video call ${astrologer.name}`}
          className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white transition-all cursor-pointer"
        >
          <Video className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function KundliAstrologers() {
  const [list, setList] = useState<Astrologer[]>([]);
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);

  useEffect(() => {
    getAstrologers()
      .then((data) => {
        if (data && data.length > 0) {
          setList(data.slice(0, 5));
        }
      })
      .catch(() => { });
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-8 pt-6 border-t border-amber-900/10">
      <div className="flex items-center gap-3 text-[#c87638]">
        <div className="h-[1px] w-16 bg-[#c87638]"></div>
        <span className="text-xs font-bold uppercase tracking-widest">
          Recommended Astrologer
        </span>
        <div className="h-[1px] w-16 bg-[#c87638]"></div>
      </div>

      <div className="relative w-full flex items-center justify-center">
        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          {list.map((astrologer, index) => (
            <KundliAstrologerCard
              key={`${astrologer.id || astrologer._id}-${index}`}
              astrologer={astrologer}
              onSelect={setSelectedAstrologer}
            />
          ))}
        </div>
      </div>

      <Link
        href="/talk-to-astrologer"
        className="px-8 py-3 bg-[#1b4327] hover:bg-[#13321d] text-white font-bold text-sm rounded-full shadow-lg transition-all"
      >
        View All Astrologers &gt;
      </Link>

      {selectedAstrologer && (
        <AstrologerDetailModal
          astrologerId={selectedAstrologer.id || selectedAstrologer._id || null}
          initialAstrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}
    </div>
  );
}

