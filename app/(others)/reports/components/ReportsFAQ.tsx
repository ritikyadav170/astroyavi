"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function ReportsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How accurate are Astroyavi astrological reports?",
      a: "Our reports use classical Vedic algorithms derived from the Brihat Parashara Hora Shastra, matched against high-precision NASA JPL planetary ephemeris tables (accurate to 0.001 arc-seconds). All algorithms are verified by senior certified Jyotish Acharyas.",
    },
    {
      q: "What birth details are required to generate my report?",
      a: "You need your exact Date of Birth, Time of Birth, and Place of Birth (City/State/Country). Exact time of birth is important for accurately computing your Ascendant (Lagna) and planetary house placements.",
    },
    {
      q: "How will I receive my report?",
      a: "Once generated, you can view your interactive report online immediately. You can also download a beautifully formatted, printable 25+ page PDF report directly to your phone or computer.",
    },
    {
      q: "Can I get my report in Hindi as well as English?",
      a: "Yes! All Astroyavi reports offer bilingual support, allowing you to generate and download reports in either Hindi (हिन्दी) or English with traditional Vedic terminology.",
    },
    {
      q: "Can I consult an astrologer to discuss my report?",
      a: "Absolutely! After reading your report, you can directly connect with verified Vedic astrologers via one-click chat or voice call on Astroyavi to ask questions and receive personalized guidance.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c85a17] mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2d1a0e]">
          Frequently Asked Questions About Reports
        </h2>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-amber-200/80 bg-white overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#2d1a0e] hover:text-[#c85a17] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#c85a17]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200 border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
