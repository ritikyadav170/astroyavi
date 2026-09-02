"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ChevronDown, Check } from "lucide-react";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetServiceTitle?: string;
}

export function LoginDialog({
  isOpen,
  onClose,
  onSuccess,
  targetServiceTitle,
}: LoginDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => {
        setVerified(false);
        setStep("phone");
        setPhoneNumber("");
        setOtp(["", "", "", ""]);
        onSuccess();
      }, 800);
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`dialog-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-[440px] bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 hover:rotate-90 flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "phone" ? (
          <div className="w-full space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2 pt-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e293b]">
                Let&apos;s Get You Login
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {targetServiceTitle ? (
                  <span>
                    Please login to access{" "}
                    <strong className="text-slate-800 font-bold">
                      {targetServiceTitle}
                    </strong>
                  </span>
                ) : (
                  "Enter Your number to access your Astroyavi account"
                )}
              </p>
            </div>

            <form onSubmit={handleGetOtp} className="space-y-6">
              <div className="relative w-full bg-white border border-slate-300 rounded-full p-1.5 flex items-center shadow-sm focus-within:border-[#1b4327] focus-within:ring-2 focus-within:ring-[#1b4327]/20 transition-all duration-200">
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 shrink-0 cursor-pointer select-none">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="h-6 w-[1px] bg-slate-200 my-auto shrink-0"></div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-transparent px-3 text-sm font-semibold text-[#1e293b] placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || phoneNumber.length < 10 || !agreed}
                className="w-full py-3.5 bg-[#163014] hover:bg-[#0e210d] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-md text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <span>Sending OTP...</span> : <span>Get OTP</span>}
              </button>

              <div className="flex items-start justify-center gap-2 text-left pt-1">
                <input
                  type="checkbox"
                  id="dialog-terms-checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#163014] focus:ring-[#163014] cursor-pointer transition-colors"
                />
                <label
                  htmlFor="dialog-terms-checkbox"
                  className="text-[11px] sm:text-xs text-slate-500 leading-tight cursor-pointer"
                >
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="font-bold text-slate-900 underline hover:text-[#c85a17] transition-colors">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-bold text-slate-900 underline hover:text-[#c85a17] transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="space-y-2 pt-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e293b]">
                Verify OTP
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Enter 4-digit OTP sent to{" "}
                <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
              </p>
            </div>

            {verified ? (
              <div className="py-6 flex flex-col items-center space-y-4 animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center animate-bounce shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Login Successful!</h3>
                <p className="text-xs text-slate-500">
                  Proceeding to {targetServiceTitle || "service"}...
                </p>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`dialog-otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 bg-slate-50 border border-slate-300 rounded-2xl text-center text-xl font-bold text-slate-900 focus:bg-white focus:border-[#163014] focus:ring-2 focus:ring-[#163014]/20 focus:outline-none shadow-sm transition-all duration-200"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.some((d) => !d)}
                  className="w-full py-3.5 bg-[#163014] hover:bg-[#0e210d] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-md text-sm sm:text-base transition-all duration-200 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify & Proceed"}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="hover:text-slate-900 text-slate-700 font-semibold cursor-pointer transition-colors"
                  >
                    ← Change Number
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("OTP re-sent successfully!")}
                    className="hover:text-emerald-700 text-[#163014] font-bold cursor-pointer transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}