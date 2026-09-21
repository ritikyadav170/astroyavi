"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { PujaItem, getPujaList } from "./pujaBooking";
import { PujaToolbar } from "./components/PujaToolbar";
import { PujaGrid } from "./components/PujaGrid";

export default function PujaBookingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Puja");
  const [pujas, setPujas] = useState<PujaItem[]>([]);

  // Fetch Pujas based on search query and selected category
  useEffect(() => {
    let isMounted = true;

    getPujaList(searchQuery, selectedCategory).then((data) => {
      if (isMounted) {
        setPujas(data);
      }
    });

    return () => {
      isMounted = false;
    };
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

        {/* Toolbar (Search Box, Filter Modal, & Category Pills) */}
        <PujaToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Pujas Grid */}
        <PujaGrid
          pujas={pujas}
          onResetFilters={() => {
            setSearchQuery("");
            setSelectedCategory("All Puja");
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
