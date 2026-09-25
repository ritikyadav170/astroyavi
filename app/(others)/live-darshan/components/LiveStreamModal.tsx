"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Bell,
  Heart,
  Send,
  Flame,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Mandir } from "../liveDarshan";

interface LiveStreamModalProps {
  mandir: Mandir;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
}

export function LiveStreamModal({ mandir, onClose }: LiveStreamModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [flowerCount, setFlowerCount] = useState(0);
  const [diyaLit, setDiyaLit] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "info">("chat");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", user: "Ramesh Sharma", text: "Jai Shree Krishna! 🙏", time: "Just now" },
    { id: "2", user: "Pooja Verma", text: "Har Har Mahadev! Divine Darshan! 🪔", time: "1m ago" },
    { id: "3", user: "Anand Kumar", text: "May all be blessed with peace and health.", time: "2m ago" },
  ]);

  // Web Audio API Temple Bell Sound Synthesizer
  const playBellSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
      masterGain.connect(ctx.destination);

      // Bell frequencies harmonics
      const freqs = [587.33, 1174.66, 1762.0, 2349.3]; // D5 note harmonics
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const volume = 0.5 / (idx + 1);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (2.5 - idx * 0.4));

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 3.0);
      });
    } catch (e) {
      console.log("Audio play error:", e);
    }
  };

  const handleRingBell = () => {
    setBellRinging(true);
    playBellSound();
    setTimeout(() => setBellRinging(false), 800);
  };

  const handleOfferFlower = () => {
    setFlowerCount((prev) => prev + 1);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      text: chatInput,
      time: "Just now",
    };

    setChatMessages((prev) => [newMsg, ...prev]);
    setChatInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-amber-100 flex items-center gap-2">
                {mandir.title}
                <span className="text-[10px] font-normal uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40">
                  {mandir.status}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                📍 {mandir.location}, {mandir.state} • {mandir.viewers} Devotees Watching
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: mandir.title, url: window.location.href });
                }
              }}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share Stream"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Video Player + Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-y-auto">
          {/* Video Section (Left 2 cols) */}
          <div className="lg:col-span-2 bg-black relative flex flex-col justify-between overflow-hidden">
            {/* Embedded Video / Interactive Screen */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={mandir.image}
                alt={mandir.title}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Live Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>

              {/* Floating Live Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LIVE DARSHAN
                </span>
                <span className="bg-black/60 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 1080p HD
                </span>
              </div>

              {/* Floating Flower Offering Effect */}
              {flowerCount > 0 && (
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  {Array.from({ length: Math.min(flowerCount * 5, 25) }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-2xl animate-bounce"
                      style={{
                        left: `${(i * 17 + 5) % 90}%`,
                        top: `${(i * 23 + 10) % 70}%`,
                        animationDuration: `${1.5 + (i % 3) * 0.5}s`,
                      }}
                    >
                      🌸
                    </div>
                  ))}
                </div>
              )}

              {/* Floating Bell Animation overlay */}
              {bellRinging && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-amber-500/10 backdrop-blur-[1px] animate-in fade-in">
                  <div className="animate-wiggle text-amber-400 text-7xl filter drop-shadow-2xl">
                    🔔
                  </div>
                </div>
              )}

              {/* Virtual Diya Glow Effect */}
              {diyaLit && (
                <div className="absolute bottom-16 left-6 right-6 z-10 flex justify-between pointer-events-none opacity-90">
                  <span className="text-3xl animate-pulse">🪔</span>
                  <span className="text-3xl animate-pulse delay-150">🪔</span>
                  <span className="text-3xl animate-pulse delay-300">🪔</span>
                </div>
              )}

              {/* Video Bottom Control Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-white text-xs bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-amber-400 transition-colors p-1 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-slate-300 text-[11px]">
                    LIVE STREAM • 24/7 ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {mandir.aartiTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Puja Actions Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-around gap-3">
              {/* Ring Bell */}
              <button
                onClick={handleRingBell}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Bell className={`w-4 h-4 ${bellRinging ? "animate-spin" : ""}`} />
                <span>Ring Temple Bell 🔔</span>
              </button>

              {/* Offer Flowers */}
              <button
                onClick={handleOfferFlower}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Offer Flowers 🌸 ({flowerCount})</span>
              </button>

              {/* Light Diya Toggle */}
              <button
                onClick={() => setDiyaLit(!diyaLit)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer ${
                  diyaLit
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{diyaLit ? "Diyas Lit 🪔" : "Light Diyas"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Chat / Info Panel (Right Col) */}
          <div className="bg-slate-900 border-l border-slate-800 flex flex-col h-[400px] lg:h-auto">
            {/* Panel Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-950">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "chat"
                    ? "text-amber-400 border-b-2 border-amber-400 bg-slate-900/50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Devotees Chat</span>
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "info"
                    ? "text-amber-400 border-b-2 border-amber-400 bg-slate-900/50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Temple Info</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "chat" ? (
              <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                {/* Message Stream */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-amber-300">{msg.user}</span>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-sans">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Send a prayer or blessing..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-amber-400 text-sm mb-1">About {mandir.title}</h4>
                  <p className="leading-relaxed text-slate-400">
                    Located in {mandir.location}, {mandir.state}. Millions of devotees seek peace and divine grace through live morning & evening Aarti rituals.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                  <div className="font-bold text-amber-300">🪔 Daily Aarti Schedule</div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Morning Mangla Aarti</span>
                    <span className="font-mono text-amber-200">05:00 AM</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Shringar Darshan</span>
                    <span className="font-mono text-amber-200">08:00 AM</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Sandhya Aarti</span>
                    <span className="font-mono text-amber-200">07:00 PM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-amber-950/60 text-amber-200 text-xs text-center border-t border-amber-900/40">
          🪔 May the divine light of {mandir.title} bring eternal joy, health, and peace to your life.
        </div>
      </div>
    </div>
  );
}
