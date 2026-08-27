"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export function AstroNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-105 transition-transform bg-[#131b3e]">
            <img
              src="/images/astroyavi_logo.jpeg"
              alt="Astroyavi Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Fallback to logo.svg if jfif fails
                (e.target as HTMLElement).setAttribute("src", "/images/logo.svg");
              }}
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1a0e]">
            Astroyavi
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-[#2d1a0e]">
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#c85a17] transition-colors">
            <Link href="/talk-to-astrologer">Talk to Astrologer</Link>
            <ChevronDown className="w-4 h-4 text-[#3c2415]/70 group-hover:rotate-180 transition-transform" />
          </div>

          <Link href="/live-darshan" className="hover:text-[#c85a17] transition-colors">
            Live Darshan
          </Link>

          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#c85a17] transition-colors">
            <Link href="/horoscope">Horoscope</Link>
            <ChevronDown className="w-4 h-4 text-[#3c2415]/70 group-hover:rotate-180 transition-transform" />
          </div>

          <Link href="/puja-booking" className="hover:text-[#c85a17] transition-colors">
            Puja Booking
          </Link>

          <Link href="/match-making" className="hover:text-[#c85a17] transition-colors">
            Match Making
          </Link>

          <Link href="/kundli" className="hover:text-[#c85a17] transition-colors">
            Kundli
          </Link>

          <Link href="/panchang" className="hover:text-[#c85a17] transition-colors">
            Panchang
          </Link>
        </nav>

        {/* Auth Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="px-5 py-1.5 text-sm font-semibold text-[#2d1a0e] border border-[#3c2415]/60 rounded-lg hover:border-[#c85a17] hover:text-[#c85a17] transition-all bg-white/30 backdrop-blur-xs"
          >
            Sign up
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-1.5 text-sm font-semibold text-[#2d1a0e] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#2d1a0e] p-2 rounded-lg bg-amber-100/50 border border-amber-900/20"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdf9]/95 border-b border-amber-900/20 backdrop-blur-md px-6 py-5 flex flex-col gap-4 text-[#2d1a0e] text-base font-medium shadow-xl">
          <Link href="/talk-to-astrologer" onClick={() => setMobileMenuOpen(false)}>Talk to Astrologer</Link>
          <Link href="/live-darshan" onClick={() => setMobileMenuOpen(false)}>Live Darshan</Link>
          <Link href="/horoscope" onClick={() => setMobileMenuOpen(false)}>Horoscope</Link>
          <Link href="/puja-booking" onClick={() => setMobileMenuOpen(false)}>Puja Booking</Link>
          <Link href="/match-making" onClick={() => setMobileMenuOpen(false)}>Match Making</Link>
          <Link href="/kundli" onClick={() => setMobileMenuOpen(false)}>Kundli</Link>
          <Link href="/panchang" onClick={() => setMobileMenuOpen(false)}>Panchang</Link>
        </div>
      )}
    </header>
  );
}
