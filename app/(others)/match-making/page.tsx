"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";

const previousReports = [
  {
    initials: "RP",
    name: "Rahul Sharma & Priya Sharma",
    date: "12 Jul 2026, 02:30 PM",
    color: "#cfe9da",
  },
  {
    initials: "RL",
    name: "Rajan Kholi & Laxmi Kholi",
    date: "12 Jul 2026, 03:30 PM",
    color: "#e6d8f0",
  },
  {
    initials: "RV",
    name: "Ravi Verma & Reema Verma",
    date: "12 Jul 2026, 04:30 PM",
    color: "#d9e7f3",
  },
  {
    initials: "SS",
    name: "Sandeep Bhardwaj & Sonia Bhardwaj",
    date: "12 Jul 2026, 05:30 PM",
    color: "#e9d9e7",
  },
  {
    initials: "DP",
    name: "Deepak Kumar & Priya Kumar",
    date: "12 Jul 2026, 06:30 PM",
    color: "#e8d5d0",
  },
] as const;

const compatibilityData = {
  labels: [
    "Nature 8/8",
    "Love 8/8",
    "Health 8/8",
    "Mentality 2/4",
    "Compatibility 4/5",
    "Dominance 0.5/2",
    "Trust 0.5/2",
    "Work 1/1",
  ],
  values: [8, 8, 8, 2, 4, 0.5, 0.5, 1],
};

const recommendedAstrologers = [
  {
    name: "Vikram Singh",
    title: "Vedic Astrology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ravindra Sharma",
    title: "Tarot Reading",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sandeep Sharma",
    title: "Vastu, Tarot Reading",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pinki Choudhary",
    title: "Face Reading, Numerology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Raju Srivastav",
    title: "Kal Litab, Nadi, Numerology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
  },
] as const;

function RadarChart() {
  const radialPoints = useMemo(() => {
    const centerX = 220;
    const centerY = 220;
    const maxRadius = 150;
    const labels = compatibilityData.labels.length;

    return compatibilityData.values.map((value, index) => {
      const angle = (Math.PI * 2 * index) / labels - Math.PI / 2;
      const radius = (value / 8) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y };
    });
  }, []);

  const gridLevels = Array.from({ length: 5 }, (_, level) => level + 1);
  const labels = compatibilityData.labels;

  return (
    <div className="relative mx-auto h-[420px] w-[440px]">
      <svg viewBox="0 0 440 440" className="h-full w-full overflow-visible">
        {gridLevels.map((level) => {
          const radius = (level / 5) * 150;
          const points = Array.from({ length: labels.length }, (_, index) => {
            const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
            const x = 220 + Math.cos(angle) * radius;
            const y = 220 + Math.sin(angle) * radius;
            return `${x},${y}`;
          }).join(" ");

          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#d8d0c2"
              strokeDasharray="4 4"
            />
          );
        })}

        {labels.map((label, index) => {
          const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
          const x = 220 + Math.cos(angle) * 170;
          const y = 220 + Math.sin(angle) * 170;
          const textX = 220 + Math.cos(angle) * 200;
          const textY = 220 + Math.sin(angle) * 200;

          return (
            <g key={label}>
              <line
                x1={220}
                y1={220}
                x2={x}
                y2={y}
                stroke="#d8d0c2"
                strokeDasharray="4 4"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#4a3020"
                fontWeight={500}
              >
                {label}
              </text>
            </g>
          );
        })}

        <polygon
          points={radialPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="#b3a3df"
          fillOpacity="0.4"
          stroke="#8a7ae3"
          strokeWidth="2"
        />
        {radialPoints.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="#8a7ae3"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

export default function MatchMakingPage() {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([
    "boy",
    "girl",
  ]);
  const [showReport, setShowReport] = useState(false);

  const profileCards = [
    {
      id: "boy",
      label: "Boy",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "girl",
      label: "Girl",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const isReportReady = selectedProfiles.length === 2;

  const reportText = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`;

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1c5b49]">
            Home
          </Link>
          <span>›</span>
          <span>Match Making</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[#2d1a0e]">
          Match Making
        </h1>
        <p className="mt-3 max-w-[820px] text-[17px] leading-8 text-[#4d382f]">
          Discover relationship compatibility through accurate Kundli matching
          and Gun Milan.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          {profileCards.map((profile) => {
            const selected = selectedProfiles.includes(profile.id);
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  setSelectedProfiles((prev) =>
                    prev.includes(profile.id)
                      ? prev.filter((id) => id !== profile.id)
                      : [...prev, profile.id].slice(-2),
                  );
                }}
                className={[
                  "relative flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full border-[3px] transition-all",
                  selected
                    ? "border-[#1c5b49] ring-4 ring-[#1c5b49]/10"
                    : "border-[#dfd6c8]",
                ].join(" ")}
                aria-label={`Select ${profile.label}`}
              >
                <img
                  src={profile.image}
                  alt={profile.label}
                  className="h-full w-full object-cover"
                />
                {selected && (
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1c5b49] text-xs font-bold text-white">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-[15px] text-[#4d382f]">
          Choose any 2 profiles from the list below to proceed with matchmaking
        </p>

        {!showReport ? (
          <div className="mt-10 rounded-[24px] border border-[#e2c99a] bg-[#f6f3ee] p-5 shadow-[0_1px_0_rgba(72,51,29,0.03)] sm:p-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
              <div className="space-y-4 rounded-[18px] border border-[#e2d6bc] bg-[#f2efe9] p-4">
                <h3 className="text-[17px] font-semibold text-[#2d1a0e]">
                  Previous Match Making Report
                </h3>

                <div className="space-y-3">
                  {previousReports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between gap-3 rounded-[12px] border border-transparent bg-transparent px-1 py-1"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-[#2d1a0e]"
                          style={{ background: report.color }}
                        >
                          {report.initials}
                        </div>
                        <div>
                          <p className="text-[15px] font-medium text-[#2d1a0e]">
                            {report.name}
                          </p>
                          <p className="text-xs text-[#6b4d3c]">
                            {report.date}
                          </p>
                        </div>
                      </div>

                      <button className="rounded-full border border-[#1c5b49] bg-[#1c5b49] px-3 py-2 text-xs font-semibold text-white shadow-sm">
                        View Report
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e2d6bc] bg-[#f7f6f4] p-5">
                <h3 className="mb-5 text-[20px] font-bold text-[#2d1a0e]">
                  Match Making
                </h3>

                <div className="space-y-5">
                  <div>
                    <h4 className="mb-3 text-[17px] font-semibold text-[#2d1a0e]">
                      Boy Details
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Full name
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Date of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Time of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Place of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-[17px] font-semibold text-[#2d1a0e]">
                      Girl Details
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Full name
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Date of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Time of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-[#4d382f]">
                          Place of Birth
                        </label>
                        <input className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f2f0ed] px-3 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      disabled={!isReportReady}
                      onClick={() => setShowReport(true)}
                      className={[
                        "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition",
                        isReportReady
                          ? "bg-[#1c5b49] hover:bg-[#174d42]"
                          : "cursor-not-allowed bg-[#a9b6ae]",
                      ].join(" ")}
                    >
                      Get Matching Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-[18px] border border-[#e2d6bc] bg-[#f6f3ee] p-5 shadow-[0_1px_0_rgba(72,51,29,0.03)]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-6">
                {profileCards.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#d8d0c2] bg-white object-cover"
                  >
                    <img
                      src={profile.image}
                      alt={profile.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center">
                <RadarChart />
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-3xl font-bold text-[#2d1a0e]">
                  Vedic Guna Milan Report
                </h2>
                <p className="mt-2 text-[32px] font-bold text-[#2d1a0e]">
                  20/36
                </p>
              </div>

              <div className="mt-10 w-full max-w-[1100px] text-left">
                <h3 className="text-[18px] font-bold text-[#2d1a0e]">Report</h3>
                <p className="mt-4 text-[15px] leading-8 text-[#4d382f]">
                  {reportText}
                </p>

                <h3 className="mt-8 text-[18px] font-bold text-[#2d1a0e]">
                  Realtions
                </h3>
                <p className="mt-4 text-[15px] leading-8 text-[#4d382f]">
                  {reportText}
                </p>
              </div>

              <div className="mt-12 w-full rounded-[18px] border border-[#e0cab0] bg-[#f3f0ec] p-4 sm:p-5">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d9d1c4] bg-[#f5f1ea] text-[#2d1a0e]">
                      <Share2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#2d1a0e]">
                        Share Match Making Report
                      </h4>
                      <p className="text-sm text-[#5d4637]">
                        Share your personalized Horoscope instantly with family
                        and friend
                      </p>
                    </div>
                  </div>

                  <button className="rounded-full bg-[#1c5b49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174d42]">
                    Share Match Making Report
                  </button>
                </div>
              </div>

              <div className="mt-14 w-full">
                <div className="relative mb-8 text-center">
                  <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#d8d0c2]" />
                  <span className="relative inline-block bg-[#f6f5f1] px-5 text-lg font-semibold text-[#2d1a0e]">
                    Recommended Astrologer
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                  {recommendedAstrologers.map((astro) => (
                    <div
                      key={astro.name}
                      className="rounded-[20px] border border-[#e4d6b3] bg-[#f9f6f2] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                    >
                      <div className="mb-3 flex justify-center">
                        <img
                          src={astro.image}
                          alt={astro.name}
                          className="h-[84px] w-[84px] rounded-full border-[3px] border-[#1c5b49] object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="text-[18px] font-semibold text-[#2d1a0e]">
                          {astro.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#4d382f]">
                          {astro.title}
                        </p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-[#e4a61a]">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={`${astro.name}-${index}`}
                              className="h-4 w-4 fill-current"
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-[#1c5b49]">
                          {astro.fee}
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-3">
                          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1c5b49] bg-white text-[#1c5b49]">
                            <Phone className="h-4 w-4" />
                          </button>
                          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1c5b49] bg-white text-[#1c5b49]">
                            <MessageSquareMore className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="inline-flex items-center justify-center rounded-full border border-[#1c5b49] px-6 py-3 text-sm font-semibold text-[#1c5b49] transition hover:bg-[#1c5b49] hover:text-white">
                    View All Astrologers{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
