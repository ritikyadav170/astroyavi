"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Search, SlidersHorizontal, Star, MessageSquare, Phone, Video } from "lucide-react";

interface Astrologer {
  id: number;
  name: string;
  specialty: string;
  category: string;
  rating: string;
  reviewsCount: number;
  experienceYears: number;
  price: number;
  originalPrice: number;
  initials: string;
  bgColor: string;
  isOnline: boolean;
}

const filterCategories = [
  "All Astrologers",
  "Vedic Astrology",
  "Tarot Reading",
  "Vastu",
  "Numerology",
  "KP Astrology",
  "Face Reading",
  "Nadi Astrology",
];

const mockAstrologers: Astrologer[] = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 3,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    category: "Vastu",
    rating: "5.0",
    reviewsCount: 1150,
    experienceYears: 10,
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
    isOnline: true,
  },
  {
    id: 4,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    category: "Numerology",
    rating: "5.0",
    reviewsCount: 890,
    experienceYears: 7,
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
    isOnline: true,
  },
  {
    id: 5,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    category: "Nadi Astrology",
    rating: "5.0",
    reviewsCount: 2100,
    experienceYears: 15,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
    isOnline: true,
  },
  {
    id: 6,
    name: "Acharya Ankit",
    specialty: "KP Astrology, Vedic",
    category: "KP Astrology",
    rating: "4.9",
    reviewsCount: 1640,
    experienceYears: 11,
    price: 25,
    originalPrice: 40,
    initials: "AA",
    bgColor: "bg-indigo-800",
    isOnline: true,
  },
  {
    id: 7,
    name: "Meenakshi Devi",
    specialty: "Tarot Reading, Numerology",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 750,
    experienceYears: 6,
    price: 18,
    originalPrice: 28,
    initials: "MD",
    bgColor: "bg-purple-800",
    isOnline: true,
  },
  {
    id: 8,
    name: "Pt. Rameshwar Prasad",
    specialty: "Vedic Astrology, Vastu",
    category: "Vedic Astrology",
    rating: "4.9",
    reviewsCount: 3200,
    experienceYears: 22,
    price: 35,
    originalPrice: 50,
    initials: "RP",
    bgColor: "bg-red-900",
    isOnline: true,
  },
  {
    id: 9,
    name: "Dr. Sunita Rao",
    specialty: "Face Reading, Palmistry",
    category: "Face Reading",
    rating: "4.8",
    reviewsCount: 620,
    experienceYears: 9,
    price: 22,
    originalPrice: 32,
    initials: "SR",
    bgColor: "bg-teal-800",
    isOnline: true,
  },
  {
    id: 10,
    name: "Guruji Devendra",
    specialty: "Nadi Astrology, Prashna Kundli",
    category: "Nadi Astrology",
    rating: "5.0",
    reviewsCount: 1890,
    experienceYears: 14,
    price: 30,
    originalPrice: 45,
    initials: "GD",
    bgColor: "bg-blue-900",
    isOnline: true,
  },
  {
    id: 11,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 12,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 13,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    category: "Vastu",
    rating: "5.0",
    reviewsCount: 1150,
    experienceYears: 10,
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
    isOnline: true,
  },
  {
    id: 14,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    category: "Numerology",
    rating: "5.0",
    reviewsCount: 890,
    experienceYears: 7,
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
    isOnline: true,
  },
  {
    id: 15,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    category: "Nadi Astrology",
    rating: "5.0",
    reviewsCount: 2100,
    experienceYears: 15,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
    isOnline: true,
  },
  {
    id: 16,
    name: "Pooja Shastri",
    specialty: "Numerology, Gemology",
    category: "Numerology",
    rating: "4.9",
    reviewsCount: 540,
    experienceYears: 6,
    price: 19,
    originalPrice: 29,
    initials: "PS",
    bgColor: "bg-pink-800",
    isOnline: true,
  },
  {
    id: 17,
    name: "Acharya Rajesh",
    specialty: "Vedic Astrology, KP System",
    category: "KP Astrology",
    rating: "4.9",
    reviewsCount: 1280,
    experienceYears: 13,
    price: 24,
    originalPrice: 36,
    initials: "AR",
    bgColor: "bg-cyan-900",
    isOnline: true,
  },
  {
    id: 18,
    name: "Kavita Joshi",
    specialty: "Tarot Reading, Aura Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 820,
    experienceYears: 9,
    price: 21,
    originalPrice: 32,
    initials: "KJ",
    bgColor: "bg-violet-800",
    isOnline: true,
  },
  {
    id: 19,
    name: "Pt. Gopal Krishan",
    specialty: "Vastu Specialist, Muhurat",
    category: "Vastu",
    rating: "4.8",
    reviewsCount: 1940,
    experienceYears: 18,
    price: 28,
    originalPrice: 40,
    initials: "GK",
    bgColor: "bg-yellow-900",
    isOnline: true,
  },
  {
    id: 20,
    name: "Nidhi Tripathi",
    specialty: "Face Reading, Astro Vastu",
    category: "Face Reading",
    rating: "5.0",
    reviewsCount: 910,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "NT",
    bgColor: "bg-rose-800",
    isOnline: true,
  },
  {
    id: 21,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 22,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 23,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    category: "Vastu",
    rating: "5.0",
    reviewsCount: 1150,
    experienceYears: 10,
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
    isOnline: true,
  },
  {
    id: 24,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    category: "Numerology",
    rating: "5.0",
    reviewsCount: 890,
    experienceYears: 7,
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
    isOnline: true,
  },
  {
    id: 25,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    category: "Nadi Astrology",
    rating: "5.0",
    reviewsCount: 2100,
    experienceYears: 15,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
    isOnline: true,
  },
];

export default function TalkToAstrologerPage() {
  const [activeCategory, setActiveCategory] = useState("All Astrologers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filter & Sort Astrologers
  const filteredAstrologers = useMemo(() => {
    return mockAstrologers
      .filter((astro) => {
        const matchesCategory =
          activeCategory === "All Astrologers" ||
          astro.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          astro.specialty.toLowerCase().includes(activeCategory.toLowerCase());

        const matchesSearch =
          astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          astro.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_low") return a.price - b.price;
        if (sortBy === "price_high") return b.price - a.price;
        if (sortBy === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
        if (sortBy === "experience") return b.experienceYears - a.experienceYears;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Header Navigation */}
      <AstroNavbar />

      {/* Main Content Area */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* Section Header Ornament & Title */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="flex items-center gap-3 text-[#c87638] mb-2">
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
            <span className="text-xs font-bold uppercase tracking-widest">TOP ASTROLOGERS</span>
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight">
            Consult Our Expert Astrologers
          </h1>
        </div>

        {/* Search, Sort & Category Filters Bar */}
        <div className="flex flex-col gap-6 mb-10 w-full">
          
          {/* Top Controls: Search Input & Sort/Filter Button */}
          <div className="flex items-center gap-3 w-full justify-between flex-wrap">
            
            {/* Search Input Box */}
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <input
                type="text"
                placeholder="Search Astrologers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#e6c896] rounded-full py-2.5 pl-5 pr-11 text-sm text-[#2b1810] placeholder:text-[#8c6d58] focus:outline-none focus:border-[#1b4327] shadow-xs"
              />
              <Search className="w-4 h-4 text-[#8c6d58] absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort Astrologers"
                  className="bg-white border border-[#e6c896] rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2b1810] focus:outline-none focus:border-[#1b4327] shadow-xs cursor-pointer appearance-none pr-8"
                >
                  <option value="popular">Sort: Popularity</option>
                  <option value="rating">Sort: High Rating</option>
                  <option value="experience">Sort: Experience</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#2b1810] text-xs">
                  ▼
                </div>
              </div>

              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="flex items-center gap-2 bg-white border border-[#e6c896] hover:border-[#1b4327] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#2b1810] shadow-xs transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#1b4327]" />
                <span>Sort & Filter</span>
              </button>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none w-full flex-wrap sm:flex-nowrap">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                    : "bg-white text-[#2b1810] border-[#e6c896] hover:border-[#1b4327]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Astrologers 5-Column Grid */}
        {filteredAstrologers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
            {filteredAstrologers.map((astrologer, index) => (
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
                      <span className="text-[9px] font-bold text-green-700 uppercase">Online</span>
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

                {/* Green Chat Button (exact match to screenshot design) */}
                <button className="w-full py-2 px-4 rounded-full border border-emerald-600 text-emerald-700 bg-emerald-50/50 hover:bg-[#1b4327] hover:text-white hover:border-[#1b4327] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs mt-auto">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-bold text-xl text-[#2b1810]">No Astrologers Found</h3>
            <p className="text-sm text-[#5c4033]">
              Try resetting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Astrologers");
                setSearchQuery("");
              }}
              className="px-6 py-2 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
