"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";

interface VerifyPageProps {
  phoneNumber?: string;
  onClose?: () => void;
  onBack?: () => void;
}

export default function VerifyPage({
  phoneNumber = "9872087820",
  onClose,
  onBack,
}: VerifyPageProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(25);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(seconds - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    if (digit && index < nextOtp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(Boolean)) setVerified(true);
  };

  const resendOtp = () => {
    setOtp(["", "", "", ""]);
    setSecondsLeft(25);
    setVerified(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1f211f] px-4 py-8">
      <div className="absolute inset-0 bg-[url('/images/astroyavi_logo.jpeg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-title"
        className="relative z-10 w-full max-w-[440px] rounded-[24px] bg-white px-6 py-7 text-center shadow-2xl sm:px-8"
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close verification dialog"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {verified ? (
          <div className="space-y-3 py-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#1e293b]">
              Verified Successfully
            </h1>
            <p className="text-sm text-slate-500">
              Your mobile number has been verified.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1.5 pt-2">
              <h1
                id="verify-title"
                className="font-serif text-2xl font-bold text-[#1e293b] sm:text-[26px]"
              >
                Verify Your Mobile Number
              </h1>
              <p className="text-xs font-medium leading-5 text-slate-500 sm:text-sm">
                Enter 4-digit verification code sent to your mobile number at{" "}
                <span className="font-bold text-slate-700">
                  +91 {phoneNumber}
                </span>
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  aria-label={`OTP digit ${index + 1}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event.key)}
                  className="h-12 w-12 rounded-full border border-slate-300 bg-white text-center text-lg font-bold text-slate-900 outline-none transition focus:border-[#163014] focus:ring-2 focus:ring-[#163014]/20"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerify}
              disabled={!otp.every(Boolean)}
              className="mt-5 w-full rounded-full bg-[#163014] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0e210d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify OTP
            </button>

            <div className="mt-3 flex items-center justify-between px-1 text-xs">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Change number
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={resendOtp}
                disabled={secondsLeft > 0}
                className="font-semibold text-red-500 disabled:cursor-default disabled:opacity-80"
              >
                {secondsLeft > 0
                  ? `Resend OTP in ${secondsLeft} sec`
                  : "Resend OTP"}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
