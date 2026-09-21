"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Star, Phone, MessageSquare } from "lucide-react";
import { Astrologer, getAstrologers } from "../../talk-to-astrologer/talkToAstrologer";
import { AstrologerDetailModal } from "../../talk-to-astrologer/components/AstrologerDetailModal";
import { formatImageUrl } from "@/lib/utils";

function RecommendedCard({
  astro,
  onSelect,
}: {
  astro: Astrologer;
  onSelect: (astro: Astrologer) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = formatImageUrl(astro.profileImage || astro.image);
  const hasImage = Boolean(imageUrl) && !imgError;

  return (
    <div
      onClick={() => onSelect(astro)}
      className="rounded-[20px] border border-[#d9c7a1] bg-[#f8f5f1] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-[#1f5b4c] transition-all cursor-pointer group flex flex-col items-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="relative group-hover:scale-105 transition-transform">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={astro.name}
              onError={() => setImgError(true)}
              className="h-[84px] w-[84px] rounded-full border-[3px] border-[#1f5b4c] object-cover"
            />
          ) : (
            <div
              className={`h-[84px] w-[84px] rounded-full border-[3px] border-[#1f5b4c] ${astro.bgColor || "bg-[#1f5b4c]"} flex items-center justify-center text-white text-xl font-bold`}
            >
              {astro.initials || "AS"}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1f5b4c] text-[10px] text-white">
            ✓
          </span>
        </div>
      </div>

      <div className="text-center w-full">
        <h4 className="text-lg font-bold leading-tight text-[#2d1a0e] line-clamp-1 group-hover:text-[#1f5b4c] transition-colors">
          {astro.name}
        </h4>
        <p className="mt-1 text-xs text-[#4a3020] min-h-[28px] leading-tight">
          {astro.specialty}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 text-[#e7a11c]">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-bold text-slate-800">{astro.rating}</span>
        </div>
        <div className="mt-3 text-xs text-[#1f5b4c] font-bold">
          <span>₹{astro.price}/min</span>
          {astro.originalPrice > astro.price && (
            <s className="mx-2 text-[10px] text-slate-400 font-normal">
              ₹{astro.originalPrice}/min
            </s>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(astro);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1f5b4c] bg-white text-[#1f5b4c] hover:bg-[#1f5b4c] hover:text-white transition-colors"
            aria-label={`Call ${astro.name}`}
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(astro);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1f5b4c] bg-[#1f5b4c] text-white hover:bg-[#194e42] transition-colors"
            aria-label={`Chat with ${astro.name}`}
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function RecommendedAstrologers() {
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
    <>
      {/* Share Horoscope Report Banner */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[18px] border border-[#d7d3ca] bg-[#f4f2ee] p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#d7d3ca] bg-[#f7f5f3] text-[#2d1a0e]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#2d1a0e]">
              Share Horoscope Report
            </p>
            <p className="text-sm text-[#5d4637]">
              Share your personalized Horoscope instantly with family and
              friends
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] bg-[#1f5b4c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#194e42] shrink-0"
        >
          Share Horoscope Report
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Recommended Astrologers Section */}
      <div className="mt-16">
        <div className="relative mb-8 text-center">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c3]" />
          <span className="relative inline-block bg-[#f8f7f4] px-5 text-lg font-semibold tracking-wide text-[#2d1a0e]">
            Recommended Astrologers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {list.map((astro, index) => (
            <RecommendedCard
              key={`${astro.id || astro._id}-${index}`}
              astro={astro}
              onSelect={setSelectedAstrologer}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/talk-to-astrologer"
            className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] px-6 py-3 text-sm font-semibold text-[#1f5b4c] transition hover:bg-[#1f5b4c] hover:text-white"
          >
            View All Astrologers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {selectedAstrologer && (
        <AstrologerDetailModal
          astrologerId={selectedAstrologer.id || selectedAstrologer._id || null}
          initialAstrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}
    </>
  );
}

