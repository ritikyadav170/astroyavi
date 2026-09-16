"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Bell, Calendar, Wallet, History, Settings, ArrowRight } from "lucide-react";
import { LoginDialog } from "./LoginDialog";

export function AstroNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("astroyavi_logged_in");
    if (storedAuth === "true") setIsLoggedIn(true);
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

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdf8f0]/95 backdrop-blur-md border-b border-[#e6c896]/60 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">

        {/* Logo with Gold Aura Glow */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-110 group-hover:rotate-[15deg] group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 ease-out bg-[#131b3e]">
            <img src="/images/astroyavi_logo.jpeg" alt="Astroyavi Logo" className="w-full h-full object-cover rounded-full" onError={(e) => { (e.target as HTMLElement).setAttribute("src", "/images/logo.svg"); }} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors duration-300">
            Astroyavi
          </span>
        </Link>

        {/* Desktop Nav Links with Reflection Sheen & Golden Glow */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14.5px] font-semibold text-[#2d1a0e]">
          
          {/* Talk to Astrologer */}
          <div className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            
            <div className="flex items-center gap-1 text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors duration-300">
              <Link href="/talk-to-astrologer" className="relative">
                <span>Talk to Astrologer</span>
              </Link>
              <ChevronDown className="w-3.5 h-3.5 text-[#3c2415]/70 group-hover:rotate-180 group-hover:text-[#c85a17] transition-transform duration-300" />
            </div>

            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/80 p-2.5 min-w-[220px] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
              {['Chat with Astrologers', 'Call with Astrologers'].map((txt, i) => (
                <Link key={i} href="/talk-to-astrologer" className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-200 group/link">
                  <span>{txt}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-[#c85a17] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Live Darshan */}
          <Link href="/live-darshan" className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Live Darshan</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Horoscope */}
          <div className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            
            <div className="flex items-center gap-1 text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors duration-300">
              <Link href="/horoscope" onClick={handleProtectedClick} className="relative">
                <span>Horoscope</span>
              </Link>
              <ChevronDown className="w-3.5 h-3.5 text-[#3c2415]/70 group-hover:rotate-180 group-hover:text-[#c85a17] transition-transform duration-300" />
            </div>

            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>

            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/80 p-2.5 min-w-[220px] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
              {['Daily', 'Tomorrow', 'Weekly', 'Monthly'].map((txt, i) => (
                <Link key={i} href="/horoscope" onClick={handleProtectedClick} className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-200 group/link">
                  <span>{txt} Horoscope</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-[#c85a17] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Puja Booking */}
          <Link href="/puja-booking" onClick={handleProtectedClick} className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Puja Booking</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Match Making */}
          <Link href="/match-making" onClick={handleProtectedClick} className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Match Making</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Kundli */}
          <Link href="/kundli" className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Kundli</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Panchang */}
          <Link href="/panchang" className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Panchang</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Remedies (After Login) */}
          {isLoggedIn && (
            <Link href="/puja-booking" className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
              <span>Remedies</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
            </Link>
          )}
        </nav>

        {/* Buttons / Profile */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-11 h-11 rounded-full border-2 border-slate-300 hover:border-[#1b4327] hover:scale-105 hover:shadow-[0_0_15px_rgba(27,67,39,0.3)] overflow-hidden p-0.5 transition-all duration-300 cursor-pointer"
                aria-label="User Profile Menu"
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Rohit Kumar" className="w-full h-full object-cover rounded-full" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-14 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-green-700 p-0.5 flex items-center justify-center bg-green-50 shrink-0">
                        <span className="text-xl">♈</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">Rohit Kumar</h4>
                        <p className="text-xs text-slate-500 font-medium">Aries</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {[
                      { icon: Bell, label: "Notification" },
                      { icon: Calendar, label: "My Booking" },
                      { icon: Wallet, label: "Wallet" },
                      { icon: History, label: "Service History" },
                      { icon: Settings, label: "Settings" }
                    ].map((item, i) => (
                      <Link key={i} href="/wallet" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1b4327] transition-all hover:translate-x-1 duration-200">
                        <item.icon className="w-4 h-4 opacity-70" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button onClick={handleLogout} className="w-full flex items-center justify-start gap-3 text-xs font-bold text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all duration-200 cursor-pointer group">
                      <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/signup" className="relative group overflow-hidden px-5 py-2 text-sm font-semibold text-[#2d1a0e] border border-[#2d1a0e]/60 rounded-xl hover:border-[#c85a17] hover:text-[#c85a17] hover:shadow-sm transition-all duration-300">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
                Sign up
              </Link>
              
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="relative group overflow-hidden px-6 py-2 text-sm font-semibold text-white bg-[#1b4327] hover:bg-[#13321d] hover:scale-105 hover:shadow-[0_0_20px_rgba(27,67,39,0.35)] transition-all duration-300 rounded-xl cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#2d1a0e] p-2 rounded-lg bg-amber-100/50 border border-amber-900/20 active:scale-95 transition-transform duration-200" aria-label="Toggle Navigation">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdf9]/98 border-b border-amber-900/20 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 text-[#2d1a0e] text-base font-medium shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 absolute w-full left-0">
          <Link href="/talk-to-astrologer" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c85a17] transition-colors">Talk to Astrologer</Link>
          <Link href="/live-darshan" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c85a17] transition-colors">Live Darshan</Link>
          <Link href="/horoscope" onClick={(e) => { handleProtectedClick(e); setMobileMenuOpen(false); }} className="hover:text-[#c85a17] transition-colors">Horoscope</Link>
          <Link href="/puja-booking" onClick={(e) => { handleProtectedClick(e); setMobileMenuOpen(false); }} className="hover:text-[#c85a17] transition-colors">Puja Booking</Link>
          <Link href="/match-making" onClick={(e) => { handleProtectedClick(e); setMobileMenuOpen(false); }} className="hover:text-[#c85a17] transition-colors">Match Making</Link>
          <Link href="/kundli" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c85a17] transition-colors">Kundli</Link>
          <Link href="/panchang" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c85a17] transition-colors">Panchang</Link>
          {isLoggedIn && <Link href="/puja-booking" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c85a17] transition-colors">Remedies</Link>}

          {!isLoggedIn && (
            <div className="flex items-center gap-3 pt-4 border-t border-amber-900/10 mt-2">
              <Link href="/auth/signup" className="flex-1 text-center px-4 py-2.5 text-sm font-semibold border border-[#2d1a0e]/60 rounded-xl hover:bg-amber-50 transition-colors">Sign up</Link>
              <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="flex-1 px-4 py-2.5 text-sm font-semibold bg-[#1b4327] text-white rounded-xl active:scale-95 transition-transform">Login</button>
            </div>
          )}
        </div>
      )}

      <LoginDialog isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
    </header>
  );
}