"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft } from "lucide-react";

interface MandirToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  onOpenFilterModal: () => void;
  activeFilterCount: number;
}

export function MandirToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  onOpenFilterModal,
  activeFilterCount,
}: MandirToolbarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 mb-8">
      {/* Breadcrumb Header */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/" className="hover:text-amber-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-slate-800 font-semibold">Live Darshan</span>
      </nav>

      {/* Main Search Bar & Sort/Filter Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Live Darshan, Mandirs, Deities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e2d5c3] rounded-full py-3 pl-6 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1b4327] focus:ring-2 focus:ring-[#1b4327]/10 shadow-xs transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center bg-slate-100 cursor-pointer"
            >
              ✕
            </button>
          ) : (
            <Search className="w-4 h-4 text-slate-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}
        </div>

        {/* Sort & Filter Button */}
        <button
          onClick={onOpenFilterModal}
          className="px-5 py-3 bg-white border border-[#e2d5c3] hover:border-[#1b4327] rounded-full text-xs font-semibold text-slate-700 hover:text-[#1b4327] flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-600" />
          <span>Sort & Filter</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-[#1b4327] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Pills Slider */}
      <div className="relative w-full flex items-center group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-600 shadow-md hover:bg-white -translate-x-3 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 w-full scroll-smooth"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1b4327] text-white shadow-md border border-[#1b4327]"
                    : "bg-white text-slate-700 border border-[#e2d5c3] hover:border-amber-400 hover:bg-amber-50/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-600 shadow-md hover:bg-white translate-x-3 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
