"use client";

import {
  signOptions,
  timePeriods,
  periodStyles,
  ZodiacSignName,
  TimePeriod,
  ZodiacSign,
} from "../horoscopeApi";

interface ZodiacHeaderProps {
  selectedSign: ZodiacSignName;
  setSelectedSign: (sign: ZodiacSignName) => void;
  selectedPeriod: TimePeriod;
  setSelectedPeriod: (period: TimePeriod) => void;
  activeSign: ZodiacSign;
}

export function ZodiacHeader({
  selectedSign,
  setSelectedSign,
  selectedPeriod,
  setSelectedPeriod,
  activeSign,
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

      {/* Hero Display Badge */}
      <div className="mt-8 flex justify-center">
        <div className="flex h-[250px] w-[300px] items-center justify-center rounded-full border-[2px] border-[#1f5b4c]/80 bg-[#f9f7f3] shadow-[inset_0_0_0_1px_rgba(31,91,76,0.12)]">
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full border-[4px] border-[#2d1a0e] bg-[#f8f8f5] text-[4.5rem] text-[#2d1a0e] shadow-inner">
            {activeSign.symbol}
          </div>
        </div>
      </div>
    </>
  );
}
