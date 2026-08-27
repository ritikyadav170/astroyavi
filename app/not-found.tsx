"use client";

import React from "react";
import { Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md text-center flex flex-col items-center gap-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-400">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
            Error 404
          </span>
          <h1 className="text-2xl font-bold text-slate-100">Page Not Found</h1>
          <p className="text-slate-400 text-sm">
            The celestial alignment for this URL doesn't exist or has moved.
          </p>
        </div>
        <Button
          onClick={() => router.push("/")}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6"
        >
          Return Home
        </Button>
      </div>
    </main>
  );
};

export default NotFound;

