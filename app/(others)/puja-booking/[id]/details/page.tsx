"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { AstroNavbar } from "../../../Homepage/navbar";
import { Footer } from "../../../Homepage/footer";

const PUJA_DETAILS = {
  "satyanarayana-puja": { name: "Satyanarayana Puja", fee: 4990 },
  "ganesh-puja": { name: "Ganesh Puja", fee: 4990 },
  "lakshmi-puja": { name: "Lakshmi Puja", fee: 4990 },
  "navgraha-puja": { name: "Navgraha Puja", fee: 4990 },
  "shiv-puja": { name: "Shiv Puja", fee: 4990 },
  "durga-puja": { name: "Durga Puja", fee: 4990 },
} as const;

const initialOrder = {
  pujaFee: 4990,
  samarghiCharges: 5990,
  travelCharges: 2100,
  convenienceFee: 2500,
  dakshina: 2100,
};

export default function PujaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pujaId = String(params?.id || "satyanarayana-puja");
  const pujaInfo =
    PUJA_DETAILS[pujaId as keyof typeof PUJA_DETAILS] ??
    PUJA_DETAILS["satyanarayana-puja"];

  const total = useMemo(
    () => Object.values(initialOrder).reduce((sum, value) => sum + value, 0),
    [],
  );

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gotra: "",
    sankalpName: "",
    dakshina: "",
    language: "",
  });
  const [paymentMode, setPaymentMode] = useState<"wallet" | "razorpay">(
    "razorpay",
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = () => {
    setShowSuccess(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1c5b49]">
            Home
          </Link>
          <span>›</span>
          <Link href="/puja-booking" className="hover:text-[#1c5b49]">
            Puja Booking
          </Link>
          <span>›</span>
          <span className="text-[#2d1a0e]">{pujaInfo.name}</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[18px] border border-[#e0cab0] bg-[#f2f0ed] p-6 shadow-[0_1px_0_rgba(70,52,33,0.03)]">
            <h2 className="mb-5 text-[28px] font-bold tracking-tight text-[#2d1a0e]">
              Enter Devotee Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Full Name
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Mobile Number
                </label>
                <div className="flex h-12 overflow-hidden rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] focus-within:border-[#1c5b49] focus-within:bg-white">
                  <div className="flex items-center justify-center border-r border-[#d9d1c4] bg-[#f2efe9] px-3 text-sm font-medium text-[#2d1a0e]">
                    +91
                  </div>
                  <input
                    value={form.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    className="w-full bg-transparent px-3 text-base outline-none"
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Email Id (Optional)
                </label>
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Gotra
                </label>
                <input
                  value={form.gotra}
                  onChange={(e) => handleChange("gotra", e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Sankalp Name
                </label>
                <input
                  value={form.sankalpName}
                  onChange={(e) => handleChange("sankalpName", e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
                  placeholder=""
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                  Dakshina
                </label>
                <input
                  value={form.dakshina}
                  onChange={(e) => handleChange("dakshina", e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
                  placeholder=""
                />
              </div>
            </div>

            <div className="mt-5 max-w-md">
              <label className="mb-2 block text-sm font-medium text-[#4d382f]">
                Language Preference
              </label>
              <select
                value={form.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-[#d9d1c4] bg-[#f7f5f3] px-3 pr-10 text-base outline-none transition focus:border-[#1c5b49] focus:bg-white"
              >
                <option value="">Select language</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#e0cab0] bg-[#f2f0ed] p-6 shadow-[0_1px_0_rgba(70,52,33,0.03)]">
            <h2 className="mb-5 text-[28px] font-bold tracking-tight text-[#2d1a0e]">
              Payment Summary
            </h2>

            <div className="space-y-3 text-[15px]">
              <div className="flex items-center justify-between text-[#2d1a0e]">
                <span>Puja Fee</span>
                <span>₹{initialOrder.pujaFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-[#2d1a0e]">
                <span>Samarghi Charges</span>
                <span>
                  ₹{initialOrder.samarghiCharges.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#2d1a0e]">
                <span>Travel Charges</span>
                <span>
                  ₹{initialOrder.travelCharges.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#2d1a0e]">
                <span>Convenience Fee</span>
                <span>
                  ₹{initialOrder.convenienceFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#2d1a0e]">
                <span>Dakshina</span>
                <span>₹{initialOrder.dakshina.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#d9d1c4] pt-4 text-lg font-semibold text-[#2d1a0e]">
              <div className="flex items-center justify-between">
                <span>Total Amount</span>
                <span className="font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePay}
            className="w-full max-w-[280px] rounded-full bg-[#1c5b49] px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_25px_rgba(28,91,73,0.28)] transition hover:bg-[#164d3f]"
          >
            Pay Now
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px]">
          <div className="w-full max-w-[520px] rounded-[24px] border border-[#e8dbc0] bg-white px-6 py-8 text-center shadow-[0_18px_80px_rgba(25,26,24,0.18)]">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#e84646] text-white shadow-sm">
              <Check className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-[28px] font-bold text-[#2d1a0e]">
              Congratulations
            </h3>
            <p className="mt-2 text-[18px] text-[#3a2c24]">
              Your booking has been confirmed.
            </p>

            <button
              type="button"
              onClick={() => router.push(`/puja-booking/${pujaId}`)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1c5b49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#174e42]"
            >
              Back to Booking
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
