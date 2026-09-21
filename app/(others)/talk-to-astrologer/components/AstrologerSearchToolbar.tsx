"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { filterCategories } from "../talkToAstrologer";

interface AstrologerSearchToolbarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function AstrologerSearchToolbar({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: AstrologerSearchToolbarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <>
      {/* Section Header Ornament & Title */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            TOP ASTROLOGERS
          </span>
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
              className="flex items-center gap-2 bg-white border border-[#e6c896] hover:border-[#1b4327] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#2b1810] shadow-xs transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#1b4327]" />
              <span>Sort &amp; Filter</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none w-full flex-wrap sm:flex-nowrap">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${activeCategory === cat
                  ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                  : "bg-white text-[#2b1810] border-[#e6c896] hover:border-[#1b4327]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
