"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Phone,
  MessageSquare,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const filterCategories = [
  "All Astrologers",
  "Vedic Astrology",
  "Tarot Reading",
  "Vastu",
  "Numerology",
  "KP Astrology",
];

const astrologers = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
  },
  {
    id: 3,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
  },
  {
    id: 5,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
  },
  {
    id: 6,
    name: "Acharya Ankit",
    specialty: "KP Astrology, Kundli",
    rating: "4.9",
    price: 25,
    originalPrice: 40,
    initials: "AA",
    bgColor: "bg-purple-800",
  },
  {
    id: 7,
    name: "Dr. Meenakshi",
    specialty: "Numerology, Vastu",
    rating: "5.0",
    price: 30,
    originalPrice: 45,
    initials: "DM",
    bgColor: "bg-indigo-700",
  },
  {
    id: 8,
    name: "Pandit Suresh",
    specialty: "Vedic, Gemology",
    rating: "4.8",
    price: 18,
    originalPrice: 28,
    initials: "PS",
    bgColor: "bg-teal-800",
  },
  {
    id: 9,
    name: "Neha Kapoor",
    specialty: "Tarot, Psychic",
    rating: "4.9",
    price: 22,
    originalPrice: 35,
    initials: "NK",
    bgColor: "bg-rose-700",
  },
  {
    id: 10,
    name: "Guruji Shastri",
    specialty: "Prashna Kundli, Palmistry",
    rating: "5.0",
    price: 35,
    originalPrice: 50,
    initials: "GS",
    bgColor: "bg-amber-900",
  },
];

export function TopAstrologers() {
  const [activeCategory, setActiveCategory] = useState("All Astrologers");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fdf8f0] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1350px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            TOP ASTROLOGERS
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-6 sm:mb-8 tracking-tight">
          Consult Our Expert Astrologers
        </h2>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap mb-8 sm:mb-10">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm scale-105"
                  : "bg-white text-[#2b1810] border-[#3c2415]/40 hover:border-[#1b4327] hover:bg-amber-50/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Astrologers Cards Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="flex absolute -left-4 sm:-left-6 z-30 w-11 h-11 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-lg hover:bg-[#13321d] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Previous Astrologers"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Smooth Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-5 w-full overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar scrollbar-none select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {astrologers.map((astrologer) => (
              <div
                key={astrologer.id}
                className="min-w-[240px] sm:min-w-[250px] max-w-[260px] bg-white rounded-3xl p-5 border border-[#e6c896] flex flex-col items-center text-center shadow-xs hover:shadow-2xl hover:border-[#1b4327] hover:-translate-y-2 transition-all duration-300 group relative shrink-0"
              >
                {/* Circular Profile Avatar with Online Badge */}
                <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
                  <div
                    className={`w-20 h-20 rounded-full ${astrologer.bgColor} border-2 border-[#1b4327] flex items-center justify-center text-white text-xl font-bold shadow-md`}
                  >
                    {astrologer.initials}
                  </div>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-green-600 flex items-center gap-1 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[9px] font-bold text-green-700 uppercase">
                      Online
                    </span>
                  </span>
                </div>

                {/* Astrologer Info */}
                <h3 className="font-bold text-lg text-[#2b1810] mt-2 mb-0.5 group-hover:text-[#1b4327] transition-colors line-clamp-1">
                  {astrologer.name}
                </h3>
                <p className="text-xs text-[#5c4033] min-h-[32px] flex items-center justify-center mb-2 leading-tight">
                  {astrologer.specialty}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{astrologer.rating}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#2b1810] mb-5">
                  <span>₹{astrologer.price}/min</span>
                  <s className="text-xs text-red-500 font-normal">
                    ₹{astrologer.originalPrice}/min
                  </s>
                </div>

                {/* Action Communication Buttons */}
                <div className="flex items-center justify-center gap-2 w-full">
                  <button className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-slate-950 hover:scale-110 transition-all duration-200 shadow-xs cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#1b4327] flex items-center justify-center text-[#1b4327] hover:bg-[#1b4327] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="flex absolute -right-4 sm:-right-6 z-30 w-11 h-11 rounded-full bg-[#1b4327] text-white items-center justify-center shadow-lg hover:bg-[#13321d] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Next Astrologers"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* View All Astrologers Button */}
        <Link
          href="/talk-to-astrologer"
          className="mt-8 sm:mt-12 px-8 py-3 bg-[#1b4327] hover:bg-[#13321d] hover:scale-105 active:scale-95 text-white font-bold text-sm rounded-full shadow-lg transition-all duration-200"
        >
          View All Astrologers &gt;
        </Link>
      </div>
    </section>
  );
}
