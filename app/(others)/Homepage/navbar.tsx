"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, User, Sparkles } from "lucide-react";
import Image from "next/image";
import { SignupDialog } from "../../auth/signup/SignupDialog";
import { formatImageUrl } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import brandLogo from "../../../assets/brand-logo";

const LogOutIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const WalletIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
);

const ScrollIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
  </svg>
);

const FlameIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export function AstroNavbar() {
  const { isLoggedIn, user, logout, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
  };

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openAuthModal();
    }
  };

  const displayName =
    typeof user?.name === "string" && user.name.trim()
      ? user.name.trim()
      : "Astroyavi User";

  const userInitial = displayName.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e6c896]/60 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Astroyavi home"
          className="group flex shrink-0 items-center rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
        >
          <Image
            src={brandLogo}
            alt="Astroyavi — Your Stars. Your Journey."
            priority
            className="h-auto w-[clamp(148px,18vw,220px)] rounded-xl bg-white object-contain shadow-sm ring-1 ring-amber-900/10 transition-shadow group-hover:shadow-md"
          />
        </Link>

        {/* Desktop Nav Links */}
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
              {["Chat with Astrologers", "Call with Astrologers"].map(
                (txt, i) => (
                  <Link
                    key={i}
                    href="/talk-to-astrologer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-200 group/link"
                  >
                    <span>{txt}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-[#c85a17] transition-colors" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Live Darshan */}
          <Link
            href="/live-darshan"
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Live Darshan</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Horoscope */}
          <div className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>

            <div className="flex items-center gap-1 text-[#2d1a0e] group-hover:text-[#c85a17] transition-colors duration-300">
              <Link
                href="/horoscope"
                onClick={handleProtectedClick}
                className="relative"
              >
                <span>Horoscope</span>
              </Link>
              <ChevronDown className="w-3.5 h-3.5 text-[#3c2415]/70 group-hover:rotate-180 group-hover:text-[#c85a17] transition-transform duration-300" />
            </div>

            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>

            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/80 p-2.5 min-w-[220px] animate-in fade-in slide-in-from-top-3 duration-200 z-50">
              {["Daily", "Tomorrow", "Weekly", "Monthly"].map((txt, i) => (
                <Link
                  key={i}
                  href="/horoscope"
                  onClick={handleProtectedClick}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-amber-50/80 text-sm font-semibold text-slate-800 transition-all hover:translate-x-1 duration-200 group/link"
                >
                  <span>{txt} Horoscope</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-[#c85a17] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Puja Booking */}
          <Link
            href="/puja-booking"
            onClick={handleProtectedClick}
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Puja Booking</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Match Making */}
          <Link
            href="/match-making"
            onClick={handleProtectedClick}
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Match Making</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Kundli */}
          <Link
            href="/kundli"
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Kundli</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Panchang */}
          <Link
            href="/panchang"
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Panchang</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Reports */}
          <Link
            href="/reports"
            className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
            <span>Reports</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
          </Link>

          {/* Remedies (After Login) */}
          {isLoggedIn && (
            <Link
              href="/puja-booking"
              className="relative group py-1.5 px-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-orange-500/15 hover:to-amber-500/10 overflow-hidden text-[#2d1a0e] hover:text-[#c85a17]"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
              <span>Remedies</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c85a17] via-amber-400 to-[#c85a17] group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_8px_#c85a17]"></span>
            </Link>
          )}
        </nav>

        {/* Authentication or Profile Header Section */}
        <div className="hidden lg:flex items-center gap-3 relative min-w-[100px] justify-end">
          {!mounted ? (
            <div className="h-9 w-20 rounded-xl bg-transparent" />
          ) : isLoggedIn ? (
            /* User Profile Icon Dropdown */
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="User Profile"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400/90 bg-[#163014] p-0.5 shadow-sm transition-all duration-300 hover:border-[#c85a17] hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center bg-[#163014]">
                  {user?.profileImage && !imgError ? (
                    <img
                      src={formatImageUrl(user.profileImage)}
                      alt={displayName}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-bold text-amber-200">
                      {userInitial}
                    </span>
                  )}
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 shadow-xs" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-amber-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  {/* Account Header / Link to Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/60 p-3 border border-amber-200/50 hover:bg-amber-100/60 transition group/acc"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#163014] text-amber-200 shadow-sm group-hover/acc:scale-105 transition-transform overflow-hidden border border-amber-300/60">
                      {user?.profileImage && !imgError ? (
                        <img
                          src={formatImageUrl(user.profileImage)}
                          alt={displayName}
                          onError={() => setImgError(true)}
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-bold text-amber-200">
                          {userInitial}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col truncate flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover/acc:text-[#c85a17] transition-colors truncate">
                          {displayName}
                        </span>
                        <Sparkles className="h-3 w-3 text-[#c85a17] shrink-0" />
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700">
                        ● Verified Account
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover/acc:text-[#c85a17] group-hover/acc:translate-x-0.5 transition-all" />
                  </Link>

                  {/* Navigation Links */}
                  <div className="my-1.5 space-y-0.5">
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-amber-50/80 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="h-4 w-4 text-[#c85a17]" />
                        <span>My Profile</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>

                    <Link
                      href="/kundli"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-amber-50/80 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <ScrollIcon className="h-4 w-4 text-amber-600" />
                        <span>My Kundli</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>

                    <Link
                      href="/puja-booking"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-amber-50/80 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <FlameIcon className="h-4 w-4 text-orange-600" />
                        <span>Puja Bookings</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>

                    <Link
                      href="/wallet"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-amber-50/80 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <WalletIcon className="h-4 w-4 text-emerald-600" />
                        <span>Wallet & Recharge</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  </div>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Logout Action */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <LogOutIcon className="h-4 w-4 text-red-500" />
                      <span>Log Out</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Sign Up / Login CTA when logged out */
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="relative group overflow-hidden px-5 py-2 text-sm font-semibold text-[#2d1a0e] border border-[#2d1a0e]/60 rounded-xl hover:border-[#c85a17] hover:text-[#c85a17] hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
                Sign up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#2d1a0e] p-2 rounded-lg bg-amber-100/50 border border-amber-900/20 active:scale-95 transition-transform duration-200"
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
        <div className="lg:hidden bg-[#fffdf9]/98 border-b border-amber-900/20 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 text-[#2d1a0e] text-base font-medium shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 absolute w-full left-0">
          {/* If Logged In, show Mobile Profile Summary */}
          {isLoggedIn && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 mb-1">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
                <div className="h-10 w-10 rounded-full bg-[#163014] text-amber-200 flex items-center justify-center shadow-xs overflow-hidden border border-amber-300/60">
                  {user?.profileImage && !imgError ? (
                    <img
                      src={formatImageUrl(user.profileImage)}
                      alt={displayName}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-bold text-amber-200">
                      {userInitial}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {displayName}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700">
                    ● View Profile
                  </div>
                </div>
              </Link>
              <Link
                href="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 text-xs font-bold text-[#c85a17] bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 shadow-xs"
              >
                <WalletIcon className="h-3.5 w-3.5" />
                <span>Wallet</span>
              </Link>
            </div>
          )}

          <Link
            href="/talk-to-astrologer"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#c85a17] transition-colors"
          >
            Talk to Astrologer
          </Link>
          <Link
            href="/live-darshan"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#c85a17] transition-colors"
          >
            Live Darshan
          </Link>
          <Link
            href="/horoscope"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
            className="hover:text-[#c85a17] transition-colors"
          >
            Horoscope
          </Link>
          <Link
            href="/puja-booking"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
            className="hover:text-[#c85a17] transition-colors"
          >
            Puja Booking
          </Link>
          <Link
            href="/match-making"
            onClick={(e) => {
              handleProtectedClick(e);
              setMobileMenuOpen(false);
            }}
            className="hover:text-[#c85a17] transition-colors"
          >
            Match Making
          </Link>
          <Link
            href="/kundli"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#c85a17] transition-colors"
          >
            Kundli
          </Link>
          <Link
            href="/panchang"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#c85a17] transition-colors"
          >
            Panchang
          </Link>
          <Link
            href="/reports"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#c85a17] transition-colors font-bold text-[#c85a17] flex items-center justify-between"
          >
            <span>Astrology Reports</span>
            <span className="text-[10px] bg-amber-100 text-[#c85a17] px-2 py-0.5 rounded-full border border-amber-300">
              New
            </span>
          </Link>
          {isLoggedIn && (
            <Link
              href="/puja-booking"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c85a17] transition-colors"
            >
              Remedies
            </Link>
          )}

          {/* Bottom Controls: Sign Up or Logout */}
          <div className="pt-4 border-t border-amber-900/10 mt-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50/80 hover:bg-red-100 border border-red-200/80 rounded-xl transition-colors cursor-pointer"
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 text-center px-4 py-2.5 text-sm font-semibold border border-[#2d1a0e]/60 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  Sign up
                </button>
                <button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold bg-[#1b4327] text-white rounded-xl active:scale-95 transition-transform"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Signup / Auth Modal */}
      <SignupDialog
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={closeAuthModal}
      />
    </header>
  );
}

export default AstroNavbar;
