"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";

import {
  signOptions,
  getHoroscopeData,
  ZodiacSignName,
  TimePeriod,
  CategorySection,
} from "./horoscopeApi";
import { ZodiacHeader } from "./components/ZodiacHeader";
import { HoroscopeDetails } from "./components/HoroscopeDetails";
import { RecommendedAstrologers } from "./components/RecommendedAstrologers";

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] =
    useState<ZodiacSignName>("Aries");
  const [selectedPeriod, setSelectedPeriod] =
    useState<TimePeriod>("Daily");
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const activeSign = useMemo(
    () =>
      signOptions.find((sign) => sign.name === selectedSign) ?? signOptions[0],
    [selectedSign]
  );

  // Fetch Horoscope Data when Sign or Period changes (using API function in horoscopeApi.ts)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getHoroscopeData(selectedSign, selectedPeriod)
      .then((data) => {
        if (isMounted) {
          setSections(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching horoscope data:", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSign, selectedPeriod]);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#2d1a0e]">
      <AstroNavbar />

      <section className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1f5b4c]">
            Home
          </Link>
          <span>›</span>
          <span>Horoscope</span>
        </div>

        {/* Title & Description */}
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#2d1a0e]">
          Your Daily Horoscope
        </h1>

        <p className="mt-4 max-w-[1000px] text-[17px] leading-8 text-[#3f2c22]">
          Your horoscope offers valuable insights into your personality,
          relationships, career, health, and future opportunities. Through Vedic
          Astrology, experienced astrologers provide accurate, personalized
          horoscope predictions based on authentic astrological principles.
          Explore your daily, weekly, monthly, or yearly horoscope to gain
          clarity, make informed decisions, and confidently embrace every stage
          of life&apos;s journey.
        </p>

        {/* Zodiac Header Component */}
        <ZodiacHeader
          selectedSign={selectedSign}
          setSelectedSign={setSelectedSign}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          activeSign={activeSign}
        />

        {/* Horoscope Prediction Sections Component */}
        <HoroscopeDetails sections={sections} loading={loading} />

        {/* Share Banner & Recommended Astrologers Grid Component */}
        <RecommendedAstrologers />
      </section>

      <Footer />
    </main>
  );
}
