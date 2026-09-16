"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import axios from "../../../config/axios";

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupDialog({ isOpen, onClose }: SignupDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneNumber.length !== 10 || !email || !agreed || loading) return;

    setLoading(true);
    setError("");
    try {
      await axios.post("/signUp", {
        mobile: phoneNumber,
        email,
        countryCode: "+91",
      });
      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const dialogContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-md">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-dialog-title"
        className="relative w-full max-w-[440px] rounded-[24px] bg-white px-6 py-7 text-center shadow-2xl sm:px-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close signup dialog"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="space-y-3 py-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#1e293b]">
              OTP Sent
            </h1>
            <p className="text-sm text-slate-500">
              We sent a verification code to +91 {phoneNumber}.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="pt-3 text-sm font-bold text-[#163014] underline"
            >
              Change number
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1.5 pt-2">
              <h1
                id="signup-dialog-title"
                className="font-serif text-2xl font-bold text-[#1e293b] sm:text-[26px]"
              >
                Let&apos;s Get You Started
              </h1>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Enter your number to create your Astroyavi account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="flex w-full items-center rounded-full border border-slate-400 bg-white px-1.5 py-1.5 shadow-sm transition focus-within:border-[#163014] focus-within:ring-2 focus-within:ring-[#163014]/20">
                <div className="flex shrink-0 items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <div className="my-auto h-6 w-px bg-slate-200" />
                <input
                  aria-label="Mobile number"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter Mobile Number"
                  className="w-full bg-transparent px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <input
                aria-label="Email address"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Email Address"
                className="w-full rounded-full border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#163014] focus:ring-2 focus:ring-[#163014]/20"
              />

              <button
                type="submit"
                disabled={
                  phoneNumber.length !== 10 || !email || !agreed || loading
                }
                className="w-full rounded-full bg-[#163014] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0e210d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>

              {error && (
                <p className="text-xs font-medium text-red-600">{error}</p>
              )}

              <label className="flex items-start justify-center gap-2 text-left text-[11px] leading-tight text-slate-500 sm:text-xs">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#163014]"
                />
                <span>
                  By signing up, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-bold text-slate-900 underline"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-bold text-slate-900 underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </form>
          </>
        )}
      </section>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
