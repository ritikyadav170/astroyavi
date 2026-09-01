"use client";

import React from "react";
import { UserCheck, CalendarDays, MessageSquare, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Choose a Service",
    description: "Select from consult, puja, kundli, panchang and more.",
    icon: <UserCheck className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "2",
    title: "Connect Instantly",
    description: "Consult experts or book services in just a few taps.",
    icon: <CalendarDays className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "3",
    title: "Get Guidance",
    description: "Receive accurate solutions and remedies.",
    icon: <MessageSquare className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "4",
    title: "Transform Your Life",
    description: "Experience peace, clarity and positive change.",
    icon: (
      <svg className="w-10 h-10 text-[#163014]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2c3 5 3 9 0 14-3-5-3-9 0-14z" />
        <path d="M12 16c5-2 9 0 10 4-4 1-8-1-10-4z" />
        <path d="M12 16c-5-2-9 0-10 4 4 1 8-1 10-4z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-[#163014] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 text-emerald-200/80 mb-3">
          <div className="h-[1px] w-16 bg-emerald-200/40"></div>
          <span className="text-xs font-bold uppercase tracking-widest">HOW IT WORKS</span>
          <div className="h-[1px] w-16 bg-emerald-200/40"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-14 lg:mb-16 tracking-tight">
          Simple Steps to Get Divine Guidance
        </h2>

        {/* 4 Process Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full relative">
          {steps.map((item, index) => (
            <div key={item.step} className="flex flex-col items-center text-center relative group">
              
              {/* White Circle with Top Step Number Badge */}
              <div className="relative mb-6">
                {/* Step Badge */}
                <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-white text-[#163014] font-bold text-xs flex items-center justify-center border-2 border-[#163014] shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>

                {/* Circle Container */}
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Step Title & Description */}
              <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-emerald-100/70 text-sm leading-relaxed max-w-[220px]">
                {item.description}
              </p>

              {/* Connecting Arrow for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-6 translate-x-1/2 text-emerald-200/50 group-hover:text-emerald-300 group-hover:translate-x-3 transition-all duration-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
