"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Star } from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";

const signOptions = [
  { name: "Aries", symbol: "♈", accent: "#1f5b4c" },
  { name: "Taurus", symbol: "♉", accent: "#1f5b4c" },
  { name: "Gemini", symbol: "♊", accent: "#1f5b4c" },
  { name: "Cancer", symbol: "♋", accent: "#1f5b4c" },
  { name: "Leo", symbol: "♌", accent: "#1f5b4c" },
  { name: "Virgo", symbol: "♍", accent: "#1f5b4c" },
  { name: "Libra", symbol: "♎", accent: "#1f5b4c" },
  { name: "Scorpio", symbol: "♏", accent: "#1f5b4c" },
  { name: "Sagittarius", symbol: "♐", accent: "#1f5b4c" },
  { name: "Capricorn", symbol: "♑", accent: "#1f5b4c" },
  { name: "Aquarius", symbol: "♒", accent: "#1f5b4c" },
  { name: "Pisces", symbol: "♓", accent: "#1f5b4c" },
] as const;

const timePeriods = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

const categorySections = [
  {
    title: "Career",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
  {
    title: "Health",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
  {
    title: "Love",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
  {
    title: "Business",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
] as const;

const recommendedAstrologers = [
  {
    name: "Vikram Singh",
    title: "Vedic Astrology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ravindra Sharma",
    title: "Tarot Reading",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sandeep Sharma",
    title: "Vastu, Tarot Reading",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pinki Choudhary",
    title: "Face Reading, Numerology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Raju Srivastav",
    title: "Kal Litab, Nadi, Numerology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
  },
] as const;

const periodStyles: Record<(typeof timePeriods)[number], string> = {
  Daily: "bg-[#1f5b4c] text-white shadow-sm",
  Weekly: "bg-transparent text-[#3c2415]",
  Monthly: "bg-transparent text-[#3c2415]",
  Yearly: "bg-transparent text-[#3c2415]",
};

function ZodiacGlyph({
  symbol,
  active = false,
}: {
  symbol: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "relative flex h-16 w-16 items-center justify-center rounded-full border-[2.5px] bg-white text-[2rem] leading-none shadow-sm transition-all duration-200",
        active
          ? "border-[#1f5b4c] text-[#1f5b4c] shadow-[0_0_0_3px_rgba(31,91,76,0.15)]"
          : "border-[#1f5b4c]/80 text-[#1f5b4c]",
      ].join(" ")}
    >
      <span>{symbol}</span>
    </div>
  );
}

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] =
    useState<(typeof signOptions)[number]["name"]>("Aries");
  const [selectedPeriod, setSelectedPeriod] =
    useState<(typeof timePeriods)[number]>("Daily");

  const activeSign = useMemo(
    () =>
      signOptions.find((sign) => sign.name === selectedSign) ?? signOptions[0],
    [selectedSign],
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#2d1a0e]">
      <AstroNavbar />

      <section className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1f5b4c]">
            Home
          </Link>
          <span>›</span>
          <span>Horoscope</span>
        </div>

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

        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#2d1a0e]">
            Choose Your Sign
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
            {signOptions.map((sign) => (
              <button
                key={sign.name}
                type="button"
                onClick={() => setSelectedSign(sign.name)}
                className={[
                  "flex flex-col items-center gap-2 rounded-full transition-all duration-200",
                  selectedSign === sign.name ? "scale-[1.02]" : "opacity-100",
                ].join(" ")}
                aria-label={`Select ${sign.name}`}
              >
                <div
                  className={[
                    "flex h-[78px] w-[78px] items-center justify-center rounded-full border-[3px] bg-[#f5f5f3] shadow-sm",
                    selectedSign === sign.name
                      ? "border-[#1f5b4c] ring-2 ring-[#1f5b4c]/20"
                      : "border-[#1f5b4c]/80",
                  ].join(" ")}
                >
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#1f5b4c]/50 bg-white text-[2rem] text-[#1f5b4c]">
                    {sign.symbol}
                  </div>
                </div>
                <span className="text-sm font-medium text-[#2d1a0e]">
                  {sign.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 border-b border-[#e1d2b3] pb-7">
          <div className="grid grid-cols-4 gap-2 rounded-xl border border-[#d7d3ca] bg-[#f2f1ee] p-1.5">
            {timePeriods.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setSelectedPeriod(period)}
                className={[
                  "rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  selectedPeriod === period
                    ? periodStyles[period]
                    : "text-[#2d1a0e] hover:bg-white/60",
                ].join(" ")}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex h-[250px] w-[300px] items-center justify-center rounded-full border-[2px] border-[#1f5b4c]/80 bg-[#f9f7f3] shadow-[inset_0_0_0_1px_rgba(31,91,76,0.12)]">
            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full border-[4px] border-[#2d1a0e] bg-[#f8f8f5] text-[4.5rem] text-[#2d1a0e] shadow-inner">
              {activeSign.symbol}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {categorySections.map((section) => (
            <div key={section.title} className="pt-3">
              <h3 className="mb-3 text-3xl font-bold tracking-tight text-[#2d1a0e]">
                {section.title}
              </h3>
              <p className="max-w-[1180px] text-[17px] leading-8 text-[#3f2c22]">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 rounded-[18px] border border-[#d7d3ca] bg-[#f4f2ee] p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d7d3ca] bg-[#f7f5f3] text-[#2d1a0e]">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#2d1a0e]">
                Share Horoscope Report
              </p>
              <p className="text-sm text-[#5d4637]">
                Share your personalized Horoscope instantly with family and
                friend
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] bg-[#1f5b4c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#194e42]"
          >
            Share Horoscope Report
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-16">
          <div className="relative mb-8 text-center">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c3]" />
            <span className="relative inline-block bg-[#f8f7f4] px-5 text-lg font-semibold tracking-wide text-[#2d1a0e]">
              Recommended Astrologer
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {recommendedAstrologers.map((astro) => (
              <div
                key={astro.name}
                className="rounded-[20px] border border-[#d9c7a1] bg-[#f8f5f1] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
              >
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={astro.image}
                      alt={astro.name}
                      className="h-[84px] w-[84px] rounded-full border-[3px] border-[#1f5b4c] object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1f5b4c] text-[10px] text-white">
                      ✓
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-[1.9rem] font-semibold leading-tight text-[#2d1a0e]">
                    {astro.name}
                  </h4>
                  <p className="mt-1 text-sm text-[#4a3020]">{astro.title}</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-[#e7a11c]">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={`${astro.name}-${index}`}
                        className="h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-[#1f5b4c]">
                    <span className="font-semibold">₹20/min</span>
                    <span className="mx-2 text-[#2d1a0e]">₹30/min</span>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f5b4c] bg-white text-[#1f5b4c]"
                      aria-label={`Call ${astro.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.35 2.3.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.19 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.3Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1f5b4c] bg-white text-[#1f5b4c]"
                      aria-label={`Chat with ${astro.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v8A2.5 2.5 0 0 1 17.5 15H9l-5 5v-5.5A2.5 2.5 0 0 1 4 12.5v-8Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#1f5b4c] px-6 py-3 text-sm font-semibold text-[#1f5b4c] transition hover:bg-[#1f5b4c] hover:text-white">
              View All Astrologers <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
