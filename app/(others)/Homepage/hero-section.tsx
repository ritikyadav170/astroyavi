"use client";

import { AstroNavbar } from "./navbar";
import { FeatureBadges } from "./feature-badges";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#fdf8f0] overflow-hidden flex flex-col justify-between">

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-right-top bg-no-repeat opacity-95 pointer-events-none z-0"
        style={{ backgroundImage: `url('/images/hero-background.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f0] via-[#fdf8f0]/95 sm:via-[#fdf8f0]/85 to-transparent"></div>
      </div>

      {/* Top Navbar */}
      <AstroNavbar />

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">

            {/* Ornament */}
            <div className="flex items-center gap-3 w-full justify-center lg:justify-start text-[#c87638]">
              <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-transparent to-[#c87638]"></div>
              <div className="flex items-center gap-1 text-xs">
                <span>◆</span>
                <span className="text-base">❁</span>
                <span>◆</span>
              </div>
              <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-l from-transparent to-[#c87638]"></div>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#2b1810] leading-[1.05]">
                Your Life.
              </h1>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#2b1810] leading-[1.05]">
                Guided by <span className="text-[#c85a17]">Stars.</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <div className="space-y-1 text-base sm:text-xl font-medium text-[#4a3020]/90 leading-relaxed font-sans max-w-xl">
              <p>Consult Expert Astrologers • Book Pujas • Live Darshan</p>
              <p>Check Panchang • Match Kundli & More</p>
            </div>

            {/* Accent Ornament */}
            <div className="flex items-center gap-2 text-[#c87638] text-xs pt-1 justify-center lg:justify-start">
              <div className="h-[1px] w-12 bg-[#c87638]/50"></div>
              <span>◆</span>
              <div className="h-[1px] w-12 bg-[#c87638]/50"></div>
            </div>

            {/* 5 Feature Badges */}
            <FeatureBadges />

          </div>

          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center min-h-[400px]">
          </div>

        </div>
      </div>
    </section>
  );
}
