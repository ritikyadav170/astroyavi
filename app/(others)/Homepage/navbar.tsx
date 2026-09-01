"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Bell,
  Calendar,
  Wallet,
  History,
  Settings,
  ArrowRight,
} from "lucide-react";
import { LoginDialog } from "./LoginDialog";

export function AstroNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("astroyavi_logged_in");
    if (storedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("astroyavi_logged_in");
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("astroyavi_logged_in", "true");
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // Helper for navbar items that require login
  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <header className="w-full relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-[#131b3e]">
            <img
              src="/images/astroyavi_logo.jpeg"
              alt="Astroyavi Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute(
                  "src",
                  "/images/logo.svg"
                );
              }}
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors duration-200">
            Astroyavi
          </span>
        </Link>

        {/* Desktop Navigation Links with Animated Underlines */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-semibold text-[#2d1a0e]">
          {/* FREE SERVICE 1: Talk to Astrologer Dropdown */}
          <div className="relative group cursor-pointer py-2">
            <div className="flex items-center gap-1 group-hover:text-[#c85a17] transition-colors">
              <Link href="/talk-to-astrologer" className="relative">
                <span>Talk to Astrologer</span>
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <ChevronDown className="w-4 h-4 text-[#3c2415]/70 group-hover:rotate-180 transition-transform duration-300" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white rounded-2xl shadow-xl border border-amber-100 p-2 min-w-[210px] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
              <Link
                href="/talk-to-astrologer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Chat with Astrologers</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/talk-to-astrologer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Call with Astrologers</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* FREE SERVICE 2: Live Darshan */}
          <Link
            href="/live-darshan"
            className="relative py-2 group hover:text-[#c85a17] transition-colors"
          >
            <span>Live Darshan</span>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* PROTECTED SERVICE 1: Horoscope Dropdown */}
          <div className="relative group cursor-pointer py-2">
            <div className="flex items-center gap-1 group-hover:text-[#c85a17] transition-colors">
              <Link href="/horoscope" onClick={handleProtectedClick} className="relative">
                <span>Horoscope</span>
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <ChevronDown className="w-4 h-4 text-[#3c2415]/70 group-hover:rotate-180 transition-transform duration-300" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white rounded-2xl shadow-xl border border-amber-100 p-2 min-w-[210px] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
              <Link
                href="/horoscope"
                onClick={handleProtectedClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Daily Horoscope</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/horoscope"
                onClick={handleProtectedClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Tomorrow Horoscope</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/horoscope"
                onClick={handleProtectedClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Weekly Horoscope</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/horoscope"
                onClick={handleProtectedClick}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-150"
              >
                <span>Monthly Horoscope</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* PROTECTED SERVICE 2: Puja Booking */}
          <Link
            href="/puja-booking"
            onClick={handleProtectedClick}
            className="relative py-2 group hover:text-[#c85a17] transition-colors"
          >
            <span>Puja Booking</span>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* PROTECTED SERVICE 3: Match Making */}
          <Link
            href="/match-making"
            onClick={handleProtectedClick}
            className="relative py-2 group hover:text-[#c85a17] transition-colors"
          >
            <span>Match Making</span>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* FREE SERVICE 3: Kundli */}
          <Link
            href="/kundli"
            className="relative py-2 group hover:text-[#c85a17] transition-colors"
          >
            <span>Kundli</span>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* FREE SERVICE 4: Panchang */}
          <Link
            href="/panchang"
            className="relative py-2 group hover:text-[#c85a17] transition-colors"
          >
            <span>Panchang</span>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Remedies link appears AFTER login */}
          {isLoggedIn && (
            <Link
              href="/puja-booking"
              className="relative py-2 group hover:text-[#c85a17] transition-colors"
            >
              <span>Remedies</span>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </nav>

        {/* Auth / Profile Section */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {isLoggedIn ? (
            /* AFTER LOGIN: Profile Avatar & User Menu Dropdown (Screenshot 2) */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-11 h-11 rounded-full border-2 border-slate-300 hover:border-[#1b4327] hover:scale-105 overflow-hidden p-0.5 shadow-sm transition-all duration-200 cursor-pointer"
                aria-label="User Profile Menu"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Rohit Kumar"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-14 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Profile Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-green-700 p-0.5 flex items-center justify-center bg-green-50 shrink-0">
                        <span className="text-xl">♈</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">
                          Rohit Kumar
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Aries
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    <Link
                      href="/wallet"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:translate-x-1 duration-150"
                    >
                      <Bell className="w-4 h-4 text-slate-500" />
                      <span>Notification</span>
                    </Link>

                    <Link
                      href="/puja-booking"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:translate-x-1 duration-150"
                    >
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>My Booking</span>
                    </Link>

                    <Link
                      href="/wallet"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:translate-x-1 duration-150"
                    >
                      <Wallet className="w-4 h-4 text-slate-500" />
                      <span>Wallet</span>
                    </Link>

                    <Link
                      href="/wallet"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:translate-x-1 duration-150"
                    >
                      <History className="w-4 h-4 text-slate-500" />
                      <span>Service History</span>
                    </Link>

                    <Link
                      href="/wallet"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:translate-x-1 duration-150"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-start gap-2 text-xs font-bold text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* BEFORE LOGIN: Sign up & Login buttons */
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signup"
                className="px-5 py-2 text-sm font-semibold text-[#2d1a0e] border border-[#2d1a0e]/60 rounded-xl hover:border-[#c85a17] hover:text-[#c85a17] hover:bg-amber-50/50 transition-all duration-200 backdrop-blur-xs"
              >
                Sign up
              </Link>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2 text-sm font-semibold text-[#2d1a0e] bg-white hover:bg-slate-50 hover:scale-105 transition-all duration-200 rounded-xl shadow-md cursor-pointer"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#2d1a0e] p-2 rounded-lg bg-amber-100/50 border border-amber-900/20 active:scale-95 transition-transform"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdf9]/95 border-b border-amber-900/20 backdrop-blur-md px-6 py-5 flex flex-col gap-4 text-[#2d1a0e] text-base font-medium shadow-xl animate-in slide-in-from-top duration-200">
          <Link
            href="/talk-to-astrologer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Talk to Astrologer
          </Link>
          <Link href="/live-darshan" onClick={() => setMobileMenuOpen(false)}>
            Live Darshan
          </Link>
          <Link
            href="/horoscope"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
          >
            Horoscope
          </Link>
          <Link
            href="/puja-booking"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
          >
            Puja Booking
          </Link>
          <Link
            href="/match-making"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
          >
            Match Making
          </Link>
          <Link href="/kundli" onClick={() => setMobileMenuOpen(false)}>
            Kundli
          </Link>
          <Link href="/panchang" onClick={() => setMobileMenuOpen(false)}>
            Panchang
          </Link>
          {isLoggedIn && (
            <Link href="/puja-booking" onClick={() => setMobileMenuOpen(false)}>
              Remedies
            </Link>
          )}
          {!isLoggedIn && (
            <div className="flex items-center gap-3 pt-2 border-t border-amber-900/10">
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-semibold border border-slate-400 rounded-lg"
              >
                Sign up
              </Link>
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-sm font-semibold bg-[#1b4327] text-white rounded-lg cursor-pointer"
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popup Login Modal */}
      <LoginDialog
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </header>
  );
}
