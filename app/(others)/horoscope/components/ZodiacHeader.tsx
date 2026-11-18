"use client";

import Image from "next/image";
import {
  signOptions,
  timePeriods,
  periodStyles,
  ZodiacSignName,
  TimePeriod,
  ZodiacSign,
} from "../horoscope";

interface ZodiacHeaderProps {
  selectedSign: ZodiacSignName;
  setSelectedSign: (sign: ZodiacSignName) => void;
  selectedPeriod: TimePeriod;
  setSelectedPeriod: (period: TimePeriod) => void;
  activeSign?: ZodiacSign;
}

export function ZodiacHeader({
  selectedSign,
  setSelectedSign,
  selectedPeriod,
  setSelectedPeriod,
}: ZodiacHeaderProps) {
  return (
    <>
      {/* Sign Selector */}
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
                selectedSign === sign.name ? "scale-105" : "opacity-90 hover:opacity-100 hover:scale-105",
              ].join(" ")}
              aria-label={`Select ${sign.name}`}
            >
              <div
                className={[
                  "relative flex h-[78px] w-[78px] items-center justify-center rounded-full p-0.5 transition-all duration-200",
                  selectedSign === sign.name
                    ? "ring-4 ring-[#DA9F1D] ring-offset-2 shadow-md"
                    : "ring-2 ring-transparent hover:ring-[#DA9F1D]/30 shadow-sm",
                ].join(" ")}
              >
                {sign.image ? (
                  <Image
                    src={sign.image}
                    alt={sign.name}
                    width={78}
                    height={78}
                    className="h-full w-full rounded-full object-contain"
                  />
                ) : (
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#1f5b4c]/50 bg-white text-[2rem] text-[#1f5b4c]">
                    {sign.symbol}
                  </div>
                )}
              </div>
              <span
                className={[
                  "text-sm font-medium transition-colors",
                  selectedSign === sign.name
                    ? "font-bold text-[#DA9F1D]"
                    : "text-[#2d1a0e]",
                ].join(" ")}
              >
                {sign.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Period Tabs */}
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
    </>
  );
}
