"use client";

import Link from "next/link";
import {
  IndianRupee,
  Plus,
  Wallet,
} from "lucide-react";
import { AstroNavbar } from "../Homepage/navbar";
import { Footer } from "../Homepage/footer";

const walletAmounts = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

const transactions = [
  {
    id: "Transaction ID - 1091143528",
    date: "22/06/2026 11:30:58",
    amount: "+ ₹500",
  },
  {
    id: "Transaction ID - 1091143528",
    date: "22/06/2026 11:30:58",
    amount: "+ ₹500",
  },
  {
    id: "Transaction ID - 1091143528",
    date: "22/06/2026 11:30:58",
    amount: "+ ₹500",
  },
  {
    id: "Transaction ID - 1091143528",
    date: "22/06/2026 11:30:58",
    amount: "+ ₹500",
  },
  {
    id: "Transaction ID - 1091143528",
    date: "22/06/2026 11:30:58",
    amount: "+ ₹500",
  },
];

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#2d1a0e]">
      <AstroNavbar />

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b4d3c]">
          <Link href="/" className="hover:text-[#1c5b49]">
            Home
          </Link>
          <span>›</span>
          <span>Profile</span>
          <span>›</span>
          <span className="text-[#2d1a0e]">Wallet</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[#2d1a0e] md:text-5xl">
          Unlock the Secrets of Your Destiny
        </h1>
        <p className="mt-4 max-w-[980px] text-lg leading-8 text-[#4d382f]">
          Get personalized astrology insights, horoscope predictions, and expert
          guidance to understand your future and make better life decisions.
        </p>

        <div className="mt-10 rounded-[18px] border border-[#e4d5b2] bg-[#f4f1ec] p-5 shadow-[0_1px_0_rgba(39,28,18,0.03)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e7d3a0] bg-[#f6d75e] text-[#2d1a0e] shadow-sm">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#5b4436]">Wallet</p>
                <p className="text-3xl font-bold text-[#2d1a0e]">₹25</p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-full bg-[#1c5b49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#174d42]">
              <Plus className="h-4 w-4" />
              Add Amount
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-[#2d1a0e]">Remanded Amount</h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {walletAmounts.map((amount, index) => (
              <button
                key={index}
                type="button"
                className="rounded-[14px] border border-[#cfe0d4] bg-[#eaf5eb] p-4 text-left transition hover:border-[#1c5b49] hover:shadow-sm"
              >
                <div className="flex items-center justify-between text-sm text-[#365b49]">
                  <span>{amount * 8}% Extra</span>
                  <span>{amount * 8}% Extra</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-3xl font-bold text-[#2d1a0e]">
                  <IndianRupee className="h-5 w-5" />
                  <span>{amount}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#2d1a0e]">Guidelines</h3>
          <ul className="mt-4 space-y-2 text-base leading-7 text-[#4d382f]">
            <li>
              1. Wallet is used for in-app payments like astrology
              consultations, reports, and services.
            </li>
            <li>
              2. Refund time should be clearly mentioned (e.g., 3–7 working
              days).
            </li>
            <li>
              3. Users can add money and use it instantly for bookings or
              purchases.
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#2d1a0e]">
            Transaction History
          </h3>

          <div className="mt-5 space-y-3">
            {transactions.map((txn, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-[14px] border border-[#d9d1c4] bg-[#f6f3ef] px-5 py-4"
              >
                <div>
                  <p className="text-lg font-medium text-[#2d1a0e]">{txn.id}</p>
                  <p className="text-sm text-[#5d4637]">{txn.date}</p>
                </div>
                <span className="text-xl font-bold text-[#1c5b49]">
                  {txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
