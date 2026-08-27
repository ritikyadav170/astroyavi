"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

const darshans = [
  { id: 1, title: "Bihari Ji Mandir" },
  { id: 2, title: "Barshana Mandir" },
  { id: 3, title: "Salasar Mandir" },
  { id: 4, title: "Maha Kaleshwar Mandir" },
  { id: 5, title: "Bihari Ji Live Darshan" },
  { id: 6, title: "Bihari Ji Live Darshan" },
  { id: 7, title: "Bihari Ji Live Darshan" },
  { id: 8, title: "Bihari Ji Live Darshan" },
];

export function LiveDarshanSection() {
  return (
    <section className="w-full bg-[#fdf8f0] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 text-[#c87638] mb-2">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">LIVE DARSHAN</span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-8 sm:mb-12 tracking-tight">
          Witness the Divine in Real Time
        </h2>

        {/* 8 Mandir Cards Grid (2 rows x 4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-8 sm:mb-10">
          {darshans.map((item) => (
            <Link
              key={item.id}
              href="/live-darshan"
              className="bg-[#edf2fc] rounded-2xl overflow-hidden border border-[#d5e1f7] shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer"
            >
              {/* Mandir Image Container with Play Overlay */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                {/* Mandir Decorative Background Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop')`,
                  }}
                ></div>

                {/* YouTube Red Play Button Badge */}
                <div className="relative z-10 w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all">
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                </div>
              </div>

              {/* Mandir Name Footer Bar */}
              <div className="p-3.5 bg-[#edf2fc] border-t border-[#d5e1f7] flex items-center justify-start">
                <p className="font-bold text-sm text-[#1e293b] truncate">
                  {item.title}
                </p>
              </div>

            </Link>
          ))}
        </div>

        {/* View All Mandir Darshan Button */}
        <Link
          href="/live-darshan"
          className="px-8 py-3 bg-[#163014] hover:bg-[#0e210d] text-white font-bold text-sm rounded-full shadow-md transition-all"
        >
          View All Mandir Darshan &gt;
        </Link>

      </div>
    </section>
  );
}
