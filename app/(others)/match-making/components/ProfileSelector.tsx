"use client";

import React from "react";
import { profileCards } from "../matchMaking";

interface ProfileSelectorProps {
  selectedProfiles: string[];
  setSelectedProfiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ProfileSelector({
  selectedProfiles,
  setSelectedProfiles,
}: ProfileSelectorProps) {
  return (
    <>
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
                    : [...prev, profile.id].slice(-2)
                );
              }}
              className={[
                "relative flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full border-[3px] transition-all cursor-pointer",
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
    </>
  );
}
