"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function ReportsConsultCTA() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#2d1a0e] via-[#432414] to-[#2d1a0e] p-8 sm:p-12 text-white shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Personal 1-on-1 Guidance?</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Have Questions About Your Report?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Connect with verified Vedic astrologers to interpret your Kundli charts, dasha timelines, marriage compatibility, or get custom Vedic remedial guidance in real time.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-amber-200">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Confidential
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              ⚡ Available 24x7
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto shrink-0">
          <Link
            href="/talk-to-astrologer"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#c85a17] hover:from-amber-400 hover:to-[#df6d28] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Astrologer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/talk-to-astrologer"
            className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Call Astrologer</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
