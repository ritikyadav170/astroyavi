"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset?: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md text-center flex flex-col items-center gap-4 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-red-400">Something went wrong!</h2>
        <p className="text-slate-400 text-sm">{error?.message || "An unexpected error occurred."}</p>
        {reset && (
          <Button onClick={() => reset()} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
            Try Again
          </Button>
        )}
      </div>
    </main>
  );
};

export default ErrorPage;

