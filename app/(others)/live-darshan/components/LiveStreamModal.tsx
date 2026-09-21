"use client";

import React, { useState } from "react";
import { X, Sparkles, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Mandir } from "../liveDarshan";

interface LiveStreamModalProps {
  mandir: Mandir;
  onClose: () => void;
}

export function LiveStreamModal({ mandir, onClose }: LiveStreamModalProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {mandir.title} - Live Stream
              </h3>
              <p className="text-xs text-slate-400">
                {mandir.location}, {mandir.state} • {mandir.viewers} Watching
                Now
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close Video Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={mandir.image}
            alt={mandir.title}
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
                className="hover:text-amber-400 transition-colors p-1 cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <span className="font-mono text-slate-300 text-[11px]">
                LIVE 00:45:12
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold text-[11px]">
                HD 1080p
              </span>
              <button className="hover:text-amber-400 transition-colors p-1 cursor-pointer">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Blessing Message */}
        <div className="p-4 bg-amber-950/40 text-amber-200 text-xs text-center border-t border-amber-900/30">
          🪔 May the divine blessings of {mandir.title} bring peace, health, and
          prosperity to your family.
        </div>
      </div>
    </div>
  );
}
