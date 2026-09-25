"use client";

import React from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  stateFilter: string;
  setStateFilter: (val: string) => void;
  deityFilter: string;
  setDeityFilter: (val: string) => void;
  onReset: () => void;
}

const statesList = [
  "All",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Uttarakhand",
  "Maharashtra",
  "Andhra Pradesh",
  "Gujarat",
  "Rajasthan",
  "Jammu & Kashmir",
];

const deitiesList = [
  "All",
  "Lord Krishna",
  "Lord Shiva",
  "Lord Ganesha",
  "Goddess Durga",
  "Lord Rama",
  "Lord Venkateswara",
  "Lord Hanuman",
];

export function FilterModal({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
  stateFilter,
  setStateFilter,
  deityFilter,
  setDeityFilter,
  onReset,
}: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200/80 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-4">
          <div className="flex items-center gap-2 text-[#2b1810]">
            <SlidersHorizontal className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-xl font-bold">Sort & Filter Darshan</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sort By */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900/70">
            Sort Streams By
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSortBy("popular")}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                sortBy === "popular"
                  ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                  : "bg-amber-50/50 text-slate-700 border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <span>Most Popular (Viewers)</span>
              {sortBy === "popular" && <Check className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                sortBy === "name"
                  ? "bg-[#1b4327] text-white border-[#1b4327] shadow-sm"
                  : "bg-amber-50/50 text-slate-700 border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <span>Temple Name (A-Z)</span>
              {sortBy === "name" && <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* State Filter */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900/70">
            Filter By State
          </label>
          <div className="flex flex-wrap gap-2">
            {statesList.map((state) => (
              <button
                key={state}
                onClick={() => setStateFilter(state)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  stateFilter === state
                    ? "bg-[#2b1810] text-amber-300 border-[#2b1810]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Deity Filter */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900/70">
            Filter By Deity
          </label>
          <div className="flex flex-wrap gap-2">
            {deitiesList.map((deity) => (
              <button
                key={deity}
                onClick={() => setDeityFilter(deity)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  deityFilter === deity
                    ? "bg-[#2b1810] text-amber-300 border-[#2b1810]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"
                }`}
              >
                {deity}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="text-xs font-semibold text-slate-500 hover:text-amber-800 transition-colors underline cursor-pointer"
          >
            Reset All Filters
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1b4327] hover:bg-[#13321d] text-white font-semibold text-xs rounded-full shadow-md transition-all cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
