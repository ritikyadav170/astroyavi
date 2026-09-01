"use client";

import React, { useState, useEffect } from "react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";
import { Mandir, getLiveMandirs } from "./liveDarshanApi";
import { MandirSearchHeader } from "./components/MandirSearchHeader";
import { MandirGrid } from "./components/MandirGrid";
import { LiveStreamModal } from "./components/LiveStreamModal";

export default function LiveDarshanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mandirs, setMandirs] = useState<Mandir[]>([]);
  const [activeMandir, setActiveMandir] = useState<Mandir | null>(null);

  // Fetch Mandirs list whenever search query changes (using API function in liveDarshanApi.ts)
  useEffect(() => {
    let isMounted = true;

    getLiveMandirs(searchQuery).then((data) => {
      if (isMounted) {
        setMandirs(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fdf8f0] selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* Top Navbar */}
      <AstroNavbar />

      {/* Main Page Container */}
      <div className="w-full flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Search Header Component */}
        <MandirSearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mandir Grid Component */}
        <MandirGrid
          mandirs={mandirs}
          onSelectMandir={(mandir) => setActiveMandir(mandir)}
          onClearSearch={() => setSearchQuery("")}
        />
      </div>

      {/* Live Video Stream Modal Popup */}
      {activeMandir && (
        <LiveStreamModal
          mandir={activeMandir}
          onClose={() => setActiveMandir(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
