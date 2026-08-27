"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Search, SlidersHorizontal, ChevronRight, X } from "lucide-react";

interface PujaItem {
  id: number;
  name: string;
  category: string;
  image: string;
  description?: string;
}

const ALL_PUJAS: PujaItem[] = [
  {
    id: 1,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description: "Removes obstacles and brings prosperity, new beginnings, and good fortune.",
  },
  {
    id: 2,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description: "Invokes peace, harmony, health, and happiness for the whole family.",
  },
  {
    id: 3,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description: "Attracts wealth, abundance, business growth, and financial stability.",
  },
  {
    id: 4,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description: "Pacifies planetary doshas and balances all nine planetary energies.",
  },
  {
    id: 5,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description: "Grants inner peace, longevity, protection, and spiritual liberation.",
  },
  {
    id: 6,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description: "Bestows divine protection, strength, and victory over all negative forces.",
  },
  {
    id: 7,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description: "Special Siddhi Vinayak ritual for career advancement and academic success.",
  },
  {
    id: 8,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description: "Sacred monthly vrat puja for housewarming and family blessings.",
  },
  {
    id: 9,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description: "Vedic ritual to overcome obstacles before starting any auspicious work.",
  },
  {
    id: 10,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description: "Traditional Katha & Hawan ritual performed by certified Vedic priests.",
  },
  {
    id: 11,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description: "Kuber & Mahalakshmi Mahapuja for business success and debt relief.",
  },
  {
    id: 12,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description: "Nine planets shanti jaap and havan to neutralize astrological afflictions.",
  },
  {
    id: 13,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description: "Maha Rudrabhishekam ritual with Panchamrit for health and wellness.",
  },
  {
    id: 14,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description: "Chandi Path & Navratri Special Puja for protection and energy.",
  },
  {
    id: 15,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description: "Ganapati Atharvashirsha Havanam for wisdom and prosperity.",
  },
  {
    id: 16,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description: "Full Lord Vishnu Pujan with Prasad distribution and mantra chanting.",
  },
  {
    id: 17,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description: "Kanakdhara Stotram jaap and Lakshmi Pujan for financial growth.",
  },
  {
    id: 18,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description: "Complete Navgraha Shanti Yagya performed at holy teerth sthan.",
  },
  {
    id: 19,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description: "Laghu Rudra Puja with Bilva Patra and special Shiva Aarti.",
  },
  {
    id: 20,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description: "Durga Saptashati Paath for prosperity and victory over hurdles.",
  },
];

const CATEGORIES = [
  "All Puja",
  "Ganesh Puja",
  "Hanuman Puja",
  "Vastu Puja",
  "Grah Puja",
  "Grahpravesh Puja",
  "Lakshmi Puja",
  "Durga Puja",
  "Shiv Puja",
  "Satyanarayana Puja",
];

export default function PujaBookingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Puja");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filter pujas based on search query and category
  const filteredPujas = useMemo(() => {
    return ALL_PUJAS.filter((puja) => {
      const matchesSearch =
        puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puja.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (puja.description && puja.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All Puja" || puja.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#faf9f5] flex flex-col font-sans text-slate-800">
      {/* Header / Navbar */}
      <AstroNavbar />

      {/* Main Content Area */}
      <div className="w-full flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb Header */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#c85a17] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-700 font-semibold">Puja Booking</span>
        </nav>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Left Controls: Search Bar & Sort/Filter Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Search Input Box */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search, Astrologers"
                className="w-full bg-white border border-slate-300 rounded-full py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E3B2B] shadow-2xs transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              )}
            </div>

            {/* Sort & Filter Button */}
            <button
              onClick={() => setShowFilterModal(!showFilterModal)}
              className="flex items-center justify-center gap-2 bg-white border border-slate-300 rounded-full px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-all shadow-2xs shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <span>Sort & Filter</span>
            </button>
          </div>

          {/* Right Controls: Category Filter Chips (Pills) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                    isActive
                      ? "bg-[#1E3B2B] text-white shadow-sm"
                      : "bg-white border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Filter Drawer / Quick Modal if clicked Sort & Filter */}
        {showFilterModal && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-md transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-semibold text-base text-slate-900">Filter Pujas</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilterModal(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                    selectedCategory === cat
                      ? "bg-[#1E3B2B] text-white border-[#1E3B2B]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pujas Grid */}
        {filteredPujas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredPujas.map((puja, index) => {
              const slug = puja.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={`${puja.id}-${index}`}
                  href={`/puja-booking/${slug}`}
                  className="bg-white rounded-[22px] overflow-hidden border border-slate-200/70 shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
                >
                  {/* Puja Image */}
                  <div className="h-[210px] w-full overflow-hidden relative bg-amber-50">
                    <img
                      src={puja.image}
                      alt={puja.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback image in case of error
                        (e.target as HTMLElement).setAttribute(
                          "src",
                          "/images/puja/ganesh_puja.jpg"
                        );
                      }}
                    />
                  </div>

                  {/* Puja Name Strip Container */}
                  <div className="bg-[#eef3fe] py-3.5 px-4 text-center flex items-center justify-center rounded-b-[22px] border-t border-blue-50/50">
                    <h3 className="font-bold text-base text-[#1e293b] tracking-tight group-hover:text-[#1E3B2B] transition-colors">
                      {puja.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200 shadow-xs mb-16">
            <p className="text-lg font-semibold text-slate-700 mb-2">
              No Pujas found matching your search.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Puja");
              }}
              className="px-6 py-2.5 bg-[#1E3B2B] text-white font-medium text-sm rounded-full shadow-md hover:bg-[#152a1e] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
