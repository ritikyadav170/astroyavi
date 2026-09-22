"use client";

import { Check, X, Clock, AlertCircle } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

interface AstrologerRequestModalProps {
  request: {
    chatRequestId: string;
    userId: string;
    userName: string;
    profileImage?: string;
    maxWaitingTime: number; // in seconds
  };
  onAccept: () => void;
  onReject: () => void;
}

export function AstrologerRequestModal({
  request,
  onAccept,
  onReject,
}: AstrologerRequestModalProps) {
  if (!request) return null;

  const durationMinutes = Math.floor((request.maxWaitingTime || 0) / 60);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border border-amber-200 bg-[#fdf8f0] p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* User Image */}
        <div className="relative mx-auto mb-3.5 h-20 w-20 overflow-hidden rounded-full border-2 border-amber-500 bg-[#1b4327] shadow-md">
          {request.profileImage ? (
            <img
              src={formatImageUrl(request.profileImage)}
              alt={request.userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-2xl font-bold text-amber-200">
              {request.userName?.charAt(0) || "U"}
            </div>
          )}
        </div>

        <h3 className="font-serif text-xl font-bold text-slate-900">
          New Chat Request
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#c85a17]">
          {request.userName || "Client"}
        </p>

        <div className="my-4 flex items-center justify-center gap-1.5 text-xs text-slate-600 bg-amber-100/60 py-2 rounded-xl border border-amber-200">
          <Clock className="h-4 w-4 text-slate-500" />
          <span>Max Allowed Time: <strong>{durationMinutes} mins</strong></span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            type="button"
            onClick={onReject}
            className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 text-xs font-bold text-red-700 transition hover:bg-red-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span>Decline</span>
          </button>

          <button
            type="button"
            onClick={onAccept}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#1b4327] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#13321d] cursor-pointer"
          >
            <Check className="h-4 w-4" />
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}