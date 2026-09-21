"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "../pujaBooking";

interface PujaToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function PujaToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: PujaToolbarProps) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <>
      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Left Controls: Search Bar & Sort/Filter Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Search Input Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pujas..."
              className="w-full bg-white border border-slate-300 rounded-full py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E3B2B] shadow-2xs transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Sort & Filter Button */}
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="flex items-center justify-center gap-2 bg-white border border-slate-300 rounded-full px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <span>Sort &amp; Filter</span>
          </button>
        </div>

        {/* Right Controls: Category Filter Chips (Pills) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all shrink-0 cursor-pointer ${isActive
                    ? "bg-[#1E3B2B] text-white shadow-sm"
                    : "bg-white border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Drawer / Quick Modal if clicked Sort & Filter */}
      {showFilterModal && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-base text-slate-900">
              Filter Pujas
            </h3>
            <button
              onClick={() => setShowFilterModal(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowFilterModal(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${selectedCategory === cat
                    ? "bg-[#1E3B2B] text-white border-[#1E3B2B]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
