"use client";

import React, { useState, useMemo } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Search, Play, X, Eye, Sparkles, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface Mandir {
  id: number;
  title: string;
  location: string;
  state: string;
  viewers: string;
  image: string;
  youtubeId: string;
}

const mockMandirs: Mandir[] = [
  {
    id: 1,
    title: "Bihari Ji Mandir",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "12.4k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Barshana Mandir",
    location: "Barsana",
    state: "Uttar Pradesh",
    viewers: "8.9k",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Salasar Mandir",
    location: "Salasar",
    state: "Rajasthan",
    viewers: "15.2k",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Maha Kaleshwar Mandir",
    location: "Ujjain",
    state: "Madhya Pradesh",
    viewers: "28.6k",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "9.1k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "11.3k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "7.8k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "14.0k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 9,
    title: "Bihari Ji Mandir",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "10.5k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 10,
    title: "Barshana Mandir",
    location: "Barsana",
    state: "Uttar Pradesh",
    viewers: "6.4k",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 11,
    title: "Salasar Mandir",
    location: "Salasar",
    state: "Rajasthan",
    viewers: "13.1k",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 12,
    title: "Maha Kaleshwar Mandir",
    location: "Ujjain",
    state: "Madhya Pradesh",
    viewers: "22.0k",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 13,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "8.4k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 14,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "12.8k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 15,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "10.1k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 16,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "9.7k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 17,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "11.9k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 18,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "15.4k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 19,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "7.2k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 20,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "18.3k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 21,
    title: "Bihari Ji Mandir",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "14.2k",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 22,
    title: "Barshana Mandir",
    location: "Barsana",
    state: "Uttar Pradesh",
    viewers: "9.5k",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 23,
    title: "Salasar Mandir",
    location: "Salasar",
    state: "Rajasthan",
    viewers: "16.8k",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 24,
    title: "Maha Kaleshwar Mandir",
    location: "Ujjain",
    state: "Madhya Pradesh",
    viewers: "31.0k",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function LiveDarshanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMandir, setActiveMandir] = useState<Mandir | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Filter Mandirs based on search input
  const filteredMandirs = useMemo(() => {
    return mockMandirs.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Page Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-3 text-[#c87638] mb-2">
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
            <span className="text-xs font-bold uppercase tracking-widest">LIVE DARSHAN</span>
            <div className="h-[1px] w-16 bg-[#c87638]"></div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] tracking-tight">
            Witness the Divine in Real Time
          </h1>
        </div>

        {/* Centered Search Bar */}
        <div className="relative w-full max-w-md mb-12">
          <input
            type="text"
            placeholder="Search Live Mandir..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e6c896] rounded-full py-3 pl-6 pr-12 text-sm text-[#2b1810] placeholder:text-[#8c6d58] focus:outline-none focus:border-[#1b4327] shadow-xs"
          />
          <Search className="w-5 h-5 text-[#8c6d58] absolute right-5 top-1/2 -translate-y-1/2" />
        </div>

        {/* 24 Mandir Cards Grid (4 columns x 6 rows) */}
        {filteredMandirs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-16">
            {filteredMandirs.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => setActiveMandir(item)}
                className="bg-[#edf2fc] rounded-2xl overflow-hidden border border-[#d5e1f7] shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer"
              >
                {/* Mandir Image Container with Play Overlay */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  ></div>

                  {/* Top Live Badge & Viewers Counter */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      LIVE
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Eye className="w-3 h-3 text-red-400" />
                      {item.viewers}
                    </span>
                  </div>

                  {/* YouTube Red Play Button Badge */}
                  <div className="relative z-20 w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  </div>
                </div>

                {/* Mandir Name Footer Bar */}
                <div className="p-3.5 bg-[#edf2fc] border-t border-[#d5e1f7] flex items-center justify-start">
                  <p className="font-bold text-sm text-[#1e293b] truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-3xl p-12 border border-[#e6c896] text-center max-w-lg mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
              🛕
            </div>
            <h3 className="font-bold text-xl text-[#2b1810]">No Mandir Found</h3>
            <p className="text-sm text-[#5c4033]">
              Try searching with another temple name or location.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 bg-[#1b4327] text-white rounded-full text-xs font-semibold hover:bg-[#13321d] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      {/* Live Video Player Modal */}
      {activeMandir && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {activeMandir.title} - Live Stream
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeMandir.location}, {activeMandir.state} • {activeMandir.viewers} Watching Now
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveMandir(null)}
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all"
                aria-label="Close Video Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeMandir.image}
                alt={activeMandir.title}
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Overlay Gradient & Stream Simulation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

              {/* Watermark / Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-md tracking-wide">
                  ● LIVE DARSHAN
                </span>
                <span className="bg-black/60 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Divine Stream
                </span>
              </div>

              {/* Video Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10 bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-amber-400 transition-colors p-1"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-slate-300 text-[11px]">LIVE 00:45:12</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold text-[11px]">HD 1080p</span>
                  <button className="hover:text-amber-400 transition-colors p-1">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom Blessing Message */}
            <div className="p-4 bg-amber-950/40 text-amber-200 text-xs text-center border-t border-amber-900/30">
              🪔 May the divine blessings of {activeMandir.title} bring peace, health, and prosperity to your family.
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
