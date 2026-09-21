"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Phone,
  MessageSquare,
  Video,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Astrologer,
  getAstrologers,
  filterCategories,
} from "../talk-to-astrologer/talkToAstrologer";
import { AstrologerDetailModal } from "../talk-to-astrologer/components/AstrologerDetailModal";
import { formatImageUrl } from "@/lib/utils";

function TopAstrologerCard({
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
      className="min-w-[260px] max-w-[280px] bg-white rounded-[2rem] p-6 border border-[#e6c896] flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:border-[#1b4327] hover:-translate-y-3 transition-all duration-500 ease-out group relative shrink-0 cursor-pointer"
    >
      {/* Profile Avatar */}
      <div className="relative mb-4 group-hover:scale-110 transition-transform duration-500 ease-out">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={astrologer.name}
            onError={() => setImgError(true)}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div
            className={`w-24 h-24 rounded-full ${astrologer.bgColor || "bg-[#1b4327]"} border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-bold`}
          >
            {astrologer.initials || "AS"}
          </div>
        )}
        {astrologer.isOnline && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2.5 py-1 rounded-full border border-green-500 flex items-center gap-1.5 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-extrabold text-green-700 uppercase tracking-wide">
              Online
            </span>
          </span>
        )}
      </div>

      <h3 className="font-bold text-xl text-[#2b1810] mt-3 mb-1 group-hover:text-[#1b4327] transition-colors line-clamp-1">
        {astrologer.name}
      </h3>
      <p className="text-sm text-[#5c4033] min-h-[40px] flex items-center justify-center mb-3 leading-tight px-2">
        {astrologer.specialty}
      </p>

      <div className="flex items-center justify-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-600 text-xs font-bold mb-3 border border-amber-100">
        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        <span>{astrologer.rating}</span>
      </div>

      <div className="flex items-center gap-2 text-sm font-bold text-[#2b1810] mb-6">
        <span className="text-lg">
          ₹{astrologer.price}
          <span className="text-xs text-slate-500 font-medium">/min</span>
        </span>
        {astrologer.originalPrice > astrologer.price && (
          <s className="text-xs text-red-500 font-normal">
            ₹{astrologer.originalPrice}/min
          </s>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          className="w-11 h-11 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-900 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-slate-900/10" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(astrologer);
          }}
          className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Video className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function TopAstrologers() {
  const [activeCategory, setActiveCategory] = useState("All Astrologers");
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Call GET /asterologer
    getAstrologers(activeCategory)
      .then((data) => {
        if (isMounted) {
          setAstrologers(data);
        }
      })
      .catch((err) => {
        console.error("Error loading top astrologers:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#fdf8f0] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1350px] mx-auto flex flex-col items-center">
        {/* Section Pill Title */}
        <div className="flex items-center gap-3 text-[#c87638] mb-4">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            TOP ASTROLOGERS
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-10 tracking-tight">
          Consult Our Expert Astrologers
        </h2>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-12">
          {filterCategories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${activeCategory === cat
                  ? "bg-[#1b4327] text-white border-[#1b4327] shadow-lg scale-105"
                  : "bg-white text-[#2b1810] border-[#3c2415]/30 hover:border-[#1b4327] hover:bg-amber-50 hover:shadow-sm"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Astrologers Cards Carousel */}
        {loading && astrologers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#1b4327]" />
            <p className="text-xs font-semibold text-slate-600">
              Loading verified astrologers...
            </p>
          </div>
        ) : (
          <div className="relative w-full flex items-center justify-center group/carousel">
            {/* Scroll Left Button */}
            <button
              onClick={scrollLeft}
              className="hidden sm:flex absolute -left-6 z-30 w-12 h-12 rounded-full bg-white border border-slate-200 text-[#1b4327] items-center justify-center shadow-xl hover:bg-[#1b4327] hover:text-white hover:scale-110 hover:border-transparent active:scale-95 transition-all duration-300 cursor-pointer opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
              aria-label="Previous Astrologers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="flex items-center gap-6 w-full overflow-x-auto scroll-smooth py-6 px-4 no-scrollbar select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {astrologers.map((astrologer, index) => (
                <TopAstrologerCard
                  key={`${astrologer.id || astrologer._id}-${index}`}
                  astrologer={astrologer}
                  onSelect={setSelectedAstrologer}
                />
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={scrollRight}
              className="hidden sm:flex absolute -right-6 z-30 w-12 h-12 rounded-full bg-white border border-slate-200 text-[#1b4327] items-center justify-center shadow-xl hover:bg-[#1b4327] hover:text-white hover:scale-110 hover:border-transparent active:scale-95 transition-all duration-300 cursor-pointer opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
              aria-label="Next Astrologers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* View All Astrologers Button */}
        <Link
          href="/talk-to-astrologer"
          className="mt-12 px-8 py-3.5 bg-[#1b4327] hover:bg-[#13321d] hover:scale-105 hover:shadow-xl active:scale-95 text-white font-bold text-sm rounded-full transition-all duration-300 ease-out"
        >
          View All Astrologers &gt;
        </Link>
      </div>

      {/* Astrologer Detail Modal (GET /asterologer/:id) */}
      {selectedAstrologer && (
        <AstrologerDetailModal
          astrologerId={selectedAstrologer.id || selectedAstrologer._id || null}
          initialAstrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}
    </section>
  );
}

export default TopAstrologers;