"use client";

import React from "react";
import Link from "next/link";
import { PujaItem } from "../pujaBookingApi";

interface PujaGridProps {
  pujas: PujaItem[];
  onResetFilters: () => void;
}

export function PujaGrid({ pujas, onResetFilters }: PujaGridProps) {
  if (pujas.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200 shadow-xs mb-16">
        <p className="text-lg font-semibold text-slate-700 mb-2">
          No Pujas found matching your search.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Try adjusting your search terms or selecting a different category.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-2.5 bg-[#1E3B2B] text-white font-medium text-sm rounded-full shadow-md hover:bg-[#152a1e] transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
      {pujas.map((puja, index) => {
        const slug = puja.name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={`${puja.id}-${index}`}
            href={`/puja-booking/${slug}`}
            className="bg-white rounded-[22px] overflow-hidden border border-slate-200/70 shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
          >
            {/* Puja Image */}
            <div className="h-[210px] w-full overflow-hidden relative bg-amber-50">
              <img
                src={puja.image}
                alt={puja.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute(
                    "src",
                    "/images/puja/ganesh_puja.jpg"
                  );
                }}
              />
            </div>

            {/* Puja Name Strip Container */}
            <div className="bg-[#eef3fe] py-3.5 px-4 text-center flex items-center justify-center rounded-b-[22px] border-t border-blue-50/50">
              <h3 className="font-bold text-base text-[#1e293b] tracking-tight group-hover:text-[#1E3B2B] transition-colors">
                {puja.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
